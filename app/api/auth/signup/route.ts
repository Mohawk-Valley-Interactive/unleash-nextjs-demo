import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import prisma from "@/lib/prismaClient";
import bcrypt from "bcrypt";
import { User, PLAN } from "@prisma/client";
import * as jose from "jose";

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password, city, phone, plan, beta } =
    await req.json();
  const errors: string[] = [];

  let betaParticipant = false;
  if (beta && typeof beta === "string") {
    betaParticipant = beta.toLowerCase() === "true";
  }

  let planActual: PLAN = PLAN.FREE;
  if (plan && plan.toLowerCase() !== "free") {
    planActual = PLAN.PRO;
  }

  const adminCount = await prisma.user.count({
    where: {
      admin: true,
    },
  });

  const userTest = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userTest) {
    return NextResponse.json(
      { errorMessage: "E-mail currently already in use with another account." },
      { status: 400 }
    );
  }

  const validationSchema = [
    {
      valid: validator.isLength(firstName, {
        min: 1,
        max: 20,
      }),
      errorMessage: "First name must be between 1 and 20 characters in length.",
    },
    {
      valid: validator.isLength(lastName, {
        min: 1,
        max: 20,
      }),
      errorMessage: "Last name must be between 1 and 20 characters in length.",
    },
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid.",
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: "Phone number is invalid.",
    },
    {
      valid: validator.isLength(city, {
        min: 1,
        max: 20,
      }),
      errorMessage: "City name must be between 1 and 20 characters in length.",
    },
    {
      valid: validator.isLength(password, {
        min: 1,
      }),
      errorMessage: "Password is not strong.",
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

  const hashPassword = await bcrypt.hash(password, 10);

  const user: User = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      city: city,
      phone: phone,
      password: hashPassword,
      admin: adminCount === 0,
      beta: betaParticipant,
      plan: planActual,
    },
  });

  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT({ email: user.email })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);

  const res = NextResponse.json({
    admin: user.admin,
    beta: user.beta,
    city: user.city,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    phone: user.phone,
  });

  res.cookies.set({
    name: "jwt",
    value: token,
    expires: Date.now() + 24 * 60 * 60 * 1000,
  });

  return res;
}
