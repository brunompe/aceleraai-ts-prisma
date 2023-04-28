import { Request, Response } from "express";
import * as bookService from "../services/book.service";
import { validationResult } from "express-validator";

export const getAll = async (request: Request, response: Response) => {
  try {
    const books = await bookService.getAllBooks();
    return response.status(200).json(books);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

export const getOne = async (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  try {
    const book = await bookService.getOneBook(id);
    if (book) {
      return response.status(200).json(book);
    }
    response.status(404).json("book could not be found!");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

export const createBook = async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  try {
    const book = request.body;
    const newBook = await bookService.createBook(book);
    return response.status(201).json(newBook);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

export const updateBook = async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  const id: number = parseInt(request.params.id);
  try {
    const book = request.body;
    const updatedBook = await bookService.updateBook(book, id);
    return response.status(201).json(updatedBook);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

export const remove = async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id);
  try {
    await bookService.removeBook(id);
    return response.status(204).json("book deleted");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};
