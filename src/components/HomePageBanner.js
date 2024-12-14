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

export default function HomePageBanner({ singleHomePage, banners }) {
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
      }, 800000);

      return () => clearInterval(interval);
    }
  }, [isBrowser, banners.length]);

  if (!isBrowser) {
    // Return a fallback or placeholder until the app detects the browser
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <Image
          src={singleHomePage.data.home_page_banner_images[0].image.url}
          alt={
            singleHomePage.data.home_page_banner_images[0].image.alt ||
            "Verto Homes"
          }
          width={100}
          height={100}
          quality={1}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 bg-black bg-opacity-50">
          <PrismicRichText
            field={
              singleHomePage.data.home_page_banner_images[0].banner_content
            }
            components={{
              label: ({ children, node }) => {
                if (node.data.label === "live-zero-title") {
                  return (
                    <span className="live-zero-logo text-white tracking-logo flex justify-center">
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
        </div>
      </div>
    );
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
            className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 max-w-4xl mx-auto"
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
                label: ({ children, node }) => {
                  if (node.data.label === "live-zero-title") {
                    return (
                      <span className="live-zero-logo text-white tracking-logo flex justify-center">
                        LIVE ZER
                        <span className="o text-white">
                          O<div className="live-zero-line text-white"> </div>
                        </span>
                      </span>
                    );
                  }
                  return <span>{children}</span>;
                },
                paragraph: ({ children }) => (
                  <p className="font-normal text-base md:text-lg lg:text-xl mt-4 text-white">
                    {children}
                  </p>
                ),
              }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
