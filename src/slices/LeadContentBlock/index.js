"use client";

import { PrismicRichText } from "@/components/PrismicRichText";
import { Bounded } from "@/components/Bounded";
import DefaultButton from "@/components/ui/DefaultButton";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const LeadContentBlock = ({ slice }) => {
  const highLightColor =
    {
      default: "vertoLightBlue",
      greenHighlight: "vertoLightGreen",
    }[slice.variation] || "vertoLightBlue";

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" }); // Trigger animation when near the viewport

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }} // Initial state: fully transparent and moved down by 50px
      animate={isInView ? { opacity: 1, y: 0 } : {}} // Animate to fully visible and in position
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
    >
      <Bounded
        as="section"
        size="wide"
        paddingAs="contentSection"
        className="text-center"
      >
        {slice.primary.title_lead && (
          <p
            className={`uppercase text-${highLightColor} mb-4 tracking-normal lg:tracking-wide font-medium text-base lg:text-xl`}
          >
            {slice.primary.title_lead}
          </p>
        )}

        {slice.primary.title && (
          <>
            <h2 className="uppercase text-vertoBlack tracking-widest text-2xl md:text-4xl lg:text-6xl">
              {slice.primary.title}
            </h2>
            <div
              className={`bg-${highLightColor} w-[100px] h-[4px] mx-auto mt-8 mb-16`}
            />
          </>
        )}
        {slice.primary.content && (
          <PrismicRichText
            field={slice.primary.content}
            components={{
              paragraph: ({ children }) => (
                <p className="text-base lg:text-xl">{children}</p>
              ),
            }}
          />
        )}
        {slice.primary.link &&
          slice.primary.link.text &&
          slice.primary.link.url && (
            <div className="flex justify-center align-center mt-16">
              <DefaultButton link={slice.primary.link} />
            </div>
          )}
      </Bounded>
    </motion.section>
  );
};

export default LeadContentBlock;
