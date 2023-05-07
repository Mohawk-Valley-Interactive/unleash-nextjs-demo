import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prismaClient";

export async function POST(req: NextRequest) {
  const bearerToken = req.headers.get("authorization");
  if (!bearerToken) {
    return NextResponse.json(
      { errorMessage: "Unauthorized request (no bearer token)." },
      { status: 401 }
    );
  }

  const token = bearerToken.split(" ")[1];
  if (!token) {
    return NextResponse.json(
      { errorMessage: "Unauthorized request (bearer token empty)." },
      { status: 401 }
    );
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    await jose.jwtVerify(token, secret);
  } catch (e) {
    return NextResponse.json(
      {
        errorMessage: "Unauthorized request (bearer token cannot be verified).",
      },
      { status: 401 }
    );
  }

  const tokenPayload = jwt.decode(token) as { email: string };

  if (!tokenPayload.email) {
    return NextResponse.json(
      { errorMessage: "Unauthorized request (invalid email info)." },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: tokenPayload.email },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      city: true,
      email: true,
      phone: true,
    },
  });

  return NextResponse.json({ user });
}
