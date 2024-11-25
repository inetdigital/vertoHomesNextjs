"use client";

import { useState, useEffect, useRef } from "react";
import * as prismic from "@prismicio/client";
import { useTab } from "@/context/SearchTabContext";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";

import { capitalizeWords } from "@/lib/capitalizeWords";

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
    const currentTabIndex = tabs.findIndex(
      (tab) => tab.key === selectedLocationTab
    );
    if (tabRefs.current[currentTabIndex]) {
      const { offsetLeft, offsetWidth } = tabRefs.current[currentTabIndex];
      setBgStyle({ left: offsetLeft, width: offsetWidth });
    }
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
                  "relative z-10 rounded-md px-3 py-2 text-xl font-normal flex items-center"
                )}
              >
                {tab.key === selectedLocationTab && (
                  <Image
                    src={`/assets/${tab.key}OutlineIconWhite.png`}
                    alt="Verto Homes"
                    width={20}
                    height={20}
                    priority
                  />
                )}
                <span className="ml-2">{tab.name}</span>
              </button>
            ))}

            {/* Framer Motion animated background */}
            <motion.div
              className="absolute top-0 h-full bg-vertoDarkGreen rounded-md"
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
        <div className="flex items-center justify-end">
          <p className="font-medium">
            {filteredDevelopments.length} Development
            {filteredDevelopments.length > 1 ? "s" : ""} in{" "}
            {capitalizeWords(selectedLocationTab)}
          </p>
        </div>
      </div>
      <div className="developments-wrapper">
        <AnimatePresence mode="wait">
          {filteredDevelopments.length > 0 ? (
            <motion.div
              key={selectedLocationTab}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-4"
            >
              {filteredDevelopments.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 1 }} // Staggered animation
                >
                  <div className="aspect-h-2 aspect-w-5 relative">
                    <div className="absolute w-full h-full bg-black opacity-50 z-[1]" />
                    {prismic.isFilled.image(item.data.banner_image) && (
                      <PrismicNextImage
                        field={item.data.banner_image}
                        fill={true}
                        className="object-cover"
                      />
                    )}
                    <div className="absolute w-full h-full w-9/12 z-[2]">
                      <div className="relative left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-center">
                        <p className="text-white text-xl">
                          {item.data.location_town}, {item.data.location_city}
                        </p>
                        <h2 className="text-white uppercase tracking-widest font-bold text-center mb-4">
                          {item.data.name}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="bg-vertoDarkGreen p-6">Info here</div>
                </motion.div>
              ))}
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
