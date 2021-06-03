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
    alignItems: "center",
    maxWidth: "180px",
  },
}));

function QuantifyField({
  name,
  label = "",
  form,
  placeholder = "",
  disabled = false,
}) {
  const classes = useStyles();
  return (
    <FormControl fullWidth margin="normal" variant="outlined" size="small">
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
                type="number"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
              <IconButton
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
