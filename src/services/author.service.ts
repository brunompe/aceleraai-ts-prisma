import { Author } from "@prisma/client";
import * as authorRepository from "../repositories/author.repository";

export const getAllAuthors = async () => {
  try {
    const authors = await authorRepository.findAll();
    return authors;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getOneAuthor = async (id: number) => {
  try {
    const author = await authorRepository.findById(id);
    return author;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const createAuthor = async (author: Author) => {
  try {
    const newAuthor = await authorRepository.create(author);
    return newAuthor;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const updateAuthor = async (author: Author, id: number) => {
  try {
    const updatedAuthor = await authorRepository.update(author, id);
    return updatedAuthor;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const removeAuthor = async (id: number) => {
  try {
    await authorRepository.remove(id);
    return;
  } catch (error: any) {
    console.log(error.message);
  }
};
