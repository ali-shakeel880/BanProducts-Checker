import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../images/avatar1.jpg";

const ProductAuthor = () => {
  return (
    <Link to={`/Products/users/sdfsdf`} className="product__author">
      <div className="Product__author-avatar">
        <img src={Avatar} alt="" />
      </div>
      <div className="product__author-details">
        <h5>By: Sarmad Aslam</h5>
        <small>Just Now</small>
      </div>
    </Link> 
  );
};

export default ProductAuthor;
