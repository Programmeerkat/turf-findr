"use server";

import { redirect } from "next/navigation";
import pool from "../lib/db";

export default async function addRoom(formData: FormData) {
  const country = formData.get("country");
  const city = formData.get("city");
  const street = formData.get("street");
  const title = formData.get("title");
  const description = formData.get("description");
  const owner_id = 1; // TODO: read logged userid
  await pool.execute(
    "INSERT INTO Rooms (owner_id, country, city, street, title, description) VALUES (?, ?, ?, ?, ?, ?)",
    [owner_id, country, city, street, title, description]
  );

  redirect("/");
}