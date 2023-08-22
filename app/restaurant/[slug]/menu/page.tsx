import { default as prismaClient } from "@/lib/prismaClient";
import RestaurantNavBar from "../components/RestaurantNavBar";
import Menu from "./components/Menu";
import { Item } from "@prisma/client";

async function fetchRestaurantNameBySlug(slug: string): Promise<string> {
  const restaurant = await prismaClient.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
    },
  });

  if (!restaurant) {
    throw new Error();
  }

  return restaurant.name;
}

async function fetchRestaurantMenuBySlug(slug: string): Promise<Item[]> {
  const restaurant = await prismaClient.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });

  if (!restaurant) {
    throw new Error();
  }

  return restaurant.items;
}

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const name = await fetchRestaurantNameBySlug(params.slug);

  return {
    title: `${name} Menu | RuntimeDining`,
  };
}

export default async function RestaurantMenu({ params }: Props) {
  const menuItems = await fetchRestaurantMenuBySlug(params.slug);
  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar slug={params.slug} />
      {/* @ts-expect-error Server Component */}
      <Menu menu={menuItems} />
    </div>
  );
}
