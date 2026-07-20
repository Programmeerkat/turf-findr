"use server";

import { redirect } from "next/navigation";

import { RowDataPacket } from "mysql2";

import pool from "../lib/db";
import getSession from "../lib/getSession";

interface Room extends RowDataPacket {
  id: number;
  owner_id: number;
  price: number;
  country: string;
  city: string;
  street: string;
  title: string;
  description: string;
  img_src: string;
  created_at: Date;
};

export default async function createBooking(roomId: string, formData: FormData) {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const userId = session.user_id;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  const [[room]] = await pool.query<Room[]>(`
    SELECT price FROM Rooms WHERE id = ?
  `, [roomId]
  );

  const nights = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24);

  const totalPrice = room.price * nights;
  
  await pool.execute(
    "INSERT INTO Bookings (booking_price, room_id, user_id, start_date, end_date) VALUES (?, ?, ?, ?, ?)",
    [totalPrice, roomId, userId, startDate, endDate]
  );

  redirect("/");
};
