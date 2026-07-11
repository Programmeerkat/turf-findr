"use server";

import { redirect } from "next/navigation";
import pool from "../lib/db";

export default async function createUser(formData: FormData) {
  const email = formData.get("email");
  const country = formData.get("country");
  const bio = "";
  await pool.execute(
    "INSERT INTO Users (email, bio, country) VALUES (?, ?, ?)",
    [email, bio, country]
  );

  redirect("/");
}