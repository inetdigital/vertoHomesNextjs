import { useEffect, useState, useMemo } from "react";

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
import { PropertyCard } from "@/components/ui/PropertyCard";
import { useProperties } from "@/context/AllProperties";
import { useDevelopments } from "@/context/AllDevelopments";

export const SearchResultsPanel = ({ restrictToDevelopment = false }) => {
  const {
    selectedLocation,
    selectedStatus,
    selectedPriceRange,
    selectedNumBedrooms,
    selectedHouseType,
    orderBy,
    setOrderBy,
    orderByType,
    setOrderByType,
  } = useSearch();

  const properties = useProperties();
  const developments = useDevelopments();

  const [sortedProperties, setSortedProperties] = useState([]);
  const [restrictToDevelopmentCounty, setRestrictToDevelopmentCounty] =
    useState("");

  const GetDevelopmentFromUid = ({ uid }) => {
    // Find the development with the matching UID
    const matchingDevelopment = developments.find(
      (development) => development.data.uid === uid
    );
    return matchingDevelopment || null; // Return the matching development or null if not found
  };

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
      console.log(doc);
      const price = doc.data.price;
      const developmentUID = doc.data.development.uid;

      // Check if the property matches the restrictToDevelopment condition
      const matchesDevelopment =
        !restrictToDevelopment || developmentUID === restrictToDevelopment;

      // Conditionally apply filters based on whether the filter value is defined
      const matchesStatus =
        !selectedStatus || doc.data.status?.uid === selectedStatus;
      const matchesLocation = restrictToDevelopment // If restrictToDevelopment is set, prioritize its filter
        ? doc.data.location_filter?.uid === restrictToDevelopmentCounty
        : !selectedLocation ||
          doc.data.location_filter?.uid === selectedLocation;
      const matchesBedrooms =
        !selectedNumBedrooms || doc.data.bedrooms?.uid === selectedNumBedrooms;
      const matchesPriceRange =
        (!minPrice && !maxPrice) || (price >= minPrice && price <= maxPrice);
      const matchesHouseType =
        !selectedHouseType || doc.data.type?.uid === selectedHouseType;

      return (
        matchesDevelopment &&
        matchesStatus &&
        matchesLocation &&
        matchesBedrooms &&
        matchesPriceRange &&
        matchesHouseType
      );
    });
  }, [
    properties,
    selectedLocation,
    selectedStatus,
    selectedPriceRange,
    selectedNumBedrooms,
    selectedHouseType,
    minPrice,
    maxPrice,
    restrictToDevelopment,
    restrictToDevelopmentCounty,
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

  useEffect(() => {
    if (GetDevelopmentFromUid(restrictToDevelopment) && restrictToDevelopment) {
      setRestrictToDevelopmentCounty(
        GetDevelopmentFromUid(restrictToDevelopment)?.data?.location_county?.uid
      );
    }
  });

  // Check if any of the variables are null
  const hasNullValues =
    !selectedLocation &&
    !selectedStatus &&
    !selectedPriceRange &&
    !selectedNumBedrooms &&
    !selectedHouseType;

  return (
    <div className="w-full h-full">
      {/* Render filtered properties */}
      <div className="flex w-full justify-between items-center mb-16 flex-col lg:flex-row">
        <div className="flex mb-4 lg:mb-0">
          {hasNullValues && (
            <div className="">
              <div className="pointer-events-auto w-full overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition p-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 mr-2 text-vertoLightGreen"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clipRule="evenodd"
                  />
                </svg>

                <p className="text-sm">
                  Currently showing all properties
                  {restrictToDevelopment
                    ? ` for ${GetDevelopmentFromUid(restrictToDevelopment)?.data?.name}`
                    : ""}
                  . Use the filters above to refine your search
                </p>
              </div>
            </div>
          )}
          <div className="flex">
            {selectedStatus && (
              <div className="bg-vertoDarkGreen rounded-full p-4 mr-0 lg:mr-2 flex items-center">
                <p className="text-white text-xs sm:text-sm lg:text-base truncate">
                  <span className="hidden md:inline-block">Homes</span>{" "}
                  {capitalizeWords(
                    selectedStatus?.replace("_", " ", selectedStatus)
                  )}
                </p>
              </div>
            )}
            {selectedLocation && (
              <div className="bg-vertoDarkGreen rounded-full p-4 mx-0 lg:mx-2 flex items-center">
                <p className="text-white text-xs sm:text-sm lg:text-base truncate">
                  In {capitalizeWords(selectedLocation)}
                </p>
              </div>
            )}
            {selectedHouseType && (
              <div className="bg-vertoDarkGreen rounded-full p-4 mx-0 lg:mx-2 flex items-center">
                <p className="text-white text-xs sm:text-sm lg:text-base truncate">
                  {capitalizeWords(selectedHouseType)}
                </p>
              </div>
            )}
            {selectedPriceRange && (
              <div className="bg-vertoDarkGreen rounded-full p-4 mx-0 lg:mx-2 flex items-center">
                <p className="text-white text-xs sm:text-sm lg:text-base truncate">
                  {formatRange(selectedPriceRange)}
                </p>
              </div>
            )}
            {selectedNumBedrooms && (
              <div className="bg-vertoDarkGreen rounded-full p-4 ml-0 lg:ml-2 flex items-center">
                <p className="text-white text-xs sm:text-sm lg:text-base truncate">
                  {selectedNumBedrooms} Rooms
                </p>
              </div>
            )}
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
          {sortedProperties.map((property, index) => {
            return <PropertyCard property={property} key={index} />;
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
