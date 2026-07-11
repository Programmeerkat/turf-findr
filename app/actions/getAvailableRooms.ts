"use server";

import pool from "../lib/db";
import { RowDataPacket } from "mysql2";
import { Room } from "../types";

export default async function getAvailableRooms(): Promise<Room[]> {
  const [results] = await pool.query<RowDataPacket[]>("SELECT * FROM Rooms");
  return results.map(row => ({ ...row })) as Room[];
}