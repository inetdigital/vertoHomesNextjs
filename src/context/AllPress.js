"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/prismicio";

const PressContext = createContext();

export const PressProvider = ({ children }) => {
  const [press, setPress] = useState([]);

  useEffect(() => {
    const fetchPress = async () => {
      const client = createClient();
      const data = await client.getAllByType("press_release");
      setPress(data);
    };

    fetchPress();
  }, []);

  return (
    <PressContext.Provider value={press}>{children}</PressContext.Provider>
  );
};

export const usePress = () => useContext(PressContext);
