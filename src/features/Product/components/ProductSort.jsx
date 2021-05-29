import { Tab, Tabs } from "@material-ui/core";
import React from "react";

function ProductSort({ value, onChange }) {
  const handleChange = (e, value) => {
    onChange(value);
  };
  return (
    <Tabs
      value={value}
      textColor="inherit"
      indicatorColor="secondary"
      onChange={handleChange}
      aria-label="simple tabs example"
    >
      <Tab label="Tăng dần" value="salePrice:ASC" />
      <Tab label="Giảm dần" value="salePrice:DESC" />
    </Tabs>
  );
}

export default ProductSort;
