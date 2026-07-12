"use server";

import { redirect } from "next/navigation";
import pool from "../lib/db";

export default async function createUser(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const country = formData.get("country");
  const bio = formData.get("bio");
  
  await pool.execute(
    "INSERT INTO Users (name, email, bio, country) VALUES (?, ?, ?, ?)",
    [name, email, bio, country]
  );

  redirect("/");
}