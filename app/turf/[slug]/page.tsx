import { RowDataPacket } from "mysql2";

import pool from "@/app/lib/db";

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
}

export default async function Page({ params }: { params: Promise<{ slug: string }>}) {
  const { slug: roomId } = await params;

  const [[room]] = await pool.query<Room[]>(`SELECT * FROM Rooms WHERE id = ?`, [roomId]);

  console.log(room);

  return (
    <div className="w-full">
      <img src={room.img_src} className="w-full mb-4"/>
      <p className="text-xl">€{room.price} per night</p>
      <p>{room.title}</p>
      <p>{room.description}</p>
      <p>Listed since: {room.created_at.toLocaleDateString("nl-NL")}</p>

      <p>Address:</p>
      <p>{room.street} {room.city}, {room.country}</p>
    </div>
  );
}