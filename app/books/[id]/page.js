"use client";
import { usePathname, useSearchParams } from "next/navigation";

export async function getData(route) {
  const staticData = await fetch(route, {
    cache: "no-store",
  });
  if (!staticData.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return staticData.json();
}

export default async function BooksPage({ params }) {
  const router = usePathname();

  //const book = await getData(`${router.pathname}/api/books/${params.id}`);
  console.log(params.id);
  console.log(router);
  return (
    <main>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <p>${book.price.toFixed(2)}</p>
    </main>
  );
}
