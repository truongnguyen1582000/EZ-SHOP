import {
  Box,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  heading: {
    paddingTop: theme.spacing(1),
    borderTop: `1px solid #000`,
    marginTop: theme.spacing(2),
  },
}));

function FilterByService({ filters, onChange }) {
  const classes = useStyles();
  const handleChange = (e) => {
    onChange({
      [e.target.name]: e.target.checked,
      _page: 1,
    });
  };

  return (
    <Box>
      <Typography
        className={classes.heading}
        variant="subtitle2"
        color="initial"
      >
        DỊCH VỤ
      </Typography>
      <ul>
        {[
          { name: "isFreeShip", label: "Miễn phí vận chuyển" },
          { name: "isPromotion", label: "Giảm giá" },
        ].map((service) => (
          <li key={service.name}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters[service.name]}
                  onChange={handleChange}
                  name={service.name}
                  color="primary"
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
