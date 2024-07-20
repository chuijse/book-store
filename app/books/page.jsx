import Link from "next/link"
import { fetchAllBooks } from "../utils/api"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function BooksPage() { 
  const books = await fetchAllBooks()
      
  return (
    <section style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "30px",
    }}>
      <h1>Books</h1>
      <p>
        Aquí encontrarás todos nuestros libros
      </p>
      <ul style={{
          marginTop: "10px",
          flexDirection: "column",
          display: "flex",
          gap: "30px",
        }}>
        {books?.map((book) => (
          <li key={book.id}>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <p>${book.price}</p>
            <Link href={`/books/${book.id}`}>
              <button>{`Ver más sobre ${book.title}`}</button>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

