"use client";

import Link from "next/link";
import Image from "next/image";
import { PrismicNextLink } from "@prismicio/next";
import Headroom from "react-headroom";
import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import SubMenu from "@/components/SubMenu";
import { MobileMenu } from "@/components/MobileMenu";

import { motion } from "framer-motion";

import { useMenuStatus } from "@/context/MenuStatus";

export const Header = ({ navigation, settings }) => {
  const navItems = navigation.data.slices;
  const { setMenuStatus } = useMenuStatus();

  const [subMenuOpenStatus, setSubMenuOpenStatus] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(0);
  const [hoverDelayTimer, setHoverDelayTimer] = useState(null);
  const [subMenuInnerHeight, setSubMenuInnerHeight] = useState(0);
  const [transitionClasses, setTransitionClasses] = useState("");
  const subMenuInnerRef = useRef(null);
  const previousIndex = useRef(openSubMenuIndex);
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);

  const handleMouseEnterNavItem = (index) => {
    if (hoverDelayTimer) clearTimeout(hoverDelayTimer);

    if (index !== openSubMenuIndex) {
      previousIndex.current = openSubMenuIndex;
      setOpenSubMenuIndex(index);
      setTransitionClasses(
        index > previousIndex.current ? "slide-in-left" : "slide-in-right"
      );
    }

    const timer = setTimeout(() => {
      setSubMenuOpenStatus(true);
      setMenuStatus(true);
    }, 100);
    setHoverDelayTimer(timer);
  };

  const handleMouseLeaveNavItem = () => {
    if (hoverDelayTimer) clearTimeout(hoverDelayTimer);
    setTimeout(() => {
      setSubMenuOpenStatus(false);
      setMenuStatus(false);
    }, 100);
  };

  const handleEnterNoSubMenuItem = () => {
    setSubMenuOpenStatus(false);
    setMenuStatus(false);
  };

  const handleEnterLogo = () => {
    setSubMenuOpenStatus(false);
    setMenuStatus(false);
  };

  const handleClick = () => {
    setMobileMenuStatus((prevStatus) => !prevStatus);
  };

  useEffect(() => {
    if (subMenuOpenStatus && subMenuInnerRef.current) {
      setTimeout(() => {
        const height = subMenuInnerRef.current.offsetHeight;
        setSubMenuInnerHeight(height);
      }, 100);
    }
  }, [openSubMenuIndex, subMenuOpenStatus]);

  useEffect(() => {
    if (openSubMenuIndex !== null) {
      setTransitionClasses(true);
    }
  }, []);

  useEffect(() => {
    // Ensure window is defined (avoids issues during SSR)
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setMobileMenuStatus(false);
      setMenuStatus(false);
    };

    // Add event listener on mount
    window.addEventListener("resize", handleResize);

    // Clean up listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <Headroom>
      <header className="relative w-full px-6 lg:px-12 bg-white shadow-sm z-10 transition-all duration-300">
        <div className="flex justify-between items-center">
          <div className="flex space-x-12">
            <div
              className="flex items-center"
              onMouseEnter={() => {
                handleEnterLogo();
              }}
            >
              <Link href="/">
                <Image
                  src="/assets/Verto_logo_master.svg"
                  alt="Verto Homes"
                  width={150}
                  height={50}
                  loading="lazy"
                />
              </Link>
            </div>
            <nav className="ml-24 hidden lg:block">
              <ul className="flex space-x-4 lg:space-x-4 xl:space-x-8">
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className="relative font-medium tracking-normal text-vertoBlack py-8 cursor-pointer flex items-center transition-colors duration-300 hover:text-slate-700 group"
                    onMouseEnter={() => {
                      if (item.variation !== "default") {
                        handleMouseEnterNavItem(index);
                      } else {
                        handleEnterNoSubMenuItem();
                      }
                    }}
                  >
                    {item.variation === "default" ? (
                      <PrismicNextLink field={item.primary.link}>
                        {item.primary.link.text}
                      </PrismicNextLink>
                    ) : (
                      <>
                        {item.primary.link_label}
                        <ChevronDownIcon
                          className={`size-3 ml-2 transition-transform duration-300 ease-in-out ${
                            subMenuOpenStatus && openSubMenuIndex === index
                              ? "rotate-180"
                              : "rotate-0"
                          } delay-100`}
                        />
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div>
            <div className="hidden lg:block">
              <div className="flex">
                <Link href="/find-your-new-home">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="relative px-4 py-2 font-medium text-sm tracking-button uppercase border border-vertoDarkBlue rounded text-vertoDarkBlue transition-colors duration-300 ease-in-out hover:bg-vertoDarkBlue hover:text-white"
                  >
                    {navigation.data.header_link.text}
                  </motion.div>
                </Link>
              </div>
            </div>
            <nav className="block lg:hidden py-4">
              <div className="menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="rgba(0,0,0,0)"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeWidth="0.6"
                  className="hb"
                  cursor="pointer"
                  viewBox="0 0 10 10"
                  onClick={handleClick}
                >
                  <path d="M2 3h6M2 5h6M2 7h6">
                    <animate
                      fill="freeze"
                      attributeName="d"
                      begin="start.begin"
                      dur="0.2s"
                      values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7"
                    ></animate>
                    <animate
                      fill="freeze"
                      attributeName="d"
                      begin="reverse.begin"
                      dur="0.2s"
                      values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7"
                    ></animate>
                  </path>
                  <path stroke="none" d="M0 0h10v10H0z">
                    <animate
                      id="reverse"
                      attributeName="width"
                      begin="click"
                      dur="2s"
                    ></animate>
                  </path>
                  <path stroke="none" d="M0 0h10v10H0z">
                    <animate
                      id="start"
                      fill="freeze"
                      attributeName="width"
                      begin="click"
                      dur="0.001s"
                      values="10;0"
                    ></animate>
                    <animate
                      fill="freeze"
                      attributeName="width"
                      begin="reverse.begin"
                      dur="0.001s"
                      values="0;10"
                    ></animate>
                  </path>
                </svg>
              </div>
            </nav>
          </div>
        </div>

        {/** SUBMENU SECTION */}
        <SubMenu
          navItems={navItems}
          openSubMenuIndex={openSubMenuIndex}
          subMenuOpenStatus={subMenuOpenStatus}
          setSubMenuOpenStatus={setSubMenuOpenStatus} // Pass the close function here
          subMenuInnerHeight={subMenuInnerHeight}
          setSubMenuInnerHeight={setSubMenuInnerHeight}
          transitionClasses={transitionClasses}
          handleMouseLeaveNavItem={handleMouseLeaveNavItem}
        />

        {/** Mobile menu */}
        <MobileMenu
          navigation={navigation}
          mobileMenuStatus={mobileMenuStatus}
        />
      </header>

      <style jsx>{`
        .submenu-open {
          opacity: 1;
          transform: translateY(0);
          z-index: 10;
        }
        .submenu-close {
          opacity: 0;
          transform: translateY(-20px);
          visibility: hidden;
        }
        .slide-in-left {
          animation: slideInLeft 0.3s forwards;
        }
        .slide-in-right {
          animation: slideInRight 0.3s forwards;
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .hb {
          width: 40px;
          margin: 0 auto;
          display: block;
        }
      `}</style>
    </Headroom>
  );
};
