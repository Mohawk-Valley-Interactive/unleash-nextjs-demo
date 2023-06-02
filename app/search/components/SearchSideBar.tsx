import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";

interface SortParameter {
  id: number;
  name: string;
}

interface Props {
  cuisines: Cuisine[];
  locations: Location[];
  searchParams: {
    city?: string;
    cuisine?: string;
    price?: PRICE;
  };
}

export default function SearchSideBar({
  cuisines,
  locations,
  searchParams,
}: Props) {
  const alphabeticalSort = (a: SortParameter, b: SortParameter) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  };

  const priceData = [
    {
      key: 1,
      price: PRICE.CHEAP,
      label: "$",
      className:
        "border-t border-b border-l w-full text-reg text-center font-light rounded-l p-2",
    },
    {
      key: 2,
      price: PRICE.REGULAR,
      label: "$$",
      className: "border w-full text-reg text-center font-light p-2",
    },
    {
      key: 3,
      price: PRICE.EXPENSIVE,
      label: "$$$",
      className:
        "border-t border-b border-r w-full text-reg text-center font-light rounded-r p-2",
    },
  ];

  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.sort(alphabeticalSort).map((location) => (
          <Link
            key={location.id}
            className="font-light text-reg capitalize"
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                city: location.name,
              },
            }}
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.sort(alphabeticalSort).map((cuisine) => (
          <Link
            key={cuisine.id}
            className="font-light text-reg capitalize"
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                cuisine: cuisine.name,
              },
            }}
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <div className="mb2">Price</div>
        <div className="flex">
          {priceData.map(({ key, price, label, className }) => (
            <Link
              key={key}
              className={className}
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  price: price,
                },
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
