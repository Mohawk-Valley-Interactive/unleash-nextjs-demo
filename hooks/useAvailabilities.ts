import axios from "axios";
import { useState } from "react";

interface FetchAvailabilitiesProps {
  slug: string;
  date: string;
  time: string;
  partySize: string;
}

export interface Data {
  time: string;
  available: boolean;
}

export default function useAvailabilities() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<Data[] | null>(null);

  async function fetchAvailabilities({
    slug,
    partySize,
    date,
    time,
  }: FetchAvailabilitiesProps) {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/restaurant/${slug}/availability`,
        { params: { date, time, partySize } }
      );

      setData(response.data);
      setError(null);
    } catch (e: any) {
      setError(e.response.data.errorMessage);
    }

    setLoading(false);
  }

  return { loading, error, data, fetchAvailabilities };
}
