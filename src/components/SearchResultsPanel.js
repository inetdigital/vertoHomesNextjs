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
        <p className="text-center">Please complete your search criteria</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProperties.map((property, index) => (
            <div key={index}>
              <div className="aspect-h-3 aspect-w-3 relative bg-gray-100">
                {prismic.isFilled.image(property.data.featured_image) && (
                  <PrismicNextImage
                    field={property.data.featured_image}
                    fill={true}
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          ))}
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
