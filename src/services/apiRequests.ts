import axios from "axios";
import { API_URL } from "../constants/url";

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
}

interface FetchProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Fetch products from API
 * @param search // search query
 * @param skip // number of items to skip for pagination
 * @param limit // number of items to fetch (default 20 items)
 * @returns // promise
 */
export const fetchProducts = async (
  search = "",
  skip = 0,
  limit = 20
): Promise<FetchProductsResponse> => {
  const url = search ? `${API_URL}/products/search` : `${API_URL}/products`; // if search empty -> all prds
  const params = search ? { q: search, skip, limit } : { skip, limit };

  const response = await axios.get(url, { params });
  return response.data;
};
