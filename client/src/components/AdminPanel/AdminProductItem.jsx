import React from "react";
import { Link } from "react-router-dom";
import image from '../../images/logo.png'

const ProductItem = ({
  productID,
  thumbnail,
  category,
  title,
  description
}) => {
  const shortDescription =
    description.length > 500 ? description.substr(0, 500) + "..." : description;

  const productTitle =
    description.length > 30 ? description.substr(0, 30) + "..." : title;
  return (
      <article className="admin-product">
        <div className="product__thumbnail">
          <img src={thumbnail } alt={title} />
        </div>
        <div className="admin-product__content">
        <Link to={`/admin/products/${productID}`}>
          <h3>{productTitle}</h3>
          <p>{shortDescription}</p>
        </Link>

          <div className="admin-product__footer">
            <productAuthor />
            <Link
              to={`/admin/products/categories/${category}`}
              className="btn category"
            >
              {category}
            </Link>
          </div>
        </div>
      </article>
  );
};

export default ProductItem;
