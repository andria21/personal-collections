import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { PrismaClient } from "@prisma/client";
import { connect } from "@/utils/connect";
const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connect;
        try {
          const user = await prisma.user.findFirst({
            where: { email: credentials.email },
          });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw Error("Wrong Credentials!");
            }
          } else {
            throw Error("User not found!");
          }
        } catch (error) {
          throw new Error(error);
        } finally {
          await prisma.$disconnect;
        }
      },
    }),
  ],
  pages: {
    error: "/login",
  },
  debug: true,
  
});

export { handler as GET, handler as POST };
