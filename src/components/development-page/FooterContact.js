import BlockButton from "@/components/ui/BlockButton";

export const FooterContact = () => {
  return (
    <section className="bg-vertoDarkGreen text-white px-6 py-16">
      <div className="flex flex-col md:flex-row justify-between items-left md:items-center md:items-start max-w-6xl mx-auto">
        {/* Left Content */}
        <div className="mb-8 md:mb-0">
          <h2 className="text-4xl">
            <span className="text-vertoLightGreen">CONTACT</span> US FOR <br />{" "}
            MORE INFORMATION
          </h2>
          <div className="h-1 w-16 bg-vertoLightGreen mt-4"></div>
        </div>

        {/* Right Buttons */}
        <div className="flex flex-col space-y-4">
          <BlockButton label="Arrange a viewing" />
          <BlockButton label="Get a free info pack" />
        </div>
      </div>
    </section>
  );
};
