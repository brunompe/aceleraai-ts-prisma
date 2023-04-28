import { Request, Response } from "express";

import * as authorService from "../services/author.service";
import { validationResult } from "express-validator";

export const getAll = async (request: Request, response: Response) => {
  try {
    const authors = await authorService.getAllAuthors();
    return response.status(200).json(authors);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

export const getOne = async (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  try {
    const author = await authorService.getOneAuthor(id);
    if (author) {
      return response.status(200).json(author);
    }
    response.status(404).json("author could not be found!");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

export const createAuthor = async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  try {
    const author = request.body;
    const newAuthor = await authorService.createAuthor(author);
    return response.status(201).json(newAuthor);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

export const updateAuthor = async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  const id: number = parseInt(request.params.id);
  try {
    const author = request.body;
    const updatedAuthor = await authorService.updateAuthor(author, id);
    return response.status(201).json(updatedAuthor);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

export const remove = async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id);
  try {
    await authorService.removeAuthor(id);
    return response.status(204).json("author deleted");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};
