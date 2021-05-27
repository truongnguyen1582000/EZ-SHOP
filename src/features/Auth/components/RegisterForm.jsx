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

function RegisterForm({ onSubmit }) {
  const classes = useStyles();

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required("Please enter your name.")
      .test(
        "Should has at least 2 word.",
        "Please enter at least 2 word.",
        (values) => {
          return values.split(" ").length >= 2;
        }
      ),
    username: yup
      .string()
      .required("Please enter your user name.")
      .test("Invalid user name.", (values) => {
        return values.split(" ").length === 1;
      }),
    email: yup
      .string()
      .required("Please enter your email.")
      .email("Please enter an valid email address."),
    password: yup
      .string()
      .required("Please enter your password.")
      .min(6, "Please enter at least 6 characters."),
    retypePassword: yup
      .string()
      .required("Please verify password again.")
      .oneOf([yup.ref("password")], "Password is not match."),
  });

  const form = useForm({
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });

  const { isSubmitting } = form.formState;

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
        name="fullName"
        label="Full Name"
        placeholder="Enter your full name"
        form={form}
      />
      <InputField
        name="username"
        label="User name"
        placeholder="Enter your user name"
        form={form}
      />
      <InputField
        name="email"
        label="Email"
        placeholder="Enter your email"
        form={form}
      />
      <PasswordField
        name="password"
        label="Password"
        placeholder="Enter your password."
        form={form}
      />
      <PasswordField
        name="retypePassword"
        label="Retype Password"
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
        Create An Account
      </Button>
    </form>
  );
}

export default RegisterForm;
