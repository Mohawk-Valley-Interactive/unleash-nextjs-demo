"use client";

import axios from "axios";
import getApiUrl from "@/utils/getApiUrl";
import { getCookie } from "cookies-next";

export interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
  city: string;
  email: string;
  phone: string;
  admin: boolean;
  beta: boolean;
}

export default async function useProfileList() {
  const host = getApiUrl();
  const token = getCookie("jwt");
  const response = await axios.get(`${host}/api/profile/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status >= 400) {
    return [];
  }

  return response.data;
}
