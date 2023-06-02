"use client";

import { useState } from "react";
import { partySize as partySizeData, times } from "@/data/index";
import DatePicker from "react-datepicker";
import useAvailabilities from "@/hooks/useAvailabilities";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { Time, convertToDisplayTime } from "@/utils/convertToDisplayTime";
import { useFlag } from "@unleash/nextjs/client";

interface Props {
  slug: string;
  openTime: string;
  closeTime: string;
}

export default function ReservationCard({ slug, openTime, closeTime }: Props) {
  const isReservationEnabled = useFlag("feature-reservation");
  const { loading, error, data, fetchAvailabilities } = useAvailabilities();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState("2");

  function handleChangeDate(date: Date | null) {
    if (date) {
      const d = date?.toISOString().split("T")[0];
      setDate(d);
    }
    return setSelectedDate(date);
  }

  function handleFindTime() {
    fetchAvailabilities({ slug, date, time, partySize });
  }

  function filterTimeByRestaurantHours() {
    const availableTimes: typeof times = [];
    let isInTimeWindow = false;
    times.forEach((t) => {
      if (t.time === openTime) {
        isInTimeWindow = true;
      }

      if (t.time === closeTime) {
        isInTimeWindow = false;
      }

      if (isInTimeWindow) {
        availableTimes.push(t);
      }
    });

    return availableTimes;
  }

  return (
    <div className="w-[27%] relative text-reg">
      <div className="bg-white rounded p-3 shadow">
        <div className="text-center border-b pb-2 font-bold">
          <h4 className="mr-7 text-lg">Make a Reservation</h4>
        </div>
        <div className="my-3 flex flex-col">
          <label htmlFor="">Party size</label>
          <select
            name=""
            className="bg-white py-3 border-b font-light"
            id=""
            value={partySize}
            onChange={(e) => setPartySize(e.target.value)}
          >
            {partySizeData.map((party) => (
              <option
                key={party.value}
                value={party.value}
              >
                {party.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col w-[48%]">
            <label>Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleChangeDate}
              className="bg-white py-3 border-b font-light text-reg w-24"
              dateFormat="MMMM d"
              wrapperClassName="w-[48%]"
            />
          </div>
          <div className="flex flex-col w-[48%]">
            <label>Time</label>
            <select
              name=""
              id=""
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-white py-3 border-b font-light"
            >
              {filterTimeByRestaurantHours().map((time) => (
                <option
                  key={time.time}
                  value={time.time}
                >
                  {time.displayTime}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button
            className="bg-red-500 rounded w-full px-4 text-white font-bold h-16"
            onClick={handleFindTime}
            disabled={!isReservationEnabled || loading}
          >
            {isReservationEnabled ? (
              loading ? (
                <CircularProgress color="inherit" />
              ) : (
                "Find a Time"
              )
            ) : (
              "Coming Soon!"
            )}
          </button>
        </div>

        {data && data.length ? (
          <div className="mt-4">
            <p className="text-reg">Select a time</p>
            <div className="flex flex-wrap mt-2">
              {data.map((t) => {
                return t.available ? (
                  <Link
                    href={`/reserve/${slug}?date=${date}T${t.time}&partySize=${partySize}`}
                    className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                  >
                    <p className="text-sm font-bold">
                      {convertToDisplayTime(t.time as Time)}
                    </p>
                  </Link>
                ) : (
                  <p className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3"></p>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
