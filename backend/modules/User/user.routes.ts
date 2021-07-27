import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";
import FileSystem from "../../classes/file-system";
import Methods from "../../classes/methods";
import Token from "../../classes/token";
import { verifyToken } from "../../middlewares/authentication";
import { IUser, User } from "./user.model";

const userRoutes = Router();
const fileSystem = new FileSystem();

// Login
userRoutes.post("/login", (req: Request, res: Response) => {
  const body = req.body;

  const errors: string[] = [];
  if (!req.body.email) errors.push("email");
  if (!req.body.password) errors.push("contraseña");

  if (errors.length) {
    return res.json({
      ok: false,
      desc: Methods.emptyFieldsMsg(errors),
    });
  }

  User.findOne({ email: body.email }, (err, userDB) => {
    if (err) res.json({ ok: false, err });

    if (!userDB) {
      return res.json({
        ok: false,
        desc: "Usuario/contraseña no son correctos",
      });
    }

    if (userDB.matchPassword(body.password)) {
      const tokenUser = Token.getJwtToken({
        _id: userDB._id,
        name: userDB.name,
        email: userDB.email,
      });

      userDB.password = "";

      res.json({
        ok: true,
        token: tokenUser,
        user: userDB,
      });
    } else {
      return res.json({
        ok: false,
        desc: "Usuario/contraseña no son correctos ***",
      });
    }
  }).select("+password");
});

// Create an User
userRoutes.post("/create", [verifyToken], (req: Request, res: Response) => {
  const errors: string[] = [];
  if (!req.body.name) errors.push("name");
  if (!req.body.email) errors.push("email");
  if (!req.body.password) errors.push("password");

  if (errors.length) {
    return res.json({
      ok: false,
      desc: Methods.emptyFieldsMsg(errors),
    });
  }

  User.findOne({ email: req.body.email }, (err, userDB) => {
    if (err) res.json({ ok: false, err });

    if (userDB) {
      return res.json({
        ok: false,
        desc: "An user with that name already exists.",
      });
    } else {
      const user = new User();
      user.name = req.body.name;
      user.email = req.body.email;
      user.level = 1;
      user.password = bcrypt.hashSync(req.body.password, 10);

      User.create(user)
        .then((userDB) => {
          const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            name: userDB.name,
            email: userDB.email,
            level: userDB.level,
          });

          // @ts-ignore
          const images = fileSystem.filesFromTempToFolder(
            req.user._id,
            "users",
            userDB._id.toString()
          );

          // Now that we have the ID, we can store the Images
          if (images) {
            userDB.img = images[0];
            User.findByIdAndUpdate(
              userDB._id,
              userDB,
              { new: true },
              (err, updatedUserDB) => {}
            );
          }

          res.status(201);
          res.json({ ok: true, token: tokenUser });
        })
        .catch((err) => res.json({ ok: false, err }));
    }
  });
});

// Update User
userRoutes.patch("/update", [verifyToken], (req: any, res: Response) => {
  const errors: string[] = [];
  if (!req.body._id) errors.push("id");

  if (errors.length) {
    return res.json({
      ok: false,
      desc: Methods.emptyFieldsMsg(errors),
    });
  }

  const user = <IUser>{ _id: req.body._id, modified: new Date() };

  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  user.img = req.body.img[0] || "category_def.jpg";

  fileSystem.filesFromTempToFolder(
    req.user._id,
    "users",
    req.body._id.toString()
  );
  const currentImages = [user.img || ""];
  fileSystem.deleteImagesNotIncludedIn("users", req.body._id, currentImages);

  User.findByIdAndUpdate(user._id, user, { new: true }, (err, userDB) => {
    //TODO: Update password
    if (err) return Methods.sendErr(res, Methods.prettyMongooseErr(err));

    if (!userDB) {
      return res.json({
        ok: false,
        desc: "No existe un usuario con ese ID",
      });
    }

    if (req.user._id == user._id) {
      //The logged user is updating is own profile
      const tokenUser = Token.getJwtToken({
        _id: userDB._id,
        name: userDB.name,
        email: userDB.email,
      });
      res.json({ ok: true, token: tokenUser });
    } else {
      res.json({ ok: true, token: "" });
    }
  });
});

// Get ById
userRoutes.get("/:userid", async (req: any, res: Response) => {
  const id = req.params.userid;
  const ObjectId = require("mongoose").Types.ObjectId;
  if (!ObjectId.isValid(id)) {
    return res.json({ ok: false, desc: "No user found" });
  }

  const users = await User.findById(id)
    .exists("deleted", false)
    .sort({ _id: -1 })
    .populate("user", "-password")
    .exec()
    .catch((err) => Methods.sendErr(res, err));

  if (!users) return res.json({ ok: true, desc: "No user found" });

  return res.json({ ok: true, users });
});

// Get All Users
userRoutes.get("/", [verifyToken], async (req: any, res: Response) => {
  const users = await User.find()
    .sort({ _id: -1 })
    .populate("user", "-password")
    // .select('+password') //in case is needed a field with select:false
    .exec();

  res.json({
    ok: true,
    users,
  });
});

// Delete
userRoutes.delete(
  "/:userid",
  [verifyToken],
  async (req: any, res: Response) => {
    const id = req.params.userid;
    await User.findByIdAndDelete(id).catch((err) => Methods.sendErr(res, err));

    // TODO: Erase user references and call fs.deleteFolder
    res.json({ ok: true, desc: "User deleted" });
  }
);

export default userRoutes;
