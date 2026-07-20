import Link from "next/link";
import { redirect } from "next/navigation";

import CardContainer from "../components/CardContainer";
import TurfCard from "../components/TurfCard";
import getSession from "../lib/getSession";
import pool from "../lib/db";
import { Room } from "../types";

export default async function Profile() {
	const session = await getSession();

	if (!session) {
		redirect("/");
	}

	const name = session.name;
	const [rooms] = await pool.query("SELECT * FROM Rooms WHERE owner_id = ?", [session.user_id]) as unknown as Room[][];

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
		</div>
	);
};
