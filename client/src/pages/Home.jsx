import React from "react";
import Awards from "./Home/awards/Awards";
import Featured from "./Home/featured/Featured";
import Hero from "./Home/hero/Hero";
import { Link } from "react-router-dom";
import Products from "../components/Products";
import GotoProductPageCard from "../components/GotoProductPageCard";

function Home({ products }) {
  const topProducts = products ? products.slice(0, 7) : [];

  return (
    <>
      <div className="home">
        <Hero />
        <div className="md:grid grid-col-1 mt-56 md:text-4xl text-lg">
          <h3 className="text-center text-[#FF794D] font-serif">
            List of Boycotted Products
          </h3>
          <Products products={topProducts} showMoreButton={false} />
          {products && products.length > 7 && (
            <div className="center mt-4">
              <Link to="/products">
                <button className="bg-emerald-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
                  View All Products
                </button>
              </Link>
            </div>
          )}
        </div>
        <GotoProductPageCard />
      
        <Featured />
      </div>
    </>
  );
}

export default Home;
