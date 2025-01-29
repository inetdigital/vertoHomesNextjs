"use client";

import { createContext, useContext, useState } from "react";

const HubspotMainFormContext = createContext();

export const HubspotMainFormProvider = ({ children }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formId, setFormId] = useState("");

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <HubspotMainFormContext.Provider
      value={{ isFormOpen, openForm, closeForm, formId, setFormId }}
    >
      {children}
    </HubspotMainFormContext.Provider>
  );
};

export const useHubspotMainForm = () => {
  return useContext(HubspotMainFormContext);
};
