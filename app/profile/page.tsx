import Link from "next/link";
import { redirect } from "next/navigation";

import { RowDataPacket } from "mysql2";

import AddReview from "../components/AddReview";
import CardContainer from "../components/CardContainer";
import TurfCard from "../components/TurfCard";
import getSession from "../lib/getSession";
import getCountry from "../lib/getCountry";
import pool from "../lib/db";
import LinkButton from "../components/LinkButton";
import ReviewContainer from "../components/ReviewContainer";
import BookingReview from "../components/BookingReview";

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
  booking_price: number;
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
};

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

  const [pastBookingsWithReviews] = await pool.query<RoomBooking[]>(`
    SELECT rv.*, b.id as booking_id, b.booking_price, b.start_date, b.end_date, r.id as room_id, r.city, r.country, r.street, r.title, r.img_src
    FROM Bookings b
    JOIN Rooms r ON b.room_id = r.id
    LEFT JOIN Reviews rv ON rv.booking_id = b.id
    WHERE b.user_id = ? AND b.end_date < CURRENT_TIMESTAMP
  `, [session.user_id]);

	return (
		<div>
      <h2 
        className="text-xl mb-4"
      >
				Hi {name}
			</h2>
      <h2 
        className="text-xl mb-4"
      >
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
                subtitle={`${room.street} ${room.city}, ${getCountry(room.country)}`}
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
      <div 
        className="flex justify-center mb-6"
      >
        <LinkButton 
          href="/turf/new"
        >
          {rooms.length === 0 ? "Add Turf" : "Add more Turf"}
        </LinkButton>
      </div>
      <h2 
        className="text-xl mb-4"
      >
        My upcoming bookings
      </h2>
      {upcomingAndCurrentBookings.length === 0 && (
        <p 
          className="mb-6"
        >
          You don't have any current or upcoming bookings
        </p>
      )}
      {upcomingAndCurrentBookings.length > 0 && (
        <ReviewContainer>
          {upcomingAndCurrentBookings.map((booking) => (
            <Link
              key={booking.id}
              href={`/turf/${booking.room_id}`}
            >
              <BookingReview
                title={booking.title}
                subtitle={`${booking.street} ${booking.city}, ${booking.country}`}
                img_src={booking.img_src}
                start_date={booking.start_date}
                end_date={booking.end_date}
                booking_price={booking.booking_price}
              />
            </Link>
          ))}
        </ReviewContainer>
      )}
      <h2 
        className="text-xl mb-4"
      >
        My past bookings
      </h2>
      {pastBookingsWithReviews.length === 0 && (
        <p 
          className="mb-6"
        >
          You don't have any past bookings
        </p>
      )}
      {pastBookingsWithReviews.length > 0 && (
        <ReviewContainer>
          {pastBookingsWithReviews.map((booking) => (
            <div
              key={booking.booking_id}
              className="flex gap-4 items-center"
            >
              <Link
                href={`/turf/${booking.room_id}`}
                className="flex gap-4 items-center flex-1"
              >
                <BookingReview
                  title={booking.title}
                  subtitle={`${booking.street} ${booking.city}, ${booking.country}`}
                  img_src={booking.img_src}
                  start_date={booking.start_date}
                  end_date={booking.end_date}
                  booking_price={booking.booking_price}
                />
              </Link>
              <div>
                {booking.rating && (
                  <div 
                    className="flex mb-2"
                  >
                    {Array.from({ length: 5 }, (_, i) => i < booking.rating).map((filled, i) => (
                      <StarIcon
                        key={i}
                        filled={filled}
                      />
                    ))}
                  </div>
                )}
                {!booking.rating && (
                  <AddReview 
                    bookingId={booking.booking_id}
                    title={booking.title}
                    subtitle={`${booking.street} ${booking.city}, ${booking.country}`}/>
                )}
              </div>
            </div>
          ))}
        </ReviewContainer>
      )}
		</div>
	);
};
