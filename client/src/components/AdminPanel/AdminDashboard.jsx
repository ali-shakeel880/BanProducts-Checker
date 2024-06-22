import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/getproducts');
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filteredProducts with all products
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.post(`/deleteproduct/${id}`)
        .then(response => {
          setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
          setFilteredProducts(prevProducts => prevProducts.filter(product => product._id !== id));
          console.log('Product deleted successfully');
        })
        .catch(error => {
          console.error('Failed to delete product:', error);
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="dashboard py-8">
      <div className="container mx-auto">
      <Link to="/admin/create" className="btn primary bg-blue-500 text-white py-2 px-4 rounded ml-4  text-center mb-10 mt-10">
              Add Product
            </Link>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4  justify-between  mb-8  mt-10 ml-4 mr-8">
          <h2 className="text-2xl font-bold col-span-1 ">Products</h2>
          
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search products"
              className="border rounded py-2 px-4 col-span-2 md:col-span-3 ml-3 "
            />
          
          
        </div>
        {filteredProducts.length ? (
          filteredProducts.map(product => (
            <article key={product._id} className="flex justify-between items-center mb-4 p-4 border rounded shadow">
              <div className="flex items-center">
                <div className="w-16 h-16 mr-4">
                  <img src={product.logo} alt={product.name} className="w-full h-full object-cover rounded" />
                </div>
                <h5 className="text-lg font-semibold">{product.name}</h5>
              </div>
              <div className="flex space-x-2">
                <Link to={`/admin/myproducts/${product._id}`} className="btn sm bg-gray-200 text-gray-800 py-1 px-2 rounded">View</Link>
                <Link to={`/admin/myproducts/edit/${product._id}`} className="btn sm primary bg-blue-500 text-white py-1 px-2 rounded">Edit</Link>
                <button onClick={() => handleDelete(product._id)} className="btn sm danger bg-red-500 text-white py-1 px-2 rounded">Delete</button>
              </div>
            </article>
          ))
        ) : (
          <h2 className="text-center text-xl">No products found</h2>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
