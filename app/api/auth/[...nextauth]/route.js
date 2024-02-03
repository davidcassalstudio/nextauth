import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/utils";
import User from "@/models/user";

async function login(credentials) {
  try {
    connectToDB();
    const user = await User.findOne({ email: credentials?.email });
    if (!user) throw new Error("Email inválido");

    const isPasswordValid = await bcrypt.compare(
      credentials?.senha,
      user.senha,
    );
    if (!isPasswordValid) throw new Error("Senha inválida");

    return user;
  } catch (error) {
    console.log("erro no login", error);
    throw new Error("Erro no login");
  }
}

export const authOptions = {
  pages: {
    signIn: "/entrar",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          throw new Error("Falha no login");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
