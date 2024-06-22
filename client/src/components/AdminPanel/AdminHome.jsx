import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableProductsCount, setAvailableProductsCount] = useState(0);
  const [bannedProductsCount, setBannedProductsCount] = useState(0);
  const [uniqueCountries, setUniqueCountries] = useState([]);
  const [totalProductsCount, setTotalProductsCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/getproducts");
        setProducts(response.data);

        // Calculate counts
        const availableCount = response.data.filter(
          (product) => 
            product.status.toLowerCase() !== "avoid" &&
            product.status.toLowerCase() !== "boycott"
        ).length;

        const bannedCount = response.data.filter(
          (product) => 
            product.status.toLowerCase() === "avoid" ||
            product.status.toLowerCase() === "boycott"
        ).length;

        setAvailableProductsCount(availableCount);
        setBannedProductsCount(bannedCount);

        
        const countries = response.data
          .flatMap((product) => product.countries)
          .filter((country) => country.trim() !== "");
        const uniqueCountriesSet = new Set(countries);
        setUniqueCountries([...uniqueCountriesSet]);

        
        setTotalProductsCount(response.data.length);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards ">
        <div className="card lg:h-96 ">
          <div className="card-inner ">
            <h3>AVAILABLE PRODUCTS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1 className=" lg:text-6xl">{availableProductsCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>BANNED PRODUCTS</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1 className=" lg:text-6xl">{bannedProductsCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>UNIQUE COUNTRIES</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1 className=" lg:text-6xl">{uniqueCountries.length}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>TOTAL PRODUCTS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1 className=" lg:text-6xl">{totalProductsCount}</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { name: "Available Products", productsChart: availableProductsCount },
              { name: "Banned Products", productsChart: bannedProductsCount },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="productsChart" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        {/* Add more charts as needed */}
      </div>
    </main>
  );
}

export default Home;
