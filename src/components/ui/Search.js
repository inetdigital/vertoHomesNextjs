"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { formatPrice } from "@/lib/formatPrice";
import { formatRange } from "@/lib/formatPriceRange";

import { useSearch } from "@/context/SearchOptions";
import { useTab } from "@/context/SearchTabContext";

import { useLocations } from "@/context/TaxonomyLocations";
import { useStatus } from "@/context/TaxonomyStatus";
import { usePriceRange } from "@/context/TaxonomyPriceRange";
import { useRooms } from "@/context/TaxonomyRooms";
import { useHouseTypes } from "@/context/TaxonomyHouseType";

export const Search = ({
  withButton,
  background,
  hideLocationFilter = false,
}) => {
  const {
    selectedLocation,
    selectedStatus,
    selectedPriceRange,
    selectedNumBedrooms,
    selectedHouseType,
    setSelectedLocation,
    setSelectedStatus,
    setSelectedPriceRange,
    setSelectedNumBedrooms,
    setSelectedHouseType,
  } = useSearch();

  const [btnActive, setBtnActive] = useState(false);
  const [allowReset, setAllowReset] = useState(false);

  const { setSelectedTab } = useTab();
  const locations = useLocations();
  const statuses = useStatus();
  const price_range = usePriceRange();
  const number_of_rooms = useRooms();
  const house_types = useHouseTypes();

  const handleAvailabilitySelect = (selectedUid) => {
    setSelectedStatus(selectedUid); // Update the selected state
  };

  const handleLocationSelect = (selectedUid) => {
    setSelectedLocation(selectedUid); // Update the selected state
  };

  const handlePriceRangeSelect = (selectedUid) => {
    setSelectedPriceRange(selectedUid); // Update the selected state
  };

  const handleNumBedroomsSelect = (selectedUid) => {
    setSelectedNumBedrooms(selectedUid); // Update the selected state
  };

  const handleHouseTypeSelect = (selectedUid) => {
    setSelectedHouseType(selectedUid); // Update the selected state
  };

  const clearAllFilters = () => {
    setSelectedLocation("");
    setSelectedStatus("");
    setSelectedPriceRange("");
    setSelectedNumBedrooms("");
    setSelectedHouseType("");
    setAllowReset(false);
  };

  useEffect(() => {
    if (
      selectedLocation &&
      selectedStatus &&
      selectedPriceRange &&
      selectedNumBedrooms &&
      selectedHouseType
    ) {
      setSelectedTab(2);
      setBtnActive(true);
    }
  }, [
    selectedStatus,
    selectedLocation,
    selectedPriceRange,
    selectedNumBedrooms,
    selectedHouseType,
  ]);

  useEffect(() => {
    if (
      selectedLocation ||
      selectedStatus ||
      selectedPriceRange ||
      selectedNumBedrooms ||
      selectedHouseType
    ) {
      setAllowReset(true);
    }
  }, [
    selectedStatus,
    selectedLocation,
    selectedPriceRange,
    selectedNumBedrooms,
    selectedHouseType,
  ]);

  return (
    <div
      className={`${background ? background : "bg-white"} rounded-lg p-6 sm:p-8 md:p-12 transition-all duration-300 ease-in-out relative`}
    >
      <div className="mb-4">
        <p className="text-center text-2xl font-normal">
          Show me homes that match
        </p>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 ${hideLocationFilter ? "lg:grid-cols-4" : "lg:grid-cols-5"} gap-2 md:gap-4 lg:gap-6`}
      >
        <div>
          <Listbox value={selectedStatus} onChange={handleAvailabilitySelect}>
            <div className="relative mt-2">
              <ListboxButton
                className={`${selectedStatus ? "ring-vertoDarkBlue" : "ring-gray-300"} relative w-full cursor-default rounded-md bg-white py-4 pl-3 pr-10 text-left text-vertoDarkBlue shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-vertoDarkBlue hover:ring-vertoDarkBlue transition duration-300 ease-in-out sm:text-sm/6`}
              >
                <span className="flex justify-between text-lg">
                  {selectedStatus
                    ? statuses.find((item) => item.uid === selectedStatus)?.data
                        .name
                    : "e.g For Sale"}
                  {selectedStatus && (
                    <span className="inset-y-0 right-0 flex items-center pr-4 text-vertoDarkGreen">
                      <CheckIcon aria-hidden="true" className="size-5" />
                    </span>
                  )}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="size-5 text-vertoDarkBlue"
                  />
                </span>
              </ListboxButton>

              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
              >
                {statuses.map((item) => (
                  <ListboxOption
                    key={item.uid}
                    value={item.uid} // Pass the UID as the value
                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-vertoDarkBlue data-[focus]:text-white"
                  >
                    <span className="block truncate font-normal group-data-[selected]:font-semibold text-left">
                      {item.data.name}
                    </span>

                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-vertoDarkGreen group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                      <CheckIcon aria-hidden="true" className="size-5" />
                    </span>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
        {!hideLocationFilter && (
          <div>
            <Listbox value={selectedLocation} onChange={handleLocationSelect}>
              <div className="relative mt-2">
                <ListboxButton
                  className={`${selectedLocation ? "ring-vertoDarkBlue" : "ring-gray-300"} relative w-full cursor-default rounded-md bg-white py-4 pl-3 pr-10 text-left text-vertoDarkBlue shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-vertoDarkBlue hover:ring-vertoDarkBlue transition duration-300 ease-in-out sm:text-sm/6`}
                >
                  <span className="flex justify-between text-lg">
                    {selectedLocation
                      ? locations.find((item) => item.uid === selectedLocation)
                          ?.data.name
                      : "County"}
                    {selectedLocation && (
                      <span className="inset-y-0 right-0 flex items-center pr-4 text-vertoDarkGreen">
                        <CheckIcon aria-hidden="true" className="size-5" />
                      </span>
                    )}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      aria-hidden="true"
                      className="size-5 text-vertoDarkBlue"
                    />
                  </span>
                </ListboxButton>

                <ListboxOptions
                  transition
                  className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                  {locations
                    .slice() // Create a shallow copy to avoid mutating the original array
                    .sort((a, b) => a.data.name.localeCompare(b.data.name)) // Sort alphabetically
                    .map((item) => (
                      <ListboxOption
                        key={item.uid}
                        value={item.uid} // Pass the UID as the value
                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-vertoDarkBlue data-[focus]:text-white"
                      >
                        <span className="block truncate font-normal group-data-[selected]:font-semibold text-left">
                          {item.data.name}
                        </span>

                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-vertoDarkGreen group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                          <CheckIcon aria-hidden="true" className="size-5" />
                        </span>
                      </ListboxOption>
                    ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>
        )}
        <div>
          <Listbox value={selectedLocation} onChange={handleHouseTypeSelect}>
            <div className="relative mt-2">
              <ListboxButton
                className={`${selectedHouseType ? "ring-vertoDarkBlue" : "ring-gray-300"} relative w-full cursor-default rounded-md bg-white py-4 pl-3 pr-10 text-left text-vertoDarkBlue shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-vertoDarkBlue hover:ring-vertoDarkBlue transition duration-300 ease-in-out sm:text-sm/6`}
              >
                <span className="flex justify-between text-lg">
                  {selectedHouseType
                    ? house_types.find((item) => item.uid === selectedHouseType)
                        ?.data.name
                    : "House Type"}
                  {selectedHouseType && (
                    <span className="inset-y-0 right-0 flex items-center pr-4 text-vertoDarkGreen">
                      <CheckIcon aria-hidden="true" className="size-5" />
                    </span>
                  )}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="size-5 text-vertoDarkBlue"
                  />
                </span>
              </ListboxButton>

              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
              >
                {house_types
                  .slice() // Create a shallow copy to avoid mutating the original array
                  .sort((a, b) => a.data.name.localeCompare(b.data.name)) // Sort alphabetically
                  .map((item) => (
                    <ListboxOption
                      key={item.uid}
                      value={item.uid} // Pass the UID as the value
                      className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-vertoDarkBlue data-[focus]:text-white"
                    >
                      <span className="block truncate font-normal group-data-[selected]:font-semibold text-left">
                        {item.data.name}
                      </span>

                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-vertoDarkGreen group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                        <CheckIcon aria-hidden="true" className="size-5" />
                      </span>
                    </ListboxOption>
                  ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
        <div>
          <Listbox value={selectedPriceRange} onChange={handlePriceRangeSelect}>
            <div className="relative mt-2">
              <ListboxButton
                className={`${selectedPriceRange ? "ring-vertoDarkBlue" : "ring-gray-300"} relative w-full cursor-default rounded-md bg-white py-4 pl-3 pr-10 text-left text-vertoDarkBlue shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-vertoDarkBlue hover:ring-vertoDarkBlue transition duration-300 ease-in-out sm:text-sm/6`}
              >
                <span className="flex justify-between text-lg">
                  {selectedPriceRange
                    ? (() => {
                        const selectedRange = price_range.find(
                          (item) => item.uid === selectedPriceRange
                        );
                        return selectedRange
                          ? `${formatRange(selectedPriceRange)}`
                          : "Price Range";
                      })()
                    : "Price Range"}
                  {selectedPriceRange && (
                    <span className="inset-y-0 right-0 flex items-center pr-4 text-vertoDarkGreen">
                      <CheckIcon aria-hidden="true" className="size-5" />
                    </span>
                  )}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="size-5 text-vertoDarkBlue"
                  />
                </span>
              </ListboxButton>

              <ListboxOptions
                transition
                className="truncate absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
              >
                {price_range
                  .sort((a, b) => a.data.price_from - b.data.price_from) // Sort by price_from
                  .map((item) => (
                    <ListboxOption
                      key={item.uid}
                      value={item.uid} // Pass the UID as the value
                      className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-vertoDarkBlue data-[focus]:text-white"
                    >
                      <span className="block truncate font-normal group-data-[selected]:font-semibold text-left">
                        £{formatPrice(item.data.price_from)} - £
                        {formatPrice(item.data.price_to)}
                      </span>

                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-vertoDarkGreen group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                        <CheckIcon aria-hidden="true" className="size-5" />
                      </span>
                    </ListboxOption>
                  ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
        <div>
          <Listbox
            value={selectedNumBedrooms}
            onChange={handleNumBedroomsSelect}
          >
            <div className="relative mt-2">
              <ListboxButton
                className={`${selectedNumBedrooms ? "ring-vertoDarkBlue" : "ring-gray-300"} relative w-full cursor-default rounded-md bg-white py-4 pl-3 pr-10 text-left text-vertoDarkBlue shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-vertoDarkBlue hover:ring-vertoDarkBlue transition duration-300 ease-in-out sm:text-sm/6`}
              >
                <span className="flex justify-between text-lg">
                  {selectedNumBedrooms
                    ? number_of_rooms.find(
                        (item) => item.uid === selectedNumBedrooms
                      )?.data.number_of_bedrooms + " Bedrooms"
                    : "Bedrooms"}
                  {selectedNumBedrooms && (
                    <span className="inset-y-0 right-0 flex items-center pr-4 text-vertoDarkGreen">
                      <CheckIcon aria-hidden="true" className="size-5" />
                    </span>
                  )}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="size-5 text-vertoDarkBlue"
                  />
                </span>
              </ListboxButton>

              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
              >
                {number_of_rooms
                  .slice() // Create a copy to avoid mutating the original array
                  .sort(
                    (a, b) =>
                      Number(a.data.number_of_bedrooms) -
                      Number(b.data.number_of_bedrooms)
                  )
                  .map((item) => (
                    <ListboxOption
                      key={item.uid}
                      value={item.uid} // Pass the UID as the value
                      className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-vertoDarkBlue data-[focus]:text-white"
                    >
                      <span className="block truncate font-normal group-data-[selected]:font-semibold text-left">
                        {item.data.number_of_bedrooms === 2
                          ? "2/3"
                          : item.data.number_of_bedrooms}{" "}
                        Rooms
                      </span>

                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-vertoDarkGreen group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                        <CheckIcon aria-hidden="true" className="size-5" />
                      </span>
                    </ListboxOption>
                  ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
      </div>

      <div
        className={`flex justify-center absolute left-1/2 -translate-x-1/2 bottom-0 transition-all duration-300 ease-in-out ${allowReset ? "opacity-100 translate-y-1/2" : "opacity-0 -translate-y-1/4"}`}
      >
        <button
          className={`${allowReset ? "visible" : "invisible"} transition-all duration-300 ease-in-out text-sm bg-vertoLightGreen rounded-full text-white px-4 py-2 flex items-center`}
          onClick={clearAllFilters}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
          Clear filters
        </button>
      </div>

      {withButton && btnActive && (
        <Link
          href="/find-your-new-home"
          onClick={() => setSelectedTab(2)}
          className="mt-6 inline-flex"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative px-4 py-2 font-medium text-sm tracking-button uppercase border border-vertoDarkBlue rounded text-vertoDarkBlue transition-colors duration-300 ease-in-out hover:bg-vertoDarkBlue hover:text-white"
          >
            View Properties
          </motion.div>
        </Link>
      )}
    </div>
  );
};
