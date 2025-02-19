"use client";

import { Search } from "@/components/ui/Search";
import { Bounded } from "@/components/Bounded";

import { SearchResultsPanel } from "@/components/SearchResultsPanel";

const PropertyGrid = ({ slice }) => {
  return (
    <Bounded
      as="section"
      size="widest"
      paddingAs="contentSection"
      className="text-center"
    >
      <div>
        {slice.primary.title_lead && (
          <p className="uppercase text-vertoLightGreen tracking-wide font-medium text-xl">
            {slice.primary.title_lead}
          </p>
        )}

        {slice.primary.title && (
          <>
            <h2 className="uppercase text-vertoBlack tracking-widest">
              {slice.primary.title}
            </h2>
            <hr className="bg-vertoLightGreen w-[100px] h-[4px] mx-auto mt-8 mb-16" />
          </>
        )}
      </div>
      <Search background="bg-gray-100" hideLocationFilter={true} />
      <div className="mt-16">
        <SearchResultsPanel
          restrictToDevelopment={slice.primary.properties_from_development.uid}
          type={slice.type}
        />
      </div>
    </Bounded>
  );
};

export default PropertyGrid;
