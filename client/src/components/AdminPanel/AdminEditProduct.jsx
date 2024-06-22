import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [status, setStatus] = useState("");
  const [reasons, setReasons] = useState([]);
  const [countries, setCountries] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [error, setError] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const PRODUCT_CATEGORIES = [
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather",
  ];

  useEffect(() => {
    // Fetch the product data by ID
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        const productData = response.data;

        setTitle(productData.name);
        setCategory(productData.categories[0] || "Uncategorized");
        setDescription(productData.description);
        setThumbnail(productData.logo);
        setStatus(productData.status);
        setReasons(productData.reasons.join(", "));
        setCountries(productData.countries.join(", "));
        setAlternatives(productData.alternatives.join(", "));
      } catch (error) {
        setError("Failed to fetch product data.");
      }
    };

    fetchProductData();
  }, [id]);

  const handleEditProduct = async (e) => {
    e.preventDefault();

    // Check for required fields
    if (!title || !category || !description || !status) {
      setError("Please fill in all required fields.");
      return;
    }

    // If all required fields are filled, proceed with updating the product
    setError(""); // Clear any previous errors

    const updatedProduct = {
      name: title,
      status,
      description,
      reasons: reasons.split(",").map((reason) => reason.trim()),
      countries: countries.split(",").map((country) => country.trim()),
      categories: [category],
      logo: thumbnail,
      alternatives: alternatives.split(",").map((alt) => alt.trim()),
    };

    try {
      await axios.post(`/updateproduct/${id}`, updatedProduct);
      // Redirect to product list or detail page after update
      navigate(`/admin/myproducts/${id}`);
    } catch (error) {
      setError("Failed to update product.");
    }
  };

  return (
    <section className="edit-product ">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mt-12">Edit Product</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleEditProduct}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
            className="w-full h-54 mb-4"
            required
          />
          <input
            type="text"
            placeholder="Thumbnail URL"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Reasons (comma separated)"
            value={reasons}
            onChange={(e) => setReasons(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Countries (comma separated)"
            value={countries}
            onChange={(e) => setCountries(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Alternatives (comma separated)"
            value={alternatives}
            onChange={(e) => setAlternatives(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
  type="submit"
  className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
>
  Update
</button>

        </form>
      </div>
    </section>
  );
};

export default EditProduct;
