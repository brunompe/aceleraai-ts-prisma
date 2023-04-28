import { prisma } from "../src/db";

type Author = {
  firstName: string;
  lastName: string;
};

type Book = {
  title: string;
  isFiction: boolean;
  publishedAt: Date;
};

async function seed() {
  await Promise.all(
    getAuthors().map((author) => {
      return prisma.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
      });
    })
  );
  const author = await prisma.author.findFirst({
    where: {
      firstName: "Sasuke",
    },
  });

  if (!author) {
    throw new Error("Could not find author");
  }

  await Promise.all(
    getBooks().map((book) => {
      const { title, isFiction, publishedAt } = book;
      return prisma.book.create({
        data: {
          title,
          publishedAt,
          isFiction,
          authorId: author.id,
        },
      });
    })
  );
}

seed();

function getAuthors(): Array<Author> {
  return [
    {
      firstName: "João",
      lastName: "das Neves",
    },
    {
      firstName: "Naruto",
      lastName: "Uzumaki",
    },
    {
      firstName: "Sasuke",
      lastName: "Uchiha",
    },
  ];
}

function getBooks(): Array<Book> {
  return [
    {
      title: "Harry Potter",
      isFiction: false,
      publishedAt: new Date(),
    },
    {
      title: "Lord of the Rings",
      isFiction: true,
      publishedAt: new Date(),
    },
    {
      title: "vai corinthians",
      isFiction: false,
      publishedAt: new Date(),
    },
  ];
}