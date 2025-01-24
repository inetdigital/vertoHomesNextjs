"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bounded } from "@/components/Bounded";
import PrismicImageComponent from "@/components/PrismicImageComponent";

const InlineImages = ({ slice }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  // Define Framer Motion variants
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1, // Stagger animation outward from the center
      },
    },
    hidden: {},
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  return (
    <Bounded
      as="section"
      size={slice.variation === "default" ? "widest" : "base"}
      paddingAs="contentSection"
      className="text-center"
    >
      {slice.primary?.title && (
        <h3 className="text-vertoBlack font-normal mb-8">
          {slice.primary.title}
        </h3>
      )}
      <motion.div
        ref={ref}
        className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-8"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {slice.primary.images?.map((item, index, array) => {
          const middleIndex = Math.floor(array.length / 2); // Find the center index
          const distanceFromMiddle = Math.abs(index - middleIndex); // Distance from center (0 for center, 1 for left/right of center, etc.)

          return (
            <motion.div
              key={index}
              variants={{
                ...itemVariants,
                visible: {
                  ...itemVariants.visible,
                  transition: {
                    ...itemVariants.visible.transition,
                    delay: distanceFromMiddle * 0.2, // Delay increases based on distance from center
                  },
                },
              }}
              className="flex justify-center"
            >
              <PrismicImageComponent imageField={item.image} />
            </motion.div>
          );
        })}
      </motion.div>
    </Bounded>
  );
};

export default InlineImages;
