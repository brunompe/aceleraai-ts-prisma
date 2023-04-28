import { prisma } from "../db";
import { Author } from "./author.repository";

type BookRead = {
  id: number;
  title: string;
  publishedAt: Date;
  isFiction: boolean;
  author: Author;
};

export type BookWrite = {
  title: string;
  publishedAt: Date;
  authorId: number;
  isFiction: boolean;
};

export const findAll = async (): Promise<BookRead[]> => {
  return prisma.book.findMany({
    select: {
      id: true,
      title: true,
      publishedAt: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

export const findById = async (id: number): Promise<BookRead | null> => {
  return prisma.book.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      publishedAt: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

export const create = async (book: BookWrite): Promise<BookRead> => {
  const { title, authorId, publishedAt, isFiction } = book;
  const parsedDate: Date = new Date(publishedAt);
  return prisma.book.create({
    data: {
      title,
      authorId,
      isFiction,
      publishedAt: parsedDate,
    },
    select: {
      id: true,
      title: true,
      publishedAt: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

export const update = async (
  book: BookWrite,
  id: number
): Promise<BookRead> => {
  const { title, authorId, publishedAt, isFiction } = book;
  return prisma.book.update({
    where: {
      id,
    },
    data: {
      title,
      authorId,
      isFiction,
      publishedAt,
    },
    select: {
      id: true,
      title: true,
      publishedAt: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

export const remove = async (id: number): Promise<void> => {
  await prisma.book.delete({
    where: {
      id,
    },
  });
};
