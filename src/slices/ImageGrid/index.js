"use client";

import { PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImageGrid = ({ slice }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slice.primary.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slice.primary.images.length - 1 : prevIndex - 1
    );
  };

  const renderImageGrid = (imageGroup, isReversed, index) => (
    <div
      key={index}
      className={`grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 gap-y-4 md:gap-y-0 ${
        isReversed ? "grid-flow-dense" : ""
      }`}
    >
      <div
        className={`${
          isReversed ? "order-2" : ""
        } col-span-2 lg:col-span-2 aspect-w-16 aspect-h-10`}
      >
        {/* Large Image */}
        <PrismicNextImage
          field={imageGroup[0]?.image}
          className="object-cover w-full h-full"
          fallbackAlt=""
        />
      </div>

      <div className="flex flex-col gap-4">
        {/* Small Image 1 */}
        <div className="aspect-w-8 aspect-h-5">
          <PrismicNextImage
            field={imageGroup[1]?.image}
            className="object-cover w-full h-full"
            fallbackAlt=""
          />
        </div>

        {/* Small Image 2 */}
        <div className="aspect-w-8 aspect-h-5">
          <PrismicNextImage
            field={imageGroup[2]?.image}
            className="object-cover w-full h-full"
            fallbackAlt=""
          />
        </div>
      </div>
    </div>
  );

  return (
    <Bounded as="section" size="widest" paddingAs="contentSection">
      {slice.primary.images.length > 0 && (
        <div className="flex-col gap-8 hidden md:flex">
          {slice.primary.images
            .reduce((result, image, index) => {
              const groupIndex = Math.floor(index / 3);
              if (!result[groupIndex]) result[groupIndex] = [];
              result[groupIndex].push(image);
              return result;
            }, [])
            .map(
              (imageGroup, idx) =>
                imageGroup.length === 3
                  ? renderImageGrid(imageGroup, idx % 2 !== 0, idx)
                  : null // Ensures only groups of 3 are displayed
            )}
        </div>
      )}

      <div className="relative w-full overflow-hidden block md:hidden">
        {/* Left arrow button */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Animated slider */}
        <div className="aspect-w-16 aspect-h-10 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full h-full flex justify-center items-center"
            >
              <PrismicNextImage
                field={slice.primary.images[currentIndex]?.image}
                className="w-full h-auto object-cover"
                fallbackAlt=""
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right arrow button */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </Bounded>
  );
};

export default ImageGrid;
