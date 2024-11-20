"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { PrismicRichText } from "@prismicio/react";

export default function HomePageBanner({ banners }) {
  const [isBrowser, setIsBrowser] = useState(false); // Track if the app is in the browser
  const [currentIndex, setCurrentIndex] = useState(0); // State for current banner index
  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(0);
  const scale = useTransform(scrollY, [0, viewportHeight], [1, 1.2]);

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
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isBrowser, banners.length]);

  if (!isBrowser) {
    // Return a fallback or placeholder until the app detects the browser
    return <div className="h-screen w-full bg-gray-200"></div>;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={banners[currentIndex].image.url}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ scale }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          >
            <Image
              src={banners[currentIndex].image.url}
              alt={banners[currentIndex].image.alt || "Banner image"}
              fill
              style={{ objectFit: "cover" }}
              quality={80}
              priority
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-black opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
            }}
          ></motion.div>
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          >
            <PrismicRichText field={banners[currentIndex].banner_content} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
