"use client";

import { useState } from "react";
import { partySize, times } from "../../../../data";
import DatePicker from "react-datepicker";
import { time } from "console";

interface Props {
  openTime: string;
  closeTime: string;
}

export default function ReservationCard({ openTime, closeTime }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  function handleChangeDate(date: Date | null) {
    return setSelectedDate(date);
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
      <div className="fixed w-[15%] bg-white rounded p-3 shadow">
        <div className="text-center border-b pb-2 font-bold">
          <h4 className="mr-7 text-lg">Make a Reservation</h4>
        </div>
        <div className="my-3 flex flex-col">
          <label htmlFor="">Party size</label>
          <select
            name=""
            className="bg-white py-3 border-b font-light"
            id=""
          >
            {partySize.map((party) => (
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
          <button className="bg-red-500 rounded w-full px-4 text-white font-bold h-16">
            Find a Time
          </button>
        </div>
      </div>
    </div>
  );
}
