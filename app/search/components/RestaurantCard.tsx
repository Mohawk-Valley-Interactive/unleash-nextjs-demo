import Link from "next/link";
import Price from "../../components/Price";
import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import { calculateReviewAverage } from "../../../utils/calculateReviewAverage";
import Stars from "../../components/Stars";

export interface RestaurantCardType {
  id: number;
  slug: string;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  reviews: Review[];
}

interface Props {
  restaurant: {
    slug: string;
    name: string;
    location: Location;
    price: PRICE;
    cuisine: Cuisine;
    main_image: string;
    reviews: Review[];
  };
}

export default function RestaurantCard({ restaurant }: Props) {
  let reviewDescription;
  let ratingAverage = calculateReviewAverage(restaurant.reviews);
  if (ratingAverage >= 5.0) {
    reviewDescription = "Exceptional";
  } else if (ratingAverage >= 4.0) {
    reviewDescription = "Great";
  } else if (ratingAverage >= 3.0) {
    reviewDescription = "Good";
  } else if (ratingAverage >= 2.0) {
    reviewDescription = "Bad";
  } else if (ratingAverage >= 1.0) {
    reviewDescription = "Awful";
  } else if (ratingAverage > 0.0) {
    reviewDescription = "Terrible";
  } else {
    reviewDescription = "No reviews available.";
  }

  return (
    <div className="border-b flex pb-5 ml-4">
      <img
        src={restaurant.main_image}
        alt=""
        className="w-44 rounded"
      />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <Stars reviews={restaurant.reviews} />
          <p className="ml-2 text-sm">{reviewDescription}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
}
