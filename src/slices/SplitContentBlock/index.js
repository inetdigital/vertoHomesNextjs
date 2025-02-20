"use client";

import { Bounded } from "@/components/Bounded";

import Image from "next/image";
import { PrismicRichText } from "@/components/PrismicRichText";

import { motion } from "framer-motion";

const SplitContentBlock = ({ slice }) => {
  const svgName =
    {
      default: "Bike_illo_Green-1.svg",
      withHouseFooter: "House_illo_Green-1.svg",
    }[slice.variation] || "Bike_illo_Green-1.svg";
  return (
    <Bounded as="section" size="widest" paddingAs="contentSection">
      <div className="flex flex-col">
        {/* Title */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl text-vertoBlack text-left mb-8 uppercase">
                {slice.primary.title_lead}
                <br />
                <span className="text-4xl md:text-5xl text-vertoLightGreen">
                  {slice.primary.title}
                </span>
              </h2>
            </div>
            {slice.variation !== "withoutFooter" && (
              <div>
                <Image
                  src={`/assets/${svgName}`}
                  alt="Bike Illustration"
                  width={200}
                  height={130}
                  loading="lazy" // Defers the loading of the image
                />
              </div>
            )}
          </div>

          <div className="text-left text-vertoDarkBlue">
            {/* Content */}
            <PrismicRichText
              field={slice.primary.content}
              components={{
                label: ({ children, node }) => {
                  if (node.data.label === "block-button") {
                    return (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                        className="relative text-center cursor-pointer uppercase px-6 py-3 rounded-md shadow-md tracking-widest font-normal bg-vertoDarkBlue hover:bg-vertoLightBlue text-white"
                      >
                        {children}
                      </motion.button>
                    );
                  }
                  return <span>{children}</span>;
                },
              }}
            />
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default SplitContentBlock;
