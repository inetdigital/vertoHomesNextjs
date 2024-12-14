"use client";

import { useState, useEffect, useRef } from "react";
import * as prismic from "@prismicio/client";
import { useTab } from "@/context/SearchTabContext";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Image from "next/image";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { capitalizeWords } from "@/lib/capitalizeWords";

import { formatPrice } from "@/lib/formatPrice";

import { useStatus } from "@/context/TaxonomyStatus";
import { useStatusSelected } from "@/context/StatusSelected";

export const DevelopmentsPanel = ({ locations, developments }) => {
  const status = useStatus();
  const { selectedLocationTab, setSelectedLocationTab } = useTab();
  const { statusSelected, setStatusSelected } = useStatusSelected();

  /** Filter all developments to selected tab */
  /** Filter all developments to selected tab */
  const filteredDevelopments = developments.filter(
    (doc) =>
      (selectedLocationTab === "all" ||
        doc.data.location_county?.uid === selectedLocationTab) &&
      (statusSelected === "all" ||
        doc.data.development_status?.uid === statusSelected)
  );

  // Prepare tabs from locations data
  const [tabs] = useState([
    { name: "All", key: "all" }, // Add "All" item at the start
    ...locations
      .map((item) => ({
        name: item.data.name,
        key: item.uid,
      }))
      .sort((a, b) => a.name.localeCompare(b.name)), // Sort alphabetically by name
  ]);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-16">
        <div>
          <Listbox value={statusSelected} onChange={setStatusSelected}>
            <div className="relative flex justify-center lg:justify-start">
              {/* Button */}
              <ListboxButton className="w-9/12 lg:w-[200px] px-4 py-2 text-white bg-vertoDarkGreen rounded-full flex items-center justify-between hover:ring-2 hover:ring-vertoDarkGreen hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-vertoDarkGreen focus:ring-offset-2 text-base lg:text-xl">
                <span className="truncate">
                  {statusSelected !== "all"
                    ? status.find((item) => item.uid === statusSelected)?.data
                        .name
                    : "Status"}
                </span>
                <ChevronUpDownIcon className="w-5 h-5 text-white" />
              </ListboxButton>

              {/* Dropdown */}
              <ListboxOptions className="absolute z-10 mt-2 w-full lg:w-[200px] rounded-lg bg-white shadow-lg ring-1 ring-black/10 focus:outline-none sm:text-sm">
                {/* "All" Option */}
                <ListboxOption
                  key="all"
                  value="all"
                  className={({ active }) =>
                    `group cursor-pointer select-none py-2 px-4 ${
                      active
                        ? "bg-vertoDarkGreen text-white"
                        : "text-vertoDarkBlue"
                    }`
                  }
                >
                  {({ selected }) => (
                    <div className="flex justify-between items-center">
                      <span
                        className={`truncate ${selected ? "font-semibold" : ""}`}
                      >
                        All
                      </span>
                      {selected && (
                        <CheckIcon
                          className="w-5 h-5 text-vertoDarkBlue group-hover:text-white"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  )}
                </ListboxOption>

                {/* Map through status */}
                {status.map((statusItem) => (
                  <ListboxOption
                    key={statusItem.uid}
                    value={statusItem.uid}
                    className={({ active }) =>
                      `group cursor-pointer select-none py-2 px-4 ${
                        active
                          ? "bg-vertoDarkGreen text-white"
                          : "text-vertoDarkBlue"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <div className="flex justify-between items-center">
                        <span
                          className={`truncate ${selected ? "font-semibold" : ""}`}
                        >
                          {statusItem.data.name}
                        </span>
                        {selected && (
                          <CheckIcon
                            className="w-5 h-5 text-vertoDarkBlue group-hover:text-white"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
        <div className="w-full flex items-center justify-center lg:justify-end relative">
          <nav
            aria-label="Tabs"
            className="flex space-x-4 relative mt-8 lg:mt-0"
          >
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
                    : "text-vertoDarkBlue hover:text-vertoDarkBlue",
                  "relative z-[1] rounded-md px-3 py-2 text-sm md:text-base lg:text-xl font-normal flex items-center"
                )}
              >
                {tab.key === selectedLocationTab && tab.key !== "all" && (
                  <Image
                    src={`/assets/${tab.key}OutlineIconWhite.png`}
                    alt="Verto Homes"
                    width={20}
                    height={20}
                    className="hidden lg:block mr-0 lg:mr-2"
                  />
                )}
                <span className="">{tab.name}</span>
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
              className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
              {filteredDevelopments.map((item, index) => {
                return (
                  <PrismicNextLink document={item} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.5 }} // Staggered animation
                    >
                      <div className="aspect-h-1 aspect-w-1 relative group">
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
                            <p className="text-white text-sm md:text-base lg:text-xl inline-flex items-center">
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
                            <p className="text-white text-sm md:text-base lg:text-lg">
                              {item.data.property_types}
                            </p>
                            <p className="text-white text-lg font-medium mt-4">
                              Prices from £
                              {item.data.prices_from
                                ? formatPrice(item.data.prices_from)
                                : "N/A"}
                            </p>
                            <div className="hidden md:block z-[2] relative opacity-0 transition-all duration-500 ease-in-out translate-y-24 group-hover:translate-y-20 group-hover:opacity-100">
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
              <div className="py-24">
                <p className="text-2xl">
                  Sorry, there are currently no developments
                  {statusSelected
                    ? statusSelected === "all"
                      ? " "
                      : statusSelected === "available"
                        ? " with availble homes "
                        : statusSelected == "coming_soon"
                          ? " coming soon "
                          : ""
                    : ""}
                  in {capitalizeWords(selectedLocationTab)}.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
