import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch } from "react-redux";
import { register } from "../userSlice";
import RegisterForm from "./RegisterForm";

function Register({ hanleClose }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const action = register(values);
      const resultAction = await dispatch(action);
      const newUser = unwrapResult(resultAction);
      console.log("new user: ", newUser);
      enqueueSnackbar("Register succcess, Logged-in !", { variant: "success" });
      hanleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
