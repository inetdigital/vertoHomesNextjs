import * as prismic from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";

const Image = ({ slice }) => {
  const image = slice.primary.image;

  return (
    <Bounded as="section" size="widest" paddingAs="contentSection">
      <figure className="grid grid-cols-1">
        {prismic.isFilled.image(image) && (
          <div className="bg-gray-100">
            <PrismicNextImage field={image} sizes="100vw" className="w-full" />
          </div>
        )}
      </figure>
    </Bounded>
  );
};

export default Image;
