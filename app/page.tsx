import getUsers from "./actions/getUsers";
import { UsersOverview } from "./components/UserOverview";
import CardContainer from "./components/CardContainer";
import TurfCard from "./components/TurfCard";
import pool from "./lib/db";
import { RowDataPacket } from "mysql2";

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

export default async function Home() {
  const users = await getUsers();

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
  
  return (
    <div className="">
      <main className="">
        <div className="max-w-5xl mx-auto flex flex-col gap-4 py-4">
          <h2 className="text-xl mb-4">
            Find turf
          </h2>
          <div className="bg-gray-900 flex gap-4 p-4">
            <div className="flex gap-8 items-center">
              <div>
                <p>
                  Desination
                </p>
                <input 
                  type="text" className="bg-white text-black px-2 py-1"
                  >
                </input>
              </div>
              <div>
                <p>
                  From
                </p>
                <input 
                  type="date" className="bg-white text-black px-2 py-1"
                  >
                </input>
              </div>
              <div>
                <p>
                  To
                </p>
                <input 
                  type="date" className="bg-white text-black px-2 py-1"
                  >
                </input>
              </div>
              <div>
                <button
                  className="bg-rose-800 hover:bg-rose-600 transition duration-300 px-8 py-4 rounded-xl"
                  type="submit"
                >
                  Search!
                </button>
              </div>
            </div>
          </div>
          <h2 className="text-xl mb-4">
            Popular turf
          </h2>
          <CardContainer>
            {popularTurf.map((room) => (
              <TurfCard
                key = {room.id}
                title = {room.title}
                subtitle = {`${room.city}, ${room.country}`}
                imgSrc = {room.img_src}					
              />
            ))}
          </CardContainer>
          <h2 className="text-xl mb-4">
            New turf
          </h2>
          <CardContainer>
            {newTurf.map((room) => (
              <TurfCard
                key = {room.id}
                title = {room.title}
                subtitle = {`${room.city}, ${room.country}`}
                imgSrc = {room.img_src}					
              />
            ))}
          </CardContainer>
          <h2 className="text-xl mb-4">
            Cheap turf
          </h2>
          <CardContainer>
            {cheapTurf.map((room) => (
              <TurfCard
                key = {room.id}
                title = {room.title}
                subtitle = {`${room.city}, ${room.country}`}
                imgSrc = {room.img_src}					
              />
            ))}
          </CardContainer>
          <h2 className="text-xl mb-4">
            Popular turfers
          </h2>
          <UsersOverview users={users} />
        </div>
      </main>
    </div>
  );
}
