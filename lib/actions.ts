"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcryptjs";
import prisma from "./db";
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

export async function login(prevState: any, formData: FormData) {
  try {
    const res = await prisma.user.findUnique({
      where: {
        email: formData.get("email") as string,
      },
    });

    if (res) {
      const password = formData.get("password") as string;

      if (await bcrypt.compare(password, res.password)) {
        return {
          success: true,
          message: "User authenticated successfully",
        };
      }
    }

    return {
      success: false,
      message: "Invalid credentials",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error occurred",
    };
  }
}
