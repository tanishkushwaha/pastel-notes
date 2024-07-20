"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcryptjs";
import prisma from "./db";
import { auth, signIn, signOut } from "@/lib/auth";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

export async function register(prevState: any, formData: FormData) {
  try {
    const password = formData.get("password") as string;
    const hashedPassword = await bcrypt.hash(password, 10);

    const res = await prisma.user.create({
      data: {
        email: formData.get("email") as string,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        password: hashedPassword,
      },
    });

    if (res)
      return {
        success: true,
        message: "User created successfully",
      };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "Email already exists",
      };
    }
  }
}

export async function authSignIn(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await signIn("credentials", { email, password, redirect: false });
    console.log("hello");
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      console.log("=====================================================");

      console.log(error.message);
    }
  }
}

export async function authSignOut() {
  await signOut();
}

export async function getSession() {
  const session = await auth();
  return session;
}

export async function redirectTo(path: string) {
  redirect(path);
}
