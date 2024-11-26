"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";

export const MobileMenu = ({ navigation, mobileMenuStatus }) => {
  const [animatedItems, setAnimatedItems] = useState([]);

  const navItems = navigation.data.slices;

  useEffect(() => {
    if (mobileMenuStatus) {
      let timeoutIds = [];
      navItems.forEach((_, index) => {
        const timeoutId = setTimeout(() => {
          setAnimatedItems((prev) => [...prev, index]);
        }, index * 100); // Stagger animation by 150ms per item
        timeoutIds.push(timeoutId);
      });

      return () => {
        timeoutIds.forEach(clearTimeout); // Clear timeouts when menu is closed
        setAnimatedItems([]);
      };
    }
  }, [mobileMenuStatus, navItems]);

  return (
    <div
      className={`block lg:hidden transition-all duration-300 ease-in-out absolute overflow-hidden left-0 w-full bg-white ${
        mobileMenuStatus ? "h-screen" : "h-0"
      }`}
    >
      <div className="px-6 lg:px-12 pt-8">
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
        <nav aria-label="Sidebar" className="flex flex-1 flex-col">
          <ul role="list" className="-mx-2 space-y-4">
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
                      item.current
                        ? "bg-gray-50 text-vertoDarkBlue"
                        : "text-gray-700 hover:bg-gray-100 hover:text-vertoDarkBlue",
                      "group flex rounded-md p-2 pl-3 text-xl"
                    )}
                  >
                    {item.primary.link_label}
                  </a>
                ) : (
                  <button
                    className={clsx(
                      item.current
                        ? "bg-gray-50 text-vertoDarkBlue"
                        : "text-gray-700 hover:bg-gray-100 hover:text-vertoDarkBlue",
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
          </ul>
        </nav>
        <hr className="border-t border-gray-300 my-8" />
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
