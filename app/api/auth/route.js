//import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { auth } from "../../../auth";

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
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
  if (req.auth) return new Response(JSON.stringify(req.auth));
  return new Response(JSON.stringify({ message: "Not authenticated" }), {
    status: 401,
  });
});
