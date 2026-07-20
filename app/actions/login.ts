"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import pool from "../lib/db";

interface UserRow extends RowDataPacket {
  password_hash: string;
};

export default async function login(initialState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const [results] = await pool.query<UserRow[]>("SELECT id, password_hash FROM Users WHERE email = ?", [email]);
  const user = results[0];

  if (!user) {
    return { error: "Invalid email or password" };
  }

  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) {
    return { error: "Invalid email or password" };
  }

  const sessionId = crypto.randomUUID();

  await pool.execute("INSERT INTO Sessions (id, user_id, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))", [sessionId, user.id]);

  const cookieStore = await cookies();
  cookieStore.set("session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
  });

  redirect('/');
};
