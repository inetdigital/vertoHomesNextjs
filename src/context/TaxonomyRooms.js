"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/prismicio";

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const client = createClient();
      const data = await client.getAllByType("taxonomy_number_of_bedrooms");
      setRooms(data);
    };

    fetchRooms();
  }, []);

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};

export const useRooms = () => useContext(RoomsContext);
