"use client";

import { useEffect } from "react";
import { useHubspotMainForm } from "@/context/HubspotMainFormContext";

const HubSpotFormOverlay = ({ portalId }) => {
  const { isFormOpen, closeForm, formId } = useHubspotMainForm();

  useEffect(() => {
    if (isFormOpen && formId && typeof window !== "undefined" && window.hbspt) {
      window.hbspt.forms.create({
        portalId,
        formId,
        target: "#hubspot-form-container",
      });
    }
  }, [isFormOpen, portalId, formId]);

  return (
    <div className="fixed z-50">
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-scroll">
          <div className="bg-white p-0 sm:p-4 md:p-8 lg:p-16 rounded-lg shadow-lg relative max-w-4xl w-full overflow-y-scroll mx-6">
            <button
              onClick={closeForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <div
              id="hubspot-form-container"
              className="overflow-y-scroll h-[80vh] max-w-[90vw]"
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HubSpotFormOverlay;
