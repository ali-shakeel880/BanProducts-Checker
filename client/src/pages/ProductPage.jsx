import React from 'react';
import Products from '../components/Products';
import ImageSwiper from '../components/ImageSwiper'

const ProductsPage = () => {
  return (
    <div className="products-page  mt-10">
      <ImageSwiper/>
      <h1 className="text-center text-[#FF794D] text-6xl font-sans text-bold">All Boycotted Products</h1>
      <Products showMoreButton={true} />
    </div>
  );
};

export default ProductsPage;
