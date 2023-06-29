"use client";

import axios from "axios";
import getApiUrl from "@/utils/getApiUrl";
import { useState } from "react";
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

interface UseProfileInterface {
  data: UserData | null;
  error: string | null;
  loading: boolean;
  loadProfile: (id: string) => {};
  saveProfile: (p: UserData, callback: (e: any) => void) => void;
}

export default function useProfile(): UseProfileInterface {
  const host = getApiUrl();
  const [data, setData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function loadProfile(id: string) {
    setLoading(true);
    const token = getCookie("jwt");
    if (!token) {
      setData(null);
      setError("No auth token available.");
      setLoading(false);
      return;
    }
    const response = await axios.get(`${host}/api/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLoading(false);
    if (response.status >= 400) {
      setData(null);
      setError(`${response.status} - ${response.statusText}`);
    } else {
      setData(response.data);
      setError(null);
    }
  }

  async function saveProfile(p: UserData, callback: (e: any) => void) {
    const token = getCookie("jwt");
    if (!token) {
      setData(null);
      setError("No auth token available.");
      setLoading(false);
      return;
    }
    const response = await axios.put(`${host}/api/profile/${p.email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        ...p,
      },
    });

    setLoading(false);
    if (response.status >= 400) {
      setData(null);
      setError(`${response.status} - ${response.statusText}`);
      callback(error);
    } else {
      setData(response.data);
      setError(null);
      callback(response.data);
    }
  }

  return { data, error, loading, loadProfile, saveProfile };
}
