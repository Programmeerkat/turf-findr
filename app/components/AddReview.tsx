'use client';

import { useState } from "react";
import { createPortal } from "react-dom";

import createReview from "../actions/createReview";
import Button from "./Button";

type AddReviewProps = {
  bookingId: string;
  title: string;
  subtitle: string;
};

export default function AddReview({ title, subtitle, bookingId }: AddReviewProps) {
  const [modelIsOpen, setModalIsOpen] = useState(false);

  const createReviewWithId = createReview.bind(null, bookingId);

  return (
    <>
      <Button
        onClick={() => setModalIsOpen(true)}
      >
        Leave review
      </Button>
      {modelIsOpen && createPortal(
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/50"
          onClick={() => setModalIsOpen(false)}
        >
          <div
            className="bg-gray-600 p-8 flex flex-col min-w-[400px] max-w-[600px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>
              Leave a review
            </h2>
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
              action={createReviewWithId}
            >
              <label>
                Rating
              </label>
              <input
                name="rating"
                className="bg-white border-black mb-4 text-black"
                type="number"
              />
              <label>
                Text
              </label>
              <textarea
                name="text"
                className="bg-white border-black mb-4 text-black"
              />
              <div 
                className="flex gap-4"
              >
                <Button
                  onClick={() => setModalIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                >
                  Submit review
                </Button>
              </div>
            </form>
          </div>
        </div>, document.body
      )}
    </>
  );
};
