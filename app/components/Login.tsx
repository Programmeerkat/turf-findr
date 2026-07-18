'use client';

import login from "../actions/login";

export default function Login() {
    return (
		<form 
			className="pl-8 flex flex-col"
			action={login}
		>
			<label>Email</label>
			<input
				name="email"
				className="bg-white border-black mb-4 text-black"
				type="email"
			/>
			<label>Password</label>
			<input
				name="password"
				className="bg-white border-black mb-4 text-black"
				type="password"
			/>
			<button
				className="bg-rose-800 hover:bg-rose-600 transition duration-300 px-8 py-4 rounded-xl"
				type="submit"
			>
				Login
			</button>
		</form>
    );
}