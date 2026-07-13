import Link from "next/link";
import Login from "./Login";

export default function Header() {
  return (
    <header className="bg-rose-800 p-8">
		<div className="flex align-center justify-left max-w-screen-xl mx-auto">
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
			<Login />
		</div>
    </header>
  );
};