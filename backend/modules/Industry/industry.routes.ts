import { Request, Response, Router } from "express";
import Methods from "../../classes/methods";
import { verifyToken } from "../../middlewares/authentication";
import { IIndustry, Industry } from "./industry.model";

const industryRoutes = Router();

// TODO: verify Token by level
industryRoutes.post("/create", [verifyToken], (req: Request, res: Response) => {
  const errors: string[] = [];
  if (!req.body.name) errors.push("name");

  if (errors.length) {
    return res.json({
      ok: false,
      desc: Methods.emptyFieldsMsg(errors),
    });
  }

  const industry = new Industry();
  industry.name = req.body.name;

  Industry.findOne({ name: industry.name[0] }, (err, industryDB) => {
    if (err) Methods.sendErr(res, err);

    if (industryDB) {
      return res.json({
        ok: false,
        desc: "A industry with that name already exists.",
      });
    } else {
      Industry.create(industry)
        .then((industryDB) => {
          res.status(201);
          return res.json({
            ok: true,
            desc: "Industry created",
            industry: industryDB,
          });
        })
        .catch((err) => Methods.sendErr(res, err));
    }
  }).catch((err) => Methods.sendErr(res, err));
});

// TODO: verify Token by level
industryRoutes.patch("/update", [verifyToken], (req: any, res: Response) => {
  const errors: string[] = [];
  if (!req.body._id) errors.push("ID");

  if (errors.length) {
    return res.json({
      ok: false,
      desc: Methods.emptyFieldsMsg(errors),
    });
  }

  const industry = <IIndustry>{ modified: new Date() };

  if (req.body.name) industry.name = req.body.name;

  Industry.findByIdAndUpdate(
    req.body._id,
    industry,
    { new: true },
    (err, industryDB) => {
      if (err) return Methods.sendErr(res, err);

      if (!industryDB)
        return res.json({
          ok: false,
          desc: "There is no industry with that ID",
        });

      return res.json({
        ok: true,
        desc: "Industry updated",
        industry: industryDB,
      });
    }
  ).catch((err) => Methods.sendErr(res, err));
});

// Get All
industryRoutes.get("/", async (req: any, res: Response) => {
  const lang = req.get("Accept-Language");

  const industries = await Industry.find()
    .sort({ _id: -1 })
    .populate("parent")
    .exec()
    .catch((err) => Methods.sendErr(res, err));

  if (lang != "" && industries) {
    // @ts-ignore
    industries.forEach((c) => {
      // @ts-ignore
      c.name = [Methods.filterByLanguage(c.name, lang)];
    });
  }

  return res.json({ ok: true, industries });
});

// Get ById
industryRoutes.get("/:industryid", async (req: any, res: Response) => {
  const id = req.params.industryid;
  const lang = req.get("Accept-Language");
  const ObjectId = require("mongoose").Types.ObjectId;
  if (!ObjectId.isValid(id)) {
    return res.json({ ok: false, desc: "No industry found" });
  }

  const industries = await Industry.findById(id)
    .exists("deleted", false)
    .sort({ _id: -1 })
    .populate("parent")
    .exec()
    .catch((err) => Methods.sendErr(res, err));

  if (!industries) return res.json({ ok: true, desc: "No industry found" });

  if (lang != "" && industries) {
    // @ts-ignore
    industries.name = [Methods.filterByLanguage(industries.name, lang)];
  }

  return res.json({ ok: true, industries });
});

// Delete
industryRoutes.delete(
  "/:industryid",
  [verifyToken],
  async (req: any, res: Response) => {
    const id = req.params.industryid;
    await Industry.findByIdAndDelete(id).catch((err) =>
      Methods.sendErr(res, err)
    );

    // TODO: Erase industry references
    res.json({ ok: true, desc: "Industry deleted" });
  }
);

export default industryRoutes;
