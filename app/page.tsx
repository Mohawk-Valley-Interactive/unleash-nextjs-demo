import { default as prismaClient } from "@/lib/prismaClient";

import Header from "./components/Header";
import RestaurantCard, {
  RestaurantCardType,
} from "./components/RestaurantCard";
import { Suspense } from "react";
import Loading from "./loading";
import { cookies } from "next/headers";

async function fetchRestaurants(): Promise<RestaurantCardType[]> {
  const restaurants = await prismaClient.restaurant.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      reviews: true,
    },
  });

  return restaurants;
}

export const metadata = {
  title: "OpenTable",
};

export default async function Home({ searchParams }: { searchParams: {} }) {
  const c = cookies(); // To bypass static
  const restaurants = await fetchRestaurants();

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Header />
        <main className="py-3 px-36 mt-10 flex flex-wrap">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
            />
          ))}
        </main>
      </div>
    </Suspense>
  );
}
