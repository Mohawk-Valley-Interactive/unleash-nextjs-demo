"use client";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import useProfile from "@/hooks/useProfile";
import errorMascot from "../../../public/images/error.png";
import ProfileViewer from "./components/ProfileViewer";
import { useAuthState } from "../../context/AuthorizationProvider";
import ProfileList from "./components/ProfileList";
import useProfileList from "@/hooks/useProfileList";

interface Props {
  params: {
    slug: string;
  };
}

export default function Profile({ params }: Props) {
  const { data: authData } = useAuthState();
  const { data, error, loading, loadProfile } = useProfile();
  useEffect(() => {
    loadProfile(params.slug);
  }, [params.slug]);

  const [profileList, setProfileList] = useState([]);
  useEffect(() => {
    if (authData?.admin) {
      const fetchProfileList = async () => {
        const profileList = await useProfileList();
        setProfileList(profileList);
      };

      fetchProfileList();
    }
  }, [authData]);

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
      {authData?.admin ? <ProfileList profileListData={profileList} /> : null}
    </div>
  );
}
