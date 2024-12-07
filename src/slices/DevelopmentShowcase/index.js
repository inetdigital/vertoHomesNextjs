"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { PrismicNextImage } from "@prismicio/next";

const DevelopmentShowcase = ({ slice }) => {
  return (
    <section>
      {slice.primary?.developments.map((item, index) => (
        <DevelopmentListing key={index} data={item.development.data} />
      ))}
    </section>
  );
};

const DevelopmentListing = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0); // Track window width
  const images = data?.listing_images || [];

  const handleSwipe = (direction) => {
    if (direction === "left" && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === "right" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Set up event listener for resize and update windowWidth
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset slider position on resize
  useEffect(() => {
    setCurrentIndex(0);
  }, [windowWidth]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Overlay Title */}
      <div
        className="absolute top-12 md:top-20 left-1/2 transform -translate-x-1/2 w-9/12 lg:w-max"
        style={{ zIndex: 2 }}
      >
        {data?.name && (
          <h2 className="text-white uppercase tracking-widest font-bold text-center mb-4">
            {data.name}
          </h2>
        )}
        {data?.property_types && (
          <p className="text-base md:text-xl text-white text-center font-medium mb-2">
            A collection of {data.property_types}
          </p>
        )}
        <div className="h-1 w-20 bg-white mx-auto my-5 md:my-10" />
        {data?.prices_from && (
          <p className="text-xl text-white text-center font-medium">
            Prices from £{data.prices_from?.toLocaleString("en-EN")}
          </p>
        )}
      </div>

      {/* Slider Container */}
      {images.length > 0 && (
        <motion.div
          className="absolute inset-0 flex"
          animate={{ x: -currentIndex * windowWidth }}
          transition={{
            duration: 1,
            ease: [0.42, 0, 0.58, 1],
          }}
          drag="x"
          dragConstraints={{
            left: -windowWidth * (images.length - 1),
            right: 0,
          }}
          dragElastic={1}
          onDragEnd={(event, info) => {
            if (info.offset.x < -100) handleSwipe("left");
            if (info.offset.x > 100) handleSwipe("right");
          }}
          style={{
            display: "flex",
            width: `${images.length * 100}vw`,
          }}
        >
          {/* Overlay Color */}
          <div
            className="absolute w-full h-full inset-0 bg-black opacity-40"
            style={{ zIndex: 1 }}
          />
          {images.map((img, index) => (
            <div
              key={index}
              className="w-full h-dvh flex-shrink-0"
              style={{ width: "100vw" }}
            >
              <PrismicNextImage
                field={img.image}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      )}

      <div
        className="absolute flex items-center flex-col bottom-20 left-1/2 -translate-x-1/2 w-full"
        style={{ zIndex: 2 }}
      >
        <div className="flex items-center flex-col mb-4">
          {data?.location_town && data?.location_city && (
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 md:size-12 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <p className="text-white font-medium ml-2">
                {data?.location_town}, {data?.location_city}
              </p>
            </div>
          )}
          <div className="my-6">
            <a href={`development/${data?.uid}`} className="flex">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative text-center px-4 py-2 font-medium text-sm tracking-button uppercase border border-white rounded text-white transition-colors duration-300 ease-in-out hover:bg-white hover:text-vertoBlack"
              >
                View Development
              </motion.div>
            </a>
          </div>
        </div>
        {/* Navigation Dots */}
        {images.length > 1 && (
          <div className="flex space-x-2 bg-slate-600 rounded-full p-2 transform w-fit">
            {images.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all duration-1000 ${
                  index === currentIndex
                    ? "bg-white w-12" // Active dot is wider
                    : "bg-white w-3" // Default width for inactive dots
                } cursor-pointer`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DevelopmentShowcase;
