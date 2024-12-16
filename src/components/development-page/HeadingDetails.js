"use client";

import { useState } from "react";

import {
  MapPinIcon,
  HomeIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

import BlockButton from "@/components/ui/BlockButton";

import ArrangeViewing from "@/components/ui/ArrangeViewing";

export const HeadingDetails = ({ page }) => {
  const [showArrangeViewingForm, setShowArrangeViewingForm] = useState(false);
  return (
    <section className="py-12 bg-vertoDarkGreen">
      <div className="max-w-6xl mx-auto px-6 xl:px-0">
        <div className="text-white py-8">
          <h2 className="text-2xl font-bold mb-14">
            The UK’s first fully Zero Bills development
          </h2>
          <div className="flex flex-col lg:flex-row">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 w-full lg:w-2/3">
              <div className="flex items-start gap-4">
                <MapPinIcon className="h-6 w-6 text-vertoLightGreen" />
                <div>
                  <h3 className="text-sm font-semibold uppercase">Location</h3>
                  <p className="text-base text-white">
                    {page.data.location_town}, {page.data.location_city}{" "}
                    {page.data.location_postcode}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <HomeIcon className="h-6 w-6 text-vertoLightGreen" />
                <div>
                  <h3 className="text-sm font-semibold uppercase">
                    Property Types
                  </h3>
                  <p className="text-base text-white">
                    {page.data.property_types}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-xl text-vertoLightGreen w-6">
                  {"///"}
                </span>
                <div>
                  <h3 className="text-sm font-semibold uppercase">
                    What3Words
                  </h3>
                  <p className="text-base text-white">
                    {page.data.what_three_words}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Squares2X2Icon className="h-6 w-6 text-vertoLightGreen" />
                <div>
                  <h3 className="text-sm font-semibold uppercase">
                    Development Size
                  </h3>
                  <p className="text-base text-white">
                    {page.data.development_size}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full lg:w-1/3 pl-0 lg:pl-12 mt-12 lg:mt-0">
              <BlockButton label="Arrange a viewing" />
              <BlockButton label="Download Brochure" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
