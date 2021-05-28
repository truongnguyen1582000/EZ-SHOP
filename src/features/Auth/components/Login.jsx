import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";
import LoginForm from "./LoginForm";

function Login({ handleClose }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const resultValue = await dispatch(action);
      const loginInfo = unwrapResult(resultValue);
      enqueueSnackbar("Register succcess, Logged-in !", { variant: "success" });
      setTimeout(() => {
        enqueueSnackbar(`Hello ${loginInfo.fullName}`, { variant: "success" });
      }, 500);
      handleClose();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
