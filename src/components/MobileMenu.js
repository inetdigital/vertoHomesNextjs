"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useLocations } from "@/context/TaxonomyLocations";
import { useTab } from "@/context/SearchTabContext";
import { PrismicNextLink } from "@prismicio/next";

export const MobileMenu = ({ navigation, mobileMenuStatus }) => {
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [animatedItems, setAnimatedItems] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  const { setSelectedLocationTab } = useTab();

  const locations = useLocations();

  const navItems = navigation.data.slices;

  // Animation Variants
  const menuVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  const setDevelopmentsParams = (uid) => {
    setSelectedLocationTab(uid);
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (mobileMenuStatus && !activeNavItem) {
      setAnimatedItems([]);
      navItems.forEach((_, index) => {
        const timeoutId = setTimeout(() => {
          setAnimatedItems((prev) => [...prev, index]);
        }, index * 100); // Stagger by 100ms
        return () => clearTimeout(timeoutId);
      });
    }
  }, [mobileMenuStatus, activeNavItem]);

  return (
    <div
      className={`block lg:hidden transition-all duration-300 ease-in-out absolute overflow-hidden left-0 w-full bg-white ${
        mobileMenuStatus ? "h-screen" : "h-0"
      }`}
    >
      <div className="px-6 lg:px-12 pt-8">
        {/* Header Link */}
        <div>
          <Link href="/find-your-new-home">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="inline-flex relative px-4 py-2 font-medium text-sm tracking-button uppercase border border-vertoDarkBlue rounded text-vertoDarkBlue transition-colors duration-300 ease-in-out hover:bg-vertoDarkBlue hover:text-white"
            >
              {navigation.data.header_link.text}
            </motion.div>
          </Link>
        </div>
        <hr className="border-t border-gray-300 my-8" />
        <div className="transition-all duration-300 ease-in-out">
          {/* Navigation */}
          <AnimatePresence
            initial={false}
            mode="wait"
            custom={activeNavItem ? 1 : -1}
          >
            {!activeNavItem ? (
              <motion.ul
                key="main-menu"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={-1} // Slide in from left
                role="list"
                className="-mx-2 space-y-4"
              >
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className={`transform transition-all duration-300 ease-in-out ${
                      animatedItems.includes(index)
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-[-20px]"
                    }`}
                  >
                    {item.variation === "default" ? (
                      <a
                        href=""
                        className={clsx(
                          "text-gray-700 hover:bg-vertoDarkBlue hover:text-white",
                          "group flex rounded-md p-2 pl-3 text-xl"
                        )}
                      >
                        {item.primary.link_label}
                      </a>
                    ) : (
                      <button
                        onClick={() => setActiveNavItem(item)}
                        className={clsx(
                          "text-gray-700 hover:bg-vertoDarkBlue hover:text-white",
                          "group flex rounded-md p-2 pl-3 text-xl w-full flex items-center justify-between"
                        )}
                      >
                        <span>{item.primary.link_label}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </li>
                ))}
              </motion.ul>
            ) : (
              <motion.div
                key="submenu"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={1} // Slide in from right
              >
                <button
                  onClick={() => setActiveNavItem(null)}
                  className="text-sm text-vertoDarkBlue mb-8 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Back
                </button>
                <ul role="list" className="-mx-2 space-y-4 mt-4">
                  {activeNavItem.primary.uid === "developments" && (
                    <>
                      {locations
                        .slice()
                        .sort((a, b) => a.data.name.localeCompare(b.data.name))
                        .map((item, index) => {
                          return (
                            <li key={index}>
                              <Link
                                href="/find-your-new-home"
                                onClick={() => setDevelopmentsParams(item.uid)}
                                className={clsx(
                                  "text-gray-700 hover:bg-vertoDarkBlue hover:text-white",
                                  "group flex rounded-md p-2 pl-3 text-xl"
                                )}
                              >
                                {item.data.name}
                              </Link>
                            </li>
                          );
                        })}
                    </>
                  )}
                  {activeNavItem.variation === "menuItemWithSubMenu" && (
                    <>
                      {activeNavItem.primary.standard_sub_menu.data.slices.map(
                        (item, index) => {
                          return (
                            <li key={index}>
                              <PrismicNextLink
                                field={item.primary.link}
                                className={clsx(
                                  "text-gray-700 hover:bg-vertoDarkBlue hover:text-white",
                                  "group flex rounded-md p-2 pl-3 text-xl"
                                )}
                              />
                            </li>
                          );
                        }
                      )}
                    </>
                  )}
                  {activeNavItem.variation === "threeColumnSubMenu" && (
                    <div className="w-full">
                      {activeNavItem.primary.sub_menus_group.map(
                        (item, index) => (
                          <div key={index} className="space-y-4">
                            <button
                              onClick={() => toggleAccordion(index)}
                              className={`flex items-center justify-between w-full px-4 py-3 text-left
                          group flex rounded-md p-2 pl-3 text-xl ${openIndex === index ? "bg-vertoDarkBlue text-white" : "text-gray-700 hover:bg-vertoDarkBlue hover:text-white"}`}
                            >
                              <span className="flex items-center space-x-2">
                                {
                                  item.sub_menu_item_in_group.data
                                    .sub_menu_header
                                }
                              </span>
                              <span
                                className={`transform transition-all duration-300 ${
                                  openIndex === index
                                    ? "rotate-180"
                                    : "rotate-0"
                                }`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="size-6"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            </button>
                            <div
                              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                openIndex === index ? "max-h-screen" : "max-h-0"
                              }`}
                            >
                              <div className="px-4 py-6 bg-gray-100 rounded-md mb-4">
                                <ul className="space-y-4">
                                  {item.sub_menu_item_in_group.data.slices[0].primary.links.map(
                                    (item, index) => {
                                      return (
                                        <li
                                          key={index}
                                          className="flex items-center"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="size-4 mr-2"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                                              clipRule="evenodd"
                                            />
                                          </svg>

                                          <PrismicNextLink
                                            field={item.link}
                                            className="text-base"
                                          />
                                        </li>
                                      );
                                    }
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <hr className="border-t border-gray-300 my-8" />

        {/* Footer */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm">
              Ground Floor, Building A<br />
              Green Court
              <br />
              Truro Business Park
              <br />
              Threemilestone
              <br />
              Truro, Cornwall
              <br />
              TR4 9LF
            </p>
          </div>
          <div>
            <p className="text-sm">01872 672 237</p>
            <p className="text-sm">info@vertohomes.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
