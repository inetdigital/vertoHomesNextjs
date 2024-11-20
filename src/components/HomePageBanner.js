"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { PrismicRichText } from "@prismicio/react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HomePageBanner({ banners }) {
  // State to track the currently visible banner index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Setup for scroll and transform
  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(0);

  const scale = useTransform(scrollY, [0, viewportHeight], [1, 1.2]);

  // Interval to change the banner every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [banners.length]);

  // Update viewport height on load and resize
  useEffect(() => {
    const updateHeight = () => setViewportHeight(window.innerHeight);
    updateHeight(); // Set initially
    window.addEventListener("resize", updateHeight); // Update on resize

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

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
          {/* Banner Image with scroll scaling effect */}
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
              fill={true}
              style={{ objectFit: "cover" }}
              quality={80}
              priority={true}
            />
          </motion.div>

          {/* Overlay */}
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

          {/* Banner Content */}
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
            <PrismicRichText
              field={banners[currentIndex].banner_content}
              components={{
                heading1: ({ children }) => (
                  <h1 className="mb-10">{children}</h1>
                ),
                label: ({ children, node }) => {
                  if (node.data.label === "live-zero-title") {
                    return (
                      <span className="live-zero-logo text-white tracking-logo flex">
                        LIVE ZER
                        <span className="o text-white">
                          O<div className="live-zero-line text-white"> </div>
                        </span>
                      </span>
                    );
                  }
                  return <span>{children}</span>;
                },
              }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
