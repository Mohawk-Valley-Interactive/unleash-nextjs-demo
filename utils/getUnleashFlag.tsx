import { default as prismaClient } from "@/lib/prismaClient";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import { evaluateFlags, flagsClient, getDefinitions } from "@unleash/nextjs";
import * as jose from "jose";

export async function getUnleashFlag(flagName: string) {
  const cookieStore = cookies();
  const sessionId =
    cookieStore.get("unleash-session-id")?.value ||
    `${Math.floor(Math.random() * 1000000000)}`;

  let beta: string = "";
  let city: string = "";
  let firstname: string = "";
  let lastname: string = "";
  let phone: string = "";
  let email: string = "";

  const jwt = cookieStore.get("jwt")?.value || "";
  if (jwt) {
    const decodeJwt = jose.decodeJwt(jwt);
    email = decodeJwt.email as string;
    const user: User | null = await prismaClient.user.findUnique({
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

  const definitions = await getDefinitions({
    fetchOptions: {
      next: { revalidate: 15 }, // Cache layer like Unleash Proxy!
    },
  });

  const { toggles } = await evaluateFlags(definitions, {
    sessionId,
    beta,
    city,
    email,
    firstname,
    lastname,
    phone,
  });

  const flags = flagsClient(toggles);

  return flags.isEnabled(flagName);
}
