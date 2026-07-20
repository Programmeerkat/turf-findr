'use client';

import login from "../actions/login";
import Button from "./Button";

export default function Login() {
    return (
		<form 
			className="pl-8 flex flex-col"
			action={login}
		>
			<label>
          Email
      </label>
			<input
				name="email"
				className="bg-white border-black mb-4 text-black"
				type="email"
			/>
			<label>
        Password
      </label>
			<input
				name="password"
				className="bg-white border-black mb-4 text-black"
				type="password"
			/>
			<Button
				type="submit"
			>
				Login
			</Button>
		</form>
    );
}