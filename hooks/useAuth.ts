import axios from "axios";
import { useAuthState } from "../app/context/AuthorizationProvider";
import { getCookie, deleteCookie } from "cookies-next";

export interface SignInParams {
  email: string;
  password: string;
  onSuccess: () => void;
}

export interface SignUpParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  city: string;
  phone: string;
  onSuccess: () => void;
}

export default function useAuth() {
  const { data, error, loading, setAuthState } = useAuthState();

  const signIn = async ({ email, password, onSuccess }: SignInParams) => {
    try {
      setAuthState((prev) => {
        return {
          ...prev,
          loading: true,
        };
      });
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );

      const jwt = getCookie("jwt");
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      console.log(`signIn ${response.data}`);
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });

      onSuccess();
    } catch (error: any) {
      console.log(`signIn error ${error.response.data.errorMessage}`);
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  const signUp = async ({
    email,
    password,
    firstName,
    lastName,
    city,
    phone,
    onSuccess,
  }: SignUpParams) => {
    try {
      setAuthState((prev) => {
        return {
          ...prev,
          loading: true,
        };
      });
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          email,
          password,
          firstName,
          lastName,
          city,
          phone,
        }
      );

      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });

      onSuccess();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  const fetchUser = async () => {
    setAuthState((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    try {
      const jwt = getCookie("jwt");

      if (!jwt) {
        setAuthState({
          data: null,
          error: null,
          loading: false,
        });

        return;
      }

      const response = await axios.get("http://localhost:3000/api/users/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  const signOut = async () => {
    setAuthState((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });

    // todo: someday, we might actually cache creds so calling the service
    //       will be helpful
    const response = await axios.post("http://localhost:3000/api/auth/signout");

    const jwt = getCookie("jwt");
    if (jwt) {
      deleteCookie("jwt");
    }
    axios.defaults.headers.common["Authorization"];

    setAuthState((prev) => {
      return {
        ...prev,
        data: null,
        loading: false,
      };
    });
  };

  return { fetchUser, signIn, signUp, signOut };
}
