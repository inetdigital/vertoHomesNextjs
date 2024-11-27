import { PrismicNextImage } from "@prismicio/next";

export const BannerImage = ({ image, title }) => {
  return (
    <div className="h-screen overflow-hidden relative">
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
        fallbackAlt="Verto Homes"
      />
    </div>
  );
};
