import React, { useState } from "react";

import image1 from '../images/colgate.jpg';
import image2 from '../images/pepsi.jpg';
import image3 from '../images/nesfruta.jpg';
import image4 from '../images/lays.jpg';
import image5 from '../images/oreo.jpg';


const images = [image1, image2, image3, image4, image5];

function ImageSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div id="default-carousel" className="relative w-full mt-24 flex justify-center items-center">
      <div className="relative overflow-hidden rounded-lg h-64 md:h-96 w-full max-w-screen-md">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute duration-700 ease-in-out transition-opacity ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          >
            <img src={image} className="block mx-auto h-full object-contain" alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-400"}`}
            aria-current={currentIndex === index}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>

      {/* Added responsive margin to the left and right buttons */}
      <button
        type="button"
        className="absolute top-1/2 left-2 md:left-4 z-30 flex items-center justify-center h-8 w-8 md:h-12 md:w-12 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 rounded-full focus:outline-none"
        onClick={handlePrev}
      >
        <svg
          className="w-4 h-4 md:w-6 md:h-6 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
        <span className="sr-only">Previous</span>
      </button>
      <button
        type="button"
        className="absolute top-1/2 right-2 md:right-4 z-30 flex items-center justify-center h-8 w-8 md:h-12 md:w-12 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 rounded-full focus:outline-none"
        onClick={handleNext}
      >
        <svg
          className="w-4 h-4 md:w-6 md:h-6 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
}

export default ImageSwiper;
