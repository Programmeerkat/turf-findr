"use server";

import { cookies } from "next/headers";
import pool from "../lib/db";
import { redirect } from "next/navigation";

export default async function logOut() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session");

	if (!sessionId) {
		return;
	};
    
  await pool.execute("DELETE FROM Sessions WHERE id = ?", [sessionId.value]);
  
  cookieStore.delete("session");

  console.log("User sucessfully logged out");
  
  redirect('/');
};
