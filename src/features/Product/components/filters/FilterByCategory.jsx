import React, { useEffect, useState } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { categoryApi } from "api/categoryApi";
import CategorySkeleton from "./CategorySkeleton";

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoryApi.getAll();
        console.log(response);
        setCategoryList(response);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
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
      <ul className={classes.list}>
        {isLoading ? (
          <CategorySkeleton length={6} />
        ) : (
          categoryList.map((category) => (
            <li
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={classes.listItem}
            >
              {category.name}
            </li>
          ))
        )}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
