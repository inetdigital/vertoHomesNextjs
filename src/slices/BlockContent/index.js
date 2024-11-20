"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage } from "@prismicio/next";

import DefaultButton from "@/components/ui/DefaultButton";

const BlockContent = ({ slice, isConsecutive }) => {
  const backgroundColorClass =
    {
      VertoBlue: "bg-vertoDarkBlue",
      VertoGrey: "bg-vertoLightGrey",
      White: "bg-white",
    }[slice.primary.background_color] || "bg-vertoDarkBlue"; // Fallback if undefined
  return (
    <Bounded
      as="section"
      paddingAs={
        isConsecutive === false ? "fullWidthBlock" : "fullWidthBlockConsecutive"
      }
      className="text-center"
    >
      <div className={`${backgroundColorClass} py-28 md:py-32 px-6 md:px-12`}>
        {slice.variation === "default" && <SearchVariant slice={slice} />}
        {slice.variation === "withImageLead" && <WithImageLead slice={slice} />}
        {slice.variation === "contentList" && <ContentList slice={slice} />}
        {slice.variation === "testimonial" && <Testimonial slice={slice} />}
        {slice.variation === "withRegisterInterestForm" && (
          <WithRegistrationForm
            slice={slice}
            themeColor={slice.primary.background_color}
          />
        )}
      </div>
    </Bounded>
  );
};

const SearchVariant = ({ slice }) => {
  return (
    <>
      {slice.primary.title_lead && (
        <p className="uppercase text-vertoLightBlue tracking-wide font-medium text-xl">
          {slice.primary.title_lead}
        </p>
      )}

      {slice.primary.title && (
        <>
          <h2 className="uppercase text-white tracking-widest">
            {slice.primary.title}
          </h2>
          <div className="bg-vertoLightBlue w-[100px] h-[2px] mx-auto my-16" />
        </>
      )}
      {slice.primary.content && (
        <div className="max-w-4xl mx-auto">
          <PrismicRichText
            field={slice.primary.content}
            components={{
              paragraph: ({ children }) => (
                <p className="text-white">{children}</p>
              ),
            }}
          />
        </div>
      )}
    </>
  );
};

const WithImageLead = ({ slice }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {slice?.primary?.image && (
        <div className="flex justify-center mb-10">
          <PrismicNextImage
            field={slice.primary.image}
            sizes="100vw"
            className="max-w-96 mx-auto"
          />
        </div>
      )}
      {slice.primary?.content && (
        <PrismicRichText
          field={slice.primary.content}
          components={{
            paragraph: ({ children }) => (
              <p className="text-base">{children}</p>
            ),
          }}
        />
      )}
      {slice?.primary?.link && (
        <div className="flex justify-center mt-10">
          <DefaultButton link={slice.primary.link} />
        </div>
      )}
    </div>
  );
};

