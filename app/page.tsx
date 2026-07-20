import Link from "next/link";

import { RowDataPacket } from "mysql2";

import Button from "./components/Button";
import CardContainer from "./components/CardContainer";
import TurfCard from "./components/TurfCard";
import UsersOverview from "./components/UserOverview";
import pool from "./lib/db";
import getCountry from "./lib/getCountry";

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

interface Turfrs extends RowDataPacket {
  id: number;
  name: string;
  booking_count: string;
};

export default async function Home() {
  const [popularTurf] = await pool.query<Room[]>(`
    SELECT r.*, COUNT(b.id) AS booking_count
    FROM Rooms r
    JOIN Bookings b ON b.room_id = r.id
    GROUP BY r.id
    ORDER BY booking_count DESC
    LIMIT 3
  `);
  const [newTurf] = await pool.query<Room[]>(`
    SELECT * FROM Rooms ORDER BY created_at DESC LIMIT 3
  `);
  const [cheapTurf] = await pool.query<Room[]>(`
    SELECT * FROM Rooms ORDER BY price DESC LIMIT 3
  `);

  const [popularTurfrs] = await pool.query<Turfrs[]>(`
    SELECT u.id, u.name, COUNT(*) as booking_count
    FROM Users u 
    JOIN Bookings b ON u.id = b.user_id
    GROUP BY u.id
    ORDER BY booking_count DESC
    LIMIT 5
  `);
  
  return (
    <div className="">
      <main className="w-5xl">
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl mb-4">
            Find turf
          </h2>
          <form action="/search" method="GET" className="bg-gray-900 flex gap-4 p-4">
            <div className="flex gap-8 items-center">
              <div>
                <p>
                  Destination
                </p>
                <input 
                  type="text" name="destination" className="bg-white text-black px-2 py-1"
                />
              </div>
              <div>
                <p>
                  From
                </p>
                <input 
                  type="date" name="starting_date" className="bg-white text-black px-2 py-1"
                />
              </div>
              <div>
                <p>
                  To
                </p>
                <input 
                  type="date" name="ending_date" className="bg-white text-black px-2 py-1"
                />
              </div>
              <div>
                <Button
                  type="submit"
                >
                  Search!
                </Button>
              </div>
            </div>
          </form>
          <h2 className="text-xl mb-4">
            Popular turf
          </h2>
          <CardContainer>
            {popularTurf.map((room) => (
              <Link 
                key={room.id} 
                href={`/turf/${room.id}`}
              >
                <TurfCard
                  title={room.title}
                  subtitle={`${room.city}, ${getCountry(room.country)}`}
                  imgSrc={room.img_src}
                  price={room.price}	
                />
              </Link>
            ))}
          </CardContainer>
          <h2 className="text-xl mb-4">
            New turf
          </h2>
          <CardContainer>
            {newTurf.map((room) => (
              <Link 
                key={room.id} 
                href={`/turf/${room.id}`}
              >
                <TurfCard
                  title={room.title}
                  subtitle={`${room.city}, ${getCountry(room.country)}`}
                  imgSrc={room.img_src}
                  price={room.price}			
                />
              </Link>
            ))}
          </CardContainer>
          <h2 className="text-xl mb-4">
            Cheap turf
          </h2>
          <CardContainer>
            {cheapTurf.map((room) => (
              <Link 
                key={room.id} 
                href={`/turf/${room.id}`}
              >
                <TurfCard
                  title={room.title}
                  subtitle={`${room.city}, ${getCountry(room.country)}`}
                  imgSrc={room.img_src}
                  price={room.price}					
                />
              </Link>
            ))}
          </CardContainer>
          <h2 className="text-xl mb-4">
            Popular turfers
          </h2>
          <UsersOverview users={popularTurfrs} />
        </div>
      </main>
    </div>
  );
}
