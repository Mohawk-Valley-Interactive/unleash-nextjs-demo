import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismaClient";
import findAvailableTables from "../../../../../services/restaurant/findAvailableTables";

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
      { errorMessage: "Invalid data provided." },
      { status: 400 }
    );
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      close_time: true,
      open_time: true,
      tables: true,
    },
  });

  if (!restaurant) {
    return NextResponse.json(
      { errorMessage: "Restaurant not found." },
      { status: 400 }
    );
  }

  const availableTables = await findAvailableTables({ date, time, restaurant });
  if (!availableTables) {
    return NextResponse.json(
      { errorMessage: "Invalid data provided." },
      { status: 400 }
    );
  }

  const availabilities = availableTables
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
