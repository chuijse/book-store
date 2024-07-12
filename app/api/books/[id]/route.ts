import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params } : { params : { id: string }}
    ) {
    const  id  = params.id
    //console.log(id)
    const book = await prisma.book.findUnique({where:{ id: Number(id), }});
return NextResponse.json(book);
}
