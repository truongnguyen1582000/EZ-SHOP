import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import InputField from "components/form-control/InputField";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {},
  wrapperInput: {
    display: "flex",
    alignItems: "center",

    "& > span": {
      margin: `0 ${theme.spacing(1)}px`,
    },
  },
  heading: {
    paddingTop: `${theme.spacing(1.5)}px`,
    marginTop: theme.spacing(1),
    borderTop: `1px solid #000`,
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1),
  },
}));

function FilterByPrice({ onChange }) {
  const classes = useStyles();

  const schema = yup.object().shape({
    salePrice_gte: yup
      .string()
      .required("*")
      .test("", "*", (value) => {
        return parseInt(value) >= 0;
      }),
    salePrice_lte: yup
      .string()
      .required("*")
      .test("", "*", (value) => {
        return parseInt(value) > 0;
      }),
  });

  const form = useForm({
    defaultValues: {
      salePrice_gte: 0,
      salePrice_lte: 0,
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (value) => {
    onChange(value);
  };

  return (
    <Box>
      <Typography className={classes.heading} variant="body1" color="initial">
        Giá
      </Typography>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <Box className={classes.wrapperInput}>
          <InputField
            name="salePrice_gte"
            label="Từ"
            form={form}
            type="number"
            variant="standard"
          />
          <span>-</span>
          <InputField
            name="salePrice_lte"
            label="Đến"
            form={form}
            type="number"
            variant="standard"
          />
        </Box>
        <Box className={classes.btn}>
          <Button type="submit" variant="outlined" color="primary">
            Áp dụng
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default FilterByPrice;