const ContentList = ({ slice }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {slice?.primary?.title_content && (
        <div className="flex justify-center flex-col text-center">
          <PrismicRichText
            field={slice.primary.title_content}
            components={{
              label: ({ children, node }) => {
                if (node.data.label === "live-zero-title") {
                  return (
                    <span className="live-zero-logo text-vertoBlue tracking-logo flex justify-center">
                      LIVE ZER
                      <span className="o text-vertoBlue">
                        O<div className="live-zero-line text-vertoBlue"> </div>
                      </span>
                    </span>
                  );
                }
                return <span>{children}</span>;
              },
              paragraph: ({ children }) => (
                <p className="text-2xl">{children}</p>
              ),
            }}
          />
        </div>
      )}
      {slice.primary?.content_block && (
        <div className="mt-20">
          {slice.primary.content_block.map((item, index) => (
            <div
              key={index}
              className="flex w-full mb-10 cursor-pointer transition-all duration-500 hover:bg-slate-50 hover:translate-x-0.5"
            >
              {/* Image Div */}
              <div className="image-div w-2/5">
                <PrismicNextImage
                  field={item.image}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Content Div */}
              <div className="flex w-3/5 text-left p-10 justify-center flex-col">
                <h3 className="mb-4 font-semibold">{item.title}</h3>
                <PrismicRichText
                  field={item.content}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="text-base">{children}</p>
                    ),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Testimonial = ({ slice }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = slice.primary.testimonials.length;

  // Ref to dynamically calculate drag constraints
  const sliderRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      setSliderWidth(sliderRef.current.offsetWidth);
    }
  }, []);

  const handleSwipe = (direction) => {
    if (direction === "left" && currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === "right" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Title Section */}
      <div>
        {slice.primary.title_lead && (
          <p className="uppercase text-vertoLightBlue tracking-wide font-medium text-xl">
            {slice.primary.title_lead}
          </p>
        )}
        {slice.primary.title && (
          <h2 className="uppercase text-white tracking-widest">
            {slice.primary.title}
          </h2>
        )}
      </div>

      {/* Testimonial Slider */}
      <div className="mt-10 relative">
        {/* Slider Content */}
        <div className="overflow-hidden pt-10" ref={sliderRef}>
          <motion.div
            className="flex"
            animate={{ x: -currentIndex * sliderWidth }}
            transition={{
              duration: 0.5,
              ease: [0.42, 0, 0.58, 1],
            }}
            drag="x"
            dragConstraints={{
              left: -(sliderWidth * (totalSlides - 1)), // Prevent swiping beyond the last slide
              right: 0, // Prevent swiping beyond the first slide
            }}
            dragElastic={0} // Disable over-dragging
            onDragEnd={(event, info) => {
              const swipeThreshold = 50;
              if (
                info.offset.x < -swipeThreshold &&
                currentIndex < totalSlides - 1
              ) {
                handleSwipe("left");
              } else if (info.offset.x > swipeThreshold && currentIndex > 0) {
                handleSwipe("right");
              }
            }}
          >
            {slice.primary.testimonials.map((item, index) => (
              <div
                key={index}
                className="w-full flex flex-col items-center text-center px-4 relative"
                style={{ flex: "0 0 100%" }}
              >
                {/* Quote SVG */}
                <div className="absolute left-0 -top-[40px] z-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    fill="rgba(195, 195, 195, 0.2)"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                {/* Testimonial Content */}
                <div className="px-4">
                  <PrismicRichText
                    field={item.content}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="text-white lg:leading-10 relative text-base lg:text-2xl">
                          {children}
                        </p>
                      ),
                    }}
                  />
                  {item.author && (
                    <div className="mt-10">
                      <p className="text-white font-semibold text-sm lg:text-base">
                        {item.author}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dot Controls */}
        {slice.primary.testimonials.length > 1 && (
          <div className="flex justify-center mt-10">
            <div className="flex space-x-2 bg-slate-600 rounded-full p-2 transform w-fit">
              {slice.primary.testimonials.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all duration-1000 cursor-pointer ${
                    index === currentIndex ? "bg-white w-12" : "bg-white w-3"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const WithRegistrationForm = ({ slice, themeColor }) => {
  const BtnColorClasses =
    {
      VertoBlue:
        "border-black text-vertoBlack hover:bg-vertoBlack hover:text-white",
      White:
        "text-white bg-vertoBlack hover:bg-vertoLightBlue hover:text-white",
    }[themeColor] ||
    "border-black text-vertoBlack hover:bg-vertoBlack hover:text-white"; // Fallback if undefined
  return (
    <div className="text-left max-w-7xl mx-auto">
      {slice.primary.title && (
        <>
          <p className="uppercase text-vertoBlue tracking-widest font-heading font-semibold text-3xl">
            {slice.primary.title}
          </p>
          <div className="bg-vertoLightBlue w-[100px] h-[4px] mr-auto my-10" />
        </>
      )}
      {slice.primary.content && (
        <div className="mr-auto">
          <PrismicRichText
            field={slice.primary.content}
            components={{
              paragraph: ({ children }) => (
                <p className="text-vertoBlue text-xl">{children}</p>
              ),
            }}
          />
        </div>
      )}
      <div className="mt-16">
        <button>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={`${BtnColorClasses} relative px-4 py-2 font-medium text-lg tracking-button uppercase border rounded transition-colors duration-300 ease-in-out`}
          >
            Register your interest
          </motion.div>
        </button>
      </div>
    </div>
  );
};

export default BlockContent;
