import { PrismicNextLink } from "@prismicio/next";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useLocations } from "@/context/TaxonomyLocations";
import { useDevelopments } from "@/context/AllDevelopments";

export const MultiSubMenu = ({ navItems, openSubMenuIndex }) => {
  const [activeTab, setActiveTab] = useState(0); // Track active tab for small screens
  const subMenus = navItems[openSubMenuIndex]?.primary?.sub_menus_group || [];
  return (
    <div className="pt-12 lg:pt-12 xl:pt-24 pb-32 w-full">
      {/* Tabs for screens below 2xl */}
      <div className="block 2xl:hidden">
        <div className="flex space-x-4 border-b border-gray-300 pb-2 mb-4">
          {subMenus.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`py-2 px-4 rounded-t-md transition ${
                activeTab === index
                  ? "bg-white text-vertoDarkBlue font-semibold"
                  : "bg-transparent text-gray-500"
              }`}
            >
              <h3 className="flex items-center">
                {item?.sub_menu_item_in_group.uid === "for-sale-sub-menu" && (
                  <span className="mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </span>
                )}
                {item?.sub_menu_item_in_group.uid === "coming-soon-menu" && (
                  <span className="mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                      />
                    </svg>
                  </span>
                )}
                {item?.sub_menu_item_in_group?.data?.sub_menu_header ||
                  `Tab ${index + 1}`}{" "}
              </h3>
            </button>
          ))}
        </div>
        {/* Display active tab content */}
        <div className="pt-4">
          {subMenus[activeTab]?.sub_menu_item_in_group.uid ===
            "for-sale-sub-menu" && (
            <ForSaleSubMenuWrapper item={subMenus[activeTab]} />
          )}
          {subMenus[activeTab]?.sub_menu_item_in_group.uid ===
            "coming-soon-menu" && (
            <ComingSoonMenuWrapper item={subMenus[activeTab]} />
          )}
        </div>
      </div>

      {/* Grid view for screens 2xl and above */}
      <div className="hidden 2xl:grid grid-cols-2 gap-12">
        {subMenus.map((item, index) => (
          <div key={index}>
            <h3 className="flex items-center">
              {item.sub_menu_item_in_group.uid === "for-sale-sub-menu" && (
                <span className="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </span>
              )}
              {item.sub_menu_item_in_group.uid === "coming-soon-menu" && (
                <span className="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                    />
                  </svg>
                </span>
              )}
              {item?.sub_menu_item_in_group?.data?.sub_menu_header}
            </h3>
            <hr className="border-t border-gray-300 my-8" />
            {item.sub_menu_item_in_group.uid === "for-sale-sub-menu" && (
              <ForSaleSubMenuWrapper item={item} />
            )}
            {item.sub_menu_item_in_group.uid === "coming-soon-menu" && (
              <ComingSoonMenuWrapper item={item} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ForSaleSubMenuWrapper = ({ item }) => {
  return (
    <>
      {item.sub_menu_item_in_group.data.slices.map((item, index) => {
        return (
          <div key={index}>
            {item.primary.show_developments_of_status.uid === "available" && (
              <ForSaleHomesPanel
                status={item.primary.show_developments_of_status.uid}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

const ComingSoonMenuWrapper = ({ item }) => {
  return (
    <>
      {item.sub_menu_item_in_group.data.slices.map((item, index) => {
        return (
          <div key={index}>
            {item.primary.show_developments_of_status.uid === "coming_soon" && (
              <ComingSoonPanel
                status={item.primary.show_developments_of_status.uid}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

const ComingSoonPanel = ({ status }) => {
  const locations = useLocations();
  const developments = useDevelopments();

  const [selectedLocation, setSelectedLocation] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredDevelopments = developments.filter(
    (item) => item.data.development_status?.uid === status
  );
  // Filter locations to include only those matching at least one filteredDevelopment
  const matchingLocations = locations.filter((location) =>
    filteredDevelopments.some(
      (development) => development.data.location_county?.uid === location.uid
    )
  );

  // Further filter developments based on the selected location
  const visibleDevelopments = (
    selectedLocation !== "all"
      ? filteredDevelopments.filter(
          (item) => item.data.location_county?.uid === selectedLocation
        )
      : filteredDevelopments
  ).sort(
    (a, b) =>
      new Date(b.last_publication_date) - new Date(a.last_publication_date)
  );

  const itemsPerSlide = 2; // Number of items visible per slide
  const slides = [];

  // Group items into slides of `itemsPerSlide`
  for (let i = 0; i < visibleDevelopments.length; i += itemsPerSlide) {
    slides.push(visibleDevelopments.slice(i, i + itemsPerSlide));
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const updateActiveFilter = (uid) => {
    setSelectedLocation(uid);
    setCurrentIndex(0);
  };

  useEffect(() => {
    if (matchingLocations.length === 1) {
      setSelectedLocation(matchingLocations[0].uid);
    }
  }, [matchingLocations]);

  return (
    <div>
      <div className="flex mb-4">
        {matchingLocations.length > 1 && (
          <button
            onClick={() => updateActiveFilter("all")}
            className={`${selectedLocation === "all" ? "bg-vertoDarkBlue text-white border-vertoDarkBlue" : "bg-white text-vertoDarkBlue border-vertoDarkBlue"} text-sm border-[1px] transition-all duration-300 ease-in-out rounded-full px-4 py-2 mr-2`}
          >
            All
          </button>
        )}
        {matchingLocations
          .slice()
          .sort((a, b) => a.data.name.localeCompare(b.data.name))
          .map((item, index) => {
            const isLast = index === matchingLocations.length - 1;
            return (
              <button
                key={index}
                onClick={() => updateActiveFilter(item.uid)}
                className={`${selectedLocation === item.uid ? "bg-vertoDarkBlue text-white border-vertoDarkBlue" : "bg-white text-vertoDarkBlue border-vertoDarkBlue"} text-sm border-[1px] transition-all duration-300 ease-in-out rounded-full px-4 py-2 ${!isLast && "mr-2"}`}
              >
                {item.data.name}
              </button>
            );
          })}
      </div>
      <div>
        {visibleDevelopments.length === 0 && (
          <div className="flex">
            <p>Currently no developments</p>
          </div>
        )}
        {/* Slider or static display based on visibleDevelopments length */}
        {visibleDevelopments.length <= 2 ? (
          <div className="grid grid-cols-2 gap-4">
            {visibleDevelopments.map((item, index) => (
              <DevelopmentThumbnail item={item} key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="relative mt-4 overflow-hidden h-[260px]">
              <motion.div
                className="flex"
                initial={false}
                animate={{
                  x: `calc(-${(currentIndex * 100) / itemsPerSlide}% - ${currentIndex > 0 ? "1rem" : "0px"})`,
                }} // Move by slide width
                transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
                style={{
                  width: `${slides.length * 100}%`, // Total width based on number of slides
                }}
              >
                {slides.map((slide, slideIndex) => (
                  <div
                    key={slideIndex}
                    className={`flex gap-4 w-full ${slideIndex !== 0 ? "pl-4" : "pl-0"}`}
                  >
                    {slide.map((item, index) => (
                      <div key={index} className="w-1/2">
                        <DevelopmentThumbnail item={item} />
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="flex space-x-2 bg-gray-400 rounded-full p-2 w-fit mt-4 mx-auto">
              {slides.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    index === currentIndex
                      ? "bg-white w-6" // Active dot is wider
                      : "bg-white w-3" // Default width for inactive dots
                  } cursor-pointer`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ForSaleHomesPanel = ({ status }) => {
  const locations = useLocations();
  const developments = useDevelopments();

  const [selectedLocation, setSelectedLocation] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredDevelopments = developments.filter(
    (item) => item.data.development_status?.uid === status
  );
  // Filter locations to include only those matching at least one filteredDevelopment
  const matchingLocations = locations.filter((location) =>
    filteredDevelopments.some(
      (development) => development.data.location_county?.uid === location.uid
    )
  );

  // Further filter developments based on the selected location
  const visibleDevelopments = (
    selectedLocation !== "all"
      ? filteredDevelopments.filter(
          (item) => item.data.location_county?.uid === selectedLocation
        )
      : filteredDevelopments
  ).sort(
    (a, b) =>
      new Date(b.last_publication_date) - new Date(a.last_publication_date)
  );

  const itemsPerSlide = 2; // Number of items visible per slide
  const slides = [];

  // Group items into slides of `itemsPerSlide`
  for (let i = 0; i < visibleDevelopments.length; i += itemsPerSlide) {
    slides.push(visibleDevelopments.slice(i, i + itemsPerSlide));
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const updateActiveFilter = (uid) => {
    setSelectedLocation(uid);
    setCurrentIndex(0);
  };

  return (
    <div>
      <div className="flex mb-4">
        <button
          onClick={() => updateActiveFilter("all")}
          className={`${selectedLocation === "all" ? "bg-vertoDarkBlue text-white border-vertoDarkBlue" : "bg-white text-vertoDarkBlue border-vertoDarkBlue"} text-sm border-[1px] transition-all duration-300 ease-in-out rounded-full px-4 py-2 mr-2`}
        >
          All
        </button>
        {matchingLocations
          .slice()
          .sort((a, b) => a.data.name.localeCompare(b.data.name))
          .map((item, index) => {
            const isLast = index === matchingLocations.length - 1;
            return (
              <button
                key={index}
                onClick={() => updateActiveFilter(item.uid)}
                className={`${selectedLocation === item.uid ? "bg-vertoDarkBlue text-white border-vertoDarkBlue" : "bg-white text-vertoDarkBlue border-vertoDarkBlue"} text-sm border-[1px] transition-all duration-300 ease-in-out rounded-full px-4 py-2 ${!isLast && "mr-2"}`}
              >
                {item.data.name}
              </button>
            );
          })}
      </div>
      <div>
        {visibleDevelopments.length === 0 && (
          <div className="flex">
            <p>Currently no developments</p>
          </div>
        )}
        {/* Slider or static display based on visibleDevelopments length */}
        {visibleDevelopments.length <= 2 ? (
          <div className="grid grid-cols-2 gap-4">
            {visibleDevelopments.map((item, index) => (
              <DevelopmentThumbnail item={item} key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="relative mt-4 overflow-hidden h-[260px]">
              <motion.div
                className="flex"
                initial={false}
                animate={{
                  x: `calc(-${(currentIndex * 100) / itemsPerSlide}% - ${currentIndex > 0 ? "1rem" : "0px"})`,
                }} // Move by slide width
                transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
                style={{
                  width: `${slides.length * 100}%`, // Total width based on number of slides
                }}
              >
                {slides.map((slide, slideIndex) => (
                  <div
                    key={slideIndex}
                    className={`flex gap-4 w-full ${slideIndex !== 0 ? "pl-4" : "pl-0"}`}
                  >
                    {slide.map((item, index) => (
                      <div key={index} className="w-1/2">
                        <DevelopmentThumbnail item={item} />
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="flex space-x-2 bg-gray-400 rounded-full p-2 w-fit mt-4 mx-auto">
              {slides.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    index === currentIndex
                      ? "bg-white w-6" // Active dot is wider
                      : "bg-white w-3" // Default width for inactive dots
                  } cursor-pointer`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const DevelopmentThumbnail = ({ item }) => {
  return (
    <div
      className="relative w-full h-[260px] cursor-pointer group" // Add group class here
    >
      {/* Image as Background */}
      <PrismicNextLink field={item} className="relative w-full h-full block">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out"
          style={{
            backgroundImage: `url(${item.data.banner_image.url})`, // Setting the background image
            backgroundPosition: "center", // Ensures the image is centered
            backgroundSize: "cover", // Ensures the image covers the entire container
          }}
        />
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 border-0 border-solid border-vertoDarkBlue transition-all duration-500 ease-in-out group-hover:opacity-75 group-hover:border-8"></div>

        {/* Link Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 transition-all duration-500 ease-in-out group-hover:translate-y-[-10px]">
          <p className="text-2xl font-medium">{item.data.name}</p>

          {/* Caption (Fades in on hover) */}
          <div className="opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
            <p className="mt-2 text-sm flex items-center">
              <span className="mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </span>
              {item.data.location_town}, {item.data.location_city}
            </p>
          </div>
        </div>
      </PrismicNextLink>
    </div>
  );
};
