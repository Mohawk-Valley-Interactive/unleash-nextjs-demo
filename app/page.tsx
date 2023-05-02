import Header from "./components/Header";
import RestaurantCard, {
  RestaurantCardType,
} from "./components/RestaurantCard";

import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();
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
    },
  });

  return restaurants;
}

export const metadata = {
  title: "OpenTable",
};

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap">
        {restaurants.map((restaurant) => {
          return <RestaurantCard restaurant={restaurant} />;
        })}
      </div>
    </main>
  );
}
