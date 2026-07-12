"use client";

import createUser from "../actions/createUser";

export default function AddUser() {
  return (
    <>
      <h2 className="text-xl mb-8">Join TurfFindr</h2>
      <form
        className="bg-gray-600 p-8 flex flex-col max-w-[600px]"
        action={createUser}
        >
        <label>Name</label>
        <input
          name="name"
          className="bg-white border-black mb-4 text-black"
          type="text"
          />
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
        <label>Bio</label>
        <input
          name="bio"
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
    </>
  );
}
