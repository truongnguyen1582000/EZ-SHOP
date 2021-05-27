import { useSnackbar } from "notistack";
import React, { useEffect } from "react";

function ProductFeature(props) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    enqueueSnackbar("Wellcome to EZ-STORE ~ . ~ let's shop now !!!", {
      variant: "info",
    });
  }, []);
  return <div>ProductFeature</div>;
}

export default ProductFeature;
