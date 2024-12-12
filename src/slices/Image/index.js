import * as prismic from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";

const Image = ({ slice }) => {
  const image = slice.primary.image;
  const aspect_ratio = slice.variation === "wide" ? "16:9" : "auto";
  return (
    <Bounded
      as="section"
      size={slice.variation === "fullScreenWidth" ? undefined : "widest"}
      paddingAs={
        slice.variation === "fullScreenWidth"
          ? "fullWidthBlock"
          : "contentSection"
      }
    >
      <figure className="grid grid-cols-1">
        {prismic.isFilled.image(image) && (
          <div className="bg-gray-100">
            <PrismicNextImage
              field={image}
              sizes="100vw"
              className="w-full"
              imgixParams={{ ar: aspect_ratio, fit: "crop" }}
            />
          </div>
        )}
      </figure>
    </Bounded>
  );
};

export default Image;
