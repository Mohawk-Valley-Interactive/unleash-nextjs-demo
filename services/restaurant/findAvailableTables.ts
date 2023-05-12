import { times } from "@/data/index";
import prisma from "@/lib/prismaClient";
import { Table } from "@prisma/client";

interface Params {
  date: string;
  time: string;
  restaurant: { tables: Table[] };
}

interface AvailableTableData {
  date: Date;
  time: string;
  tables: Table[];
}

export default async function findAvailableTables({
  date,
  time,
  restaurant,
}: Params): Promise<AvailableTableData[] | null> {
  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;

  if (!searchTimes) {
    return null;
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${date}T${searchTimes[0]}`),
        lte: new Date(`${date}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      id: true,
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  const bookingTablesObj: { [key: string]: { [key: number]: true } } = {};
  bookings.forEach((b) => {
    const tableData = b.tables.reduce((obj, table) => {
      return {
        ...obj,
        [table.table_id]: true, // bug: looks like we're not handling if there is a duplicate; already booked though problem originates elsewhere...
      };
    }, {});
    if (!bookingTablesObj[b.booking_time.toISOString()]) {
      bookingTablesObj[b.booking_time.toISOString()] = tableData;
      return;
    }

    bookingTablesObj[b.booking_time.toISOString()] = {
      ...bookingTablesObj[b.booking_time.toISOString()],
      ...tableData,
    };
  });

  const searchTimesWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${date}T${searchTime}`),
      time: searchTime,
      tables: restaurant.tables,
    };
  });

  searchTimesWithTables.forEach((t) => {
    t.tables = t.tables.filter((table: Table) => {
      // simpler to just run...?
      // return bookingTablesObj[t.date.toISOString()] && bookingTablesObj[t.date.toISOString()][table.id]
      if (bookingTablesObj[t.date.toISOString()]) {
        if (bookingTablesObj[t.date.toISOString()][table.id]) {
          return false;
        }
      }
      return true;
    });
  });

  return searchTimesWithTables;
}
