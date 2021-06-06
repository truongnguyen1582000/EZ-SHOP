import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button } from "@material-ui/core";
import QuantifyField from "components/form-control/QuantityField";
import { useHistory } from "react-router";
import { useSnackbar } from "notistack";

const schema = yup.object().shape({
  quantity: yup
    .number()
    .min(1, "Minimun value is 1.")
    .required("Please enter quantity.")
    .typeError("Please enter a number."),
});

function AddToCartForm({ onSubmit }) {
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (value) => {
    onSubmit(value);
    enqueueSnackbar("Add to cart success !", { variant: "success" });
  };

  const history = useHistory();

  const handleBuyNowClick = () => {
    setTimeout(() => {
      history.push("/cart");
    }, 600);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantifyField name="quantity" label="Quantity" form={form} />

      <Box marginRight="16px" display="inline">
        <Button
          type="submit"
          onClick={() => {
            if (!form.formState.errors.quantity?.message) {
              handleBuyNowClick();
            }
          }}
          variant="contained"
          color="primary"
          size="large"
        >
          BUY NOW
        </Button>
      </Box>
      <Button type="submit" variant="contained" color="primary" size="large">
        ADD TO CARt
      </Button>
    </form>
  );
}

export default AddToCartForm;
