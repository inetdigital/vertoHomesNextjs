import { Bounded } from "@/components/Bounded";
import PrismicImageComponent from "@/components/PrismicImageComponent";

const InlineImages = ({ slice }) => {
  return (
    <Bounded
      as="section"
      size={slice.variation === "default" ? "widest" : "base"}
      paddingAs="contentSection"
      className="text-center"
    >
      {slice.primary?.title && (
        <h3 className="text-vertoBlack font-normal mb-8">
          {slice.primary.title}
        </h3>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-8">
        {slice.primary.images?.map((item, index) => {
          return (
            <div key={index}>
              <PrismicImageComponent imageField={item.image} />{" "}
            </div>
          );
        })}
      </div>
    </Bounded>
  );
};

export default InlineImages;
