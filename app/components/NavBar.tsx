"use client";

import Link from "next/link";
import AuthButton from "./AuthButton";
import { useAuthState } from "../context/AuthorizationProvider";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

export default function NavBar() {
  const { loading, data } = useAuthState();
  const { fetchUser } = useAuth();

  useEffect(() => {
    if (!data) {
      fetchUser();
    }
  }, []);

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link
        href="/"
        className="font-bold text-gray-700 text-2xl"
      >
        OpenTable
      </Link>
      <div>
        <div className="flex mr-6">
          {loading ? null : (
            <>
              <AuthButton isSignIn={true} />
              {data ? null : <AuthButton isSignIn={false} />}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
