"use client";

import * as prismic from "@prismicio/client";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { PrismicNextImage } from "@prismicio/next";

import { useHubspotMainForm } from "@/context/HubspotMainFormContext";

export const BannerImage = ({
  image,
  title,
  themeColor,
  caption,
  status,
  data,
}) => {
  console.log("BannerImage data:", data);
  const colorClasses = themeColor ? themeColor : "vertoLightGreen";

  const [isBrowser, setIsBrowser] = useState(false); // Track if the app is in the browser
  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(0);
  const scale = useTransform(scrollY, [0, viewportHeight], [1, 1.2]);

  const { openForm, setFormId } = useHubspotMainForm();
  const handleOpenForm = (formId) => {
    setFormId(formId); // Set dynamic form ID
    openForm(); // Open the modal
  };

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

  return (
    <div className="h-screen overflow-hidden relative">
      <div className="absolute bg-black/40 w-full h-full z-[1]" />
      {status?.uid === "available" && (
        <div className="absolute z-[2] right-0 top-40 bg-vertoDarkGreen px-6 py-4 hidden md:block">
          <p className="text-vertoLightGreen text-2xl font-semibold font-heading tracking-widest">
            HOMES FOR SALE
          </p>
        </div>
      )}
      {image && (
        <AnimatePresence>
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ scale }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          >
            <PrismicNextImage
              field={image}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover", // Ensures the image scales to cover the container
              }}
              fallbackAlt="Verto Homes"
              priority
            />
          </motion.div>
        </AnimatePresence>
      )}
      <div className="absolute flex flex-col items-center justify-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[2]">
        <div className="max-w-4xl">
          <h1 className="text-white uppercase text-center tracking-widest leading-tight">
            {Array.isArray(title) ? prismic.asText(title) : title}
          </h1>
        </div>
        <hr className={`h-[3px] w-20 border-0 bg-${colorClasses} mt-8`} />
        {caption && (
          <div className="max-w-md mt-8">
            <p className="text-white font-normal text-lg lg:text-2xl text-center">
              {Array.isArray(caption) ? prismic.asText(caption) : caption}
            </p>
          </div>
        )}
        {data?.banner_link && data?.hubspot_form_id && (
          <div className="mt-16">
            <button onClick={() => handleOpenForm(data?.hubspot_form_id)}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`text-white bg-vertoLightBlue hover:bg-vertoLightBlue hover:text-white relative px-4 py-2 font-medium text-lg tracking-button uppercase border-0 rounded transition-colors duration-300 ease-in-out`}
              >
                {data.banner_link.text
                  ? data.banner_link.text
                  : "Register your interest"}
              </motion.div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
