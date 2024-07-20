//import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
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
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }
}

export const GET = auth(function GET(req) {
  if (req.auth) {
    const user = prisma.user.findUnique({ where: { email: req.user } });
    return new Response(JSON.stringify(req.auth));
  }
  return new Response(JSON.stringify({ message: "Not authenticated" }), {
    status: 401,
  });
});
