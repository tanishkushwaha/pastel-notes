import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./db";
import { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      let user = await getUserFromDb(credentials.email as string);

      if (user) {
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) user = null;
      }

      if (!user) {
        console.log("Invalid credentials");
        // throw new Error("User not found");
      }

      return user;
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
