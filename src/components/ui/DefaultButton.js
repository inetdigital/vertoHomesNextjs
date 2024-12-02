"use client";

import { PrismicNextLink } from "@prismicio/next";
import { motion } from "framer-motion";

const DefaultButton = ({ link }) => {
  return (
    <PrismicNextLink field={link} className="flex button">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="relative px-4 py-2 font-medium text-sm tracking-button uppercase border border-vertoDarkBlue rounded text-vertoDarkBlue transition-colors duration-300 ease-in-out hover:bg-vertoDarkBlue hover:text-white"
      >
        {link.text}
      </motion.div>
    </PrismicNextLink>
  );
};

export default DefaultButton;
