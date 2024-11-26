"use client";

import { createContext, useContext, useState } from "react";

const MenuStatusContext = createContext();

export const MenuStatusProvider = ({ children }) => {
  const [menuStatus, setMenuStatus] = useState(false);

  return (
    <MenuStatusContext.Provider
      value={{
        menuStatus,
        setMenuStatus,
      }}
    >
      {children}
    </MenuStatusContext.Provider>
  );
};

export const useMenuStatus = () => {
  return useContext(MenuStatusContext);
};
