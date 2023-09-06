"use client";

import axios from "axios";
import getApiUrl from "@/utils/getApiUrl";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { useUnleashContext } from "@unleash/nextjs";

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
  const updateContext = useUnleashContext();

  async function loadProfile(id: string) {
    setLoading(true);
    const token = getCookie("jwt");
    if (!token) {
      setData(null);
      setError("No auth token available.");
      setLoading(false);
      updateContext({
        properties: {
          admin: "false",
          beta: "false",
          city: "",
          email: "",
          firstname: "",
          lastname: "",
          phone: "",
        },
      });
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
      updateContext({
        properties: {
          admin: "false",
          beta: "false",
          city: "",
          email: "",
          firstname: "",
          lastname: "",
          phone: "",
        },
      });
    } else {
      setData(response.data);
      setError(null);
      updateContext({
        properties: {
          admin: response.data.admin ? "true" : "false",
          beta: response.data.beta ? "true" : "false",
          city: response.data.city,
          email: response.data.email,
          firstname: response.data.first_name,
          lastname: response.data.last_name,
          phone: response.data.phone,
        },
      });
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
      updateContext({
        properties: {
          admin: response.data.admin ? "true" : "false",
          beta: response.data.beta ? "true" : "false",
          city: response.data.city,
          email: response.data.email,
          firstname: response.data.first_name,
          lastname: response.data.last_name,
          phone: response.data.phone,
        },
      });
      setData(response.data);
      setError(null);
      callback(response.data);
    }
  }

  return { data, error, loading, loadProfile, saveProfile };
}
