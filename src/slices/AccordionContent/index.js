import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const AccordionContent = ({ slice }) => {
  return (
    <Bounded as="section" size="widest" paddingAs="contentSection">
      <div>
        <div className="mx-auto divide-y divide-gray-900/10">
          {slice.primary.title && (
            <h2 className="text-vertoDarkBlue uppercase">
              {slice.primary.title}
            </h2>
          )}
          <dl className="mt-16 space-y-6 divide-y divide-gray-900/10">
            {slice.primary.items.map((item) => (
              <Disclosure key={item.label} as="div" className="pt-6">
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-2xl font-extralight">
                      {item.label}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusSmallIcon
                        aria-hidden="true"
                        className="size-6 group-data-[open]:hidden"
                      />
                      <MinusSmallIcon
                        aria-hidden="true"
                        className="size-6 group-[&:not([data-open])]:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-4 pr-12">
                  <PrismicRichText field={item.content} />
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </Bounded>
  );
};

export default AccordionContent;
