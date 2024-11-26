"use client";

import { useState, useEffect, useRef } from "react";
import * as prismic from "@prismicio/client";
import { useTab } from "@/context/SearchTabContext";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Image from "next/image";

import { capitalizeWords } from "@/lib/capitalizeWords";

import { formatPrice } from "@/lib/formatPrice";

export const DevelopmentsPanel = ({ locations, developments }) => {
  const { selectedLocationTab, setSelectedLocationTab } = useTab();

  /** Filter all developments to selected tab */
  const filteredDevelopments = developments.filter(
    (doc) => doc.data.location_county?.uid === selectedLocationTab
  );

  // Prepare tabs from locations data
  const [tabs] = useState(
    locations
      .map((item) => ({
        name: item.data.name,
        key: item.uid,
      }))
      .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name
  );

  // Ref for buttons to measure dimensions dynamically
  const tabRefs = useRef([]);

  // State for background position and size
  const [bgStyle, setBgStyle] = useState({ left: 0, width: 0 });

  // Update background position/size when selected tab changes
  useEffect(() => {
    // Function to update the background style
    const updateBackgroundStyle = () => {
      const currentTabIndex = tabs.findIndex(
        (tab) => tab.key === selectedLocationTab
      );
      if (tabRefs.current[currentTabIndex]) {
        const { offsetLeft, offsetWidth } = tabRefs.current[currentTabIndex];
        setBgStyle({ left: offsetLeft, width: offsetWidth });
      }
    };

    // Initial update
    if (typeof window !== "undefined") {
      updateBackgroundStyle();
    }

    // Add resize listener
    const handleResize = () => {
      if (typeof window !== "undefined") {
        updateBackgroundStyle();
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [selectedLocationTab, tabs]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 mb-16">
        <div className="w-full flex items-center justify-left relative">
          <nav aria-label="Tabs" className="flex space-x-4 relative">
            {tabs.map((tab, index) => (
              <button
                key={tab.name}
                ref={(el) => (tabRefs.current[index] = el)} // Assign each button to the ref array
                aria-current={
                  tab.key === selectedLocationTab ? "page" : undefined
                }
                onClick={() => setSelectedLocationTab(tab.key)}
                className={clsx(
                  tab.key === selectedLocationTab
                    ? "text-white"
                    : "text-gray-500 hover:text-vertoDarkBlue",
                  "relative z-[1] rounded-md px-3 py-2 text-base lg:text-xl font-normal flex items-center"
                )}
              >
                {tab.key === selectedLocationTab && (
                  <Image
                    src={`/assets/${tab.key}OutlineIconWhite.png`}
                    alt="Verto Homes"
                    width={20}
                    height={20}
                    priority
                    className="hidden lg:block"
                  />
                )}
                <span className="ml-0 lg:ml-2">{tab.name}</span>
              </button>
            ))}

            {/* Framer Motion animated background */}
            <motion.div
              className="absolute top-0 h-full bg-vertoDarkGreen rounded-full"
              style={{
                left: bgStyle.left,
                width: bgStyle.width,
                margin: "0px",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              layout
            />
          </nav>
        </div>
      </div>
      <div className="developments-wrapper">
        <AnimatePresence mode="wait">
          {filteredDevelopments.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-4"
            >
              {filteredDevelopments.map((item, index) => {
                return (
                  <PrismicNextLink document={item} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 1 }} // Staggered animation
                    >
                      <div className="aspect-h-1 aspect-w-1 md:aspect-h-3 md:aspect-w-5 lg:aspect-h-2 lg:aspect-w-5 relative group">
                        <div className="absolute z-[1] w-full h-full inset-0 bg-black opacity-50 border-0 border-solid border-vertoDarkBlue transition-all duration-500 ease-in-out group-hover:opacity-75 group-hover:border-8"></div>
                        {prismic.isFilled.image(item.data.banner_image) && (
                          <PrismicNextImage
                            field={item.data.banner_image}
                            fill={true}
                            className="object-cover"
                          />
                        )}
                        <div className="px-4 z-[2]">
                          <div className="relative left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-center">
                            <p className="text-white text-xl inline-flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6 mr-2 text-vertoLightGreen"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {item.data.location_town},{" "}
                              {item.data.location_city}
                            </p>
                            <h2 className="text-white uppercase tracking-widest font-bold text-center mb-4">
                              {item.data.name}
                            </h2>
                            <p className="text-white text-lg">
                              {item.data.property_types}
                            </p>
                            <p className="text-white text-lg font-medium mt-4">
                              Prices from £
                              {item.data.prices_from
                                ? formatPrice(item.data.prices_from)
                                : "N/A"}
                            </p>
                            <div className="z-[2] relative opacity-0 transition-all duration-500 ease-in-out translate-y-24 group-hover:translate-y-20 group-hover:opacity-100">
                              <p className="text-xl text-white inline-block rounded-full bg-vertoLightGreen py-2 px-4">
                                View Development
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </PrismicNextLink>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <p className="text-2xl">
                Sorry, there are no developments in{" "}
                {capitalizeWords(selectedLocationTab)}.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
