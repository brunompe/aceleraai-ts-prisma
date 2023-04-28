import express from "express";
import * as bookController from "../controllers/book.controller";
import { body } from "express-validator";

export const bookRouter = express.Router();

bookRouter.get("/", bookController.getAll);
bookRouter.get("/:id", bookController.getOne);
bookRouter.post(
  "/",
  (body("title").isString(), body("authorId").isInt()),
  body("publishedAt").isDate().toDate(),
  body("isFiction").isBoolean(),
  bookController.createBook
);
bookRouter.put(
  "/:id",
  (body("title").isString(), body("authorId").isInt()),
  body("publishedAt").isDate().toDate(),
  body("isFiction").isBoolean(),
  bookController.updateBook
);
bookRouter.delete(
  "/:id",
  (body("title").isString(), body("authorId").isInt()),
  body("publishedAt").isDate().toDate(),
  body("isFiction").isBoolean(),
  bookController.remove
);
