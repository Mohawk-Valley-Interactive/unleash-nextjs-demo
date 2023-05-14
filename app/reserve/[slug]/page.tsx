import Header from "./components/Header";
import Form from "./components/Form";

import prisma from "@/lib/prismaClient";
import { notFound } from "next/navigation";
import { Restaurant } from "@prisma/client";

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
    title: `Reserve at ${name} | OpenTable`,
  };
}

export default async function Reserve({ params, searchParams }: Props) {
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
        <Form />
      </div>
    </div>
  );
}
