'use client';

import { useActionState, useState, useEffect } from "react";

import login from "../actions/login";
import Button from "./Button";

export default function Login() {
  const [state, formAction, pending] = useActionState(login, null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setIsDirty(false);
  }, [state]);

  const error = isDirty ? null : state?.error;

  return (
		<form 
			className="pl-8 flex flex-col max-w-[400px] mx-auto"
			action={formAction}
		>
			<label>
          Email
      </label>
			<input
				name="email"
        className="bg-white border-black text-black p-1 mb-4"
				type="email"
        onChange={() => setIsDirty(true)}
			/>
			<label>
        Password
      </label>
			<input
				name="password"
        className="bg-white border-black text-black p-1 mb-4"
				type="password"
        onChange={() => setIsDirty(true)}
			/>
			{error && <p className="text-red-400 mb-4">{error}</p>}
			<Button
        disabled={pending}
				type="submit"
			>
				Login
			</Button>
		</form>
	);
}