import Link from "next/link";
import Login from "./Login";
import logOut from "../actions/logout";
import getSession from "../lib/getSession";

export default async function Header() {
  const session = await getSession();
  return (
    <header className="bg-rose-800 p-8">
		<div className="flex align-center justify-left gap-8 max-w-screen-xl mx-auto">
			<Link href="/">
				<h1>
					TurfFindr
				</h1>
			</Link>
			<Link href="/signup">
				Sign up
			</Link>
			<Link href="/addroom">
				Add room
			</Link>
			{session ? (
				<>
					<span>Welcome, {session.name}</span>
					<form action={logOut}>
						<button type="submit">Logout</button>
					</form>
				</>
			) : (
				<Login />
			)}
		</div>
    </header>
  );
};