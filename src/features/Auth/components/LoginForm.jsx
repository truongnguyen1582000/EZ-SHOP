import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../components/form-control/InputField";
import PasswordField from "../../../components/form-control/PasswordField";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(1),
  },
  heading: {
    textAlign: "center",
    marginBottom: theme.spacing(1),
  },
  icon: {
    marginBottom: theme.spacing(1),
    margin: "0 auto",
    backgroundColor: theme.palette.secondary.main,
  },
  btn: {
    marginTop: theme.spacing(2),
  },
}));

function LoginForm({ onSubmit }) {
  const classes = useStyles();

  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required("Please enter your email.")
      .email("Please enter an valid email address."),
    password: yup.string().required("Please enter your password."),
  });

  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { isSubmitting } = form.formState;

  // add async await for loading progress
  const handleSubmit = async (values) => {
    await onSubmit(values);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.root}>
      <Avatar className={classes.icon}>
        <LockIcon />
      </Avatar>
      <Typography className={classes.heading} variant="h5">
        Create An Account
      </Typography>
      <InputField
        name="identifier"
        label="Email"
        placeholder="Enter your full name"
        form={form}
      />

      <PasswordField
        name="password"
        label="Password"
        placeholder="Enter your password."
        form={form}
      />

      {isSubmitting && <LinearProgress />}
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        className={classes.btn}
        disabled={isSubmitting}
      >
        Sign in
      </Button>
    </form>
  );
}

export default LoginForm;
