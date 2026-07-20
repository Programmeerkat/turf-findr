"use server";

import { redirect } from "next/navigation";

import pool from "../lib/db";
import getSession from "../lib/getSession";

export default async function createBooking(roomId: string, formData: FormData) {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }


  const userId = session.user_id;
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  
  await pool.execute(
    "INSERT INTO Bookings (room_id, user_id, start_date, end_date) VALUES (?, ?, ?, ?)",
    [roomId, userId, startDate, endDate]
  );

  redirect("/");
};
