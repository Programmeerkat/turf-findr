"use server";

import pool from "../lib/db";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { redirect } from "next/navigation";

interface UserRow extends RowDataPacket {
    password_hash: string;
}

export default async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const [results] = await pool.query<UserRow[]>("SELECT id, password_hash FROM Users WHERE email = ?", [email]);
    const user = results[0];

    if (!user) {
        console.log("No user found");
        return;
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
        console.log("Incorrect password");
        return;
    }

    const sessionId = crypto.randomUUID();

    await pool.execute("INSERT INTO Sessions (id, user_id, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))", [sessionId, user.id]);

    redirect('/');
};