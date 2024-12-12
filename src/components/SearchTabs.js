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
