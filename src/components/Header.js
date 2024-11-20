"use client";

import Link from "next/link";
import Image from "next/image";
import { PrismicNextLink } from "@prismicio/next";
import Headroom from "react-headroom";
import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import SubMenu from "@/components/SubMenu";
import { MobileMenu } from "@/components/MobileMenu";
import DefaultButton from "@/components/ui/DefaultButton";

export const Header = ({ navigation, settings }) => {
  const navItems = navigation.data.slices;
  const [subMenuOpenStatus, setSubMenuOpenStatus] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(0);
  const [hoverDelayTimer, setHoverDelayTimer] = useState(null);
  const [subMenuInnerHeight, setSubMenuInnerHeight] = useState(0);
  const [transitionClasses, setTransitionClasses] = useState("");
  const subMenuInnerRef = useRef(null);
  const previousIndex = useRef(openSubMenuIndex);
  const [mobileMenuStatus, SetMobileMenuStatus] = useState(false);

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
    }, 100);
    setHoverDelayTimer(timer);
  };

  const handleMouseLeaveNavItem = () => {
    if (hoverDelayTimer) clearTimeout(hoverDelayTimer);
    setTimeout(() => {
      setSubMenuOpenStatus(false);
    }, 100);
  };

  const handleEnterNoSubMenuItem = () => {
    setSubMenuOpenStatus(false);
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

  return (
    <Headroom>
      <header className="relative w-full px-6 lg:px-12 bg-white shadow-sm z-10 transition-all duration-300">
        <div className="flex justify-between items-center">
          <div className="flex space-x-12">
            <div
              className="flex items-center"
              onMouseEnter={() => {
                setSubMenuOpenStatus(false);
              }}
            >
              <Link href="/">
                <Image
                  src="/assets/Verto_logo_master.svg"
                  alt="Verto Homes"
                  width={150}
                  height={50}
                  priority
                />
              </Link>
            </div>
            <nav className="ml-24 hidden lg:block">
              <ul className="flex space-x-8">
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
              <DefaultButton link={navigation.data.header_link} />
            </div>
            <nav className="block lg:hidden">
              <div className="menu cross menu--1">
                <label>
                  <input
                    type="checkbox"
                    checked={mobileMenuStatus}
                    onChange={() => SetMobileMenuStatus((prev) => !prev)}
                    className="hidden-checkbox"
                  />
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="30" />
                    <path
                      className={`line--1 ${mobileMenuStatus ? "checked" : ""}`}
                      d="M0 40h62c13 0 6 28-4 18L35 35"
                    />
                    <path
                      className={`line--2 ${mobileMenuStatus ? "checked" : ""}`}
                      d="M0 50h70"
                    />
                    <path
                      className={`line--3 ${mobileMenuStatus ? "checked" : ""}`}
                      d="M0 60h62c13 0 6-28-4-18L35 65"
                    />
                  </svg>
                </label>
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
        <MobileMenu navItems={navItems} mobileMenuStatus={mobileMenuStatus} />
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
        .menu--1 {
          position: relative;
          width: 100px;
          height: 100px;
        }

        .hidden-checkbox {
          display: none;
        }

        circle {
          fill: #0f131f;
          opacity: 0;
          transition: opacity 0.8s;
        }

        label:hover circle {
          opacity: 0.1;
        }

        path {
          fill: none;
          stroke: #0f131f;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: var(--length, 24) var(--total-length, 100);
          stroke-dashoffset: var(--offset, -38);
          transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .line--1,
        .line--3 {
          --total-length: 126.64183044433594;
        }

        .line--2 {
          --total-length: 70;
        }

        .menu--1 input:checked + svg .line--1,
        .menu--1 input:checked + svg .line--3 {
          --length: 22.627416998;
          --offset: -94.1149185097;
        }

        .menu--1 input:checked + svg .line--2 {
          --length: 0;
          --offset: -50;
        }
      `}</style>
    </Headroom>
  );
};
