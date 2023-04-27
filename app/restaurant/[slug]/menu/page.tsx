import Link from 'next/link';

export default function RestaurantMenu() {
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
          <div className="bg-white w-[100%] rounded p-3 shadow">
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
            {/* RESTAURANT NAVBAR */}
            <main className="bg-white mt-10">
              <div>
                <div className="mt-4 pb-1 mb-1">
                  <h1 className="font-bold text-4xl">Menu</h1>
                </div>
                <div className="flex flex-wrap justify-between">
                  {/* MENU CARD */}
                  <div className="border rounded p-3 w-[49%] mb-3">
                    <h3 className="font-bold text-lg">Surf & Turf</h3>
                    <p className="font-light mt-1 text-sm">
                      A medium steak with lobster and medium rice.
                    </p>
                    <p className="mt-7">$80.00</p>
                  </div>
                  {/* MENU CARD */}
                </div>
              </div>
            </main>
          </div>
          {/* DESCRIPTION PORTION */}
        </div>
        {/* BODY */}
      </div>
    </div>
  );
}
