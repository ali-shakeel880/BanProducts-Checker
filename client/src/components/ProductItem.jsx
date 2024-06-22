import React from "react";
import { Link } from "react-router-dom";
import image from '../images/logo.png'

const ProductItem = ({
  productID,
  thumbnail,
  category,
  title,
  description,
  status,
  reasons,
  countries,
  alternatives,
}) => {
  console.log(
    category,
    title,
    description,
    status,
    reasons,
    countries,
    alternatives
  );

  const shortDescription =
    description.length > 500 ? description.substr(0, 500) + "..." : description;

  const productTitle =
    title.length > 30 ? title.substr(0, 30) + "..." : title;

  return (
    
    <Link to={`/products/${productID}`} className="block">
    <div className="mx-16 mt-8 shadow-lg border border-gray-300 grid grid-cols-1 md:grid-cols-[200px,1fr] gap-4 p-4" id={productTitle}>
      <div >
        <img
          className="w-full max-w-[200px] border-2 md:border-0 border-slate-100 rounded-md md:rounded-none mb-3 md:mb-0"
          src={thumbnail || image}
          alt={"img-logo"}
          width="296"
          height="192"
          loading="lazy"
        />
      </div>
      <div>
        <div className="company-content">
          <h4 className="text-xl font-bold">
            {productTitle} <span className={`ml-2 ${status === 'avoid' || status==='boycott' ? 'text-red-500' : 'text-green-500'}`}> {status === 'avoid' || status === 'boycott' ? 'Boycott' : 'Available'}</span>
          </h4>
          {category && category.trim().length > 0 && (
            <p className="text-base text-gray-700 font-semibold">Category: <span className="text-gray-500">{category}</span></p>
          )}
          {shortDescription && shortDescription.length > 0 && (
            <p className="text-base text-gray-700">{shortDescription}</p>
          )}
          {countries && countries.filter(country => country.trim().length > 0).length > 0 && (
            <p className="text-base text-gray-700 font-semibold">
              Countries: <span className="text-gray-500">{countries.join(', ')}</span>
            </p>
          )}
          {alternatives && alternatives.filter(alternative => alternative.trim().length > 0).length > 0 && (
            <p className="text-base text-gray-700 font-semibold">
              Alternatives: <span className="text-gray-500">{alternatives.join(', ')}</span>
            </p>
          )}
          {reasons && reasons.filter(reason => reason.trim().length > 0).length > 0 && (
            <p className="text-base text-gray-700 font-semibold">
              Reasons: <span className="text-gray-500">{reasons.join(', ')}</span>
            </p>
          )}
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ProductItem;
