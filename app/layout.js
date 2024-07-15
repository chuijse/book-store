import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <ul
            style={{
              display: "flex",
              width: "100%",
              //border: "1px solid red",
              justifyContent: "space-around",
            }}
          >
            <li>
              <button>
                <Link href={"/"}>home</Link>
              </button>
            </li>
            <li>
              <button>
                <Link href={"/books"}>All books</Link>
              </button>
            </li>
            <li>
              <button>
                <Link href={"/admin"}>admin</Link>
              </button>
            </li>
          </ul>
        </nav>
        <main
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            //border: "1px solid red",
            //height: "100vh",
            margin: "10%",
          }}
          className={inter.className}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
