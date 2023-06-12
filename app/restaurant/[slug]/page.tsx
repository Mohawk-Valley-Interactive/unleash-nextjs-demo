import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import { default as prismaClient } from "@/lib/prismaClient";
import { Location, Review } from "@prisma/client";
import { notFound } from "next/navigation";

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  location: Location;
  reviews: Review[];
  open_time: string;
  close_time: string;
}

async function fetchRestaurantNameBySlug(slug: string): Promise<string> {
  const restaurant = await prismaClient.restaurant.findUnique({
    where: { slug },
    select: {
      name: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant.name;
}

async function fetchRestaurantBySlug(slug: string): Promise<Restaurant> {
  const restaurant = await prismaClient.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      location: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
}

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const name = await fetchRestaurantNameBySlug(params.slug);

  return {
    title: `${name} | RuntimeDining`,
  };
}

export default async function RestaurantDetails({ params }: Props) {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={params.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />
      </div>
      <ReservationCard
        slug={params.slug}
        openTime={restaurant.open_time}
        closeTime={restaurant.close_time}
      />
    </>
  );
}
