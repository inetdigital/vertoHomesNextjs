"use client";

import { useRef, useEffect } from "react";

import { SingleSubMenu } from "@/components/ui/SingleSubMenu";
import { MultiSubMenu } from "@/components/ui/MultiSubMenu";

const SubMenu = ({
  navItems,
  openSubMenuIndex,
  subMenuOpenStatus,
  setSubMenuOpenStatus,
  subMenuInnerHeight,
  setSubMenuInnerHeight,
  transitionClasses,
  handleMouseLeaveNavItem,
}) => {
  const subMenuInnerRef = useRef(null);

  // Calculate submenu height on mount
  useEffect(() => {
    if (subMenuOpenStatus && subMenuInnerRef.current) {
      const height = subMenuInnerRef.current.offsetHeight;
      setSubMenuInnerHeight(height);
    }
  }, [openSubMenuIndex, subMenuOpenStatus]);

  return (
    <div
      className={`hidden lg:block submenu-outer absolute overflow-hidden left-0 w-full bg-white shadow-lg ${
        transitionClasses ? "transition-all duration-300 ease-in-out" : ""
      } ${subMenuOpenStatus ? "submenu-open" : "submenu-close"}`}
      style={{ height: subMenuInnerHeight + "px" }}
      onMouseLeave={handleMouseLeaveNavItem}
    >
      <div className="flex">
        <div
          className={`submenu-inner w-full px-12 ${transitionClasses}`}
          ref={subMenuInnerRef}
        >
          {openSubMenuIndex !== null && (
            <>
              {!["default", "withMultipleSubMenus"].includes(
                navItems[openSubMenuIndex]?.variation
              ) && (
                <SingleSubMenu
                  navItems={navItems}
                  openSubMenuIndex={openSubMenuIndex}
                />
              )}

              {navItems[openSubMenuIndex]?.variation ===
                "withMultipleSubMenus" && (
                <MultiSubMenu
                  navItems={navItems}
                  openSubMenuIndex={openSubMenuIndex}
                />
              )}
            </>
          )}
        </div>
      </div>

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
      `}</style>
    </div>
  );
};

export default SubMenu;
