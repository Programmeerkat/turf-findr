"use client";

import addRoom from "../actions/addRoom";

export default function AddRoom() {
  return (
    <form
      className="bg-gray-600 p-8 flex flex-col max-w-[600px]"
      action={addRoom}
    >
      <h2 className="text-xl">Add your room</h2>
      <label>Street</label>
      <input
        name="street"
        className="bg-white border-black mb-4 text-black"
        type="text"
      />
      <label>City</label>
      <input
        name="city"
        className="bg-white border-black mb-4 text-black"
        type="text"
      />
      <label>Country</label>
      <input
        name="country"
        className="bg-white border-black mb-4 text-black"
        type="text"
      />
      <label>Title</label>
      <input
        name="title"
        className="bg-white border-black mb-4 text-black"
        type="text"
      />
      <label>Description</label>
      <input
        name="description"
        className="bg-white border-black mb-4 text-black"
        type="text"
      />
      <button
        className="bg-black"
        type="submit"
      >
        Add room
      </button>
    </form>
  );
}
