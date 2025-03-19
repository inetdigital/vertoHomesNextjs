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
                    <>
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
                      <ul className="flex items-center mt-6 gap-3">
                        <li>
                          <a
                            href="https://www.instagram.com/vertohomes/"
                            target="_blank"
                          >
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="h-8 w-8 text-vertoBlack"
                              viewBox="0 0 24 24"
                            >
                              <path stroke="none" d="M0 0h24v24H0z"></path>
                              <rect
                                width="16"
                                height="16"
                                x="4"
                                y="4"
                                rx="4"
                              ></rect>
                              <circle cx="12" cy="12" r="3"></circle>
                              <path d="M16.5 7.5v.001"></path>
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.linkedin.com/company/verto-homes/"
                            target="_blank"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              className="h-6 w-6 text-vertoBlack"
                            >
                              <path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5M8 19H5V8h3zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764M20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476z"></path>
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </>
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
          <div className="hidden md:block" />
          <div className="col-span-2 md:col-span-1 px-6">
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
