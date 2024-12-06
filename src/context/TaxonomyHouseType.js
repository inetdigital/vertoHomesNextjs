"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/prismicio";

const HouseTypesContext = createContext();

export const HouseTypesProvider = ({ children }) => {
  const [houseTypes, setHouseTypes] = useState([]);

  useEffect(() => {
    const fetchHouseTypes = async () => {
      const client = createClient();
      const data = await client.getAllByType("taxonomy_house_type");
      setHouseTypes(data);
    };
    fetchHouseTypes();
  }, []);

  return (
    <HouseTypesContext.Provider value={houseTypes}>
      {children}
    </HouseTypesContext.Provider>
  );
};

export const useHouseTypes = () => useContext(HouseTypesContext);
