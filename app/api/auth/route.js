//import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "../../../auth";

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, name } = await req.json();

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }
}

export async function GET(req) {
  const session = await auth();
  console.log(session, req);
  if (session.user) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    return NextResponse.json(user);
  }
  return new Response(JSON.stringify({ message: "Not authenticated" }), {
    status: 401,
  });
}

/*
export const GET = auth(function GET(req) {
  console.log(req);
  return NextResponse.json(req);
});
*/
