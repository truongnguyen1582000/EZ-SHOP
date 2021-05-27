import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

function PasswordField({
  name,
  label,
  form,
  placeholder = "",
  disabled = false,
}) {
  const [showPassword, setshowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { name, value, onChange, onBlur },
        fieldState: { error, invalid },
      }) => (
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
          <OutlinedInput
            id={name}
            label={label}
            placeholder={`${placeholder}...`}
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setshowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText error={invalid}>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

export default PasswordField;
