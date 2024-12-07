import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage } from "@prismicio/next";

const EnergyComparison = ({ slice }) => {
  return (
    <Bounded as="section" paddingAs="fullWidthBlock">
      <div className="bg-vertoDarkBlue py-36">
        <div className="max-w-7xl mx-auto px-6">
          <div>
            <h2 className="text-vertoLightBlue uppercase tracking-widest mb-12 text-4xl">
              {slice.primary.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-0 lg:gap-x-16 gap-y-16 lg:gap-y-0">
            <div className="text-white">
              <PrismicRichText field={slice.primary.content} />
            </div>
            <div className="grid gap-12">
              {slice.primary?.cards?.length > 0 && (
                <>
                  {slice.primary.cards.map((item, index) => {
                    console.log(item);
                    return (
                      <div
                        key={index}
                        className="bg-white p-6 rounded-lg relative"
                      >
                        <div
                          style={{ backgroundColor: item.highlight_color }}
                          className="absolute left-0 top-0 -translate-y-1/4 -translate-x-3 px-4 py-4 rounded-lg text-white"
                        >
                          <span className="text-base md:text-xl lg:text-2xl font-medium tracking-wide">
                            {item.statistic}
                          </span>
                        </div>
                        <div className="flex items-center pt-12 pb-8">
                          <div>
                            <PrismicNextImage field={item.icon} />
                          </div>
                          <div className="px-8">
                            <PrismicRichText
                              field={item.content}
                              components={{
                                paragraph: ({ children }) => (
                                  <p className="text-xl lg:text-2xl">
                                    {children}
                                  </p>
                                ),
                                heading6: ({ children }) => (
                                  <p className="text-base lg:text-md mt-6 font-extralight">
                                    {children}
                                  </p>
                                ),
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default EnergyComparison;
