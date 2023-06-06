import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismaClient";
import findAvailableTables from "@/services/restaurant/findAvailableTables";
import validator from "validator";
import { getFlagsClient } from "@/utils/getFlagsClient";

interface Params {
  params: { slug: string };
}

export async function POST(req: NextRequest, { params }: Params) {
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
  const { firstName, lastName, email, phone, occasion, request } =
    await req.json();

  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const partySize = searchParams.get("partySize");

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !date ||
    !time ||
    !partySize
  ) {
    return NextResponse.json(
      { errorMessage: "Required data missing." },
      { status: 400 }
    );
  }

  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid.",
    },
    {
      valid: validator.isLength(firstName, {
        min: 1,
      }),
      errorMessage: "First name is required.",
    },
    {
      valid: validator.isLength(lastName, {
        min: 1,
      }),
      errorMessage: "Last name is required.",
    },
    {
      valid: validator.isLength(phone, {
        min: 10,
      }),
      errorMessage: "Phone number is required.",
    },
  ];

  const errors: string[] = [];
  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  if (errors.length) {
    return NextResponse.json({ errorMessage: errors[0] }, { status: 400 });
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      open_time: true,
      close_time: true,
      tables: true,
    },
  });

  if (!restaurant) {
    return NextResponse.json(
      { errorMessage: "Restaurant not found." },
      { status: 400 }
    );
  }

  const reservationTime = new Date(`${date}T${time}`);
  const restaurantOpeningTime = new Date(`${date}T${restaurant.open_time}`);
  const restaurantClosingTime = new Date(`${date}T${restaurant.close_time}`);
  if (
    restaurantOpeningTime > reservationTime ||
    restaurantClosingTime < reservationTime
  ) {
    return NextResponse.json(
      { errorMessage: "Restaurant is not open at the requested time." },
      { status: 400 }
    );
  }

  const availableTables = await findAvailableTables({ date, time, restaurant });
  if (!availableTables) {
    return NextResponse.json(
      { errorMessage: "Unable to process request." },
      { status: 400 }
    );
  }

  const rtTime = reservationTime.getTime();
  const searchTimeWithTables = availableTables.find((available) => {
    return available.date.getTime() === rtTime;
  });

  if (!searchTimeWithTables) {
    return NextResponse.json(
      { errorMessage: "No available tables found at desired date/time." },
      { status: 400 }
    );
  }

  let tableAvailabilityBySize: { 2: number[]; 4: number[] } = {
    2: [],
    4: [],
  };
  searchTimeWithTables.tables.forEach((t) => {
    if (t.seats === 2) {
      tableAvailabilityBySize[2].push(t.id);
    } else {
      tableAvailabilityBySize[4].push(t.id);
    }
  });

  const totalAvailableSeating =
    tableAvailabilityBySize[4].length * 4 +
    tableAvailabilityBySize[2].length * 2;
  let requiredSeating = parseInt(partySize);
  if (requiredSeating > totalAvailableSeating) {
    return NextResponse.json(
      { errorMessage: "Not enough available seating." },
      { status: 400 }
    );
  }

  const tablesToBook: number[] = [];
  while (requiredSeating > 0) {
    if (requiredSeating >= 3) {
      if (tableAvailabilityBySize[4].length) {
        tablesToBook.push(tableAvailabilityBySize[4][0]);
        tableAvailabilityBySize[4].shift();
        requiredSeating = requiredSeating - 4;
      } else {
        tablesToBook.push(tableAvailabilityBySize[2][0]);
        tableAvailabilityBySize[2].shift();
        requiredSeating = requiredSeating - 2;
      }
    } else {
      if (tableAvailabilityBySize[2].length) {
        tablesToBook.push(tableAvailabilityBySize[2][0]);
        requiredSeating = requiredSeating - 2;
      } else {
        tablesToBook.push(tableAvailabilityBySize[4][0]);
        requiredSeating = requiredSeating - 4;
      }
    }
  }

  const booking = await prisma.booking.create({
    data: {
      number_of_people: parseInt(partySize),
      booker_first_name: firstName,
      booker_last_name: lastName,
      booker_email: email,
      booker_phone: phone,
      booker_occasion: occasion,
      booker_request: request,
      restaurant_id: restaurant.id,
      booking_time: new Date(`${date}T${time}`),
    },
  });

  const bookingsOnTableData = tablesToBook.map((tableId) => {
    return {
      table_id: tableId,
      booking_id: booking.id,
    };
  });

  await prisma.bookingsOnTables.createMany({ data: bookingsOnTableData });

  const debugData = {
    tablesToBook,
    customerData: "HERE IS SOME IMPORTANT CUSTOMER DATA. LAWSUIT INBOUND.",
  };

  return NextResponse.json(debugData);
}
