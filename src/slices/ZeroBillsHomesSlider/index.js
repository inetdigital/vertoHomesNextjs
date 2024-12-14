"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useProperties } from "@/context/AllProperties";
import { PropertyCard } from "@/components/ui/PropertyCard";

import { Bounded } from "@/components/Bounded";

const ZeroBillsHomesSlider = ({ slice }) => {
  const properties = useProperties();
  const [zeroBillsProperties, setZeroBillsProperties] = useState([]);

  useEffect(() => {
    if (properties && properties.length > 0) {
      // Filter properties with zero_bills === true
      setZeroBillsProperties(
        properties.filter((property) => property.data.zero_bills === true)
      );
    }
  }, [properties]);

  // Slider settings
  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    customPaging: () => (
      <button className="w-4 h-4 rounded-full border-2 border-gray-400 bg-gray-400 hover:bg-vertoLightGreen" />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (!properties || !zeroBillsProperties) {
    return null;
  }

  return (
    <Bounded as="section" size="widest" paddingAs="contentSection">
      <div>
        <h2 className="text-2xl font-bold text-vertoDarkBlue mb-12 uppercase">
          {slice.primary.title}
        </h2>
      </div>
      <div className="w-full max-h-30">
        {zeroBillsProperties.length > 0 ? (
          <Slider {...settings}>
            {zeroBillsProperties.map((property, index) => (
              <div key={index} className="pr-0 md:pr-12">
                <PropertyCard property={property} />
              </div>
            ))}
          </Slider>
        ) : (
          <p>Loading properties...</p>
        )}
      </div>
    </Bounded>
  );
};

export default ZeroBillsHomesSlider;
