import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  makeStyles,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import React from "react";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    margin: "8px",
  },
  field: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "140px",
  },
}));

function QuantifyField({
  name,
  label = "",
  form,
  placeholder = "",
  fullWidth = true,
  disabled = false,
}) {
  const classes = useStyles();
  return (
    <FormControl
      fullWidth={fullWidth}
      margin="normal"
      variant="outlined"
      size="small"
    >
      <Typography className={classes.label}>{label}</Typography>
      <Controller
        name={name}
        control={form.control}
        render={({
          field: { name, value, onChange, onBlur },
          fieldState: { error, invalid },
        }) => (
          <>
            <Box className={classes.field}>
              <IconButton
                onClick={() =>
                  form.setValue(name, parseInt(value) ? parseInt(value) - 1 : 1)
                }
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              <OutlinedInput
                id={name}
                placeholder={`${placeholder}...`}
                type="tel"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
              <IconButton
                onChange={onChange}
                onClick={() =>
                  form.setValue(name, parseInt(value) ? parseInt(value) + 1 : 1)
                }
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>
            <FormHelperText error={invalid}>{error?.message}</FormHelperText>
          </>
        )}
      />
    </FormControl>
  );
}

export default QuantifyField;
