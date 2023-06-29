"use client";
import useProfile, { UserData } from "@/hooks/useProfile";
import { ToggleButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import React, { useEffect, useState } from "react";
import { useAuthState } from "../../../context/AuthorizationProvider";

interface Props {
  profileData: UserData | null;
}
export default function ProfileViewer({ profileData }: Props) {
  const { data: authData } = useAuthState();
  const { data: updatedData, loadProfile, saveProfile } = useProfile();
  const [userData, setUserData] = useState<UserData>(() => {
    if (updatedData) {
      return { ...updatedData };
    } else if (profileData) {
      return { ...profileData };
    } else {
      return {
        id: 0,
        created_at: "",
        updated_at: "",
        email: "",
        first_name: "",
        last_name: "",
        city: "",
        phone: "",
        admin: false,
        beta: false,
      };
    }
  });
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (updatedData) {
      setDisabled(
        userData.first_name == updatedData.first_name &&
          userData.last_name == updatedData.last_name &&
          userData.city == updatedData.city &&
          userData.phone == updatedData.phone &&
          userData.admin == updatedData.admin &&
          userData.beta == updatedData.beta
      );
    } else if (profileData) {
      setDisabled(
        userData.first_name == profileData.first_name &&
          userData.last_name == profileData.last_name &&
          userData.city == profileData.city &&
          userData.phone == profileData.phone &&
          userData.admin == profileData.admin &&
          userData.beta == profileData.beta
      );
    } else {
      setDisabled(false);
    }
  }, [userData]);

  useEffect(() => {
    setUserData(() => {
      return { ...userData, ...updatedData };
    });
  }, [updatedData]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  function onSave() {
    saveProfile(userData, (e) => {
      if (typeof e !== "string") {
        setDisabled(true);
        loadProfile(userData.email || "me");
      }
    });
  }

  return (
    <div className="w-[50%]">
      <div className="my-3">
        <label
          htmlFor="created_at"
          className="text-sm font-bold w-1/6 mr-2"
        >
          Created:
        </label>
        <span>{userData.created_at}</span>
      </div>
      <div className="my-3">
        <label
          htmlFor="created_at"
          className="text-sm font-bold w-1/6 mr-2"
        >
          Updated:
        </label>
        <span>{userData.updated_at}</span>
      </div>
      <div className="my-3">
        <label
          htmlFor="first_name"
          className="text-sm font-bold w-1/6 mr-2"
        >
          First Name:
        </label>
        <input
          name="first_name"
          type="text"
          className="border rounded p-2 py-0 w-5/6 bg-white"
          placeholder="First Name"
          value={userData.first_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="my-3">
        <label
          htmlFor="last_name"
          className="text-sm font-bold w-1/6 mr-2"
        >
          Last Name:
        </label>
        <input
          name="last_name"
          type="text"
          className="border rounded p-2 py-0 w-5/6 bg-white"
          placeholder="Last Name"
          value={userData.last_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="my-3">
        <label
          htmlFor="phone"
          className="text-sm font-bold w-1/6 mr-2"
        >
          Phone:
        </label>
        <input
          name="phone"
          type="text"
          className="border rounded p-2 py-0 w-5/6 bg-white"
          placeholder="Phone"
          value={userData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="my-3">
        <label
          htmlFor="city"
          className="text-sm font-bold w-1/6 mr-2"
        >
          City:
        </label>
        <input
          name="city"
          type="text"
          className="border rounded p-2 py-0 w-5/6 bg-white"
          placeholder="City"
          value={userData.city}
          onChange={handleInputChange}
        />
      </div>
      {authData?.admin ? (
        <div className="my-3">
          <label
            htmlFor="admin"
            className="text-sm font-bold w-1/6 mr-2"
          >
            Admin:
          </label>
          <ToggleButton
            name="admin"
            value="admin"
            className="w-[10px] h-[10px]"
            selected={userData.admin}
            onChange={() =>
              setUserData((p) => {
                return { ...p, admin: !p.admin };
              })
            }
          >
            <CheckIcon />
          </ToggleButton>
        </div>
      ) : (
        <></>
      )}
      <div className="my-3">
        <label
          htmlFor="beta"
          className="text-sm font-bold w-1/6 mr-2"
        >
          Beta:
        </label>
        <ToggleButton
          name="beta"
          value="beta"
          className="w-[10px] h-[10px]"
          selected={userData.beta}
          onChange={() =>
            setUserData((p) => {
              return { ...p, beta: !p.beta };
            })
          }
        >
          <CheckIcon />
        </ToggleButton>
      </div>
      <button
        className="uppercase bg-red-700 w-1/2 text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
        onClick={onSave}
        disabled={disabled}
      >
        Save
      </button>
    </div>
  );
}
