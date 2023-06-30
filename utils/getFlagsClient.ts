import { NextRequest } from "next/server";
import {
  Context,
  IVariant,
  evaluateFlags,
  flagsClient,
  getDefinitions,
  randomSessionId,
} from "@unleash/nextjs";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import * as jose from "jose";
import prisma from "@/lib/prismaClient";
import { User } from "@prisma/client";

export async function getFlagsClient(req: NextRequest): Promise<{
  isEnabled: (name: string) => boolean;
  getVariant: (name: string) => IVariant;
}> {
  const UNLEASH_COOKIE_NAME = "unleash-session-id";

  const sessionId =
    req.nextUrl.searchParams.get("sessionId") ||
    req.cookies.get(UNLEASH_COOKIE_NAME)?.value ||
    randomSessionId();
  const remoteAddress =
    req.nextUrl.searchParams.get("remoteAddress") ||
    req.headers.get("x-forwarded-for") ||
    req.ip;
  const userId = req.nextUrl.searchParams.get("userId") || undefined;

  let beta: string = "";
  let city: string = "";
  let firstname: string = "";
  let lastname: string = "";
  let phone: string = "";

  let email: string = "";
  const jwt: RequestCookie | undefined = req.cookies.get("jwt");
  if (jwt?.value) {
    const decodedJwt = jose.decodeJwt(jwt.value);
    email = decodedJwt.email as string;
    if (email) {
      const user: User | null = await prisma.user.findUnique({
        where: { email },
      });
      if (user) {
        beta = user.beta ? "true" : "false";
        city = user.city;
        firstname = user.first_name;
        lastname = user.last_name;
        phone = user.phone;
      }
    }
  }

  const context: Context = {
    userId: userId,
    sessionId,
    remoteAddress,
    beta,
    city,
    email,
    firstname,
    lastname,
    phone,
  };

  const definitions = await getDefinitions();
  const { toggles } = await evaluateFlags(definitions, context);

  return flagsClient(toggles);
}
