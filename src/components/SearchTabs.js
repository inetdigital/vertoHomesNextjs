"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

import { useTab } from "@/context/SearchTabContext";

export const SearchTabs = () => {
  const { selectedTab, setSelectedTab } = useTab();
  const [tabs] = useState([
    {
      name: "Developments",
      mobileName: "Developments",
      key: 1,
      icon: "house",
    },
    { name: "Properties", mobileName: "Search", key: 2, icon: "search" },
  ]);

  const updateCurrentTab = (key) => {
    setSelectedTab(key);
  };

  const HoverTab = ({ name, mobileName, icon }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="flex items-center justify-center"
      >
        <TabIcon icon={icon} />
        <span className="ml-4 hidden xl:block">{name}</span>
        <span className="ml-4 block xl:hidden text-base">{mobileName}</span>
      </motion.div>
    );
  };

  const CurrentTab = ({ name, mobileName, icon }) => {
    return (
      <span className="flex items-center justify-center">
        <TabIcon icon={icon} />
        <span className="ml-4 hidden xl:block">{name}</span>
        <span className="ml-4 block xl:hidden text-base">{mobileName}</span>
      </span>
    );
  };

  const TabIcon = ({ icon }) => {
    return (
      <span>
        {icon === "house" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
        )}
        {icon === "search" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
    );
  };

  return (
    <div className="my-16 inline-block">
      <span className="isolate inline-flex rounded-md shadow-sm">
        {tabs.map((tab, index) => {
          const isFirst = index === 0;
          const isLast = index === tabs.length - 1;

          return (
            <button
              key={tab.name}
              aria-current={tab.key === selectedTab ? "page" : undefined}
              onClick={() => updateCurrentTab(tab.key)}
              type="button"
              className={`${selectedTab === tab.key ? "bg-vertoLightGreen text-white" : "bg-white hover:bg-vertoLightGreenOpacity50 hover:underline hover:underline-offset-8"} w-auto md:w-[300px] relative inline-flex items-center justify-center px-4 md:px-6 lg:px-12 py-2 md:py-4 text-md md:text-xl font-normal transition duration-300 ease-in-out text-vertoDarkBlue hover:text-white ${
                isFirst ? "rounded-l-full" : isLast ? "rounded-r-full" : ""
              }`}
            >
              {tab.name}
            </button>
          );
        })}
      </span>
    </div>
  );
};
