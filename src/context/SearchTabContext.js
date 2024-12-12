"use client";

import { createContext, useContext, useState } from "react";

const SearchTabContext = createContext();

export const SearchTabProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [selectedLocationTab, setSelectedLocationTab] = useState("all");

  return (
    <SearchTabContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
        selectedLocationTab,
        setSelectedLocationTab,
      }}
    >
      {children}
    </SearchTabContext.Provider>
  );
};

export const useTab = () => {
  return useContext(SearchTabContext);
};
