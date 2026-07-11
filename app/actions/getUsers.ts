"use server";

import pool from "../lib/db";
import { RowDataPacket } from "mysql2";
import { User } from "../types";

export default async function getUsers(): Promise<User[]> {
  const [results] = await pool.query<RowDataPacket[]>("SELECT * FROM Users");
  return results.map(row => ({ ...row })) as User[];
}