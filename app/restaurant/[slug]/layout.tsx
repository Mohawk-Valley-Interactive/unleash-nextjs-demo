import React from "react";
import Header from "./components/Header";
import { default as prismaClient } from "@/lib/prismaClient";
import { Location } from "@prisma/client";

interface Restaurant {
  id: number;
  name: string;
  location: Location;
}

async function fetchRestaurantBySlug(slug: string): Promise<Restaurant> {
  const restaurant = await prismaClient.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      location: true,
    },
  });

  if (!restaurant) {
    throw new Error();
  }

  return restaurant;
}

interface Props {
  children: React.ReactNode;
  params: { slug: string };
}

export default async function RestaurantLayout({ children, params }: Props) {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  return (
    <>
      <Header
        name={restaurant.name}
        location={restaurant.location.name}
      />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </>
  );
}
