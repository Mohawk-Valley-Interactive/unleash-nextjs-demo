"use client";

import Link from "next/link";
import AuthButton from "./AuthButton";
import { useAuthState } from "../context/AuthorizationProvider";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const { loading, data } = useAuthState();
  const { fetchUser } = useAuth();

  useEffect(() => {
    if (!data) {
      fetchUser();
    }
  }, []);

  function handleOpen() {
    router.push("/profile/me");
  }

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link
        href="/"
        className="font-bold text-gray-700 text-2xl"
      >
        RuntimeDining
      </Link>
      <div>
        <div className="flex mr-6">
          {loading ? null : (
            <>
              {data ? (
                <button
                  onClick={handleOpen}
                  className="bg-[#0f4747] text-white border p-1 px-4 rounded mr-3"
                >
                  My Profile
                </button>
              ) : (
                <AuthButton isSignIn={false} />
              )}
              <AuthButton isSignIn={true} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
