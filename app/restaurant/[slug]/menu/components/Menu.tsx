import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";
import { getUnleashFlag } from "@/utils/getUnleashFlag";

interface Props {
  menu: Item[];
}

export default async function Menu({ menu }: Props) {
  const isMenuAvailable = await getUnleashFlag("feature-menu");
  const isSpecialsMenuAvailable = await getUnleashFlag("feature-menu-specials");

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
