import { auth } from "../../auth"
import Form from "./Form"
import { headers } from "next/headers";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt"

export default async function Admin(req) {
  const session = await auth()
  //const header = await cookies()
  //console.log(header)

  

  //console.log(token)
  return (
    <article style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <h1>{`Hola ${session.user?.name}`}</h1>
      <p>Aca podrás administrar tus libros de la plataforma</p>
      {<Form />}
      
    </article>
  );
}

/*
{books?.map((book) => (
  <li
    key={`lista-${book.title}`}
    style={{ display: "flex", gap: "20px" }}
  >
    <p>{book.title}</p>
    {<button onClick={() => handleDelete(book.id)}>BORRAR</button>}
  </li>
))}
*/