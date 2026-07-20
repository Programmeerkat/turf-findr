import Link from "next/link";
import logOut from "../actions/logout";
import getSession from "../lib/getSession";
import Avatar from "./Avatar";

export default async function Header() {
  const session = await getSession();
	const avatarFallbackText = session?.name.charAt(0).toUpperCase() ?? "";

  return (
    <header 
      className="bg-rose-800"
    >
      <div 
        className="flex align-center justify-start gap-8 max-w-5xl mx-auto py-6"
      >
        <Link 
          href="/"
        >
          <h1>
            TurfFindr
          </h1>
        </Link>
        {session ? (
          <div 
            className="flex justify-end items-center gap-8 flex-1"
          >
            <form 
              action={logOut}
            >
              <button
                type="submit"
              >
                Logout
              </button>
            </form>
            <Link 
              href="/profile"
            >
              <Avatar
                name={avatarFallbackText}
              />
            </Link>
          </div>
        ) : (
          <div
            className="flex justify-end items-center gap-8 flex-1"
          >
            <Link 
              href="/signin"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
