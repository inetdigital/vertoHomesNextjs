import React from "react";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";

import { formatPrice } from "@/lib/formatPrice";

import { convertToSquareFeet } from "@/lib/convertToSquareFeet";

export const Header = ({ data }) => {
  console.log(data);
  return (
    <section className="pt-16 bg-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-0 pt-40 pb-32">
        {/* Title Section */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-vertoDarkBlue tracking-wide mb-4 uppercase">
              {data.development.data.name}
            </h2>
            <h1 className="text-5xl font-semibold text-vertoLightBlue tracking-widest uppercase">
              {data.title}
            </h1>
          </div>
        </div>

        {/* Features Section */}
        <div className="flex items-center gap-6 pt-6 pb-8">
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
            >
              <path d="M63 43.4c0-3.2-2.1-6-5.1-7v-9.1c0-2-1.6-3.6-3.6-3.6H25.7c-2 0-3.6 1.6-3.6 3.6v9.1c-3 1-5.1 3.8-5.1 7v9.9h2.9v2.4c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-2.4h34.2v2.4c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-2.4h3zM25.7 26.7h28.6c.4 0 .6.3.6.6v8.8h-3.2v-4.5c0-.8-.7-1.5-1.5-1.5h-6.8c-.8 0-1.5.7-1.5 1.5v4.5h-4v-4.5c0-.8-.7-1.5-1.5-1.5h-6.8c-.8 0-1.5.7-1.5 1.5v4.5H25v-8.8c0-.3.3-.6.7-.6m34.5 23.8H19.8v-7.1c0-2.5 2-4.4 4.5-4.4h31.4c2.5 0 4.5 2 4.5 4.5z"></path>
            </svg>
            <p className="text-base font-medium">
              {data.bedrooms.data.number_of_bedrooms} <br />
              <span>Bedrooms</span>
            </p>
          </div>
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
            >
              <path d="M60.3 39.8h-1.6V22.9c-.3-3.4-3.2-5.9-6.6-5.7-2 .2-3.8 1.3-4.9 3-.9-.4-2-.7-3-.6-4 0-7.3 3.2-7.3 7.3 0 .8.6 1.4 1.4 1.4H50c.8 0 1.4-.6 1.4-1.4 0-1.8-.6-3.5-1.8-4.8.8-1.6 2.7-2.2 4.2-1.4 1 .5 1.7 1.5 1.8 2.6v16.6H18.3c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h1.6v5.6c0 6 4.5 11.1 10.4 11.8.9.2 16.8.2 17.8 0h.2c5.9-.8 10.4-5.8 10.4-11.8v-5.6h1.6c.8 0 1.5-.7 1.5-1.5s-.7-1.6-1.5-1.6M39.8 25.5c.8-2.4 3.3-3.7 5.7-2.9 1.4.4 2.5 1.5 2.9 2.9zm15.9 22.9c0 4.9-4 8.9-8.9 8.9H31.6c-4.8-.1-8.7-4.1-8.7-8.9v-5.6h32.8z"></path>
              <path d="M38 31.2c-.3.3-.4.7-.4 1.1s.2.8.4 1.1c.6.6 1.5.6 2.1 0 .3-.3.4-.7.4-1.1s-.2-.8-.4-1.1c-.6-.6-1.5-.6-2.1 0M43.1 31.2c-.3.3-.4.7-.4 1.1s.2.8.4 1.1c.6.6 1.5.6 2.1 0 .3-.3.4-.7.4-1.1s-.2-.8-.4-1.1c-.6-.6-1.5-.6-2.1 0M48.2 33.3c.3.3.7.4 1.1.4s.8-.2 1.1-.4c.3-.3.4-.7.4-1.1s-.2-.8-.4-1.1c-.6-.6-1.5-.6-2.1 0-.3.3-.4.7-.4 1.1-.2.4 0 .8.3 1.1"></path>
            </svg>
            <p className="text-base font-medium">
              {data.bathrooms} <br />
              <span>Bathrooms</span>
            </p>
          </div>
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
            >
              <path
                id="Path_2"
                d="M61 51.5h-5.9v-24H61c.9 0 1.6-.7 1.6-1.6s-.7-1.6-1.6-1.6h-5.9v-5.9c0-.9-.7-1.6-1.6-1.6s-1.5.8-1.5 1.7v5.9H28v-5.9c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6v5.9H19c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6h5.9v24H19c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6h5.9v5.9c0 .9.7 1.6 1.6 1.6s1.6-.7 1.6-1.6v-5.9h24v5.9c0 .9.7 1.6 1.6 1.6s1.6-.7 1.6-1.6v-5.9H61c.9 0 1.6-.7 1.6-1.6s-.7-1.7-1.6-1.7m-9 0H28v-24h24z"
              ></path>
            </svg>
            <p className="text-base font-medium">
              {data.square_metres}m² <br />{" "}
              <span>({convertToSquareFeet(data.square_metres)} sq ft)</span>
            </p>
          </div>
        </div>
        {/* Price */}
        <div className="flex items-center justify-between w-full">
          <div className="bg-vertoDarkBlue text-white font-bold px-8 py-4 rounded-lg text-2xl tracking-wide inline">
            £ {formatPrice(data.price)}
          </div>
          {data.zero_bills && (
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

      {/* Main Image Section */}
      <div className="relative w-full aspect-w-3 aspect-h-1">
        <PrismicNextImage
          field={data.property_images[0]?.image}
          fill={true}
          className="object-cover"
        />
      </div>

      {/* Button Section */}
      <div className="bg-vertoDarkBlue">
        <div className="max-w-7xl mx-auto px-6 lg:px-0 py-8 flex justify-between">
          <div className="flex flex-wrap justify-between items-center space-x-4">
            {["Floor Plans", "Site Plans", "Map View", "All Photos"].map(
              (buttonText, index) => (
                <button
                  key={index}
                  className="text-white font-medium px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-100 transition"
                >
                  {buttonText.toUpperCase()}
                </button>
              )
            )}
          </div>
          <div>
            <button className="bg-sky-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-sky-700 transition">
              ARRANGE A VIEWING
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
