import Link from "next/link";
import { redirect } from "next/navigation";

import { RowDataPacket } from "mysql2";

import CardContainer from "../components/CardContainer";
import TurfCard from "../components/TurfCard";
import getSession from "../lib/getSession";
import pool from "../lib/db";

interface Room extends RowDataPacket {
  id: number;
  owner_id: number;
  country: string;
  city: string;
  street: string;
  title: string;
  description: string;
  img_src: string;
  created_at: Date;
};

interface RoomBooking extends RowDataPacket {
  id: string;
  room_id: string;
  start_date: Date;
  end_date: Date;
  country: string;
  city: string;
  street: string;
};

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <polygon
        points="8,1 9.65,5.74 14.66,5.84 10.66,8.87 12.12,13.66 8,10.8 3.88,13.66 5.34,8.87 1.34,5.84 6.35,5.74"
        fill={filled ? "#FFD700" : "#374151"}
        stroke={filled ? "#FFA500" : "#4B5563"}
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function Profile() {
	const session = await getSession();

	if (!session) {
		redirect("/");
	}

	const name = session.name;
  
	const [rooms] = await pool.query<Room[]>(`
    SELECT * FROM Rooms WHERE owner_id = ?
  `, [session.user_id]);

  const [upcomingAndCurrentBookings] = await pool.query<RoomBooking[]>(`
    SELECT * FROM Rooms r
    JOIN Bookings b ON b.room_id = r.id
    WHERE b.user_id = ? AND b.end_date >= CURRENT_TIMESTAMP
  `, [session.user_id]);

  const [pastBookings] = await pool.query<RoomBooking[]>(`
    SELECT * FROM Rooms r
    JOIN Bookings b ON b.room_id = r.id
    WHERE b.user_id = ? AND b.end_date < CURRENT_TIMESTAMP
  `, [session.user_id]);

  const [pastBookingsWithReviews] = await pool.query<RoomBooking[]>(`
    SELECT rv.*, b.id as booking_id, b.start_date, b.end_date, r.city, r.country, r.street, r.title, r.img_src
    FROM Bookings b
    JOIN Rooms r ON b.room_id = r.id
    LEFT JOIN Reviews rv ON rv.booking_id = b.id
    WHERE b.user_id = ? AND b.end_date < CURRENT_TIMESTAMP
  `, [session.user_id]);

  console.log(pastBookingsWithReviews)

	return (
		<div className="flex flex-col gap-8">
			<h2>
				Hi {name}
			</h2>
			<h2>
				Your Turf
			</h2>
			{rooms.length > 0 && (
        <CardContainer>
          {rooms.map((room) => (
            <Link
              key={room.id} 
              href={`/turf/${room.id}`}
            >
              <TurfCard
                title={room.title}
                subtitle={`${room.city}, ${room.country}`}
                imgSrc={room.img_src}			
                price={room.price}		
              />
            </Link>
          ))}
        </CardContainer>
      )}
      {rooms.length === 0 && (
        <p>
          You dont have turf
        </p>
      )}
      <div className="flex justify-center">
        <Link 
          className="bg-rose-800 px-4 py-2 rounded-xl"
          href="/turf/new"
        >
          {rooms.length === 0 ? "Add Turf" : "Add more Turf"}
        </Link>
      </div>
      <h2>My past bookings</h2>
      {upcomingAndCurrentBookings.length === 0 && (
        <p>You don't have any current or upcoming bookings</p>
      )}
      {upcomingAndCurrentBookings.length > 0 && (
        <div>
          {upcomingAndCurrentBookings.map((booking) => (
            <div
              key={booking.id}
              className="flex gap-4 items-center"
            >
              <div>
                <img
                  className="h-20"
                  src={booking.img_src}
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <span>{booking.title}</span>
                <span>{booking.start_date.toLocaleDateString("nl-NL")} - {booking.end_date.toLocaleDateString("nl-NL")}</span>
                <span>{booking.street} {booking.city}, {booking.country}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <h2>My past bookings</h2>
      {pastBookingsWithReviews.length === 0 && (
        <p>You don't have any past bookings</p>
      )}
      {pastBookingsWithReviews.length > 0 && (
        <div className="flex flex-col gap-8">
          {pastBookingsWithReviews.map((booking) => (
            <div
              key={booking.id}
              className="flex gap-4 items-center"
            >
              <div>
                <img
                  className="h-20"
                  src={booking.img_src}
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <span>{booking.title}</span>
                <span>{booking.start_date.toLocaleDateString("nl-NL")} - {booking.end_date.toLocaleDateString("nl-NL")}</span>
                <span>{booking.street} {booking.city}, {booking.country}</span>
              </div>
              <div>
                {booking.rating && (
                  <div className="flex mb-2">
                    {Array.from({ length: 5 }, (_, i) => i < booking.rating).map((filled, i) => (
                      <StarIcon
                        key={i}
                        filled={filled}
                      />
                    ))}
                  </div>
                )}
                {!booking.rating && (
                  <button
                    className="bg-rose-800 p-2 m-auto rounded-xl"
                  >
                    Leave review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
		</div>
	);
};
