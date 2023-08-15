import Header from "./components/Header";
import Form from "./components/Form";

import prisma from "@/lib/prismaClient";
import { notFound } from "next/navigation";
import { Restaurant, User } from "@prisma/client";
import { cookies } from "next/headers";
import { evaluateFlags, flagsClient, getDefinitions } from "@unleash/nextjs";
import * as jose from "jose";

async function fetchRestaurantNameBySlug(slug: string): Promise<string> {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: { name: true },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant.name;
}

async function fetchRestaurantBySlug(slug: string): Promise<Restaurant> {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
}

interface Props {
  params: { slug: string };
  searchParams: {
    date: string;
    partySize: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const name = await fetchRestaurantNameBySlug(params.slug);

  return {
    title: `Reserve at ${name} | RuntimeDining`,
  };
}

async function getFlag(flagName: string) {
  const cookieStore = cookies();
  const sessionId =
    cookieStore.get("unleash-session-id")?.value ||
    `${Math.floor(Math.random() * 1_000_000_000)}`;

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

export default async function Reserve({ params, searchParams }: Props) {
  const isEnabled = await getFlag("feature-reservation");
  if (!isEnabled) {
    return (
      <div className="border-t h-screen">
        <div className="w-3/5 py-9 m-auto">
          <h1 className="text-center font-bold">Under Construction...</h1>
        </div>
      </div>
    );
  }

  console.log("Restaurant Acct ID: 12342341");
  console.log("Restaurant Admin Addr: admin@restaurant.com");
  console.log("Restaurant Admin Pass: PlainTextPassword");

  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <div className="border-t h-screen">
      <div className="w-3/5 py-9 m-auto">
        <Header
          image={restaurant.main_image}
          name={restaurant.name}
          date={searchParams.date}
          partySize={searchParams.partySize}
        />
        <Form
          slug={params.slug}
          date={searchParams.date}
          partySize={searchParams.partySize}
        />
      </div>
    </div>
  );
}
