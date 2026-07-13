"use server";

import pool from "../lib/db";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";

interface UserRow extends RowDataPacket {
    password_hash: string;
}

export default async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const [results] = await pool.query<UserRow[]>("SELECT password_hash FROM Users WHERE email = ?", [email]);
    const user = results[0];

    if (!user) {
        console.log("No user found");
        return;
    }

    const match = await bcrypt.compare(password, user.password_hash);
    console.log("Password match:", match);
};