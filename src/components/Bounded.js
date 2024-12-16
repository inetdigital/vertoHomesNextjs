import clsx from "clsx";

export function Bounded({
  as: Comp = "div",
  size,
  className,
  paddingAs = "default",
  children,
}) {
  // Define padding classes based on `paddingAs` options
  const paddingClasses = {
    default: "py-28 lg:py-32 px-6 md:px-12",
    contentSection: "pt-28 lg:pt-32 px-6 md:px-12",
    contentSectionLast: "py-28 lg:py-32 px-6 md:px-12",
    fullWidthBlock: "mt-28 lg:mt-32",
    fullWidthBlockConsecutive: "mt-0",
    copyright: "py-6",
    searchHeader: "pt-36",
    tight: "px-6 md:px-12 py-12",
    // Add more cases here as needed
  };

  return (
    <Comp
      className={clsx(
        paddingClasses[paddingAs] || paddingClasses.default, // Fall back to `default` padding if `paddingAs` is unrecognized
        className
      )}
    >
      <div
        className={clsx(
          "mx-auto w-full",
          size === "small" && "max-w-xl",
          size === "base" && "max-w-3xl",
          size === "wide" && "max-w-4xl",
          size === "wider" && "max-w-6xl",
          size === "widest" && "max-w-7xl"
        )}
      >
        {children}
      </div>
    </Comp>
  );
}
