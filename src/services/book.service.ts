import * as bookRepository from "../repositories/book.repository";

export const getAllBooks = async () => {
  try {
    const books = await bookRepository.findAll();
    console.log(books);
    return books;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getOneBook = async (id: number) => {
  try {
    const book = await bookRepository.findById(id);
    return book;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const createBook = async (book: bookRepository.BookWrite) => {
  try {
    const newBook = await bookRepository.create(book);
    return newBook;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const updateBook = async (
  book: bookRepository.BookWrite,
  id: number
) => {
  try {
    const updatedBook = await bookRepository.update(book, id);
    return updatedBook;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const removeBook = async (id: number) => {
  try {
    await bookRepository.remove(id);
    return;
  } catch (error: any) {
    console.log(error.message);
  }
};
