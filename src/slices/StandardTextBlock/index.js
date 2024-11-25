"use client";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { motion } from "framer-motion";

const StandardTextBlock = ({ slice }) => {
  return (
    <Bounded
      as="section"
      size={slice.variation === "default" ? "wide" : "base"}
      paddingAs="contentSection"
      className="text-center"
    >
      {slice.variation === "default" && <WithRegisterInterest slice={slice} />}
    </Bounded>
  );
};

const WithRegisterInterest = ({ slice }) => {
  return (
    <div>
      <div>
        {slice.primary?.content && (
          <PrismicRichText
            field={slice.primary.content}
            components={{
              paragraph: ({ children }) => (
                <p className="text-2xl">{children}</p>
              ),
            }}
          />
        )}
      </div>
      <div className="mt-16">
        <button>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative px-4 py-2 font-medium text-sm tracking-button uppercase border border-black rounded text-vertoDarkBlue transition-colors duration-300 ease-in-out hover:bg-vertoDarkBlue hover:text-white"
          >
            Register your interest
          </motion.div>
        </button>
      </div>
    </div>
  );
};

export default StandardTextBlock;
