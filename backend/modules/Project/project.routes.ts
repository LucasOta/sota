import { Request, Response, Router } from "express";
import FileSystem from "../../classes/file-system";
import Methods from "../../classes/methods";
import { verifyToken } from "../../middlewares/authentication";
import { IProject, Project } from "./project.model";

const projectRoutes = Router();
const fileSystem = new FileSystem();

// Create an Project
projectRoutes.post("/create", [verifyToken], (req: Request, res: Response) => {
  const errors: string[] = [];
  if (!req.body.order) errors.push("order");
  if (!req.body.title) errors.push("title");
  if (!req.body.description) errors.push("description");
  if (!req.body.clients) errors.push("clients");
  if (!req.body.industries) errors.push("industries");
  if (!req.body.disciplines) errors.push("disciplines");

  if (errors.length) {
    return res.json({
      ok: false,
      desc: Methods.emptyFieldsMsg(errors),
    });
  }

  Project.findOne({ name: req.body.title[0] }, (err, projectDB) => {
    if (err) res.json({ ok: false, err });

    if (projectDB) {
      return res.json({
        ok: false,
        desc: "An project with that title already exists.",
      });
    } else {
      const project = new Project();
      project.order = req.body.order;
      project.title = req.body.title;
      project.description = req.body.description;
      project.clients = req.body.clients;
      project.industries = req.body.industries;
      project.disciplines = req.body.disciplines;
      project.blocks = req.body.blocks || [];
      if (req.body.featured) project.featured = req.body.featured;
      if (req.body.playground) project.playground = req.body.playground;
      project.thumbnail = req.body.thumbnail[0] || "project_def.jpg";
      project.coverImg = req.body.coverImg[0] || "project_def.jpg";

      Project.create(project)
        .then((projectDB) => {
          // @ts-ignore
          const images = fileSystem.filesFromTempToFolder(
            req.user._id,
            "projects",
            projectDB._id.toString()
          );

          res.status(201);
          res.json({ ok: true, project: projectDB });
        })
        .catch((err) => res.json({ ok: false, err }));
    }
  });
});

// Update Project
projectRoutes.patch("/update", [verifyToken], (req: any, res: Response) => {
  const errors: string[] = [];
  if (!req.body._id) errors.push("id");

  if (errors.length) {
    return res.json({
      ok: false,
      desc: Methods.emptyFieldsMsg(errors),
    });
  }

  const project = <IProject>{ _id: req.body._id, modified: new Date() };

  if (req.body.order) project.order = req.body.order;
  if (req.body.title) project.title = req.body.title;
  if (req.body.description) project.description = req.body.description;
  if (req.body.clients) project.clients = req.body.clients;
  if (req.body.industries) project.industries = req.body.industries;
  if (req.body.disciplines) project.disciplines = req.body.disciplines;
  if (req.body.blocks) project.blocks = req.body.blocks;
  project.featured = req.body.featured;
  project.playground = req.body.playground;
  project.thumbnail = req.body.thumbnail[0] || "project_def.jpg";
  project.coverImg = req.body.coverImg[0] || "project_def.jpg";

  fileSystem.filesFromTempToFolder(
    req.user._id,
    "projects",
    req.body._id.toString()
  );
  let currentImages = [project.thumbnail, project.coverImg];
  project.blocks.forEach((block) => {
    block.items.forEach((item) => {
      if (item.img) currentImages = currentImages.concat(item.img);
    });
  });

  fileSystem.deleteImagesNotIncludedIn("projects", req.body._id, currentImages);

  Project.findByIdAndUpdate(
    project._id,
    project,
    { new: true },
    (err, projectDB) => {
      if (err) return Methods.sendErr(res, Methods.prettyMongooseErr(err));

      if (!projectDB) {
        return res.json({
          ok: false,
          desc: "There isn't a project with that ID.",
        });
      }

      return res.json({ ok: true, desc: "Project updated" });
    }
  );
});

// Get ById
projectRoutes.get("/:projectid", async (req: any, res: Response) => {
  const id = req.params.projectid;
  const lang = req.get("Accept-Language");
  const ObjectId = require("mongoose").Types.ObjectId;
  if (!ObjectId.isValid(id)) {
    return res.json({ ok: false, desc: "No project found" });
  }

  const projects = await Project.findById(id)
    .exists("deleted", false)
    .populate("clients")
    .populate("industries")
    .populate("disciplines")
    .exec()
    .catch((err) => console.log(err));

  if (!projects) return res.json({ ok: false, desc: "No project found" });

  if (lang != "" && projects) {
    // @ts-ignore
    projects.title = [Methods.filterByLanguage(projects.title, lang)];
    // @ts-ignore
    // @ts-ignore
    projects.description = [
      Methods.filterByLanguage(projects.description, lang),
    ];
    projects.industries.forEach((e) => {
      // @ts-ignore
      e.name = Methods.filterByLanguage(e.name, lang);
    });
    projects.disciplines.forEach((e) => {
      // @ts-ignore
      e.name = Methods.filterByLanguage(e.name, lang);
    });

    projects.blocks.forEach((block) => {
      block.items.forEach((item) => {
        if (item.title) {
          // @ts-ignore
          item.title = Methods.filterByLanguage(item.title, lang);
        }
        if (item.subtitle) {
          // @ts-ignore
          item.subtitle = Methods.filterByLanguage(item.subtitle, lang);
        }
        if (item.description) {
          // @ts-ignore
          item.description = Methods.filterByLanguage(item.description, lang);
        }
        if (item.testimonial) {
          // @ts-ignore
          item.testimonial.quote = Methods.filterByLanguage(
            item.testimonial.quote,
            lang
          );
          // @ts-ignore
          item.testimonial.jobTitle = Methods.filterByLanguage(
            item.testimonial.jobTitle,
            lang
          );
        }
      });
    });
  }

  return res.json({ ok: true, projects });
});

// Get All Projects
projectRoutes.get("/", async (req: any, res: Response) => {
  const lang = req.get("Accept-Language");
  const onlyFeatured = req.get("onlyFeatured") == "true";
  const noPlayground = req.get("noPlayground") == "true";

  let projects = await Project.find()
    .sort({ order: 1 })
    .exists("deleted", false)
    .populate("clients")
    .populate("industries")
    .populate("disciplines")
    .exec()
    .catch((err) => Methods.sendErr(res, err));

  if (!projects) return res.json({ ok: true, desc: "No project found" });

  if (onlyFeatured) projects = projects.filter((p) => p.featured);
  if (noPlayground) projects = projects.filter((p) => !p.playground);

  if (lang != "" && projects) {
    // @ts-ignore
    projects.forEach((p) => {
      // @ts-ignore
      p.title = [Methods.filterByLanguage(p.title, lang)];
      // @ts-ignore
      p.description = [Methods.filterByLanguage(p.description, lang)];
      p.industries.forEach((e) => {
        // @ts-ignore
        e.name = Methods.filterByLanguage(e.name, lang);
      });
      p.disciplines.forEach((e) => {
        // @ts-ignore
        e.name = Methods.filterByLanguage(e.name, lang);
      });

      // Filter Blocks content
      // project.blocks;
    });
  }

  return res.json({ ok: true, projects });
});

// Delete
projectRoutes.delete(
  "/:projectid",
  [verifyToken],
  async (req: any, res: Response) => {
    const id = req.params.projectid;
    await Project.findByIdAndDelete(id).catch((err) =>
      Methods.sendErr(res, err)
    );

    res.json({ ok: true, desc: "Project deleted" });
    // TODO: Delete Images
  }
);

export default projectRoutes;
