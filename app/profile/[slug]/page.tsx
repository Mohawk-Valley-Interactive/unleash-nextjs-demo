"use client";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import useProfile from "@/hooks/useProfile";
import errorMascot from "../../../public/images/error.png";
import ProfileViewer from "./components/ProfileViewer";
import { useAuthState } from "../../context/AuthorizationProvider";

interface Props {
  params: {
    slug: string;
  };
}

export default function Profile({ params }: Props) {
  const authState = useAuthState();
  const { data, error, loading, loadProfile } = useProfile();
  useEffect(() => {
    loadProfile(params.slug);
  }, [params.slug]);

  return (
    <div className="center ml-2">
      <h1 className="text-black text-2xl font-bold mb-2">
        Profile: {data?.email}
      </h1>
      {loading ? (
        <CircularProgress className=""></CircularProgress>
      ) : error ? (
        <div>
          <Image
            src={errorMascot}
            alt=""
            className="w-56 mb-8"
          />
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <ProfileViewer profileData={data} />
        </div>
      )}
    </div>
  );
}
