import Link from 'next/link';

export default function Reserve() {
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
        {/* NAVBAR */}
        <div className="border-t h-screen">
          <div className="w-3/5 py-9 m-auto">
            {/* HEADER */}
            <header>
              <div className="font-bold">You're almost done!</div>
              <div className="mt-5 flex">
                <img
                  src="https://resizer.otstatic.com/v2/photos/xlarge/2/39989965.jpg"
                  alt=""
                  className="w-32 h-18 rounded"
                />
                <div className="ml-4">
                  <h1 className="font-bold text-3xl">Mike's Place</h1>
                  <div className="flex mt-3">
                    <p className="mr-6">Tues, 22nd 2023</p>
                    <p className="mr-6">7:30 PM</p>
                    <p className="mr-6">3 people</p>
                  </div>
                </div>
              </div>
            </header>
            {/* HEADER */} {/* FORM */}
            <div className="mt-10 flex flex-wrap justify-between w-[660px]">
              <input
                type="text"
                className="bg-white border rounded p-3 w-80 mb-4"
                placeholder="First name"
              />
              <input
                type="text"
                className="bg-white border rounded p-3 w-80 mb-4"
                placeholder="Last name"
              />
              <input
                type="text"
                className="bg-white border rounded p-3 w-80 mb-4"
                placeholder="Phone number"
              />
              <input
                type="text"
                className="bg-white border rounded p-3 w-80 mb-4"
                placeholder="Email"
              />
              <input
                type="text"
                className="bg-white border rounded p-3 w-80 mb-4"
                placeholder="Occasion (optional)"
              />
              <input
                type="text"
                className="bg-white border rounded p-3 w-80 mb-4"
                placeholder="Requests (optional)"
              />
            </div>
            <button className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300">
              Complete reservation
            </button>
            <footer className="mt-4 text-sm">
              By clicking "Complete reservation" you agree to the Terms of Use and Privacy Policy.
              Standard text message rates may apply. You may opt out of receiving text messages at
              any time.
            </footer>
            {/* FORM */}
          </div>
        </div>
      </div>
    </div>
  );
}
