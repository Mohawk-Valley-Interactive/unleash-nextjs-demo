"use client";

import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";

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

  const authButton = useMemo(() => {
    return isSignIn ? (
      <button
        onClick={handleOpen}
        className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
      >
        Sign In
      </button>
    ) : (
      <button
        onClick={handleOpen}
        className="border p-1 px-4 rounded"
      >
        Sign Up
      </button>
    );
  }, [isSignIn]);

  const modalTitle = useMemo(() => {
    return isSignIn ? "Sign In" : "Create Account";
  }, [isSignIn]);

  const modalInstructions = useMemo(() => {
    return isSignIn ? "Log Into Your Account" : "Create Your OpenTable Account";
  }, [isSignIn]);

  const buttonText = useMemo(() => {
    return isSignIn ? "Sign In" : "Create Account";
  }, [isSignIn]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
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
          <div className="p-2">
            <div className="uppercase font-bold text-center pb-2 border-b mb-2">
              <p className="text-sm text-black">{modalTitle}</p>
            </div>
          </div>
          <div className="m-auto text-black">
            <h2 className="text-2xl font-light text-center">
              {modalInstructions}
            </h2>
            <AuthModalInputs
              isSignIn={isSignIn}
              inputs={inputs}
              handleInputChange={handleInputChange}
            />
            <button className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400">
              {buttonText}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
