import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function GET(req: NextRequest) {
  // email acquired from token and injected via authentication middleware
  // let email: string = req.headers.get("email") as string;
  let email: string = req.headers.get("email") as string;

  const callingUser = await prisma.user.findUnique({
    where: { email },
    select: {
      admin: true,
    },
  });

  if (!callingUser?.admin) {
    return NextResponse.json(
      { errorMessage: "Unauthorized request." },
      { status: 401 }
    );
  }

  const users = await prisma.user.findMany();

  if (!users || users.length === 0) {
    return NextResponse.json(
      { errorMessage: "Users not found." },
      { status: 404 }
    );
  }

  return NextResponse.json([...users]);
}
