import NextAuth from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

const authOptions = {
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {},
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/entrar",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
