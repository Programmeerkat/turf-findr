"use server";

import { redirect } from "next/navigation";

import pool from "../lib/db";
import getSession from "../lib/getSession";

export default async function createReview(bookingId: string, formData: FormData) {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const rating = formData.get("rating");
  const text = formData.get("text");
  
  await pool.execute(
    "INSERT INTO Reviews (booking_id, rating, text) VALUES (?, ?, ?)",
    [bookingId, rating, text]
  );

  redirect("/profile");
};
