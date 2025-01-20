import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { BlockButtonDarkBlue } from "@/components/ui/BlockButtonDarkBlue";
import BlockButton from "@/components/ui/BlockButton";
import clsx from "clsx";

const RichContentBlock = ({ slice }) => {
  const padding =
    {
      White: "contentSection",
      VertoGreen: "fullWidthBlock",
      VertoBlue: "fullWidthBlock",
    }[slice.primary?.background_color] || "contentSection";
  const sizeAs =
    {
      White: "widest",
      VertoGreen: "fullsize",
      VertoBlue: "fullsize",
    }[slice.primary?.background_color] || "widest";
  return (
    <Bounded as="section" paddingAs={padding} size={sizeAs}>
      {slice.variation === "default" && <DefaultRichText slice={slice} />}
      {slice.variation === "withImageInGrid" && <WithImageGrid slice={slice} />}
    </Bounded>
  );
};

const WithImageGrid = ({ slice }) => {
  const backgroundColor =
    {
      White: "bg-white",
      VertoGreen: "bg-vertoDarkGreen",
      VertoBlue: "bg-vertoDarkBlue",
    }[slice.primary?.background_color] || "bg-white";
  const textColor =
    {
      White: "text-vertoBlack",
      VertoGreen: "text-white",
      VertoBlue: "text-white",
    }[slice.primary?.background_color] || "text-vertoBlack";
  const paddingClasses =
    {
      White: "py-0",
      VertoGreen: "py-28 md:py-32 px-6 md:px-12",
      VertoBlue: "py-28 md:py-32 px-6 md:px-12",
    }[slice.primary?.background_color] || "py-0";

  return (
    <div className={clsx(backgroundColor, paddingClasses, `grid gap-y-0`)}>
      <div className="max-w-7xl mx-auto">
        {slice.primary.content_block.map((section, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 md:grid-cols-2 items-center mb-${index === slice.primary.content_block.length - 1 ? "0" : "24"} ${
              index % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
            }`}
          >
            <div className={textColor}>
              <PrismicRichText
                field={section.content}
                components={{
                  hyperlink: ({ children, node }) => (
                    <PrismicNextLink field={node.data}>
                      {slice.primary.background_color === "White" ||
                      slice.primary.background_color === null ? (
                        <BlockButtonDarkBlue label={children} reverse />
                      ) : (
                        <BlockButton label={children} />
                      )}
                    </PrismicNextLink>
                  ),
                  paragraph: ({ children, node }) => (
                    <p className={textColor}>{children}</p>
                  ),
                }}
              />
            </div>
            <div
              className={`mt-16 md:mt-0 ${index % 2 === 0 ? "pl-0 md:pl-24" : "pr-0 md:pr-24"}`}
            >
              {section.image && (
                <PrismicNextImage
                  field={section.image}
                  fallbackAlt="Verto Homes"
                />
              )}
              {section.secondary_image && (
                <div className="mt-12">
                  <PrismicNextImage
                    field={section.secondary_image}
                    fallbackAlt="Verto Homes"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DefaultRichText = ({ slice }) => {
  const width =
    {
      50: "w-full md:w-3/4 lg:w-1/2",
      75: "w-full lg:w-9/12",
      100: "w-full",
    }[slice.primary.block_width_percentage] || "3/4";
  return (
    <div className={`${width}`}>
      <PrismicRichText
        field={slice.primary.content}
        components={{
          hyperlink: ({ children, node }) => (
            <PrismicNextLink field={node.data}>
              <BlockButtonDarkBlue label={children} reverse />
            </PrismicNextLink>
          ),
        }}
      />
    </div>
  );
};

export default RichContentBlock;
