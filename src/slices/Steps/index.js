"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bounded } from "@/components/Bounded";

import { asText } from "@prismicio/client";

// StepItem Component
const StepItem = ({ step, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="text-left bg-gray-100 rounded-lg py-12 px-6 shadow-sm"
    >
      <p className="text-5xl text-vertoLightGreen font-bold">{index + 1}</p>
      <hr className="border-t-2 border-vertoLightGreen w-full mx-auto my-4" />
      <p className="text-vertoBlack">{asText(step.step)}</p>
    </motion.div>
  );
};

const Steps = ({ slice }) => {
  return (
    <Bounded as="section" paddingAs="contentSection" size="widest">
      <h2 className="text-2xl font-bold text-vertoDarkBlue mb-12 uppercase">
        Five steps to zero bills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
        {slice.primary.steps.map((step, index) => (
          <StepItem key={index} step={step} index={index} />
        ))}
      </div>
    </Bounded>
  );
};

export default Steps;
