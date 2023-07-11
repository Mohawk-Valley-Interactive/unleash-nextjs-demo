import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

interface Params {
  params: {
    slug: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  // email acquired from token and injected via authentication middleware
  // let email: string = req.headers.get("email") as string;
  let email: string = req.headers.get("email") as string;

  const callingUser = await prisma.user.findUnique({
    where: { email },
    select: {
      admin: true,
    },
  });

  const desiredUser: string = params.slug === "me" ? email : params.slug;

  if (!callingUser?.admin && desiredUser !== email) {
    return NextResponse.json(
      { errorMessage: "Unauthorized request." },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: desiredUser },
    select: {
      id: true,
      created_at: true,
      updated_at: true,
      first_name: true,
      last_name: true,
      city: true,
      email: true,
      phone: true,
      admin: true,
      beta: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { errorMessage: "User not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ ...user });
}

export async function PUT(req: NextRequest, { params }: Params) {
  let email: string = req.headers.get("email") as string;

  const callingUser = await prisma.user.findUnique({
    where: { email },
    select: {
      admin: true,
    },
  });

  const desiredUser: string = params.slug === "me" ? email : params.slug;
  if (!callingUser?.admin && desiredUser !== email) {
    return NextResponse.json(
      { errorMessage: "Unauthorized request." },
      { status: 401 }
    );
  }

  const { body } = await req.json();
  delete body.id;
  delete body.email;
  delete body.created_at;
  delete body.updated_at;

  const user = await prisma.user.update({
    where: { email: desiredUser },
    data: {
      ...body,
    },
  });

  if (!user) {
    return NextResponse.json(
      { errorMessage: "User not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ ...user });
}
