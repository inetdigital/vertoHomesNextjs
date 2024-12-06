import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";

const RichContentBlock = ({ slice }) => {
  console.log(slice);
  const width =
    {
      50: "w-full md:w-3/4 lg:w-1/2",
      75: "w-full md:w-3/5",
      100: "w-full",
    }[slice.primary.block_width_percentage] || "3/4";
  return (
    <Bounded as="section" paddingAs="contentSection" size="widest">
      <div className={`${width}`}>
        <PrismicRichText field={slice.primary.content} />
      </div>
    </Bounded>
  );
};

export default RichContentBlock;
