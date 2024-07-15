import Link from "next/link";
import { fetchAllBestOFBooks } from "./utils/api";

export default async function BooksPage() {
  const books = await fetchAllBestOFBooks();

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <h1>Bienvenidos a mi tienda de libors online</h1>
      <p>
        Aquí encontrarás una cuidada selección de títulos que abarcan desde los
        clásicos atemporales hasta las últimas novedades. Nuestro objetivo es
        fomentar la lectura y el amor por los libros, ofreciendo un ambiente
        acogedor y un servicio personalizado. Ya seas un lector ávido o estés
        buscando un regalo especial, nuestra variedad de géneros y autores te
        inspirará a descubrir nuevas aventuras literarias. ¡Explora, elige y
        déjate llevar por el mágico mundo de las palabras!
      </p>
      <ul
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "50px",
        }}
      >
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
    </section>
  );
}
