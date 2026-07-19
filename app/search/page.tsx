import Link from "next/link";

import { RowDataPacket } from "mysql2";

import TurfCard from "./../components/TurfCard";
import CardContainer from "./../components/CardContainer";
import pool from "./../lib/db";

interface Room extends RowDataPacket {
  id: number;
  owner_id: number;
  country: string;
  city: string;
  street: string;
  title: string;
  description: string;
  img_src: string;
  created_at: string;
}

export default async function Search({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
  const { starting_date: startingDate, ending_date: endingDate } = await searchParams;

  const [availableRooms] = await pool.query<Room[]>(`
    SELECT * FROM Rooms
    WHERE NOT EXISTS (
      SELECT 1 FROM Bookings
      WHERE Bookings.room_id = Rooms.id
      AND start_date < ?
      AND end_date > ?
    )
  `, [endingDate, startingDate]);
  
  const availableRoomsCount = availableRooms.length;

  return (
    <div>
      <h2 className="mb-4">
        Available turf ({availableRoomsCount}):
      </h2>
      <CardContainer>
        {availableRooms.map((room) => (
          <Link
            key={room.id} 
            href={`/turf/${room.id}`}
          >
            <TurfCard
              title={room.title}
              subtitle={`${room.city}, ${room.country}`}
              imgSrc={room.img_src}					
            />
          </Link>
        ))}
      </CardContainer>
    </div>
  );
}