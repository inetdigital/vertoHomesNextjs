"use client";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { BlockButtonDarkBlue } from "@/components/ui/BlockButtonDarkBlue";
import BlockButton from "@/components/ui/BlockButton";
import clsx from "clsx";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

import { useHubspotMainForm } from "@/context/HubspotMainFormContext";

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

  const { openForm, setFormId } = useHubspotMainForm();
  const handleOpenForm = (formId) => {
    setFormId(formId); // Set dynamic form ID
    openForm(); // Open the modal
  };

  const extractTextFromChildren = (children) => {
    if (typeof children === "string") return children;
    if (Array.isArray(children)) {
      return children.map(extractTextFromChildren).join("");
    }
    if (typeof children === "object" && children?.props?.children) {
      return extractTextFromChildren(children.props.children);
    }
    return "";
  };

  return (
    <div className={clsx(backgroundColor, paddingClasses, `grid gap-y-0`)}>
      <div className="max-w-7xl mx-auto">
        {slice.primary.content_block.map((section, index) => {
          const isFirstRowReversed =
            slice.primary.first_row_image_position === false;
          const isReversed = isFirstRowReversed
            ? index % 2 === 0
            : index % 2 !== 0;

          return (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-2 items-center mb-${
                index === slice.primary.content_block.length - 1 ? "0" : "24"
              } ${isReversed ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className={textColor}>
                <PrismicRichText
                  field={section.content}
                  components={{
                    hyperlink: ({ children, node }) => {
                      const url = node?.data?.url || "";

                      // Check if the URL includes 'hubspot-form'
                      const isHubspotForm = url.includes("hubspot-form");

                      // Extract the ID from a URL like 'hubspot-form/abc123'
                      let hubspotFormId = null;
                      if (isHubspotForm) {
                        const parts = url.split("hubspot-form/");
                        hubspotFormId = parts[1] || null;
                      }

                      if (isHubspotForm && hubspotFormId) {
                        // Extract label text from Prismic children
                        const linkLabel = extractTextFromChildren(children);
                        return (
                          <button onClick={() => handleOpenForm(hubspotFormId)}>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                              }}
                              className={`mb-4 text-white bg-vertoDarkBlue hover:bg-vertoLightBlue hover:text-white relative px-4 py-2 font-medium text-lg tracking-button uppercase border-0 rounded transition-colors duration-300 ease-in-out`}
                            >
                              {linkLabel}
                            </motion.div>
                          </button>
                        );
                      }

                      // Default behavior for non-hubspot-form links
                      return (
                        <PrismicNextLink field={node.data}>
                          {slice.primary.background_color === "White" ||
                          slice.primary.background_color === null ? (
                            <BlockButtonDarkBlue label={children} reverse />
                          ) : (
                            <BlockButton label={children} />
                          )}
                        </PrismicNextLink>
                      );
                    },
                    paragraph: ({ children }) => (
                      <p className={textColor}>{children}</p>
                    ),
                  }}
                />
              </div>
              <div
                className={`mt-16 md:mt-0 ${
                  isReversed ? "pr-0 md:pr-24" : "pl-0 md:pl-24"
                }`}
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
          );
        })}
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
