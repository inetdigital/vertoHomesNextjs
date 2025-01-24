"use client";

import { Bounded } from "@/components/Bounded";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CheckList = ({ slice }) => {
  const backgroundColorClass =
    {
      VertoBlue: "bg-vertoDarkBlue",
      VertoGrey: "bg-vertoLightGrey",
      White: "bg-white",
      VertoGreen: "bg-vertoDarkGreen",
    }[slice.primary.background_color] || "bg-white"; // Fallback if undefined
  return (
    <Bounded as="section" paddingAs="fullWidthBlock">
      <div
        className={`${backgroundColorClass} ${slice.variation === "default" ? "px-6 md:px-12" : "py-28 md:py-32 px-6 md:px-12"}`}
      >
        <DefaultSlice slice={slice} />
      </div>
    </Bounded>
  );
};

export default CheckList;

const DefaultSlice = ({ slice }) => {
  const textColorClass =
    {
      VertoBlue: "text-white",
      VertoGrey: "text-white",
      White: "text-vertoDarkBlue",
      VertoGreen: "text-white",
    }[slice.primary.background_color] || "text-vertoDarkBlue"; // Fallback if undefined

  const iconColorClass =
    {
      VertoBlue: "text-vertoLightBlue",
      VertoGrey: "text-vertoLightBlue",
      White: "text-vertoDarkBlue",
      VertoGreen: "text-vertoLightGreen",
    }[slice.primary.background_color] || "text-vertoLightBlue"; // Fallback if undefined

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger each child by 0.2s
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Ref for in-view detection
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <div className="max-w-7xl mx-auto">
      <h2
        className={`${textColorClass} text-4xl font-semibold uppercase mb-14 tracking-widest`}
      >
        Key Features
      </h2>
      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-11"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"} // Only animate when in view
        variants={containerVariants}
      >
        {slice.primary.bullet_points.map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-4"
            variants={itemVariants}
          >
            <span className={`${iconColorClass} flex-shrink-0`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
            <p className={`${textColorClass} text-base`}>{feature.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
