import Link from 'next/link';
import NavBar from '../components/NavBar';

export default function Search() {
  return (
    <div className="bg-gray-100 min-h-screen w-screen">
      <div className="max-w-screen-2xl m-auto bg-white text-black">
        <NavBar />
        {/* HEADER */}
        <header className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2">
          {/* SEARCH BAR */}
          <div className="text-left text-lg py-3 m-auto flex justify-center">
            <input
              className="rounded mr-3 p-2 w-[450px] bg-white"
              type="text"
              placeholder="State, city, or town"
            />
            <button className="rounded bg-red-600 px-9 py-2 text-white">Let's go</button>
          </div>
          {/* SEARCH BAR */}
        </header>
        {/* HEADER */}
        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          {/* SEARCH SIDE BAR */}
          <div className="w-1/5">
            <div className="border-b pb-4">
              <h1 className="mb-2">Regions</h1>
              <p className="font-light text-reg">Toronto</p>
              <p className="font-light text-reg">Ottawa</p>
              <p className="font-light text-reg">Montreal</p>
              <p className="font-light text-reg">Hamilton</p>
              <p className="font-light text-reg">Kingston</p>
              <p className="font-light text-reg">Niagra</p>
            </div>
            <div className="border-b pb-4 mt-3">
              <h1 className="mb-2">Cuisines</h1>
              <p className="font-light text-reg">Mexican</p>
              <p className="font-light text-reg">Italian</p>
              <p className="font-light text-reg">Chinese</p>
            </div>
            <div className="mt-3 pb-4">
              <div className="mb2">Price</div>
              <div className="flex">
                <button className="border-t border-b border-l w-full text-reg font-light rounded-l p-2">
                  $
                </button>
                <button className="border w-full text-reg font-light p-2">$$</button>
                <button className="border-t border-b border-r w-full text-reg font-light rounded-r p-2">
                  $$$
                </button>
              </div>
            </div>
          </div>
          {/* SEARCH SIDE BAR */} {/* RESTAURANT CARD */}
          <div className="w-5/6">
            <div className="border-b flex pb-5">
              <img
                src="https://resizer.otstatic.com/v2/photos/xlarge/1/24841578.jpg"
                alt=""
                className="w-44 rounded"
              />
              <div className="pl-5">
                <h2 className="text-3xl">Mike's Place</h2>
                <div className="flex items-start">
                  <div className="flex mb-2">*****</div>
                  <p className="ml-2 text-sm">Awesome</p>
                </div>
                <div className="mb-9">
                  <div className="font-light flex text-reg">
                    <p className="mr-4">$$$</p>
                    <p className="mr-4">Mexican</p>
                    <p className="mr-4">Ottawa</p>
                  </div>
                </div>
                <div className="text-red-600">
                  <Link href="">View more information</Link>
                </div>
              </div>
            </div>
          </div>
          {/* RESTAURANT CARD */}
        </div>
      </div>
    </div>
  );
}
