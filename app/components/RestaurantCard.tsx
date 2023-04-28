import Link from 'next/link';

export default function RestaurantCard() {
  return (
    <div className="w-65 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href="/restaurant/mikes-place">
        <img
          src="https://resizer.otstatic.com/v1/photos/wide-huge/3/42584321.jpg"
          alt=""
          className="w-full h-37"
        />
        <div className="p-2">
          <h2 className="font-bold text-2xl mb-2">Mike's Place</h2>
          <div className="flex items-start">
            <div className="flex mb-3">*****</div>
            <p className="ml-3">77 reviews</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className="mr-4">Cuban</p>
            <p className="mr-4">$$$$</p>
            <p>Little Falls</p>
          </div>
          <p className="text-sm mt-2 font-bold">Booked 5 times today</p>
        </div>
      </Link>
    </div>
  );
}
