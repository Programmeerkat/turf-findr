'use client';

import { useState } from "react";
import { createPortal } from "react-dom";

import addReview from "../actions/addReview";

type LeaveReviewProps = {
  bookingId: string;
  title: string;
  subtitle: string;
}

export default function LeaveReview({ title, subtitle, bookingId }: LeaveReviewProps) {
  const [modelIsOpen, setModalIsOpen] = useState(false);

  const addReviewWithId = addReview.bind(null, bookingId)

  console.log(bookingId)

  return (
    <>
      <button
        className="bg-rose-800 p-2 m-auto rounded-xl"
        onClick={() => setModalIsOpen(true)}
        >
        Leave review
      </button>
      {modelIsOpen && createPortal(
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/50"
          onClick={() => setModalIsOpen(false)}
        >
          <div
            className="bg-gray-600 p-8 flex flex-col min-w-[400px] max-w-[600px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Leave a review</h2>
            <p
              className="!mb-0"
            >
              {title}
              </p>
            <span
              className="mb-2"
            >
              {subtitle}
            </span>
            <form
              className="flex flex-col"
              action={addReviewWithId}
              >
              <label>Rating</label>
              <input
                name="rating"
                className="bg-white border-black mb-4 text-black"
                type="number"
                />
              <label>Text</label>
              <textarea
                name="text"
                className="bg-white border-black mb-4 text-black"
                />
              <div className="flex gap-4">
                <button
                  className="bg-rose-800 p-2 rounded-xl"
                  onClick={() => setModalIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-rose-800 p-2 rounded-xl"
                  type="submit"
                >
                  Submit review
                </button>
              </div>
            </form>
          </div>
        </div>, document.body
      )}
    </>
  );
};
