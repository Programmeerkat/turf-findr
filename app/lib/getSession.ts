import { cookies } from "next/headers"
import pool from "./db";
import { RowDataPacket } from "mysql2";

interface SessionRow extends RowDataPacket {
    user_id: number;
    name: string;
    email: string;
};

export default async function getSession() {
	const cookieStore = await cookies();
	const sessionId = cookieStore.get("session")?.value;

	if (!sessionId) {
		return null
	};

	const [sessions] = await pool.query<SessionRow[]>(
		`SELECT s.user_id, u.name, u.email
		 FROM Sessions s
		 JOIN Users u ON s.user_id = u.id
		 WHERE s.id = ? AND s.expires_at > NOW()`,
		[sessionId]
	);

	return sessions[0] ?? null;
};
