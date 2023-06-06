"use client";

import React, { useEffect, useMemo, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "../../hooks/useAuth";
import { useAuthState } from "../context/AuthorizationProvider";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface Props {
  isSignIn: boolean;
}

/***
 * TODO:  Someday, it would be nice to not to tie the
 *        button components into the modal components.
 *        We can instead hoist up the open/close
 *        functionality using imperative handles.
 *
 *        Also not a big fan of how the input is being
 *        handled.
 */
export default function AuthButton({ isSignIn }: Props) {
  const { signIn, signUp, signOut } = useAuth();
  const { loading, data, error } = useAuthState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (isSignIn) {
      if (inputs.password && inputs.email) {
        return setDisabled(false);
      }
    } else {
      // is sign-up form
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.phone &&
        inputs.city &&
        inputs.password
      ) {
        return setDisabled(false);
      }
    }

    setDisabled(true);
  }, [inputs]);

  const modalTitle = useMemo(() => {
    return isSignIn ? (data ? "Sign Out" : "Sign In") : "Create Account";
  }, [isSignIn, data]);
  const buttonText = modalTitle;
  const authButton = useMemo(() => {
    return isSignIn ? (
      <button
        onClick={handleOpen}
        className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
      >
        {data ? "Sign Out" : "Sign In"}
      </button>
    ) : (
      <button
        onClick={handleOpen}
        className="border p-1 px-4 rounded"
      >
        Sign Up
      </button>
    );
  }, [isSignIn, data]);

  const modalInstructions = useMemo(() => {
    return isSignIn
      ? "Log Into Your Account"
      : "Create Your RuntimeDining Account";
  }, [isSignIn]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isSignIn) {
      if (data) {
        signOut();
      } else {
        signIn({
          email: inputs.email,
          password: inputs.password,
          onSuccess: handleClose,
        });
      }
    } else {
      signUp({
        ...inputs,
        onSuccess: handleClose,
      });
    }
  };

  return (
    <div>
      {authButton}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="p-2 h-[275px] flex justify-center items-center">
              <CircularProgress className="" />
            </div>
          ) : (
            <>
              <div>
                {error ? (
                  <Alert
                    severity="error"
                    className="mb-5"
                  >
                    {error}
                  </Alert>
                ) : (
                  <></>
                )}
                <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                  <p className="text-sm text-black">{modalTitle}</p>
                </div>
              </div>
              <div className="m-auto text-black">
                {data ? null : (
                  <>
                    <h2 className="text-2xl font-light text-center">
                      {modalInstructions}
                    </h2>
                    <AuthModalInputs
                      isSignIn={isSignIn}
                      inputs={inputs}
                      handleInputChange={handleInputChange}
                    />
                  </>
                )}
                <button
                  className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                  disabled={data === null && disabled}
                  onClick={handleClick}
                >
                  {buttonText}
                </button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
