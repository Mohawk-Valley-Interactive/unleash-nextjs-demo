import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import * as jose from "jose";
import validator from "validator";

export async function POST(req: NextRequest) {
  const errors: string[] = [];
  const { email, password } = await req.json();

  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid.",
    },
    {
      valid: validator.isLength(password, {
        min: 1,
      }),
      errorMessage: "Password is invalid.",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  if (errors.length) {
    return NextResponse.json({ errorMessage: errors[0] }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    return NextResponse.json(
      { errorMessage: "Email or password is invalid." },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { errorMessage: "Email or password is invalid." },
      { status: 401 }
    );
  }

  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT({ email: user.email })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);

  const res = NextResponse.json({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
    city: user.city,
  });

  res.cookies.set({
    name: "jwt",
    value: token,
    expires: Date.now() + 24 * 60 * 60 * 1000,
  });

  return res;
}
