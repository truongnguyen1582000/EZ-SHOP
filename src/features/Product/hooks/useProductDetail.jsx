import { productApi } from "api/productApi";
import { useEffect, useState } from "react";

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const fetchedProduct = await productApi.get(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [productId]);

  return { product, loading };
}
