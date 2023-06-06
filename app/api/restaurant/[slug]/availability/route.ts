import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismaClient";
import findAvailableTables from "@/services/restaurant/findAvailableTables";
import { getFlagsClient } from "@/utils/getFlagsClient";

interface Params {
  params: { slug: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  let flags = null;
  try {
    flags = await getFlagsClient(req);
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: "Internal Server Error",
        message: (error as Error)?.message || undefined,
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }

  const isEnabled = flags.isEnabled("feature-reservation");
  if (!isEnabled) {
    return NextResponse.json(
      { errorMessage: "Endpoint unavailable." },
      { status: 404 }
    );
  }

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

  const debugData = [
    ...availabilities,
    {
      time: "00:00:00.000Z",
      available: "false",
      customerData: "HERE IS SOME IMPORTANT CUSTOMER DATA. LAWSUIT INBOUND.",
    },
  ];

  return NextResponse.json(debugData);
}
