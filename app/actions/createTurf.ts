"use server";

import { redirect } from "next/navigation";

import pool from "../lib/db";
import getSession from "../lib/getSession";

export default async function createTurf(formData: FormData) {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const ownerId = session.user_id;
  const title = formData.get("title");
  const description = formData.get("description");
  const price = formData.get("price");
  const country = formData.get("country");
  const city = formData.get("city");
  const street = formData.get("street");
  const imgSrc = "https://placehold.co/320x240";
  
  await pool.execute(
    "INSERT INTO Rooms (owner_id, price, country, city, street, title, description, img_src) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [ownerId, price, country, city, street, title, description, imgSrc]
  );

  redirect("/profile");
};
