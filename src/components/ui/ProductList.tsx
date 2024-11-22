/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useProducts, useScrolling } from '../../hooks';
import Card from './Card';

import { PrdListStyle } from '../styles';
import classNames from "classnames/bind";

import { CircularProgress } from "@mui/material";

const cx = classNames.bind(PrdListStyle);

const ProductList = () => {

  const { products, isLoading, hasMore, loadProducts, setProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    setPage(1);             // reset page on new search
    setProducts([]);        // clear existing products
    loadProducts(query, 1); // fetch new products for search
  };

  // Handle infinite scroll
  const lastProductElementRef = useScrolling({
    isLoading: isLoading,
    hasMore,
    onIntersect: () => setPage((prevPage) => prevPage + 1),
  });

  // Fetch products when page changes
  useEffect(() => {
    if (page > 1) loadProducts(searchQuery, page);
  }, [page, searchQuery]);

  // Initial fetch
  useEffect(() => {
    loadProducts(searchQuery, 1);
  }, [searchQuery]);

  return (
    <div className={cx(['product-list-container', 'w-full grid place-items-center gap-4'])}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input w-[70%] p-2 pl-4 pr-4 border border-solid border-orange-500 rounded-md outline-none"
      />
      <div className={cx(["product-list", "grid grid-cols-5 place-items-center gap-6"])}>
        {products.map((product, index) => (
          <Card key={product.id} ref={index === products.length - 1 ? lastProductElementRef : null} product={product} />
        ))}
      </div>
      {isLoading && (
        <CircularProgress size={40} sx={{ color: 'orange' }} />
      )}

      {!hasMore && <p>End of product list reached</p>}
    </div>
  );
};

export default ProductList;
