"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/prismicio";

const PriceRangeContext = createContext();

export const PriceRangeProvider = ({ children }) => {
  const [priceRange, setPriceRange] = useState([]);

  useEffect(() => {
    const fetchPriceRange = async () => {
      const client = createClient();
      const data = await client.getAllByType("taxonomy_price_range");
      setPriceRange(data);
    };

    fetchPriceRange();
  }, []);

  return (
    <PriceRangeContext.Provider value={priceRange}>
      {children}
    </PriceRangeContext.Provider>
  );
};

export const usePriceRange = () => useContext(PriceRangeContext);
