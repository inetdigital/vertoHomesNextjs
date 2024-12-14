import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

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
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900 transition-all duration-300 ease-in-out">
                    <span className="text-xl font-extralight">
                      {item.label}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusIcon
                        aria-hidden="true"
                        className="size-6 group-data-[open]:hidden"
                      />
                      <MinusIcon
                        aria-hidden="true"
                        className="size-6 group-[&:not([data-open])]:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </dt>
                <Transition
                  enter="transition-all duration-300 ease-out"
                  enterFrom="opacity-0 max-h-0"
                  enterTo="opacity-100 max-h-screen"
                  leave="transition-all duration-300 ease-in"
                  leaveFrom="opacity-100 max-h-screen"
                  leaveTo="opacity-0 max-h-0"
                >
                  <DisclosurePanel as="dd" className="mt-4 pr-12 py-12">
                    <PrismicRichText field={item.content} />
                  </DisclosurePanel>
                </Transition>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </Bounded>
  );
};

export default AccordionContent;
