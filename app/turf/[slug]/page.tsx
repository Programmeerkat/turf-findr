import { RowDataPacket } from "mysql2";

import pool from "@/app/lib/db";
import ReviewCard from "@/app/components/ReviewCard";
import AddBooking from "@/app/components/AddBooking";

interface Room extends RowDataPacket {
  id: string;
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

interface Review extends RowDataPacket {
  id: string;
  booking_id: number;
  rating: number;
  text: string;
  created_at: Date;
  name: string;
}

export default async function Page({ params }: { params: Promise<{ slug: string }>}) {
  const { slug: roomId } = await params;

  const [[room]] = await pool.query<Room[]>(`SELECT * FROM Rooms WHERE id = ?`, [roomId]);
	
  const [reviews] = await pool.query<Review[]>(`
    SELECT r.*, u.name
    FROM Reviews r
    JOIN Bookings b ON b.id = r.booking_id
    JOIN Users u ON u.id = b.user_id
    WHERE b.room_id = ?
    ORDER BY created_at DESC
  `, [roomId]);

  console.log(reviews);

  return (
    <div className="w-5xl">
      <h2
        className="mb-4"
      >{room.title}</h2>
      <div className="relative inline-block mb-4">
        <img src={room.img_src} className=""/>
        {room.price && (
          <span className="absolute bottom-2 right-2 bg-rose-800 p-2 rounded-xl text-white">
            €{room.price}
          </span>
        )}
      </div>
      <p>{room.description}</p>
      <p
        className="!mb-0"
      >
        Address:</p>
      <p>{room.street} {room.city}, {room.country}</p>
      <p
        className="!mb-0"
      >
        Listed since:</p>
      <p>{room.created_at.toLocaleDateString("nl-NL")}</p>
      <h2 className="mb-4">Reviews:</h2>
      <div className="flex flex-col gap-4 w-full">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            name={review.name} 
            stars={review.rating} 
            date={review.created_at.toLocaleDateString("nl-NL")}
            text={review.text}/>
        ))}
      </div>
      <AddBooking
        roomId={room.id}
      />
    </div>
  );
}