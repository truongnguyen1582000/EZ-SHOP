import { Skeleton } from "@material-ui/lab";
import React from "react";

function CategorySkeleton({ length }) {
  return (
    <ul>
      {Array.from(new Array(length)).map((x, index) => (
        <li key={index}>
          <Skeleton />
        </li>
      ))}
    </ul>
  );
}

export default CategorySkeleton;
