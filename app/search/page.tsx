import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard, {
  RestaurantCardType,
} from "./components/RestaurantCard";
import { default as prismaClient } from "@/lib/prismaClient";
import { Cuisine, Location, PRICE } from "@prisma/client";

function fetchRestaurantsByLocation(
  locationName: string
): Promise<RestaurantCardType[]> {
  const selectQuery = {
    id: true,
    slug: true,
    name: true,
    main_image: true,
    cuisine: true,
    location: true,
    price: true,
  };
  if (!locationName)
    return prismaClient.restaurant.findMany({
      select: selectQuery,
    });

  return prismaClient.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: locationName.toLowerCase(),
        },
      },
    },
    select: selectQuery,
  });
}

export const metadata = {
  title: "Search Restaurants | OpenTable",
};

interface Props {
  searchParams: {
    city: string;
  };
}

export default async function Search({ searchParams }: Props) {
  const restaurantLocations = await fetchRestaurantsByLocation(
    searchParams.city
  );

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar />
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
