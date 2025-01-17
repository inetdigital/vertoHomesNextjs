import { PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";

const Timeline = ({ slice }) => {
  return (
    <Bounded
      as="section"
      paddingAs="fullWidthBlock"
      className="bg-vertoDarkGreen"
    >
      <div className="py-36 max-w-7xl mx-auto px-6 xl:px-0">
        {slice.primary.title && (
          <h2 className="text-3xl font-bold mb-24 text-white">
            {slice.primary.title}
          </h2>
        )}
        <div className="hidden lg:block">
          <div
            className={`relative grid md:grid-cols-${slice.primary.timeline_item.length} items-center w-full`}
          >
            {slice.primary.timeline_item.map((item, index) => (
              <div
                key={index}
                className="w-full flex items-center justify-center"
              >
                <PrismicNextImage field={item.icon} fallbackAlt="Verto Homes" />
              </div>
            ))}
          </div>
          <div className="w-full h-1 bg-vertoLightGreen mb-8 items-center hidden lg:flex">
            <div
              className={`relative grid lg:grid-cols-${slice.primary.timeline_item.length} items-center w-full`}
            >
              {slice.primary.timeline_item.map((_, index) => {
                if (index === slice.primary.timeline_item.length - 1) {
                  return null;
                }
                return (
                  <div key={index} className="flex justify-end">
                    <div className="w-0 h-0 border-t-[10px] border-b-[10px] border-l-[20px] border-transparent border-l-vertoLightGreen" />
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={`relative grid lg:grid-cols-${slice.primary.timeline_item.length} items-center w-full`}
          >
            {slice.primary.timeline_item.map((item, index) => (
              <div
                key={index}
                className="w-9/12 mx-auto items-center justify-center"
              >
                <p className="text-white font-medium">{item.title}</p>
                <p className="text-white">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
        {/** Mobile */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-2 gap-y-12">
            {slice.primary.timeline_item.map((item, index) => {
              return (
                <div key={index} className="flex justify-center flex-col">
                  <div className="w-full flex items-center justify-center mb-4">
                    <PrismicNextImage
                      field={item.icon}
                      fallbackAlt="Verto Homes"
                    />
                  </div>
                  <div className="w-9/12 mx-auto items-center justify-center">
                    <p className="text-white font-medium text-center">
                      {item.title}
                    </p>
                    <p className="text-white  text-center">{item.caption}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Timeline;
