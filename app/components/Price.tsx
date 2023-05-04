import { PRICE } from "@prisma/client";

interface Props {
  price: PRICE;
}

export default function Price({ price }: Props) {
  function renderPrice(p: PRICE) {
    switch (p) {
      case PRICE.CHEAP:
        return (
          <>
            <span className="text-black">$</span>
            <span className="text-gray-400">$$$</span>
          </>
        );
      case PRICE.REGULAR:
        return (
          <>
            <span className="text-black">$$</span>
            <span className="text-gray-400">$$</span>
          </>
        );
      case PRICE.EXPENSIVE:
        return (
          <>
            <span className="text-black">$$$</span>
            <span className="text-gray-400">$</span>
          </>
        );
      default:
        return (
          <>
            <span className="text-black">????</span>
          </>
        );
    }
  }

  const output = renderPrice(price);

  return <div className="flex mr-3">{output}</div>;
}
