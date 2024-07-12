//import { PrismaClient } from '@prisma/client';
//const prisma = new PrismaClient();
import Link from "next/link"

export async function getData() {
  const staticData = await fetch('http://localhost:3000/api/books', {cache: 'no-store'})
  if (!staticData.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return staticData.json()
}


export default async function BooksPage() { 
  const books = await getData()
    
  return (
    <main>
      <h1>Books</h1>
      <ul>
        {books?.map((book) => (
          <li key={book.id}>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <p>${book.price.toFixed(2)}</p>
            <Link href={`/books/${book.id}`}>
              <button>{`Ver más sobre ${book.title}`}</button>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

