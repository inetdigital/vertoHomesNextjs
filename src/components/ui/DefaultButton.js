"use client";

import { PrismicNextLink } from "@prismicio/next";
import { motion } from "framer-motion";

import clsx from "clsx";

const DefaultButton = ({ link, theme, size, padding }) => {
  const themeClasses =
    {
      vertoLightGreen:
        "bg-white text-vertoDarkBlue border-0 hover:bg-vertoLightGreen hover:text-white",
    }[theme] ||
    "border border-vertoDarkBlue text-vertoDarkBlue hover:bg-vertoDarkBlue hover:text-white";

  const sizeClass =
    {
      lg: "text-lg",
    }[size] || "text-sm";

  const paddingClass =
    {
      wide: "px-8",
    }[padding] || "px-4";

  return (
    <PrismicNextLink field={link} className="flex button">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className={clsx(
          "relative py-2 font-medium tracking-button uppercase rounded transition-colors duration-300 ease-in-out text-center",
          themeClasses,
          sizeClass,
          paddingClass
        )}
      >
        {link.text}
      </motion.div>
    </PrismicNextLink>
  );
};

export default DefaultButton;
