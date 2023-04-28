import { prisma } from "../db";

type Author = {
  firstName: string;
  lastName: string;
};

export const findAll = async (): Promise<Author[]> => {
  return prisma.author.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

export const findById = async (id: number): Promise<Author | null> => {
  return prisma.author.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

export const create = async (author: Omit<Author, "id">): Promise<Author> => {
  const { firstName, lastName } = author;
  return prisma.author.create({
    data: {
      firstName,
      lastName,
    },
  });
};

export const update = async (
  author: Omit<Author, "id">,
  id: number
): Promise<Author> => {
  const { firstName, lastName } = author;
  return prisma.author.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
    },
  });
};

export const remove = async (id: number): Promise<void> => {
  await prisma.author.delete({
    where: {
      id,
    },
  });
};
