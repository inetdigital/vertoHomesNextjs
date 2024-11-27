"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/prismicio";

const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      const client = createClient();
      const data = await client.getAllByType("taxonomy_status");
      setStatus(data);
    };

    fetchStatus();
  }, []);

  return (
    <StatusContext.Provider value={status}>{children}</StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
