import { TextField } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";

function InputField({ name, label, form, placeholder = "", disabled = false }) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { name, value, onChange, onBlur },
        fieldState: { error, invalid },
      }) => (
        <TextField
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={invalid}
          helperText={error?.message}
          disabled={disabled}
          fullWidth
          variant="outlined"
          placeholder={`${placeholder}...`}
          margin="normal"
        />
      )}
    />
  );
}

export default InputField;
