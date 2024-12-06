import { PrismicNextImage } from "@prismicio/next";

export const BannerImage = ({ image, title }) => {
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
      <div className="absolute flex flex-col items-center justify-center max-w-md left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[2]">
        <h1 className="text-white uppercase text-center tracking-widest leading-tight">
          {title}
        </h1>
        <hr className="h-[3px] w-20 border-0 bg-vertoLightGreen mt-8" />
      </div>
    </div>
  );
};
