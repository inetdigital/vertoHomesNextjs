"use client";

import { createContext, useContext, useState } from "react";

const SearchOptionsContext = createContext();

export const SearchOptionsProvider = ({ children }) => {
  /* 
  locations
  statuses
  price_range
  number_of_rooms
  */
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedNumBedrooms, setSelectedNumBedrooms] = useState(null);

  const [orderBy, setOrderBy] = useState(null);
  const [orderByType, setOrderByType] = useState(null);

  return (
    <SearchOptionsContext.Provider
      value={{
        selectedLocation,
        selectedStatus,
        selectedPriceRange,
        selectedNumBedrooms,
        setSelectedLocation,
        setSelectedStatus,
        setSelectedPriceRange,
        setSelectedNumBedrooms,
        orderBy,
        setOrderBy,
        orderByType,
        setOrderByType,
      }}
    >
      {children}
    </SearchOptionsContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchOptionsContext);
};
