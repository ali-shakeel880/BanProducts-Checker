import React, { useState } from "react";
import { DUMMY_PRODUCTS } from "../../data";
import ProductItem from "./AdminProductItem";

const Products = ({ isAdmin }) => { // Receive isAdmin prop
  const [products, setProducts] = useState(DUMMY_PRODUCTS);

  return (
    <section className="admin-products">
      {products.length > 0 ? (
        <div className="container admin-products__container">
          {products.map(({ id, thumbnail, category, title, desc, authorID }) => (
            <ProductItem
              key={id}
              productID={id}
              thumbnail={thumbnail}
              category={category}
              title={title}
              description={desc}
              authorID={authorID}
            />
          ))}
        </div>
      ) : (
        <h2 className="center">No Products Found</h2>
      )}
    </section>
  );
};

export default Products;
