import { BlockButtonBlue } from "@/components/ui/BlockButonBlue";

export const FooterContact = ({ themeColor, highlightColor, marginTop }) => {
  return (
    <section
      className={`bg-${themeColor ? themeColor : "vertoDarkGreen"} text-white px-6 py-36 mt-${marginTop ? marginTop : "28"}`}
    >
      <div className="flex flex-col md:flex-row justify-between items-left md:items-center md:items-start max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="mb-8 md:mb-0">
          <h2 className="text-4xl">
            <span
              className={`text-${highlightColor ? highlightColor : "vertoLightGreen"}`}
            >
              CONTACT
            </span>{" "}
            US FOR <br /> MORE INFORMATION
          </h2>
          <div
            className={`h-1 w-16 bg-${highlightColor ? highlightColor : "vertoLightGreen"} mt-4`}
          ></div>
        </div>

        {/* Right Buttons */}
        <div className="flex flex-col space-y-4">
          <BlockButtonBlue label="Arrange a viewing" />
          <BlockButtonBlue label="Get a free info pack" />
        </div>
      </div>
    </section>
  );
};
