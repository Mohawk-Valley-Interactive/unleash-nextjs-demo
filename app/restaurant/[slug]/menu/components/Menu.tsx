import { default as prismaClient } from "@/lib/prismaClient";
import { Item, User } from "@prisma/client";
import MenuCard from "./MenuCard";
import { cookies } from "next/headers";
import { evaluateFlags, flagsClient, getDefinitions } from "@unleash/nextjs";
import * as jose from "jose";

interface Props {
  menu: Item[];
}

async function getFlag(flagName: string) {
  const cookieStore = cookies();
  const sessionId =
    cookieStore.get("unleash-session-id")?.value ||
    `${Math.floor(Math.random() * 1_000_000_000)}`;

  let beta: string = "";
  let city: string = "";
  let firstname: string = "";
  let lastname: string = "";
  let phone: string = "";
  let email: string = "";

  const jwt = cookieStore.get("jwt")?.value || "";
  if (jwt) {
    const decodeJwt = jose.decodeJwt(jwt);
    email = decodeJwt.email as string;
    const user: User | null = await prismaClient.user.findUnique({
      where: { email },
    });
    if (user) {
      beta = user.beta ? "true" : "false";
      city = user.city;
      firstname = user.first_name;
      lastname = user.last_name;
      phone = user.phone;
    }
  }

  const definitions = await getDefinitions({
    fetchOptions: {
      next: { revalidate: 15 }, // Cache layer like Unleash Proxy!
    },
  });

  const { toggles } = await evaluateFlags(definitions, {
    sessionId,
    beta,
    city,
    email,
    firstname,
    lastname,
    phone,
  });

  const flags = flagsClient(toggles);

  return flags.isEnabled(flagName);
}

export default async function Menu({ menu }: Props) {
  const isMenuAvailable = await getFlag("feature-menu");
  const isSpecialsMenuAvailable = await getFlag("feature-menu-specials");

  return (
    <main className="bg-white mt-10">
      <div>
        {isSpecialsMenuAvailable ? (
          <div>
            <div className="mt-4 pb-1 mb-1">
              <h1 className="font-bold text-4xl">Specials</h1>
            </div>
            {menu.length ? (
              <MenuCard
                key={menu[0].id}
                item={{ ...menu[0], price: "$1.00" }}
              />
            ) : (
              <p>No specials today...</p>
            )}
          </div>
        ) : (
          <></>
        )}
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        {isMenuAvailable ? (
          <div>
            <div className="flex flex-wrap justify-between">
              {menu.length ? (
                menu.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                  />
                ))
              ) : (
                <p>This restaurant does not have a menu available.</p>
              )}
            </div>
          </div>
        ) : (
          <p>Please log in to view restaurant menus</p>
        )}
      </div>
    </main>
  );
}
