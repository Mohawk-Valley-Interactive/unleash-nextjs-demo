import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";

interface Props {
  menu: Item[];
}

export default function Menu({ menu }: Props) {
  return (
    <main className="bg-white mt-10">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
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
    </main>
  );
}
