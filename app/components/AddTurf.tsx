"use client";

import createTurf from "../actions/createTurf";

export default function AddTurf() {
  return (
    <form
      className="bg-gray-600 p-8 flex flex-col max-w-[600px]"
      action={createTurf}
    >
      <label>
        Title
      </label>
      <input
        name="title"
        className="bg-white border-black mb-4 text-black"
        type="text"
      />
      <label>
        Description
      </label>
      <textarea
        name="description"
        className="bg-white border-black mb-4 text-black"
      />
      <label>
        Price
      </label>
      <input
        name="price"
        className="bg-white border-black mb-4 text-black"
        type="number"
      />
      <label>
        Country
      </label>
      <input
        name="country"
        className="bg-white border-black mb-4 text-black"
        type="text"
      />
      <label>
        City
      </label>
      <input
        name="city"
        className="bg-white border-black mb-4 text-black"
        type="text"
      />
      <label>
        Street
      </label>
      <input
        name="street"
        className="bg-white border-black mb-4 text-black"
        type="text"
      />
      <button
        className="bg-black p-4 rounded-xl"
        type="submit"
      >
        Add Turf
      </button>
    </form>
  );
}
