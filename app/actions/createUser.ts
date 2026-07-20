"use server";

import { redirect } from "next/navigation";

import bcrypt from "bcryptjs";

import pool from "../lib/db";

export default async function createUser(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password") as string;
  const name = formData.get("username");

  const password_hash = await bcrypt.hash(password, 12);
  
  await pool.execute(
    "INSERT INTO Users (email, password_hash, name) VALUES (?, ?, ?)",
    [email, password_hash, name]
  );

  redirect("/");
};
