import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";

const Products = ({ initialVisibleCount = 7, showMoreButton = false }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/getproducts");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    const interval = setInterval(() => {
      fetchProducts();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 7);
  };

  if (loading) {
    return <h2 className="center">Loading...</h2>;
  }

  if (error) {
    return <h2 className="center">{error}</h2>;
  }

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <section className="products">
      {visibleProducts.length > 0 ? (
        <div className="mt-24">
          {visibleProducts.map(
            ({
              _id,
              logo,
              categories,
              name,
              description,
              status,
              reasons,
              countries,
              alternatives,
            }) => (
              <ProductItem
                key={_id}
                productID={_id}
                thumbnail={logo}
                category={categories.join(", ")}
                title={name}
                description={description}
                status={status}
                reasons={reasons}
                countries={countries}
                alternatives={alternatives}
              />
            )
          )}
          {showMoreButton && visibleCount < products.length && (
            <div className=" text-center mt-4">
              <button
                onClick={handleLoadMore}
                className="bg-emerald-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-8"
              >
               View  More Products
              </button>
            </div>
          )}
        </div>
      ) : (
        <h2 className="center">No Products Found</h2>
      )}
    </section>
  );
};

export default Products;
