import * as prismic from "@prismicio/client";
import { useEffect, useState, useMemo } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import { useSearch } from "@/context/SearchOptions";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { capitalizeWords } from "@/lib/capitalizeWords";
import { formatRange } from "@/lib/formatPriceRange";
import { formatPrice } from "@/lib/formatPrice";

export const SearchResultsPanel = ({ properties }) => {
  const {
    selectedLocation,
    selectedStatus,
    selectedPriceRange,
    selectedNumBedrooms,
    orderBy,
    setOrderBy,
    orderByType,
    setOrderByType,
  } = useSearch();

  const [sortedProperties, setSortedProperties] = useState([]);

  const orderByOptions = [
    { key: "price", label: "Price" },
    { key: "rooms", label: "Rooms" },
  ];

  const orderByTypeOptions = [
    { key: "descending", label: "Descending" },
    { key: "ascending", label: "Ascending" },
  ];

  const updateOrderBy = (value) => {
    setOrderBy(value);
  };

  const updateOrderByType = (value) => {
    setOrderByType(value);
  };

  // Parse selectedPriceRange into min and max values
  const [minPrice, maxPrice] = selectedPriceRange
    ? selectedPriceRange.split("-").map(Number)
    : [null, null];

  // Memoize filtered properties to avoid re-calculation on every render
  const filteredProperties = useMemo(() => {
    return properties.filter((doc) => {
      const price = doc.data.price;

      return (
        doc.data.status?.uid === selectedStatus &&
        doc.data.location_filter?.uid === selectedLocation &&
        doc.data.bedrooms?.uid === selectedNumBedrooms &&
        price >= minPrice &&
        price <= maxPrice
      );
    });
  }, [
    properties,
    selectedLocation,
    selectedStatus,
    selectedPriceRange,
    selectedNumBedrooms,
    minPrice,
    maxPrice,
  ]);

  // Sort filteredProperties whenever orderBy or orderByType changes
  useEffect(() => {
    if (orderBy && orderByType) {
      const sorted = [...filteredProperties].sort((a, b) => {
        const aValue = a.data[orderBy];
        const bValue = b.data[orderBy];

        if (orderByType === "ascending") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else if (orderByType === "descending") {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
        return 0;
      });
      setSortedProperties(sorted);
    } else {
      setSortedProperties(filteredProperties);
    }
  }, [orderBy, orderByType, filteredProperties]);

  // Check if any of the variables are null
  const hasNullValues =
    !selectedLocation ||
    !selectedStatus ||
    !selectedPriceRange ||
    !selectedNumBedrooms;

  if (hasNullValues) {
    return (
      <div className="w-full h-full py-12">
        <p className="text-center">
          Please update your search criteria above to search properties
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {/* Render filtered properties */}
      <div className="flex w-full justify-between mb-16">
        <div className="flex">
          <div className="bg-vertoDarkGreen rounded-full p-4 mr-2">
            <p className="text-white text-base">
              Homes{" "}
              {capitalizeWords(
                selectedStatus.replace("_", " ", selectedStatus)
              )}
            </p>
          </div>
          <div className="bg-vertoDarkGreen rounded-full p-4 mx-2">
            <p className="text-white text-base">
              In {capitalizeWords(selectedLocation)}
            </p>
          </div>
          <div className="bg-vertoDarkGreen rounded-full p-4 mx-2">
            <p className="text-white text-base">
              {formatRange(selectedPriceRange)}
            </p>
          </div>
          <div className="bg-vertoDarkGreen rounded-full p-4 ml-2">
            <p className="text-white text-base">
              {selectedNumBedrooms} Bedrooms
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Listbox value="price" onChange={updateOrderBy}>
            <div className="flex items-center">
              <Label className="block text-sm/6 font-medium text-gray-900 mr-2">
                Order By
              </Label>
              <div className="relative mr-2">
                <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:vertoDarkBlue sm:text-sm/6">
                  <span className="block">
                    {orderBy ? capitalizeWords(orderBy) : "Select"}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      aria-hidden="true"
                      className="size-5 text-gray-400"
                    />
                  </span>
                </ListboxButton>

                <ListboxOptions
                  transition
                  className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                  {orderByOptions.map((item, index) => {
                    return (
                      <ListboxOption
                        key={item.key}
                        value={item.key}
                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-vertoDarkBlue data-[focus]:text-white"
                      >
                        <span
                          className={`block ${orderBy === item.key ? "font-semibold" : "font-normal"}`}
                        >
                          {item.label}
                        </span>

                        {item.key === orderBy && (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-vertoDarkBlue group-data-[focus]:text-white">
                            <CheckIcon aria-hidden="true" className="size-5" />
                          </span>
                        )}
                      </ListboxOption>
                    );
                  })}
                </ListboxOptions>
              </div>
            </div>
          </Listbox>
          <Listbox value="order" onChange={updateOrderByType}>
            <div className="relative">
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-vertoDarkBlue sm:text-sm/6">
                <span className="block">
                  {orderByType ? capitalizeWords(orderByType) : "Select"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="size-5 text-gray-400"
                  />
                </span>
              </ListboxButton>

              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
              >
                {orderByTypeOptions.map((item, index) => {
                  return (
                    <ListboxOption
                      key={index}
                      value={item.key}
                      className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-vertoDarkBlue data-[focus]:text-white"
                    >
                      <span
                        className={`block ${orderByType === item.key ? "font-semibold" : "font-normal"}`}
                      >
                        {item.label}
                      </span>

                      {orderByType === item.key && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-vertoDarkBlue group-data-[focus]:text-white">
                          <CheckIcon aria-hidden="true" className="size-5" />
                        </span>
                      )}
                    </ListboxOption>
                  );
                })}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
      </div>
      {sortedProperties.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {sortedProperties.map((property, index) => {
            return (
              <div key={index}>
                <div className="aspect-h-3 aspect-w-3 relative bg-gray-100">
                  <div className="bg-black w-full h-full z-[1] opacity-50" />
                  {prismic.isFilled.image(property.data.featured_image) && (
                    <PrismicNextImage
                      field={property.data.featured_image}
                      fill={true}
                      className="object-cover"
                    />
                  )}
                  <div className="flex items-center justify-center flex-col z-[1]">
                    <div>
                      <p className="text-vertoLightGreen text-base">
                        {property.data.development.data.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-white text-4xl uppercase">
                        {property.data.title}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <div>
                    <p className="text-vertoDarkBlue font-medium mb-2">
                      {property.data.town}, {property.data.postcode}
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
                      {property.data.type.data.name}
                    </p>
                  </div>
                  <div className="pt-4 grid grid-cols-2">
                    <div className="flex items-center">
                      <p className="bg-vertoDarkBlue inline-flex text-white text-xl font-medium px-4 py-2">
                        £{formatPrice(property.data.price)}
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
                        {property.data.bedrooms.data.number_of_bedrooms}
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
                        {property.data.bathrooms}
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
                        {property.data.square_metres}m²
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {filteredProperties.length === 0 && (
        <div className="text-center">
          <p className="text-2xl">
            Sorry, there is nothing matching your search
          </p>
        </div>
      )}
    </div>
  );
};
