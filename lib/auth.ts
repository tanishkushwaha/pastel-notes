import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import { Provider } from "next-auth/providers";
import { comparePassword } from "@/lib/helpers";

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      let user = await getUserFromDb(credentials.email as string);

      if (user) {
        const isPasswordValid = await comparePassword(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
        };
      }

      return null;
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    session({ session, token }) {
      session.user.id = token.id as string;

      return session;
    },
  },
  logger: {
    error(error) {
      // Silence invalid credentials errors
      if (error.name === "CredentialsSignin") return;

      console.error("[auth][error]", error);
    },
  },
});

async function getUserFromDb(email: string) {
  let user = null;

  user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
