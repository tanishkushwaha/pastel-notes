"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcryptjs";
import prisma from "./db";
import { auth, signIn, signOut } from "@/lib/auth";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

// Register
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

    await signIn("credentials", { email, password, redirectTo: "/signup" });
    console.log("hello");
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      console.log("=====================================================");

      console.log(error.message);
    }
  }
}

// Sign out
export async function authSignOut() {
  await signOut();
}

// Get session
export async function getSession() {
  const session = await auth();
  return session;
}

// Redirect
export async function redirectTo(path: string) {
  redirect(path);
}

// Get Notes
export async function getUserNotes(userId: string) {
  const notes = await prisma.note.findMany({
    where: {
      authorId: userId,
    },
  });

  console.log("notes:", notes);

  return notes;
}

// Create Note
export async function createNote(
  userId: string,
  title: string,
  content: string
) {
  try {
    const note = await prisma.note.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    return note;
  } catch (error) {
    console.log(error);
  }
}

// Update Note
export async function updateNote(
  noteId: string,
  title: string,
  content: string
) {
  try {
    await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        title,
        content,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

// Delete Note
export async function deleteNote(noteId: string) {
  try {
    await prisma.note.delete({
      where: {
        id: noteId,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
