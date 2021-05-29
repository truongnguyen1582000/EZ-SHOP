import React, { useEffect, useState } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { categoryApi } from "api/categoryApi";

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    listStyle: "none",

    "&:hover": {
      cursor: "pointer",
      color: theme.palette.primary.main,
    },
  },
  list: {
    marginLeft: "8px",
  },
}));

function FilterByCategory({ onChange }) {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoryApi.getAll();
        console.log(response);
        setCategoryList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  const handleCategoryClick = (newCategory) => {
    onChange(newCategory);
  };

  return (
    <Box>
      <Typography variant="body1" color="initial">
        Danh mục sản phẩm
      </Typography>
      <Box variant="ul" className={classes.list}>
        {categoryList.map((category) => (
          <li
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={classes.listItem}
          >
            {category.name}
          </li>
        ))}
      </Box>
    </Box>
  );
}

export default FilterByCategory;
