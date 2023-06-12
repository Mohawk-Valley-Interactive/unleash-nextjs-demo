import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard, {
  RestaurantCardType,
} from "./components/RestaurantCard";
import { default as prismaClient } from "@/lib/prismaClient";
import { PRICE } from "@prisma/client";
import { cookies } from "next/headers";

async function fetchCuisines() {
  return prismaClient.cuisine.findMany();
}

async function fetchLocations() {
  return prismaClient.location.findMany();
}

interface SearchParams {
  cuisine?: string;
  city?: string;
  price?: PRICE;
}

async function fetchRestaurants({
  cuisine,
  city,
  price,
}: SearchParams): Promise<RestaurantCardType[]> {
  const select = {
    id: true,
    slug: true,
    name: true,
    main_image: true,
    cuisine: true,
    location: true,
    price: true,
    reviews: true,
  };

  const where: any = {};

  if (cuisine) {
    where.cuisine = {
      name: {
        equals: cuisine.toLowerCase(),
      },
    };
  }

  if (city) {
    where.location = {
      name: {
        equals: city.toLowerCase(),
      },
    };
  }

  if (price) {
    where.price = {
      equals: price,
    };
  }

  return prismaClient.restaurant.findMany({
    where,
    select,
  });
}

export const metadata = {
  title: "Search Restaurants | Libre",
};

interface Props {
  searchParams: {
    city?: string;
    cuisine?: string;
    price?: PRICE;
  };
}

export default async function Search({ searchParams }: Props) {
  const c = cookies(); // To bypass static
  const cuisines = await fetchCuisines();
  const locations = await fetchLocations();
  const restaurantLocations = await fetchRestaurants(searchParams);

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          cuisines={cuisines}
          locations={locations}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurantLocations.length <= 0 ? (
            <span>No restaurants found in {searchParams.city}</span>
          ) : (
            restaurantLocations.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
