import { useState } from "react";
import { fetchProducts, Product } from "../services/apiRequests";

interface PrdsResult {
  products: Product[];
  isLoading: boolean;
  hasMore: boolean;
  loadProducts: (search?: string, pageNum?: number) => Promise<void>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

/**
 * Custom hook handle fetch API all products
 */
export const useProducts = (): PrdsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true); // track if more data is available

  const loadProducts = async (search = "", pageNum = 1) => {
    setIsLoading(true);
    try {
      const skip = (pageNum - 1) * 20; // render every 20 items
      const response = await fetchProducts(search, skip, 20);

      setProducts((prevProducts) =>
        pageNum === 1
          ? response.products
          : [...prevProducts, ...response.products]
      );

      setHasMore(response.products.length === 20); // handle if list when searching < 20
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    products,
    isLoading,
    hasMore,
    loadProducts,
    setProducts,
  };
};
