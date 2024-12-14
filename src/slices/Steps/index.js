"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bounded } from "@/components/Bounded";

const steps = [
  {
    number: 1,
    description: "Move into your new Zero Bills home",
  },
  {
    number: 2,
    description: "Receive your welcome pack from Octopus Energy",
  },
  {
    number: 3,
    description: "Activate your Zero Bills account online",
  },
  {
    number: 4,
    description: "Set your heating preferences in the app",
  },
  {
    number: 5,
    description: "Enjoy your new home – we’ll take care of the rest",
  },
];

const Steps = () => {
  return (
    <Bounded as="section" paddingAs="contentSection" size="widest">
      <h2 className="text-2xl font-bold text-vertoDarkBlue mb-12 uppercase">
        Five steps to zero bills
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
        {steps.map((step, index) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, threshold: 0.1 });
          return (
            <motion.div
              ref={ref}
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="text-left bg-gray-100 rounded-lg py-12 px-6 shadow-sm"
            >
              <p className="text-5xl text-vertoLightGreen font-bold">
                {step.number}
              </p>
              <hr className="border-t-2 border-vertoLightGreen w-full mx-auto my-4" />
              <p className="text-vertoBlack">{step.description}</p>
            </motion.div>
          );
        })}
      </div>
    </Bounded>
  );
};

export default Steps;
