"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTab } from "@/context/SearchTabContext";

import { DevelopmentsPanel } from "@/components/DevelopmentsPanel";
import { SearchResultsPanel } from "@/components/SearchResultsPanel";

import { useLocations } from "@/context/TaxonomyLocations";

export const SearchResults = ({ developments, properties }) => {
  const { selectedTab } = useTab();

  const locations = useLocations();

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        {selectedTab === 1 ? (
          <motion.div
            key="developments"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            //className="absolute inset-0"
          >
            <DevelopmentsPanel
              locations={locations}
              developments={developments}
            />
          </motion.div>
        ) : (
          <motion.div
            key="searchResults"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            //className="absolute inset-0"
          >
            <SearchResultsPanel properties={properties} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
