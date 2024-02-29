// ProductFilter.jsx
import React from 'react';

function ProductFilter({ onFilterChange }) {
  return (
    <div className="flex justify-center items-center py-4">
      <select
        onChange={(e) => onFilterChange(e.target.value)}
        className="select select-bordered"
      >
        <option value="latest">Latest</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>
    </div>
  );
}

export default ProductFilter;
