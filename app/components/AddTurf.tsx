"use client";

import createTurf from "../actions/createTurf";
import { countries } from "../constants/countries";

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
        className="bg-white border-black mb-4 text-black p-1"
        type="text"
      />
      <label>
        Description
      </label>
      <textarea
        name="description"
        className="bg-white border-black mb-4 text-black p-1"
      />
      <label>
        Price
      </label>
      <input
        name="price"
        className="bg-white border-black mb-4 text-black p-1"
        type="number"
      />
      <label>
        Street
      </label>
      <input
        name="street"
        className="bg-white border-black mb-4 text-black p-1"
        type="text"
      />
      <label>
        City
      </label>
      <input
        name="city"
        className="bg-white border-black mb-4 text-black p-1"
        type="text"
      />
      <label>
        Country
      </label>
      <select
        name="country"
        className="bg-white border-black mb-4 text-black p-1"
      >
        {countries.map((country) => (
          <option
            key={country.value}
            value={country.value}
          >
            {country.label}
          </option>
        ))}
      </select>
      <button
        className="bg-black p-4 rounded-xl"
        type="submit"
      >
        Add Turf
      </button>
    </form>
  );
}
