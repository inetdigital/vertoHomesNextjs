"use client";

import { Bounded } from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import DefaultButton from "@/components/ui/DefaultButton";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";

const FullimageBlock = ({ slice }) => {
  const ref = useRef(null); // Reference for the container
  const refTitle = useRef(null);

  const [isBrowser, setIsBrowser] = useState(false); // Track if the app is in the browser
  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(0);
  const [elementHeight, setElementHeight] = useState(0); // Height of the element
  const [elementTop, setElementTop] = useState(0); // Top position of the element relative to the viewport

  const scale = useTransform(
    scrollY,
    [elementTop - viewportHeight, elementTop],
    [1, 1.2]
  );

  const isInView = useInView(refTitle, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  // Ensure the component detects the browser environment
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (isBrowser) {
      const updateHeight = () => setViewportHeight(window.innerHeight);
      updateHeight(); // Set initially
      window.addEventListener("resize", updateHeight);

      return () => window.removeEventListener("resize", updateHeight);
    }
  }, [isBrowser]);

  useEffect(() => {
    if (isBrowser) {
      const updateElementPosition = () => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          setElementHeight(rect.height);
          setElementTop(window.scrollY + rect.top); // Convert to absolute position
        }
      };

      updateElementPosition(); // Initialize on mount
      window.addEventListener("resize", updateElementPosition);
      return () => window.removeEventListener("resize", updateElementPosition);
    }
  }, [isBrowser]);

  return (
    <Bounded as="section" paddingAs="fullWidthBlock">
      <div ref={ref} className="h-screen w-screen relative overflow-hidden">
        <div className="absolute w-full h-full bg-black/40 z-[2]" />

        <div className="absolute z-[3] flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-white uppercase text-center text-2xl font-heading font-medium tracking-widest mb-2">
            {slice.primary.title_lead}
          </p>
          <p className="text-white uppercase text-center text-5xl font-heading font-semibold tracking-widest">
            {slice.primary.title}
          </p>
          <div className="mt-12">
            <DefaultButton
              link={slice.primary.link}
              theme="vertoLightGreen"
              size="lg"
              padding="wide"
            />
          </div>
        </div>
        <AnimatePresence>
          <motion.div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ scale }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          >
            <PrismicNextImage
              field={slice.primary.image}
              fallbackAlt="Verto Homes"
              className="w-full h-full"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                objectFit: "cover", // Ensures the image scales to cover the container
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </Bounded>
  );
};

export default FullimageBlock;
