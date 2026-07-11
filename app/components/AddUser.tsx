"use client";

import createUser from "../actions/createUser";

export default function AddUser() {
  return (
    <form
      className="bg-gray-600 p-8 flex flex-col max-w-[600px]"
      action={createUser}
    >
      <h2 className="text-xl">Sign up!</h2>
      <label>Email</label>
      <input
        name="email"
        className="bg-white border-black mb-4 text-black"
        type="email"
      />
      <label>Country</label>
      <input
        name="country"
        className="bg-white border-black mb-4 text-black"
        type="text"
      />
      <button
        className="bg-black"
        type="submit"
      >
        Sign up
      </button>
    </form>
  );
}
