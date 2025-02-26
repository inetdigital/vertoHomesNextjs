"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bounded } from "@/components/Bounded";
import PrismicImageComponent from "@/components/PrismicImageComponent";
import { PrismicNextImage } from "@prismicio/next";

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
          const totalItems = array.length;
          const isOdd = totalItems % 2 !== 0;
          const isLastItem = index === totalItems - 1;
          const isLastAndOdd = isOdd && isLastItem; // True if it's the last item AND the total count is odd

          const middleIndex = Math.floor(totalItems / 2); // Find the center index
          const distanceFromMiddle = Math.abs(index - middleIndex); // Distance from center

          return (
            <motion.div
              key={index}
              variants={{
                ...itemVariants,
                visible: {
                  ...itemVariants.visible,
                  transition: {
                    ...itemVariants.visible.transition,
                    delay: distanceFromMiddle * 0.2,
                  },
                },
              }}
              className={`flex justify-center ${isLastAndOdd ? "col-span-2 px-16 sm:px-0 sm:col-span-1" : ``}`}
            >
              <PrismicNextImage field={item.image} className="object-contain" />
            </motion.div>
          );
        })}
      </motion.div>
    </Bounded>
  );
};

export default InlineImages;
