import Link from 'next/link';

export default function RestaurantDetails() {
  return (
    <div className="bg-gray-100 min-h-screen w-screen">
      <div className="max-w-screen-2xl m-auto bg-white text-black">
        {/* NAVBAR */}
        <nav className="bg-white p-2 flex justify-between">
          <Link
            href=""
            className="font-bold text-gray-700 text-2xl"
          >
            OpenTable
          </Link>
          <div>
            <div className="flex">
              <button className="bg-blue-400 text-white border p-1 px-4 rounded mr-3">
                Sign In
              </button>
              <button className="border p-1 px-4 rounded">Sign Up</button>
            </div>
          </div>
        </nav>
        {/* NAVBAR */} {/* HEADER */}
        <header className="h-96 overflow-hidden">
          <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
            <h1 className="text-7xl text-white capitalize text-center text-shadow">
              Mike's Place (Little Falls)
            </h1>
          </div>
        </header>
        {/* HEADER */} {/* BODY */}
        <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
          {/* DESCRIPTION PORTION */}
          <div className="bg-white w-[70%] rounded p-3 shadow">
            {/* RESTAURANT NAVBAR */}
            <nav className="flex text-reg border-b pb-2">
              <Link
                href="/restaurant/mikes-place"
                className="mr-7"
              >
                Overview
              </Link>
              <Link
                href="/restaurant/mikes-place/menu"
                className="mr-7"
              >
                Menu
              </Link>
            </nav>
            {/* RESTAURANT NAVBAR */} {/* TITLE */}
            <div className="mt-4 border-b pb-6">
              <h1 className="font-bold text-6xl">Mike's Place</h1>
            </div>
            {/* TITLE */} {/* RATINGS */}
            <div className="flex items-end">
              <div className="ratings mt-2 flex items-center">
                <p>*****</p>
                <p className="text-reg ml-3">4.9</p>
              </div>
              <div className="text-reg ml-4">420 Reviews</div>
            </div>
            {/* RATINGS */} {/* DESCRIPTION */}
            <div className="mt-4">
              <p className="text-lg font-light">
                Red Lobster welcomes you by offering PRIORITY SEATING to reduce your wait time in
                the restaurant, so you can spend more time doing the things you love. Or, come enjoy
                a drink at our bar and a Tasting Plate while you wait. Red Lobster is the world's
                largest and most loved seafood restaurant company, offering high quality,
                freshly-prepared seafood, sourced in a way that is traceable, sustainable and
                responsible. We offer lunch and dinner daily, featuring classics like our Ultimate
                Feast®, Garlic Shrimp Scampi and Parrot Isle Jumbo Coconut Shrimp, and feature
                limited time flavors and preparations during events like Lobsterfest®, Crabfest® and
                Endless Shrimp®. And, who can resist our famous warm and cheesy Cheddar Bay
                Biscuits®?
              </p>
            </div>
            {/* DESCRIPTION */} {/* IMAGES */}
            <div>
              <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">7 photos</h1>
              <div className="flex flex-wrap">
                <img
                  className="w-56 h-44 mr-1 mb-1"
                  src="https://resizer.otstatic.com/v2/photos/xlarge/1/26051596.jpg"
                  alt=""
                />
                <img
                  className="w-56 h-44 mr-1 mb-1"
                  src="https://resizer.otstatic.com/v2/photos/xlarge/1/26051597.jpg"
                  alt=""
                />
                <img
                  className="w-56 h-44 mr-1 mb-1"
                  src="https://resizer.otstatic.com/v2/photos/xlarge/1/26051598.jpg"
                  alt=""
                />
                <img
                  className="w-56 h-44 mr-1 mb-1"
                  src="https://resizer.otstatic.com/v2/photos/xlarge/1/26051600.jpg"
                  alt=""
                />
                <img
                  className="w-56 h-44 mr-1 mb-1"
                  src="https://resizer.otstatic.com/v2/photos/xlarge/1/26051604.jpg"
                  alt=""
                />
                <img
                  className="w-56 h-44 mr-1 mb-1"
                  src="https://resizer.otstatic.com/v2/photos/xlarge/1/26051605.jpg"
                  alt=""
                />
                <img
                  className="w-56 h-44 mr-1 mb-1"
                  src="https://resizer.otstatic.com/v2/photos/xlarge/1/26051606.jpg"
                  alt=""
                />
                <img
                  className="w-56 h-44 mr-1 mb-1"
                  src=""
                  alt=""
                />
              </div>
            </div>
            {/* IMAGES */} {/* REVIEWS */}
            <div>
              <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
                What 100 people are saying
              </h1>
              <div>
                {/* REVIEW CARD */}
                <div className="border-b pb-7 mb-7">
                  <div className="flex">
                    <div className="w-1/6 flex flex-col items-center">
                      <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
                        <h2 className="text-white text-2xl">MJ</h2>
                      </div>
                      <p className="text-center">Michael Jordan</p>
                    </div>
                    <div className="ml-10 w-5/6">
                      <div className="flex items-center">
                        <div className="flex mr-5">*****</div>
                      </div>
                      <div className="mt-5">
                        <p className="text-lg font-light">
                          The call ahead seating feature offered by open table worked well. Food is
                          good but not great, best part of the evening was Laura, a very upbeat and
                          friendly server who was genuinely caring and helpful to all of us.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* REVIEW CARD */}
              </div>
            </div>
            {/* REVIEWS */}
          </div>
          {/* DESCRIPTION PORTION */} {/* RESERVATION CARD PORTION */}
          <div className="w-[27%] relative text-reg">
            <div className="fixed w-[15%] bg-white rounded p-3 shadow">
              <div className="text-center border-b pb-2 font-bold">
                <h4 className="mr-7 text-lg">Make a Reservation</h4>
              </div>
              <div className="my-3 flex flex-col">
                <label htmlFor="">Party size</label>
                <select
                  name=""
                  className="bg-white py-3 border-b font-light"
                  id=""
                >
                  <option value="">1 person</option>
                  <option value="">2 people</option>
                </select>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col w-[48%]">
                  <label>Date</label>
                  <input
                    type="text"
                    className="bg-white py-3 border-b font-light w-28"
                  />
                </div>
                <div className="flex flex-col w-[48%]">
                  <label>Time</label>
                  <select
                    name=""
                    id=""
                    className="bg-white py-3 border-b font-light"
                  >
                    <option value="">7:30 AM</option>
                    <option value="">12:30 7PM</option>
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <button className="bg-red-500 rounded w-full px-4 text-white font-bold h-16">
                  Find a Time
                </button>
              </div>
            </div>
          </div>
          {/* RESERVATION CARD PORTION */}
        </div>
        {/* BODY */}
      </div>
    </div>
  );
}