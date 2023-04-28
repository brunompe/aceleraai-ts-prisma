import express from "express";
import * as authorController from "../controllers/author.controller";
import { body } from "express-validator";

export const authorRouter = express.Router();

authorRouter.get("/", authorController.getAll);
authorRouter.get("/:id", authorController.getOne);
authorRouter.post(
  "/",
  (body("firstName").isString(), body("lastName").isString()),
  authorController.createAuthor
);
authorRouter.put(
  "/:id",
  (body("firstName").isString(), body("lastName").isString()),
  authorController.updateAuthor
);
authorRouter.delete("/:id", authorController.remove);
