import Header from "./components/Header";
import Form from "./components/Form";

import prisma from "@/lib/prismaClient";
import { notFound } from "next/navigation";
import { Restaurant } from "@prisma/client";
import { getUnleashFlag } from "@/utils/getUnleashFlag";

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

export default async function Reserve({ params, searchParams }: Props) {
  const isEnabled = await getUnleashFlag("feature-reservation");

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
