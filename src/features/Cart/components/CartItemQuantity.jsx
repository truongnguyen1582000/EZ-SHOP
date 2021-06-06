import {
  Box,
  FormControl,
  IconButton,
  makeStyles,
  OutlinedInput,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    margin: "8px",
  },
  field: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "145px",
  },
  form: {
    transform: "translateY(50%)",
  },
}));

function CartItemQuantity({ value, name, onChange }) {
  const classes = useStyles();

  const handleQuantityChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <FormControl
      className={classes.form}
      margin="normal"
      variant="outlined"
      size="small"
    >
      <Box className={classes.field}>
        <IconButton
          onClick={() => {
            onChange(value - 1);
          }}
          disabled={value === 1}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
        <OutlinedInput
          id={name}
          type="tel"
          value={value}
          onChange={handleQuantityChange}
        />
        <IconButton
          onChange={onChange}
          onClick={() => {
            onChange(value + 1);
          }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
    </FormControl>
  );
}

export default CartItemQuantity;
