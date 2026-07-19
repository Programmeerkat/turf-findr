import { redirect } from "next/navigation";
import TurfCard from "../components/TurfCard";
import getSession from "../lib/getSession";
import pool from "../lib/db";
import { Room } from "../types";
import CardContainer from "../components/CardContainer";
import ReviewCard from "../components/ReviewCard";
import Link from "next/link";

export default async function Profile() {
	const session = await getSession();

	if (!session) {
		redirect("/");
	}

	const name = session.name;
	const [rooms] = await pool.query("SELECT * FROM Rooms WHERE owner_id = ?", [session.user_id]) as unknown as Room[][];
	// const [reviews] = await pool.query("SELECT * FROM Reviews WHERE user_id = ?", [session.user_id]);

	console.log(rooms);

	return (
		<div className="flex flex-col gap-8">
			<h2>
				Hi {name}
			</h2>
			<h2>
				Your Turf
			</h2>
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
            />
          </Link>
				))}
			</CardContainer>
			<h2>
				Your reviews
			</h2>
      <div className="flex flex-col gap-4 w-full">
        <ReviewCard name="Roswitha" stars={1} date="3 months ago" text="Perfect Turfr. Can recommend."/>
        <ReviewCard name="Roswitha" stars={2} date="3 months ago" text="Perfect Turfr. Can recommend."/>
        <ReviewCard name="Roswitha" stars={3} date="3 months ago" text="Perfect Turfr. Can recommend."/>
        <ReviewCard name="Roswitha" stars={4} date="3 months ago" text="Perfect Turfr. Can recommend."/>
        <ReviewCard name="Roswitha" stars={5} date="3 months ago" text="Perfect Turfr. Can recommend."/>
		  </div>
		</div>
	);
};
