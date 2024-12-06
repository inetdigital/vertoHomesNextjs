import { Bounded } from "@/components/Bounded";

import Image from "next/image";
import { PrismicRichText } from "@/components/PrismicRichText";

const SplitContentBlock = ({ slice }) => {
  const svgName =
    {
      default: "Bike_illo_Green-1.svg",
      withHouseFooter: "House_illo_Green-1.svg",
    }[slice.variation] || "Bike_illo_Green-1.svg";
  return (
    <Bounded as="section" size="widest" paddingAs="contentSection">
      <div className="flex flex-col">
        {/* Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 mb-16">
          <div>
            <h2 className="text-2xl text-vertoBlack text-left mb-8 uppercase">
              {slice.primary.title_lead}
              <br />
              <span className="text-4xl md:text-5xl text-vertoLightGreen">
                {slice.primary.title}
              </span>
            </h2>
          </div>

          <div className="text-left text-vertoDarkBlue">
            {/* Content */}
            <PrismicRichText field={slice.primary.content} />
          </div>
        </div>

        {/* Bicycle Icon */}
        <div className="relative mb-2 pl-56">
          <Image
            src={`/assets/${svgName}`}
            alt="Bike Illustration"
            width={200}
            height={130}
            loading="lazy" // Defers the loading of the image
          />
        </div>

        {/* Divider */}
        <div className="w-full border-t-4 border-vertoDarkBlue" />
      </div>
    </Bounded>
  );
};

export default SplitContentBlock;
