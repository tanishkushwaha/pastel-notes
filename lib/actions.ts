"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "./db";
import { auth, signIn, signOut } from "@/lib/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { hashPassword } from "./helpers";

// Register
export async function register(prevState: any, formData: FormData) {
  try {
    const password = formData.get("password") as string;
    const hashedPassword = await hashPassword(password);

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

// Sign in
export async function authSignIn(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await signIn("credentials", { email, password, redirectTo: "/notes" });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    } else {
      return { error: true };
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

// Get Notes
export async function getNotes(userId: string) {
  const notes = await prisma.note.findMany({
    where: {
      authorId: userId,
      archived: false,
      trashed: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return notes;
}

// Create Note
export async function createNote(
  userId: string,
  title: string,
  content: string,
  color: string
) {
  try {
    if (!userId || !title || !content || !color) {
      console.log("Missing data");
      return;
    }
    const note = await prisma.note.create({
      data: {
        title,
        content,
        color,
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
  content: string,
  color: string
) {
  try {
    await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        title,
        content,
        color,
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

    return { success: true, message: "Note deleted" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error occured" };
  }
}

// Archive Note
export async function archiveNote(noteId: string) {
  try {
    await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        archived: true,
      },
    });

    return { success: true, message: "Note moved to archive" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error occured" };
  }
}

// Unarchive Note
export async function unarchiveNote(noteId: string) {
  try {
    await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        archived: false,
      },
    });

    return { success: true, message: "Note unarchived" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error occured" };
  }
}

// Get Archived Notes
export async function getArchivedNotes(userId: string) {
  const notes = await prisma.note.findMany({
    where: {
      authorId: userId,
      archived: true,
      trashed: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return notes;
}

// Trash Note
export async function trashNote(noteId: string) {
  try {
    await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        trashed: true,
      },
    });

    return { success: true, message: "Note moved to Trash" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error occured" };
  }
}

// Restore Note
export async function restoreNote(noteId: string) {
  try {
    await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        trashed: false,
        archived: false,
      },
    });

    return { success: true, message: "Note restored" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error occured" };
  }
}

// Get Trashed Notes
export async function getTrashedNotes(userId: string) {
  const notes = await prisma.note.findMany({
    where: {
      authorId: userId,
      trashed: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return notes;
}
