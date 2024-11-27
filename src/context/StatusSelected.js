"use client";

import { createContext, useContext, useState } from "react";

const StatusSelectedContext = createContext();

export const StatusSelectedProvider = ({ children }) => {
  const [statusSelected, setStatusSelected] = useState("all");

  return (
    <StatusSelectedContext.Provider
      value={{ statusSelected, setStatusSelected }}
    >
      {children}
    </StatusSelectedContext.Provider>
  );
};

export const useStatusSelected = () => useContext(StatusSelectedContext);
