import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from "../../../../auth";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    const id = params.id
    const book = await prisma.book.findUnique({where:{ id: Number(id), }});
    return NextResponse.json(book);
}

export const DELETE = auth(async function DELETE(req, {params}) {
    const id = params.id
    const book = await prisma.book.findUnique({where:{ id: Number(id), }})
    if (req.auth) {
        await prisma.book.delete({where:{ id: parseInt(id) }});
        console.log(`${book.title} is deleted`)
        return NextResponse.json({message: '`book with id${id} is delete`}, {status: 200}'})
    } else {
        return NextResponse.json({error: 'Not authenticated'})
    }
})

export async function PATCH(req, {params}) {
    const { title, description, author, price, bestOf, } = await req.json();
    const session = await auth()
    const id = params.id
    const book = await prisma.book.findUnique({where:{ id: Number(id), }})
    if(!session) {
        return NextRequest.json({ message: "Unathorized"})
    } else {
        if (session.user.id === book.userId) {
            await prisma.book.update({where:{ id: parseInt(id) },
             data: {
                title: String(title),
                description: String(description),
                author: String(author),
                bestOf: Boolean(bestOf),
                price: Number(price),
              }});
            console.log(`${book.title} is patch`)
            return NextResponse.json({succes: `book with id${id} is delete`}, {status: 200});
        } else {
            console.log(`wrong userId`)
            return NextResponse.json({error: 'wrong userId'}, {status: 200});
        }
    }
}