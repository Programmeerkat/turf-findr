"use client";

import createBooking from "../actions/createBooking";

type AddBookingProps = {
  roomId: string;
};

export default function AddBooking({ roomId }: AddBookingProps) {
  const createBookingWithRoomId = createBooking.bind(null, roomId);

  return (
    <div 
      className="bg-gray-900 flex gap-4 p-4"
    >
      <form
        className="flex items-center justify-center gap-4"
        action={createBookingWithRoomId}
      >
        <label>
          Start date
        </label>
        <input
          name="startDate"
          className="bg-white border-black mb-4 text-black"
          type="date"
        />
        <label>
          End date
        </label>
        <input
          name="endDate"
          className="bg-white border-black mb-4 text-black"
          type="date"
        />
        <button
          className="bg-rose-800 p-2 rounded-xl"
          type="submit"
        >
          Book this Turf
        </button>
      </form>
    </div>
  );
}
