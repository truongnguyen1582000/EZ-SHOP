import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@material-ui/core";
import QuantifyField from "components/form-control/QuantityField";

const schema = yup.object().shape({
  quantity: yup
    .number()
    .min(1, "Minimun value is 1.")
    .required("Please enter quantity.")
    .typeError("Please enter a number."),
});

function AddToCartForm({ onSubmit }) {
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (value) => {
    console.log(value);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantifyField name="quantity" label="Quantity" form={form} />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
      >
        BUY
      </Button>
    </form>
  );
}

export default AddToCartForm;
