"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { PrismicNextImage } from "@prismicio/next";

import { Bounded } from "@/components/Bounded";

const TypologyLayout = ({ slice }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleMouseMove = (event) => {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;

    setHoverPosition({
      x: x / width, // Normalized position (0 to 1)
      y: y / height,
    });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <Bounded
      as="section"
      size="widest"
      paddingAs="contentSection"
      className="text-center"
    >
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold mb-8 text-center">
        {slice.primary.title}
      </h2>
      <hr className="bg-vertoLightGreen w-[100px] h-[4px] mx-auto mt-8 mb-16" />

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Image */}
        <div
          className="overflow-hidden col-span-2 cursor-zoom-in relative"
          onClick={openModal}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <PrismicNextImage
            field={
              slice.primary.map_image.square?.url
                ? slice.primary.map_image.square
                : slice.primary.map_image
            }
            className="w-full h-auto object-contain"
          />
          {/* Magnifying Glass Effect */}
          {isHovering && (
            <div
              className="absolute pointer-events-none rounded-full border-2 border-white shadow-lg z-10"
              style={{
                width: "200px", // Diameter of the magnifying glass
                height: "200px",
                top: `calc(${hoverPosition.y * 100}% - 75px)`, // Center the circle
                left: `calc(${hoverPosition.x * 100}% - 75px)`,
                backgroundImage: `url(${slice.primary.map_image.url})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "1000%", // Adjust magnification level
                backgroundPosition: `${hoverPosition.x * 100}% ${hoverPosition.y * 100}%`,
              }}
            ></div>
          )}
        </div>
        <div className="flex justify-center items-start">
          <PrismicNextImage
            field={slice.primary.key_image}
            className="object-contain"
          />
        </div>
      </div>

      {/* Full-Screen Modal */}
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 w-screen h-screen"
      >
        <div className="relative w-[90vw] h-[90vh]">
          <DialogPanel className="rounded shadow-lg w-full h-full relative overflow-hidden">
            {/* Close Button */}
            <button
              className="absolute top-0 right-0 text-white text-lg font-bold z-10 bg-black rounded-full p-2"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Image */}
            <img
              src={slice.primary.map_image.url}
              alt=""
              className={`w-full h-full object-contain ${slice.primary.map_image.square?.url ? "hidden lg:block" : null}`}
            />

            {slice.primary.map_image.square?.url && (
              <img
                src={slice.primary.map_image.square?.url}
                alt=""
                className={`w-full h-full object-contain block lg:hidden`}
              />
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </Bounded>
  );
};

export default TypologyLayout;
