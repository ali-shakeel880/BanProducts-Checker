import React, { useState } from 'react';


function Banner() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // Implement search functionality here
    alert(`Searching for: ${searchTerm}`);
  };

  const handleBarcodeScan = () => {
    // Implement barcode scan functionality here
    alert('Barcode Scanned!');
  };

  return (
    <section className="banner">
      <h2>Boycott!</h2>
      <p>Search for products or use the barcode scanner.</p>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Products"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleBarcodeScan}>
          <FaBarcode /> Scan Barcode
        </button>
      </div>
    </section>
  );
}

export default Banner;
