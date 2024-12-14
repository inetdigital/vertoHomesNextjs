import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { BlockButtonDarkBlue } from "@/components/ui/BlockButtonDarkBlue";

const RichContentBlock = ({ slice }) => {
  return (
    <Bounded as="section" paddingAs="contentSection" size="widest">
      {slice.variation === "default" && <DefaultRichText slice={slice} />}
      {slice.variation === "withImageInGrid" && <WithImageGrid slice={slice} />}
    </Bounded>
  );
};

const WithImageGrid = ({ slice }) => {
  return (
    <div className="grid gap-y-0">
      {slice.primary.content_block.map((section, index) => (
        <div
          key={index}
          className={`grid grid-cols-1 md:grid-cols-2 items-center mb-${index === slice.primary.content_block.length - 1 ? "0" : "24"} ${
            index % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
          }`}
        >
          <div>
            <PrismicRichText
              field={section.content}
              components={{
                hyperlink: ({ children, node }) => (
                  <PrismicNextLink field={node.data}>
                    <BlockButtonDarkBlue label={children} reverse />
                  </PrismicNextLink>
                ),
              }}
            />
          </div>
          <div
            className={`mt-16 md:mt-0 ${index % 2 === 0 ? "pl-0 md:pl-24" : "pr-0 md:pr-24"}`}
          >
            <PrismicNextImage
              field={section.image}
              imgixParams={{ ar: "1.5:1", fit: "crop" }}
              className="h-4/6"
            />
          </div>
        </div>
      ))}
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
