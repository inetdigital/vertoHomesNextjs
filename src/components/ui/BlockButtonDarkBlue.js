"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

export const BlockButtonDarkBlue = ({ label }) => {
  const colorClasses = "bg-vertoDarkBlue hover:bg-vertoLightBlue text-white";
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={clsx(
        "relative text-center cursor-pointer uppercase px-6 py-3 rounded-md shadow-md tracking-widest font-normal",
        colorClasses
      )}
    >
      {label}
    </motion.button>
  );
};
