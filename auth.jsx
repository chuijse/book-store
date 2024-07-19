import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub( {
    profile(profile){
      return { email: profile.email, image: profile.avatar_url, role: profile.role ?? "user"}
    }
  })
],
callbacks: {
  session({ session, user }) {
    session.user.role = "user"
    return session
  }
}
})


