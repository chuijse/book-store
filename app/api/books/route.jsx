import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "../../../auth";

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const isBest = searchParams.get("best") === "true";
  try {
    const books = await prisma.book.findMany({
      where: isBest ? { bestOf: true } : {},
    });
    return NextResponse.json(books);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

/*
export const GET = auth(async function GET(req) {
  const { searchParams } = new URL(req.url);
  const isBest = searchParams.get("best") === "true";
  const books = await prisma.book.findMany({
    where: isBest ? { bestOf: true } : {},
  });
  return NextResponse.json(books);
});
*/

/*export async function createBook(req) {
  const { title, description, author, price, bestOf } = await req.json();
  const newbook = await prisma.book.create({
    data: {
      title: String(title),
      description: String(description),
      author: String(author),
      bestOf: Boolean(bestOf),
      price: Number(price),
    },
  });
  return newbook;
}*/

export const POST = auth(async function POST(req) {
  const { title, description, author, price, bestOf } = await req.json();
  if (req.auth) {
    const newbook = await prisma.book.create({
      data: {
        title: String(title),
        description: String(description),
        author: String(author),
        bestOf: Boolean(bestOf),
        price: Number(price),
      },
    });
    console.log(`book ${title} created`);
    return NextResponse.json(newbook);
  } else {
    return (
      NextResponse.json({ message: "Not authenticated" }),
      {
        status: 401,
      }
    );
  }
});
