import { default as prismaClient } from "@/lib/prismaClient";
import RestaurantNavBar from "../components/RestaurantNavBar";
import Menu from "./components/Menu";

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

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const name = await fetchRestaurantNameBySlug(params.slug);

  return {
    title: `${name} Menu | OpenTable`,
  };
}

export default function RestaurantMenu({ params }: Props) {
  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar slug={params.slug} />
      <Menu />
    </div>
  );
}
