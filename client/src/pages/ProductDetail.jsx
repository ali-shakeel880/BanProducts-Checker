import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import image from '../images/logo.png'

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <section className="productdetails grid justify-items-center p-6 mt-24">

      <div className="bg-white rounded-lg overflow-hidden shadow-lg ring-4 max-w-3xl w-full m-5">
        <div className="relative">
          <img className="w-full h-96 object-fill " src={product.logo || image} alt={product.name} />
          <div className={`absolute top-0 right-0 text-white px-2 py-1 m-2 rounded-md text-sm font-medium ${product.status === 'avoid' || product.status === 'boycott' ? 'bg-red-500' : 'bg-green-500'}`}>
            {product.status === 'avoid' || product.status === 'boycott' ? 'Boycott' : 'Available'}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-medium mb-4 text-center">{product.name}</h3>
          <p className="text-gray-600 text-base mb-4">{product.description}</p>
          {product.categories && product.categories.length > 0 && product.categories[0].trim() !== '' && (
            <p className="text-gray-600 text-sm mb-4"><strong>Category:</strong> {product.categories.join(", ")}</p>
          )}
          {product.alternatives && product.alternatives.length > 0 && product.alternatives[0].trim() !== '' && (
            <p className="text-gray-600 text-sm mb-4"><strong>Alternatives:</strong> {product.alternatives.join(", ")}</p>
          )}
          {product.reasons && product.reasons.length > 0 && product.reasons[0].trim() !== '' && (
            <p className="text-gray-600 text-sm mb-4"><strong>Reasons:</strong> {product.reasons.join(", ")}</p>
          )}
          {product.countries && product.countries.length > 0 && product.countries[0].trim() !== '' && (
            <p className="text-gray-600 text-sm mb-4"><strong>Countries:</strong> {product.countries.join(", ")}</p>
          )}
        </div>
      </div>
    </section>

  )
}

export default ProductDetail