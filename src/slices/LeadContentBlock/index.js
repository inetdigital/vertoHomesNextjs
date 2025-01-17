import { PrismicRichText } from "@/components/PrismicRichText";

import { Bounded } from "@/components/Bounded";
import DefaultButton from "@/components/ui/DefaultButton";

const LeadContentBlock = ({ slice }) => {
  const highLightColor =
    {
      default: "vertoLightBlue",
      greenHighlight: "vertoLightGreen",
    }[slice.variation] || "vertoLightBlue";
  return (
    <Bounded
      as="section"
      size="wide"
      paddingAs="contentSection"
      className="text-center"
    >
      {slice.primary.title_lead && (
        <p
          className={`uppercase text-${highLightColor} mb-4 tracking-normal lg:tracking-wide font-medium text-base lg:text-xl`}
        >
          {slice.primary.title_lead}
        </p>
      )}

      {slice.primary.title && (
        <>
          <h2 className="uppercase text-vertoBlack tracking-widest text-2xl md:text-4xl lg:text-6xl">
            {slice.primary.title}
          </h2>
          <div
            className={`bg-${highLightColor} w-[100px] h-[4px] mx-auto mt-8 mb-16`}
          />
        </>
      )}
      {slice.primary.content && (
        <PrismicRichText
          field={slice.primary.content}
          components={{
            paragraph: ({ children }) => (
              <p className="text-base lg:text-xl">{children}</p>
            ),
          }}
        />
      )}
      {slice.primary.link &&
        slice.primary.link.text &&
        slice.primary.link.url && (
          <div className="flex justify-center align-center mt-16">
            <DefaultButton link={slice.primary.link} />
          </div>
        )}
    </Bounded>
  );
};

export default LeadContentBlock;
