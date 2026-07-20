import Link from "next/link";

import logOut from "../actions/logout";
import Avatar from "./Avatar";
import Button from "./Button";
import LinkButton from "./LinkButton";
import getSession from "../lib/getSession";

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
              <Button
                type="submit"
                variant="secondary"
              >
                Logout
              </Button>
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
            className="flex justify-end items-center gap-4 flex-1"
          >
            <LinkButton
              href="/signin"
              variant="secondary"
            >
              Sign in
            </LinkButton>
            <LinkButton
              href="/signup"
              variant="secondary"
            >
              Sign up
            </LinkButton>
          </div>
        )}
      </div>
    </header>
  );
};
