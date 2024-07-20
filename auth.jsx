import { profile } from "console";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { creatUser } from "./app/utils/api"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({user}){
      // confirm user existance
      const existingUser = await prisma.user.findUnique({ where: { email: user.email}})
      if (!existingUser) {
      // Create User
      await creatUser({
        email: user.email,
        name: user.name,
      }) 
      console.log("user created")
    } else {
      console.log("user existed")
      
    }
      return true
    },
    async session({ session, token, user }) {
      // Store the role in the session
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) { 
        const existingUser = await prisma.user.findUnique({ where: { email: user.email}})
        // Store the role in the JWT token
        token.role = existingUser.role;
        token.id = existingUser.id; 
      }
      return token;
    },
  },
})


