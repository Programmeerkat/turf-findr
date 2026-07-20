"use server";

import { redirect } from "next/navigation";

import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";

import pool from "../lib/db";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function createUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("username") as string;

  const errors: { email?: string; password?: string; name?: string } = {};

  if (!EMAIL_REGEX.test(email)) {
    errors.email = "Enter a valid email address";
  }

  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const [existing] = await pool.query<RowDataPacket[]>(
    "SELECT id FROM Users WHERE email = ?",
    [email]
  );

  if (existing.length > 0) {
    return { errors: { email: "Email is already in use" } };
  }

  const password_hash = await bcrypt.hash(password, 12);

  await pool.execute(
    "INSERT INTO Users (email, password_hash, name) VALUES (?, ?, ?)",
    [email, password_hash, name]
  );

  redirect("/");
};
