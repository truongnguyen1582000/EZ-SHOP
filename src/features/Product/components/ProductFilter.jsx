import { Box } from "@material-ui/core";
import React from "react";
import FilterByCategory from "./filters/FilterByCategory";
import FilterByPrice from "./filters/FilterByPrice";
import FilterByService from "./filters/FilterByService";

function ProductFilter({ filters, onChange }) {
  const handleFiltersChange = (newVal) => {
    onChange(newVal);
  };

  const handleCategoryChange = (newCategory) => {
    const newFilters = {
      ...filters,
      "category.id": newCategory,
    };
    onChange(newFilters);
  };

  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handleFiltersChange} />
      <FilterByService filters={filters} onChange={handleFiltersChange} />
    </Box>
  );
}

export default ProductFilter;
