import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from '../../../../auth';
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

const prisma = new PrismaClient();


export const GET = auth(async function GET(req) {
    console.log(req.auth, "api")
    if (req.auth) {
        try {
            const userBooks = await prisma.book.findMany({
                where: req.auth.user.role === "USER" ? { userId: req.auth.user.id } : {}  ,
              });
              return NextResponse.json(userBooks)
        } catch (error){
            console.log(error)
            return NextResponse.json(
                { error: "Failed to fetch books" },
                { status: 500 }
            )
        }
    } else {
        return NextResponse.json(
            { error: "no user" },
            { status: 500 }
        )
    }
})



