import Image from "next/image"
import { Inter } from "@next/font/google"
import styles from "./page.module.css"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <main>
      <main className="bg-gray-100 min-h-screen w-screen">
        <main className="max-w-screen-2xl m-auto bg-white text-black">
          {/* NAVBAR */}
          <nav className="bg-white p-2 flex justify-between">
            <a href="" className="font-bold text-gray-700 text-2xl">
              {" "}
              OpenTable{" "}
            </a>
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
          {/* HEADER */}
          <div className="h-96 overflow-hidden">
            <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
              <h1 className="text-7xl text-white capitalize text-center text-shadow">
                Mike's Place (Little Falls)
              </h1>
            </div>
          </div>
          {/* HEADER */}
          {/* DESCRIPTION PORTION */}
          <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
            <div className="bg-white w-[70%] rounded p-3 shadow">
              {/* RESTAURANT NAVBAR */}
              <nav className="flex text-reg border-b pb-2">
                <a href="" className="mr-7">
                  Overview
                </a>
                <a href="" className="mr-7">
                  Menu
                </a>
              </nav>
              {/* RESTAURANT NAVBAR */}
              {/* TITLE */}
              <div className="mt-4 border-b pb-6">
                <h1 className="font-bold text-6xl">Mike's Place</h1>
              </div>
              {/* TITLE */}
              {/* RATINGS */}
              <div className="flex items-end">
                <div className="ratings mt-2 flex items-center">
                  <p>*****</p>
                  <p className="text-reg ml-3">4.9</p>
                </div>
                <div className="text-reg ml-4">420 Reviews</div>
              </div>
              {/* RATINGS */}
              {/* DESCRIPTION */}
              <div className="mt-4">
                <p className="text-lg font-light">
                  Red Lobster welcomes you by offering PRIORITY SEATING to
                  reduce your wait time in the restaurant, so you can spend more
                  time doing the things you love. Or, come enjoy a drink at our
                  bar and a Tasting Plate while you wait. Red Lobster is the
                  world's largest and most loved seafood restaurant company,
                  offering high quality, freshly-prepared seafood, sourced in a
                  way that is traceable, sustainable and responsible. We offer
                  lunch and dinner daily, featuring classics like our Ultimate
                  Feast®, Garlic Shrimp Scampi and Parrot Isle Jumbo Coconut
                  Shrimp, and feature limited time flavors and preparations
                  during events like Lobsterfest®, Crabfest® and Endless
                  Shrimp®. And, who can resist our famous warm and cheesy
                  Cheddar Bay Biscuits®?
                </p>
              </div>
              {/* DESCRIPTION */}
            </div>
          </div>
          {/* DESCRIPTION PORTION */}
        </main>
      </main>
    </main>
  )
}
