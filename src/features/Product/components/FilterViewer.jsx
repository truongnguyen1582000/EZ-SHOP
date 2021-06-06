import { Box, Chip, makeStyles } from "@material-ui/core";
import { categoryApi } from "api/categoryApi";
import React, { useMemo, useState } from "react";
import { formatPrice } from "../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",

    "& > li": {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
  chip: {
    cursor: "pointer",
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: (filters) => "Miễn phí vận chuyển",
    isActive: (filters) => filters.isFreeShip,
    isVisible: (filters) => true,
    isRemovable: false,
    onRemove: (filters) => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }

      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: (filters) => "Khuyến mãi",
    isActive: (filters) => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;

      return newFilters;
    },
    onToggle: (filters) => {},
  },
  {
    id: 3,
    getLabel: (filters) =>
      `Từ ${formatPrice(filters.salePrice_gte)} đến ${formatPrice(
        filters.salePrice_lte
      )}`,
    isActive: (filters) => true,
    isVisible: (filters) => filters.salePrice_gte && filters.salePrice_lte,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_gte;
      delete newFilters.salePrice_lte;
      return newFilters;
    },
    onToggle: (filters) => {},
  },
];

function FilterViewer({ filters = {}, onChange }) {
  const classes = useStyles();
  const [value, setvalue] = useState("");

  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);

  (async () => {
    try {
      if (filters["category.id"]) {
        const { name } = await categoryApi.get(filters["category.id"]);
        setvalue(name);
      }
    } catch (error) {
      console.log(error);
    }
  })();

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            className={classes.chip}
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? "primary" : "default"}
            clickable={x.isRemovable}
            size="small"
            onClick={
              x.isRemovable
                ? null
                : () => {
                    onChange(x.onToggle(filters));
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    onChange(x.onRemove(filters));
                  }
                : null
            }
          />
        </li>
      ))}

      {filters["category.id"] ? (
        <Chip
          className={classes.chip}
          label={value}
          color="primary"
          clickable={false}
          size="small"
          onDelete={() => {
            const newFilters = { ...filters };
            delete newFilters["category.id"];
            onChange(newFilters);
          }}
        />
      ) : (
        ""
      )}
    </Box>
  );
}

export default FilterViewer;
