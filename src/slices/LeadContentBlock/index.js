import { PrismicRichText } from "@/components/PrismicRichText";

import { Bounded } from "@/components/Bounded";
import DefaultButton from "@/components/ui/DefaultButton";

const LeadContentBlock = ({ slice }) => {
  return (
    <Bounded
      as="section"
      size={slice.variation === "default" ? "wide" : "base"}
      paddingAs="contentSection"
      className="text-center"
    >
      {slice.primary.title_lead && (
        <p className="uppercase text-vertoLightBlue tracking-wide font-medium text-xl">
          {slice.primary.title_lead}
        </p>
      )}

      {slice.primary.title && (
        <>
          <h2 className="uppercase text-vertoBlack tracking-widest">
            {slice.primary.title}
          </h2>
          <div className="bg-vertoLightBlue w-[100px] h-[2px] mx-auto my-16" />
        </>
      )}
      {slice.primary.content && (
        <PrismicRichText
          field={slice.primary.content}
          components={{
            paragraph: ({ children }) => <p className="text-2xl">{children}</p>,
          }}
        />
      )}
      {slice.primary.link && (
        <div className="flex justify-center align-center mt-16">
          <DefaultButton link={slice.primary.link} />
        </div>
      )}
    </Bounded>
  );
};

export default LeadContentBlock;
