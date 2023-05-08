import axios from "axios";
import { useAuthState } from "../app/context/AuthorizationProvider";

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
      setAuthState({
        data: null,
        error: null,
        loading: true,
      });
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
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
      setAuthState({
        data: null,
        error: null,
        loading: true,
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

  return { signIn, signUp };
}
