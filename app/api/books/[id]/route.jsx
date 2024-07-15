import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    const id = params.id
    const book = await prisma.book.findUnique({where:{ id: Number(id), }});
return NextResponse.json(book);
}

export async function DELETE(request, { params }) {
    const id = params.id
    const deletedBook = await prisma.book.delete({where:{ id: parseInt(id) }});
return NextResponse.json(deletedBook, {status: 200});
}
