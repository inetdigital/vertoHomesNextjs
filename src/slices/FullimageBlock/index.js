import { Bounded } from "@/components/Bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import DefaultButton from "@/components/ui/DefaultButton";

const FullimageBlock = ({ slice }) => {
  return (
    <Bounded as="section" paddingAs="fullWidthBlock">
      <div className="h-screen w-screen relative">
        <div className="absolute w-full h-full bg-black/50 z-[2]" />
        <div className="absolute z-[3] flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-white uppercase text-center text-2xl font-heading font-medium tracking-widest mb-2">
            {slice.primary.title_lead}
          </p>
          <p className="text-white uppercase text-center text-5xl font-heading font-semibold tracking-widest">
            {slice.primary.title}
          </p>
          <div className="mt-12">
            <DefaultButton
              link={slice.primary.link}
              theme="vertoLightGreen"
              size="lg"
              padding="wide"
            />
          </div>
        </div>
        <PrismicNextImage
          field={slice.primary.image}
          fallbackAlt="Verto Homes"
          className="object-cover w-full h-full"
          fill={true}
        />
      </div>
    </Bounded>
  );
};

export default FullimageBlock;
