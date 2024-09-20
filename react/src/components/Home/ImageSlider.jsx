/* eslint-disable react/prop-types */
// src/components/ImageSlider.jsx
import React, { useState, useEffect } from "react";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative overflow-hidden w-full h-64 bg-gray-200 my-10">
      {images.length > 0 && (
        <>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
          >
            &gt;
          </button>
        </>
      )}
    </div>
  );
};

export default ImageSlider;
