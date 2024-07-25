"use client"

import { useState, useEffect } from "react";
import { createBook, fetchAllBooks, fetchAllUserBooks, deleteBook } from "../utils/api";

export default function Form({session}){
    const [books, setBooks] = useState()
    const [newBook, setNewBook] = useState({
        title: "",
        description: "",
        author: "",
        price: "",
        bestOf: false,
      });

      useEffect(()=> {
          getBooks()
      }, [])

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewBook({ ...newBook, [name]: type === "checkbox" ? checked : value });
      };

      async function handleSubmit() {
        await createBook(newBook);
        console.log(`Tu libro:"${newBook.title}" se ha creado con exito`);
        setNewBook({
          title: "",
          description: "",
          author: "",
          price: "",
          bestOf: false,
        });
        await getBooks();
      }

      async function handleDelete(id) {
        await deleteBook(id);
      }

      async function getBooks(){
        const data = await fetchAllUserBooks()
        setBooks(data)
      }
      

      return (
        <section>
        <h2>Libros:</h2>
        <ul
          style={{
            display: "flex",
            marginTop: "20px",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {books?.map((book) => (
            <li
                key={`lista-${book.title}`}
                style={{ display: "flex", gap: "20px" }}
            >
                <p>{book.title}</p>
                {<button onClick={() => handleDelete(book.id)}>BORRAR</button>}
            </li>
          ))}
        </ul>
        <h2>Crear Libro</h2>
        <form
        //onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newBook.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={newBook.author}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newBook.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newBook.price}
          onChange={handleChange}
          required
        />
        <label>
          Más vendido
          <input
            type="checkbox"
            name="bestOf"
            placeholder="bestOf"
            value={newBook.bestOf}
            onChange={handleChange}
            required
          />
        </label>
        <button type="button" onClick={() => handleSubmit()}>
          Añade Libro
        </button>
      </form>
      </section>
      )
}

