import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";
import Price from "./Price";

export interface RestaurantCardType {
  id: number;
  slug: string;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
}

interface Props {
  restaurant: RestaurantCardType;
}

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <div className="w-65 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href={`/restaurant/${restaurant.slug}`}>
        <img
          src={restaurant.main_image}
          alt=""
          className="w-full h-36"
        />
        <div className="p-2">
          <h2 className="font-bold text-2xl mb-2">{restaurant.name}</h2>
          <div className="flex items-start">
            <div className="flex mb-3">*****</div>
            <p className="ml-3">77 reviews</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className="mr-4">{restaurant.cuisine.name}</p>
            <Price price={restaurant.price} />
            <p>{restaurant.location.name}</p>
          </div>
          <p className="text-sm mt-2 font-bold">Booked 5 times today</p>
        </div>
      </Link>
    </div>
  );
}
