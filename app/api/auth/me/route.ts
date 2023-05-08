import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function POST(req: NextRequest) {
  // email acquired from token and injected via authentication middleware
  const email: string = req.headers.get("email") as string;

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      first_name: true,
      last_name: true,
      city: true,
      email: true,
      phone: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { errorMessage: "Unauthorized request (user not found)." },
      { status: 404 }
    );
  }

  return NextResponse.json({ user });
}
