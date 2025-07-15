"use client";

import { useHubspotMainForm } from "@/context/HubspotMainFormContext";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

const HubSpotFormButton = ({ slice }) => {
  const { openForm, setFormId } = useHubspotMainForm();
  const handleOpenForm = (formId) => {
    setFormId(formId); // Set dynamic form ID
    openForm(); // Open the modal
  };

  if (!slice?.primary?.hubspot_form_id) {
    return null; // Return null if no form ID is provided
  }

  return (
    <section>
      <div className="mt-16 px-6 text-center">
        <button onClick={() => handleOpenForm(slice?.primary?.hubspot_form_id)}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={`text-white bg-vertoLightBlue hover:bg-vertoLightBlue hover:text-white relative px-4 py-2 font-medium text-lg tracking-button uppercase border-0 rounded transition-colors duration-300 ease-in-out`}
          >
            {slice?.primary?.link_label
              ? slice.primary?.link_label
              : "Register your interest"}
          </motion.div>
        </button>
      </div>
    </section>
  );
};

export default HubSpotFormButton;
