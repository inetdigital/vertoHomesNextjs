import * as prismic from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

export const BannerImage = ({ image, title, themeColor, caption }) => {
  const colorClasses = themeColor ? themeColor : "vertoLightGreen";
  return (
    <div className="h-screen overflow-hidden relative">
      <div className="absolute bg-black/40 w-full h-full z-[1]" />
      <PrismicNextImage
        field={image}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // Ensures the image scales to cover the container
        }}
        fallbackAlt=""
      />
      <div className="absolute flex flex-col items-center justify-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[2]">
        <div className="max-w-md">
          <h1 className="text-white uppercase text-center tracking-widest leading-tight">
            {Array.isArray(title) ? prismic.asText(title) : title}
          </h1>
        </div>
        <hr className={`h-[3px] w-20 border-0 bg-${colorClasses} mt-8`} />
        {caption && (
          <div className="max-w-xl mt-8">
            <p className="text-white">{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};
