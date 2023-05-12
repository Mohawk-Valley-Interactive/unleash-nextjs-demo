import { NextRequest, NextResponse } from "next/server";
import { times } from "@/data/index";
import { Booking, Table } from "@prisma/client";

import prisma from "@/lib/prismaClient";
import { table } from "console";

interface Params {
  params: { slug: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  const slug = params.slug;
  const { searchParams } = new URL(req.url);

  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const partySize = searchParams.get("partySize");

  if (!date || !time || !partySize) {
    return NextResponse.json(
      { errorMessage: "Invalid data provided.." },
      { status: 400 }
    );
  }

  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;

  if (!searchTimes) {
    return NextResponse.json(
      { errorMessage: "Invalid data provided..." },
      { status: 400 }
    );
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${date}T${searchTimes[0]}`),
        lte: new Date(`${date}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  const bookingTablesObj: { [key: string]: { [key: number]: true } } = {};
  bookings.forEach((b) => {
    bookingTablesObj[b.booking_time.toISOString()] = b.tables.reduce(
      (obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        };
      },
      {}
    );
  });

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: { tables: true, open_time: true, close_time: true },
  });

  if (!restaurant) {
    return NextResponse.json(
      { errorMessage: "Invalid data provided." },
      { status: 400 }
    );
  }

  const tables = restaurant.tables;

  const searchTimesWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${date}T${searchTime}`),
      time: searchTime,
      tables,
    };
  });

  searchTimesWithTables.forEach((t) => {
    t.tables = t.tables.filter((table: Table) => {
      // simpler to just run...?
      // return bookingTablesObj[t.date.toISOString()] && bookingTablesObj[t.date.toISOString()][table.id]
      if (bookingTablesObj[t.date.toISOString()]) {
        if (bookingTablesObj[t.date.toISOString()][table.id]) return false;
      }
      return true;
    });
  });

  const availabilities = searchTimesWithTables
    .map((t) => {
      const totalSeatingAvailable = t.tables.reduce((sum, table) => {
        return sum + table.seats;
      }, 0);

      return {
        time: t.time,
        available: totalSeatingAvailable >= parseInt(partySize),
      };
    })
    .filter((availability) => {
      const availabilityTime = new Date(`${date}T${availability.time}`);
      const timeIsAfterOpeningHour =
        availabilityTime >= new Date(`${date}T${restaurant.open_time}`);
      const timeIsBeforeClosingHour =
        availabilityTime < new Date(`${date}T${restaurant.close_time}`);

      return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
    });

  return NextResponse.json(availabilities);
}
