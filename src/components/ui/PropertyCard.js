import * as prismic from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { formatPrice } from "@/lib/formatPrice";

export const PropertyCard = ({ property }) => {
  return (
    <div>
      <div className="aspect-h-3 aspect-w-3 relative bg-gray-100">
        <PrismicNextLink document={property} className="flex w-full group">
          <div className="absolute bg-black w-full h-full z-[1] opacity-40 border-0 border-solid border-vertoDarkBlue transition-all duration-500 ease-in-out group-hover:opacity-75 group-hover:border-8" />
          {prismic.isFilled.image(property.data.featured_image) && (
            <PrismicNextImage
              field={property.data.featured_image}
              fill={true}
              className="object-cover"
            />
          )}

          <div className="flex items-center justify-center flex-col w-full z-[1]">
            <div>
              <p className="text-vertoLightGreen text-base text-center">
                {property.data.development.data.name}
              </p>
            </div>
            <div className="relative">
              <p className="text-white text-4xl uppercase text-center">
                {property.data.title}
              </p>
              <p className="absolute text-white text-sm text-center uppercase max-auto bg-vertoLightGreen rounded-full px-4 py-2 truncate left-1/2 -translate-x-1/2 translate-y-0 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:translate-y-1/2">
                View
              </p>
            </div>
          </div>
        </PrismicNextLink>
      </div>
      <div className="pt-4">
        <div>
          <p className="text-vertoDarkBlue font-medium mb-2 text-left">
            {property.data.town ? property.data.town : property.data.title}
            {property.data.postcode ? `, ${property.data.postcode}` : ""}
          </p>

          <p className="text-base flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 mr-2"
            >
              <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" />
              <path
                fillRule="evenodd"
                d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z"
                clipRule="evenodd"
              />
            </svg>
            {property.data?.type?.data?.name}
          </p>
        </div>
        <div className="pt-4 grid grid-cols-2">
          <div className="flex items-center">
            <p className="bg-vertoDarkBlue inline-flex text-white text-xl font-medium px-4 py-2">
              £{formatPrice(property.data?.price)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                id="Icons"
                width="28"
                height="28"
                x="0"
                y="0"
                version="1.1"
                viewBox="0 0 80 80"
              >
                <path d="M63 43.4c0-3.2-2.1-6-5.1-7v-9.1c0-2-1.6-3.6-3.6-3.6H25.7c-2 0-3.6 1.6-3.6 3.6v9.1c-3 1-5.1 3.8-5.1 7v9.9h2.9v2.4c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-2.4h34.2v2.4c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-2.4h3zM25.7 26.7h28.6c.4 0 .6.3.6.6v8.8h-3.2v-4.5c0-.8-.7-1.5-1.5-1.5h-6.8c-.8 0-1.5.7-1.5 1.5v4.5h-4v-4.5c0-.8-.7-1.5-1.5-1.5h-6.8c-.8 0-1.5.7-1.5 1.5v4.5H25v-8.8c0-.3.3-.6.7-.6m34.5 23.8H19.8v-7.1c0-2.5 2-4.4 4.5-4.4h31.4c2.5 0 4.5 2 4.5 4.5z"></path>
              </svg>
              {property.data?.bedrooms?.data.number_of_bedrooms}
            </div>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                id="Icons"
                width="28"
                height="28"
                x="0"
                y="0"
                version="1.1"
                viewBox="0 0 80 80"
              >
                <path d="M60.3 39.8h-1.6V22.9c-.3-3.4-3.2-5.9-6.6-5.7-2 .2-3.8 1.3-4.9 3-.9-.4-2-.7-3-.6-4 0-7.3 3.2-7.3 7.3 0 .8.6 1.4 1.4 1.4H50c.8 0 1.4-.6 1.4-1.4 0-1.8-.6-3.5-1.8-4.8.8-1.6 2.7-2.2 4.2-1.4 1 .5 1.7 1.5 1.8 2.6v16.6H18.3c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h1.6v5.6c0 6 4.5 11.1 10.4 11.8.9.2 16.8.2 17.8 0h.2c5.9-.8 10.4-5.8 10.4-11.8v-5.6h1.6c.8 0 1.5-.7 1.5-1.5s-.7-1.6-1.5-1.6M39.8 25.5c.8-2.4 3.3-3.7 5.7-2.9 1.4.4 2.5 1.5 2.9 2.9zm15.9 22.9c0 4.9-4 8.9-8.9 8.9H31.6c-4.8-.1-8.7-4.1-8.7-8.9v-5.6h32.8z"></path>
                <path d="M38 31.2c-.3.3-.4.7-.4 1.1s.2.8.4 1.1c.6.6 1.5.6 2.1 0 .3-.3.4-.7.4-1.1s-.2-.8-.4-1.1c-.6-.6-1.5-.6-2.1 0M43.1 31.2c-.3.3-.4.7-.4 1.1s.2.8.4 1.1c.6.6 1.5.6 2.1 0 .3-.3.4-.7.4-1.1s-.2-.8-.4-1.1c-.6-.6-1.5-.6-2.1 0M48.2 33.3c.3.3.7.4 1.1.4s.8-.2 1.1-.4c.3-.3.4-.7.4-1.1s-.2-.8-.4-1.1c-.6-.6-1.5-.6-2.1 0-.3.3-.4.7-.4 1.1-.2.4 0 .8.3 1.1"></path>
              </svg>
              {property.data?.bathrooms}
            </div>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                id="Icons"
                width="28"
                height="28"
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
              {property.data?.square_metres}m²
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
