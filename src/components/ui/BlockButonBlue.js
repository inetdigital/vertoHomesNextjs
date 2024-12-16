"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

export const BlockButtonBlue = ({ label, reverse = false }) => {
  const colorClasses = !reverse
    ? "bg-white text-vertoDarkBlue hover:bg-vertoLightBlue hover:text-white"
    : "bg-vertoLightBlue hover:bg-white text-white hover:text-vertoDarkBlue";
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={clsx(
        "relative text-center cursor-pointer uppercase px-6 py-3 rounded-md shadow-md tracking-widest font-normal w-full",
        colorClasses
      )}
    >
      {label}
    </motion.button>
  );
};
