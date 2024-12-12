"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/prismicio";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      const client = createClient();
      const data = await client.getAllByType("settings");
      setSettings(data);
    };

    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
