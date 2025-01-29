"use client";

import { useRef } from "react";
import { Bounded } from "./Bounded";
import { PrismicNextLink } from "@prismicio/next";

import { motion, useInView } from "framer-motion";

import { FormatUKPhoneNumber } from "@/lib/formatUKPhoneNumber";

export const Footer = ({ navigation }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div className="border-t-4 border-vertoDarkBlue">
      <Bounded as="footer" size="widest">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div ref={ref} className="flex items-center">
            <div>
              <span className="live-zero-logo text-vertoDarkBlue tracking-logo flex text-3xl md:text-4xl lg:text-6xl relative">
                LIVE ZER
                <span className="relative flex flex-col items-center">
                  {/* Animated "O" */}
                  <motion.span
                    className="o text-vertoDarkBlue"
                    initial={{ y: 10, opacity: 0 }}
                    animate={isInView ? { y: -10, opacity: 1 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    O
                  </motion.span>

                  {/* Static Underline */}
                  <div className="bg-vertoDarkBlue h-1 w-6/12 mx-auto mt-[-4px]"></div>
                </span>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {navigation.data.slices1.map((item, index) => {
              return (
                <div key={index}>
                  <p className="text-vertoDarkBlue text-xl font-medium mb-4">
                    {item.primary.title}
                  </p>
                  {item.variation === "default" && (
                    <ul>
                      {item.primary.links.map((item, index) => {
                        const linkType = item.link?.type;
                        // Define static paths for single page types
                        const singlePageRoutes = {
                          search: "/find-your-new-home", // URL path for the single "Search" page type
                        };

                        // Determine the href for the link
                        const href =
                          singlePageRoutes[linkType] || item.link?.url || "#";

                        return (
                          <li key={index} className="mb-2 sm:mb-2">
                            {singlePageRoutes[linkType] ? (
                              <a
                                href={href}
                                className="font-sans text-base font-extralight text-vertoBlack"
                              >
                                {item.link?.text}
                              </a>
                            ) : (
                              <PrismicNextLink
                                field={item.link}
                                className="font-sans text-base font-extralight text-vertoBlack"
                              />
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {item.variation === "contactDetails" && (
                    <ul>
                      <li className="mb-2 sm:mb-2">
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
              reserved.{" "}
              <a href="https://www.inetdigital.co.uk" target="_blank">
                Website by iNet Digital
              </a>
            </p>
          </div>
        </div>
      </Bounded>
    </div>
  );
};
