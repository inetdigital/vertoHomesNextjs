"use client";

import { useEffect, useState } from "react";

export const MobileMenu = ({ navItems, mobileMenuStatus }) => {
  const [animatedItems, setAnimatedItems] = useState([]);

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
        <ul>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`transform transition-all duration-300 ease-in-out ${
                animatedItems.includes(index)
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-[-20px]"
              }`}
            >
              {item.primary.link_label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
