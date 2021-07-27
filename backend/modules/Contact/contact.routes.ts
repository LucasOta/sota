import { Request, Response, Router } from "express";
import Methods from "../../classes/methods";
import { verifyToken } from "../../middlewares/authentication";
import { Contact } from "./contact.model";

const contactRoutes = Router();
// Create
contactRoutes.post("/create", (req: Request, res: Response) => {
  const contact = new Contact();
  contact.name = req.body.name;
  contact.email = req.body.email;
  contact.message = req.body.message;
  contact.company = req.body.company;
  contact.phone = req.body.phone;
  contact.country = req.body.country;
  contact.newsletter = req.body.newsletter;

  Contact.create(contact)
    .then((contactDB) => {
      res.status(203);
      return res.json({
        ok: true,
        desc: "Contact created",
        contact: contactDB,
      });
    })
    .catch((err) => Methods.sendErr(res, err));
});

// Get All
contactRoutes.get("/", [verifyToken], async (req: any, res: Response) => {
  const contacts = await Contact.find()
    .sort({ _id: -1 })
    .populate("parent")
    .exec()
    .catch((err) => Methods.sendErr(res, err));

  return res.json({ ok: true, contacts });
});

// Get ById
contactRoutes.get(
  "/:contactid",
  [verifyToken],
  async (req: any, res: Response) => {
    const id = req.params.contactid;
    const ObjectId = require("mongoose").Types.ObjectId;
    if (!ObjectId.isValid(id)) {
      return res.json({ ok: false, desc: "No contact found" });
    }

    const contact = await Contact.findById(id)
      .exists("deleted", false)
      .sort({ _id: -1 })
      .populate("parent")
      .exec()
      .catch((err) => Methods.sendErr(res, err));

    if (!contact) return res.json({ ok: true, desc: "No contact found" });

    contact.read = true;

    Contact.findByIdAndUpdate(id, contact, { new: true }, (err) => {
      if (err) return Methods.sendErr(res, err);
    }).catch((err) => Methods.sendErr(res, err));

    return res.json({ ok: true, contact });
  }
);

// Delete
contactRoutes.delete(
  "/:contactid",
  [verifyToken],
  async (req: any, res: Response) => {
    const id = req.params.contactid;
    await Contact.findByIdAndDelete(id).catch((err) =>
      Methods.sendErr(res, err)
    );

    res.json({ ok: true, desc: "Contact deleted" });
  }
);

export default contactRoutes;
