"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/prismicio";

const PropertiesContext = createContext();

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const client = createClient();
      const data = await client.getAllByType("property", {
        fetchLinks: [
          "development.uid",
          "development.name",
          "type.uid",
          "taxonomy_house_type.name",
          "taxonomy_number_of_bedrooms.number_of_bedrooms",
        ],
      });
      setProperties(data);
    };

    fetchProperties();
  }, []);

  return (
    <PropertiesContext.Provider value={properties}>
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => useContext(PropertiesContext);
