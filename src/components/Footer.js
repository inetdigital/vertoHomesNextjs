import { Bounded } from "./Bounded";
import { PrismicNextLink } from "@prismicio/next";

import { FormatUKPhoneNumber } from "@/lib/formatUKPhoneNumber";

export const Footer = ({ navigation }) => {
  return (
    <div className="border-t-4 border-vertoDarkBlue">
      <Bounded as="footer" size="widest">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="flex items-center">
            <div>
              <span className="live-zero-logo text-vertoDarkBlue tracking-logo flex text-6xl">
                LIVE ZER
                <span className="o text-vertoDarkBlue">
                  O<div className="bg-vertoDarkBlue h-1 w-6/12 mx-auto"> </div>
                </span>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {navigation.data.slices1.map((item, index) => {
              return (
                <div key={index}>
                  <p className="text-vertoDarkBlue font-normal mb-4">
                    {item.primary.title}
                  </p>
                  {item.variation === "default" && (
                    <ul>
                      {item.primary.links.map((item, index) => {
                        return (
                          <li key={index} className="mb-2 sm:mb-6">
                            <PrismicNextLink
                              field={item.link}
                              className="font-sans text-base font-extralight text-vertoBlack"
                            />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {item.variation === "contactDetails" && (
                    <ul>
                      <li className="mb-2 sm:mb-6">
                        <PrismicNextLink
                          field={item.primary.link}
                          className="font-sans text-base font-extralight text-vertoBlack"
                        />
                      </li>
                      <li className="mb-2 sm:mb-6">
                        <a
                          href={`tel:0${item.primary.telephone}`}
                          className="font-sans text-base font-extralight text-vertoBlack"
                        >
                          <FormatUKPhoneNumber
                            phoneNumber={item.primary.telephone}
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href={`mailto:${item.primary.email}`}
                          className="font-sans text-base font-extralight text-vertoBlack"
                        >
                          {item.primary.email}
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Bounded>
      <Bounded
        as="section"
        size="widest"
        paddingAs="copyright"
        className="bg-vertoDarkBlue"
      >
        <div className="grid grid-cols-2 gap-24">
          <div />
          <div>
            <p className="text-white text-xs">
              © Copyright Verto {new Date().getFullYear()}. All rights
              reserved.
            </p>
          </div>
        </div>
      </Bounded>
    </div>
  );
};
