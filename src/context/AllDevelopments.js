"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/prismicio";

const DevelopmentsContext = createContext();

export const DevelopmentsProvider = ({ children }) => {
  const [developments, setDevelopments] = useState([]);

  useEffect(() => {
    const fetchDevelopments = async () => {
      const client = createClient();
      const data = await client.getAllByType("development");
      setDevelopments(data);
    };

    fetchDevelopments();
  }, []);

  return (
    <DevelopmentsContext.Provider value={developments}>
      {children}
    </DevelopmentsContext.Provider>
  );
};

export const useDevelopments = () => useContext(DevelopmentsContext);
