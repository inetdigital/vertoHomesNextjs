"use client";

import { PrismicNextLink } from "@prismicio/next";

export const SingleSubMenu = ({ navItems, openSubMenuIndex }) => {
  return (
    <div className="pt-24 pb-32 w-full">
      <h3>
        {
          navItems[openSubMenuIndex]?.primary?.standard_sub_menu?.data
            ?.sub_menu_header
        }
      </h3>
      <hr className="border-t border-gray-300 my-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {navItems[openSubMenuIndex].primary.standard_sub_menu.data.slices.map(
          (item, index) => (
            <div
              key={index}
              className="relative w-full h-[260px] cursor-pointer group" // Add group class here
            >
              {/* Image as Background */}
              <PrismicNextLink
                field={item.primary.link}
                className="relative w-full h-full block"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out"
                  style={{
                    backgroundImage: `url(${item.primary.image.url})`, // Setting the background image
                    backgroundPosition: "center", // Ensures the image is centered
                    backgroundSize: "cover", // Ensures the image covers the entire container
                  }}
                />
                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black opacity-50 border-0 border-solid border-vertoDarkBlue transition-all duration-500 ease-in-out group-hover:opacity-75 group-hover:border-8"></div>

                {/* Link Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 transition-all duration-500 ease-in-out group-hover:translate-y-[-10px]">
                  <p className="text-2xl font-medium">
                    {item.primary.link.text}
                  </p>

                  {/* Caption (Fades in on hover) */}
                  <div className="opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                    <p className="mt-2 text-sm">Caption</p>
                  </div>
                </div>
              </PrismicNextLink>
            </div>
          )
        )}
      </div>
    </div>
  );
};
