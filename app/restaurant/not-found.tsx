"use client";

import errorMascot from "../../public/images/error.png";

import Image from "next/image";

interface Props {
  error: Error;
}

export default function NotFound() {
  return (
    <div className="bg-gray-200 h-screen flex flex-col justify-center items-center">
      <Image
        src={errorMascot}
        alt=""
        className="w-56 mb-8"
      />
      <div className="bg-white px-9 py-14 shadow rounded">
        <h3 className="text-3xl fond-bold">Well, this is embarrassing...</h3>
        <p className="text-reg font-bold">We couldn't find that restaurant.</p>
        <p className="mt-6 text-sm font-light">Error code: 404</p>
      </div>
    </div>
  );
}
