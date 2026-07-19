import { redirect } from "next/navigation";
import TurfCard from "../components/TurfCard";
import getSession from "../lib/getSession";
import pool from "../lib/db";
import { Room } from "../types";
import TurfCardContainer from "../components/TurfCardContainer";

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
			<TurfCardContainer>
				{rooms.map((room) => (
					<TurfCard
						key = {room.title}
						title = {room.title}
						subtitle = {`${room.city}, ${room.country}`}
						imgSrc = {room.imgSrc}					
					/>
				))}
			</TurfCardContainer>
			<h2>
				Your reviews
			</h2>
		</div>
	);
};
