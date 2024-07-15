'use client';

import { useEffect, useState } from 'react';
import { createBook, fetchAllBooks, deleteBook} from "../utils/api"

export default function Admin() {
    const [newBook, setNewBook] = useState({
        title: '',
        description: '',
        author: '',
        price: '',
        bestOf: false,
    });
    const [books, setBooks] = useState([])

    
    useEffect(() => {
        getBooks()
    },[])

    async function getBooks() {
        try {
            const data = await fetchAllBooks();
            setBooks(data);
        } catch(error){
            console.log("no se pueden cargar los libros", error)
        }
    }


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewBook({ ...newBook, [name]: type === 'checkbox' ? checked : value})
    };

    async function handleSubmit() {
        await createBook(newBook);
        console.log(`Tu libro:"${newBook.title}" se ha creado con exito`) 
        setNewBook({
            title: '',
            description: '',
            author: '',
            price: '',
            bestOf: false,
        })
        await getBooks() 
    }

    async function handleDelete(id) {
            await deleteBook(id)
            await getBooks()
    }

    return(
        <article style={{display: "flex", flexDirection: "column", gap: "15px"}}>
        <h1>Hola Administrador</h1>
        <p>Aca podrás administrar los libros de la plataforma</p>
        <section>
            <h2>Crear Libro</h2>
            <form 
                //onSubmit={handleSubmit}  
                style={{display: "flex", flexDirection: "column", gap: "10px"}}
                >
                <input type="text" name="title" placeholder="Title" value={newBook.title} onChange={handleChange} required />
                <input type="text" name="author" placeholder="Author" value={newBook.author} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={newBook.description} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" value={newBook.price} onChange={handleChange} required />
                <label>
                    Más vendido
                <input type="checkbox" name="bestOf" placeholder="bestOf" value={newBook.bestOf} onChange={handleChange} required />
                </label>
                <button 
                    type="button" 
                    onClick={() => handleSubmit()}
                >
                        Añade Libro
                </button>
            </form>
        </section>
        <section>
            <h2>Borra los Libros de la siguiente lista</h2>
            <ul style={{display: "flex", marginTop: "20px", flexDirection: "column", gap: "10px"}}>
             {books.map((book)=>(
                <li 
                key={`lista-${book.title}`}
                style={{display: "flex", gap: "20px"}}
                    >
                    <p>{book.title}</p>
                    <button onClick={()=> handleDelete(book.id) }>BORRAR</button>
                 </li>
                 ))}
            </ul>
        </section>
        </article>
    )
}