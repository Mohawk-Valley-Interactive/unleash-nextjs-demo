"use client";

import useReservation from "@/hooks/useReservation";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

interface Props {
  slug: string;
  date: string;
  partySize: string;
}

export default function Form({ slug, date, partySize }: Props) {
  const { loading, error, createReservation } = useReservation();
  const [disabled, setDisabled] = useState(true);
  const [booked, setBooked] = useState(false);
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOccasion: "",
    bookerRequest: "",
  });
  const [day, time] = date.split("T");

  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerEmail &&
      inputs.bookerPhone
    ) {
      return setDisabled(false);
    }

    setDisabled(true);
  }, [inputs]);

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInputs({
      ...inputs,
      [e.target.name]: e.currentTarget.value,
    });
  }

  async function handleClick() {
    const booking = await createReservation({
      slug,
      partySize,
      date: day,
      time: time,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerEmail: inputs.bookerEmail,
      bookerPhone: inputs.bookerPhone,
      bookerRequest: inputs.bookerRequest,
      bookerOccasion: inputs.bookerOccasion,
      setBooked,
    });
  }

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {error ? (
        <h1>There was an error with your booking. Please try again.</h1>
      ) : booked ? (
        <div>
          <h1>Your reservation was booked!</h1>
          <p>Enjoy your meal!</p>
        </div>
      ) : (
        <>
          <input
            name="bookerFirstName"
            type="text"
            className="bg-white border rounded p-3 w-80 mb-4"
            placeholder="First name"
            onChange={handleChangeInput}
            value={inputs.bookerFirstName}
          />
          <input
            name="bookerLastName"
            type="text"
            className="bg-white border rounded p-3 w-80 mb-4"
            placeholder="Last name"
            onChange={handleChangeInput}
            value={inputs.bookerLastName}
          />
          <input
            name="bookerPhone"
            type="text"
            className="bg-white border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
            onChange={handleChangeInput}
            value={inputs.bookerPhone}
          />
          <input
            name="bookerEmail"
            type="text"
            className="bg-white border rounded p-3 w-80 mb-4"
            placeholder="Email"
            onChange={handleChangeInput}
            value={inputs.bookerEmail}
          />
          <input
            name="bookerOccasion"
            type="text"
            className="bg-white border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
            onChange={handleChangeInput}
            value={inputs.bookerOccasion}
          />
          <input
            name="bookerRequest"
            type="text"
            className="bg-white border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            onChange={handleChangeInput}
            value={inputs.bookerRequest}
          />
          <button
            disabled={disabled || loading}
            className="bg-red-600 w-full p-3 h-[64px] text-white font-bold rounded disabled:bg-gray-300"
            onClick={handleClick}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Complete Reservation"
            )}
          </button>
          <footer className="mt-4 text-sm">
            By clicking "Complete reservation" you agree to the Terms of Use and
            Privacy Policy. Standard text message rates may apply. You may opt
            out of receiving text messages at any time.
          </footer>
        </>
      )}
    </div>
  );
}
