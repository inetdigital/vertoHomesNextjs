"use client";

import { motion } from "framer-motion";

const BlockButton = ({ label, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="relative w-full text-center cursor-pointer uppercase px-6 py-3 bg-white text-vertoDarkGreen rounded-md shadow-md tracking-widest font-normal hover:bg-vertoLightGreen hover:text-white"
      onClick={onClick}
    >
      {label}
    </motion.button>
  );
};

export default BlockButton;
