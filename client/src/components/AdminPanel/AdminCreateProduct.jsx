import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import sanitizeHtml from "sanitize-html"; 

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [status, setStatus] = useState("");
  const [reasons, setReasons] = useState("");
  const [countries, setCountries] = useState("");
  const [alternatives, setAlternatives] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    if (!title || !category || !description || !thumbnail || !status) {
      setError("Please fill in all required fields.");
      setSuccess("");
      return;
    }

    setError("");

    const sanitizedDescription = sanitizeHtml(description, {
      allowedTags: [],
      allowedAttributes: {},
    });

    const newProduct = {
      name: title,
      status,
      description: sanitizedDescription, 
      reasons: reasons.split(",").map((reason) => reason.trim()),
      countries: countries.split(",").map((country) => country.trim()),
      categories: [category],
      logo: thumbnail,
      alternatives: alternatives.split(",").map((alt) => alt.trim()),
    };

    try {
      await axios.post("/addproduct", newProduct);
      console.log("Product created:", newProduct);
      setSuccess("Product created successfully!");
      setError("");
      setTitle("");
      setCategory("Uncategorized");
      setDescription("");
      setThumbnail("");
      setStatus("");
      setReasons("");
      setCountries("");
      setAlternatives("");
    } catch (error) {
      setError("Failed to create product.");
      setSuccess("");
    }
  };

  return (
    <section className="create-product py-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6 ml-16">Create Product</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Success: </strong>
            <span className="block sm:inline">{success}</span>
          </div>
        )}
        <form className="space-y-4" onSubmit={handleCreateProduct}>
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
            className="w-full h-34 mb-16 "
            required
          />
          <input
            type="url"
            placeholder="Thumbnail URL"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="w-full p-2 border rounded "
            required
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
          <button type="submit" className="btn primary bg-blue-500 text-white py-2 px-4 rounded">
            Create
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateProduct;
