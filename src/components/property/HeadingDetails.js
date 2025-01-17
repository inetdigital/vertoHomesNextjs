"use client";

import { useState } from "react";

import Image from "next/image";

import { convertToSquareFeet } from "@/lib/convertToSquareFeet";
import { formatPrice } from "@/lib/formatPrice";

import { BlockButtonBlue } from "@/components/ui/BlockButonBlue";

export const HeadingDetails = ({ page }) => {
  console.log(page);
  const [isSliderOpen, setSliderOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openSlider = () => setSliderOpen(true);
  const closeSlider = () => setSliderOpen(false);
  const goToNext = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === page.data?.property_images.length - 1 ? 0 : prevIndex + 1
    );
  const goToPrev = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? page.data?.property_images.length - 1 : prevIndex - 1
    );

  return (
    <section className="py-12 bg-vertoDarkBlue">
      {isSliderOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center w-full h-full">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={closeSlider}
          >
            ✕
          </button>
          <div className="relative w-full h-full max-w-7xl max-h-screen flex items-center">
            <img
              src={page.data?.property_images[currentIndex]?.image?.url}
              alt={
                page.data?.property_images[currentIndex]?.image?.alt ||
                "Property image"
              }
              className="w-full h-auto max-h-full object-contain"
            />
            {page.data?.property_images.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl"
                  onClick={goToPrev}
                >
                  ‹
                </button>
                <button
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl"
                  onClick={goToNext}
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-6 xl:px-0">
        <div className="text-white py-8">
          <div className="flex flex-col lg:flex-row mb-16">
            <div className="w-full lg:w-2/3">
              <div className="bg-white text-vertoDarkBlue font-bold px-8 py-4 rounded-lg text-2xl tracking-wide inline w-full sm:w-auto text-center">
                {page.data.price && page.data.price > 0
                  ? `£ ${formatPrice(page.data.price)}`
                  : "POA"}
              </div>
            </div>
            <div className="w-full lg:w-1/3 pl-0 lg:pl-12 mt-12 lg:mt-0">
              <BlockButtonBlue label="Arrange a viewing" reverse />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 w-full lg:w-2/3">
              <div className="flex items-start gap-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    id="Icons"
                    width="80"
                    height="80"
                    x="0"
                    y="0"
                    version="1.1"
                    viewBox="0 0 80 80"
                    fill="#fff"
                  >
                    <path d="M63 43.4c0-3.2-2.1-6-5.1-7v-9.1c0-2-1.6-3.6-3.6-3.6H25.7c-2 0-3.6 1.6-3.6 3.6v9.1c-3 1-5.1 3.8-5.1 7v9.9h2.9v2.4c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-2.4h34.2v2.4c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-2.4h3zM25.7 26.7h28.6c.4 0 .6.3.6.6v8.8h-3.2v-4.5c0-.8-.7-1.5-1.5-1.5h-6.8c-.8 0-1.5.7-1.5 1.5v4.5h-4v-4.5c0-.8-.7-1.5-1.5-1.5h-6.8c-.8 0-1.5.7-1.5 1.5v4.5H25v-8.8c0-.3.3-.6.7-.6m34.5 23.8H19.8v-7.1c0-2.5 2-4.4 4.5-4.4h31.4c2.5 0 4.5 2 4.5 4.5z"></path>
                  </svg>
                  <p className="text-base font-medium text-white">
                    {page.data?.bedrooms?.data?.number_of_bedrooms} <br />
                    <span>Bedrooms</span>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    id="Icons"
                    width="80"
                    height="80"
                    x="0"
                    y="0"
                    version="1.1"
                    viewBox="0 0 80 80"
                    fill="#fff"
                  >
                    <path d="M60.3 39.8h-1.6V22.9c-.3-3.4-3.2-5.9-6.6-5.7-2 .2-3.8 1.3-4.9 3-.9-.4-2-.7-3-.6-4 0-7.3 3.2-7.3 7.3 0 .8.6 1.4 1.4 1.4H50c.8 0 1.4-.6 1.4-1.4 0-1.8-.6-3.5-1.8-4.8.8-1.6 2.7-2.2 4.2-1.4 1 .5 1.7 1.5 1.8 2.6v16.6H18.3c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h1.6v5.6c0 6 4.5 11.1 10.4 11.8.9.2 16.8.2 17.8 0h.2c5.9-.8 10.4-5.8 10.4-11.8v-5.6h1.6c.8 0 1.5-.7 1.5-1.5s-.7-1.6-1.5-1.6M39.8 25.5c.8-2.4 3.3-3.7 5.7-2.9 1.4.4 2.5 1.5 2.9 2.9zm15.9 22.9c0 4.9-4 8.9-8.9 8.9H31.6c-4.8-.1-8.7-4.1-8.7-8.9v-5.6h32.8z"></path>
                    <path d="M38 31.2c-.3.3-.4.7-.4 1.1s.2.8.4 1.1c.6.6 1.5.6 2.1 0 .3-.3.4-.7.4-1.1s-.2-.8-.4-1.1c-.6-.6-1.5-.6-2.1 0M43.1 31.2c-.3.3-.4.7-.4 1.1s.2.8.4 1.1c.6.6 1.5.6 2.1 0 .3-.3.4-.7.4-1.1s-.2-.8-.4-1.1c-.6-.6-1.5-.6-2.1 0M48.2 33.3c.3.3.7.4 1.1.4s.8-.2 1.1-.4c.3-.3.4-.7.4-1.1s-.2-.8-.4-1.1c-.6-.6-1.5-.6-2.1 0-.3.3-.4.7-.4 1.1-.2.4 0 .8.3 1.1"></path>
                  </svg>
                  <p className="text-base font-medium text-white">
                    {page?.data?.bathrooms} <br />
                    <span>Bathrooms</span>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    id="Icons"
                    width="80"
                    height="80"
                    x="0"
                    y="0"
                    version="1.1"
                    viewBox="0 0 80 80"
                    fill="#fff"
                  >
                    <path
                      id="Path_2"
                      d="M61 51.5h-5.9v-24H61c.9 0 1.6-.7 1.6-1.6s-.7-1.6-1.6-1.6h-5.9v-5.9c0-.9-.7-1.6-1.6-1.6s-1.5.8-1.5 1.7v5.9H28v-5.9c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6v5.9H19c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6h5.9v24H19c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6h5.9v5.9c0 .9.7 1.6 1.6 1.6s1.6-.7 1.6-1.6v-5.9h24v5.9c0 .9.7 1.6 1.6 1.6s1.6-.7 1.6-1.6v-5.9H61c.9 0 1.6-.7 1.6-1.6s-.7-1.7-1.6-1.7m-9 0H28v-24h24z"
                    ></path>
                  </svg>
                  <p className="text-base font-medium text-white">
                    {page?.data?.square_metres}m² <br />{" "}
                    <span>
                      ({convertToSquareFeet(page?.data?.square_metres)} sq ft)
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {page.data.zero_bills && (
                  <div>
                    <Image
                      src={`/assets/Zero_Bills_Navy_Blue_Pink-1-01.svg`}
                      alt="Zero Bills Verto Homes"
                      loading="lazy"
                      width={200}
                      height={100}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full lg:w-1/3 pl-0 lg:pl-12 mt-12 lg:mt-0">
              {page.data?.property_images &&
                page.data?.property_images?.length > 0 && (
                  <BlockButtonBlue label="All Photos" onClick={openSlider} />
                )}
              <BlockButtonBlue label="Floor Plans" />
              {page.data?.development?.data?.site_plan?.url && (
                <a
                  href={page.data?.development?.data?.site_plan?.url}
                  target="_blank"
                >
                  <BlockButtonBlue label="Site Plan" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
