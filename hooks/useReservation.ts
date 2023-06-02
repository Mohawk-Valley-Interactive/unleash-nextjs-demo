import getApiUrl from "@/utils/getApiUrl";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";

interface ReservationProps {
  slug: string;
  partySize: string;
  date: string;
  time: string;
  bookerFirstName: string;
  bookerLastName: string;
  bookerPhone: string;
  bookerEmail: string;
  bookerOccasion: string;
  bookerRequest: string;
  setBooked: Dispatch<SetStateAction<boolean>>;
}

export default function useReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function createReservation({
    slug,
    partySize,
    date,
    time,
    bookerFirstName,
    bookerLastName,
    bookerPhone,
    bookerEmail,
    bookerOccasion,
    bookerRequest,
    setBooked,
  }: ReservationProps) {
    setLoading(true);
    try {
      const host = getApiUrl();
      const response = await axios.post(
        `${host}/api/restaurant/${slug}/reserve`,
        {
          firstName: bookerFirstName,
          lastName: bookerLastName,
          phone: bookerPhone,
          email: bookerEmail,
          occasion: bookerOccasion,
          request: bookerRequest,
        },
        {
          params: {
            partySize,
            date,
            time,
          },
        }
      );
      setLoading(false);
      setBooked(true);

      return response.data;
    } catch (e: any) {
      setError(e.response.data.errorMessage);
    }

    setBooked(false);
    setLoading(false);
    return null;
  }

  return { loading, error, createReservation };
}
