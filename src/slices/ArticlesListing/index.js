"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Bounded } from "@/components/Bounded";

import { useArticles } from "@/context/AllArticles";
import { useTaxonomyArticles } from "@/context/TaxonomyArticles";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { asText } from "@prismicio/client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import clsx from "clsx";

const ArticlesListing = ({ slice }) => {
  const articles = useArticles();
  const categories = useTaxonomyArticles();
  const [allArticles, setAllArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(9);

  useEffect(() => {
    if (articles && articles.length > 0) {
      const sortedArticles = articles.sort(
        (a, b) => new Date(b.data.publishDate) - new Date(a.data.publishDate)
      );
      setAllArticles(sortedArticles);
      setFilteredArticles(sortedArticles);
    }
  }, [articles]);

  useEffect(() => {
    setDisplayedArticles(filteredArticles.slice(0, itemsToShow));
  }, [filteredArticles, itemsToShow]);

  const handleFilter = (categoryUid) => {
    setSelectedCategory(categoryUid);
    const sortedArticles = allArticles.sort(
      (a, b) => new Date(b.data.publishDate) - new Date(a.data.publishDate)
    );

    if (categoryUid === "all") {
      setFilteredArticles(sortedArticles);
    } else {
      setFilteredArticles(
        sortedArticles.filter(
          (post) => post.data?.category?.uid === categoryUid
        )
      );
    }
    setItemsToShow(9);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      setItemsToShow((prev) => prev + 9);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Bounded as="section" size="widest" paddingAs="contentSection">
      {/* Filter Buttons */}
      <div className="gap-4 mb-20 hidden md:flex">
        <motion.button
          onClick={() => handleFilter("all")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className={`${
            selectedCategory === "all"
              ? "bg-vertoDarkBlue text-white hover:text-white"
              : "bg-gray-200 text-gray-700 hover:text-vertoDarkBlue"
          } relative text-center cursor-pointer px-6 py-3 rounded-full shadow-sm tracking-normal font-normal`}
        >
          All
        </motion.button>
        {categories.map((category) => (
          <motion.button
            key={category.uid}
            onClick={() => handleFilter(category.uid)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={`${
              selectedCategory === category.uid
                ? "bg-vertoDarkBlue text-white hover:text-white"
                : "bg-gray-200 text-gray-700 hover:text-vertoDarkBlue"
            } relative text-center cursor-pointer px-6 py-3 rounded-full shadow-sm tracking-normal font-normal`}
          >
            {category.data.name}
          </motion.button>
        ))}
      </div>
      {/* Filter Mobile*/}
      <div className="block md:hidden mb-20">
        <Listbox
          value={selectedCategory}
          onChange={(value) => handleFilter(value)}
        >
          <div className="relative mt-2">
            <ListboxButton
              className={`${selectedCategory ? "ring-vertoDarkBlue" : "ring-gray-300"} relative w-full cursor-default rounded-md bg-white py-4 pl-3 pr-10 text-left text-vertoDarkBlue shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-vertoDarkBlue hover:ring-vertoDarkBlue transition duration-300 ease-in-out sm:text-sm/6`}
            >
              <span className="flex justify-between text-lg">
                {selectedCategory !== "all"
                  ? categories.find((item) => item.uid === selectedCategory)
                      ?.data.name
                  : "All"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="size-5 text-vertoDarkBlue"
                />
              </span>
            </ListboxButton>

            <ListboxOptions
              transition
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
            >
              <ListboxOption
                value="all" // Pass the UID as the value
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-vertoDarkBlue data-[focus]:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold text-left">
                  All
                </span>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-vertoDarkGreen group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="size-5" />
                </span>
              </ListboxOption>
              {categories.map((item) => (
                <ListboxOption
                  key={item.uid}
                  value={item.uid} // Pass the UID as the value
                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-vertoDarkBlue data-[focus]:text-white"
                >
                  <span className="block truncate font-normal group-data-[selected]:font-semibold text-left">
                    {item.data.name}
                  </span>

                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-vertoDarkGreen group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                    <CheckIcon aria-hidden="true" className="size-5" />
                  </span>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>

      {/* Articles Listing */}
      <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <AnimatePresence>
          {displayedArticles.map((post, index) => {
            const tagColors =
              {
                news: "bg-gray-50 text-gray-600",
                "sustainable-living":
                  "bg-vertoLightGreen text-white hover:text-gray-600",
                "buying-guides":
                  "bg-vertoLightBlue text-white hover:text-gray-600",
              }[post.data.category.data.uid] || "gray-50 text-gray-600";
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.3 }}
                className="flex flex-col items-start"
              >
                <div className="relative w-full">
                  <PrismicNextImage
                    field={post.data.featuredImage}
                    className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-vertoDarkBlue/10 ring-inset" />
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <span className="text-gray-500">
                      {post.data.publishDate}
                    </span>
                    <PrismicNextLink
                      field={post}
                      className={clsx(
                        tagColors,
                        `relative z-10 rounded-full tagColor px-3 py-1.5 font-medium hover:bg-gray-100`
                      )}
                    >
                      {post.data?.category?.data?.name}
                    </PrismicNextLink>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                      <PrismicNextLink field={post}>
                        <span className="absolute inset-0" />
                        {asText(post.data.title)}
                      </PrismicNextLink>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                      {asText(post.data.introduction)}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </Bounded>
  );
};

export default ArticlesListing;
