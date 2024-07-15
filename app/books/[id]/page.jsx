import Link from "next/link"
import { fetchBook } from "../../utils/api"

export default async function BooksPage({ params }) {
  const book = await fetchBook(params.id);
  return (
    <main>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <p>${book.price.toFixed(2)}</p>
      <button><Link href={"/books"}>return</Link></button>
    </main>
  );
}
