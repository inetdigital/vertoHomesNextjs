import Image from "next/image";

const PrismicImageComponent = ({ imageField }) => {
  return (
    <Image
      src={imageField.url} // Prismic's image URL
      alt={imageField.alt || "Verto Homes"} // Alt text from Prismic or a fallback
      width={imageField.dimensions?.width || 800} // Width from Prismic or a default
      height={imageField.dimensions?.height || 600} // Height from Prismic or a default
    />
  );
};

export default PrismicImageComponent;
