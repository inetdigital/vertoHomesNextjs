"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Bounded } from "@/components/Bounded";

import { useArticles } from "@/context/AllArticles";
import { usePress } from "@/context/AllPress";
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

import { DateFormat } from "@/lib/DateFormat";

const ArticlesListing = ({ slice }) => {
  if (slice.variation === "default") {
    return <Articles slice={slice} />;
  }
  if (slice.variation === "pressReleases") {
    return <PressReleases slice={slice} />;
  }
  return null;
};

const PressReleases = ({ slice }) => {
  const articles = usePress();

  const [allArticles, setAllArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(9);
  const [featuredArticle, setFeaturedArticle] = useState(null);

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
    if (
      articles &&
      articles.length > 0 &&
      slice.primary?.featured_press_release?.uid
    ) {
      const featuredArticleObj = articles.find(
        (item) => item.uid === slice.primary?.featured_press_release?.uid
      );
      setFeaturedArticle(featuredArticleObj);
    }
  }, [articles]);

  useEffect(() => {
    setDisplayedArticles(filteredArticles.slice(0, itemsToShow));
  }, [filteredArticles, itemsToShow]);

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
      {/* Featured Article */}
      {featuredArticle && (
        <div className="mb-28">
          <h2 className="mb-14 text-vertoBlack uppercase">In The Press</h2>
          <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80">
            <PrismicNextImage
              field={featuredArticle.data.featured_image}
              className="absolute inset-0 -z-10 size-full object-cover"
              fallbackAlt="Verto Homes"
            />
            <div className="absolute inset-0 -z-10 bg-black opacity-40" />
            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />

            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
              <div className="-ml-4 flex items-center gap-x-4">
                <svg
                  viewBox="0 0 2 2"
                  className="-ml-0.5 size-0.5 flex-none fill-white/50"
                >
                  <circle r={1} cx={1} cy={1} />
                </svg>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-x-4 text-xs">
              <p
                className={clsx(
                  `bg-vertoLightGreen text-white relative z-10 rounded-full tagColor px-3 py-1.5 font-medium uppercase`
                )}
              >
                In the press
              </p>
              <span className="text-white">
                <DateFormat
                  dateString={featuredArticle.last_publication_date}
                />
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              <a href={featuredArticle.data?.link?.url} target="_blank">
                <span className="absolute inset-0" />
                {featuredArticle.data.title}
              </a>
            </h3>
            <p className="mt-5 line-clamp-5 text-md text-white">
              {asText(featuredArticle.data.description)}
            </p>
          </article>
        </div>
      )}

      {/* Articles Listing */}
      <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <AnimatePresence>
          {displayedArticles.map((post, index) => {
            if (post.uid === slice.primary?.featured_press_release?.uid) {
              return null;
            }
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
                    field={post.data.featured_image}
                    className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"
                    fallbackAlt="Verto Homes"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-vertoDarkBlue/10 ring-inset" />
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <p
                      className={clsx(
                        `bg-vertoLightGreen text-white relative z-10 rounded-full px-3 py-1.5 font-medium uppercase`
                      )}
                    >
                      In the press
                    </p>
                    <span className="text-gray-500">
                      <DateFormat
                        dateString={featuredArticle.last_publication_date}
                      />
                    </span>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                      <a href={post.data?.link?.url} target="_blank">
                        <span className="absolute inset-0" />
                        {post.data.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                      {asText(post.data.description)}
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

const Articles = ({ slice }) => {
  const articles = useArticles();
  const categories = useTaxonomyArticles();
  const [allArticles, setAllArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(9);
  const [featuredArticle, setFeaturedArticle] = useState(null);

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
    if (
      articles &&
      articles.length > 0 &&
      slice.primary?.featured_article?.uid
    ) {
      const featuredArticleObj = articles.find(
        (item) => item.uid === slice.primary?.featured_article?.uid
      );
      setFeaturedArticle(featuredArticleObj);
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
    <Bounded as="section" size="widest" paddingAs="contentSectionLast">
      {/* Featured Article */}
      {featuredArticle && (
        <div className="mb-28">
          <h2 className="mb-14 text-vertoBlack uppercase">Featured News</h2>
          <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80">
            <PrismicNextImage
              field={featuredArticle.data.featuredImage}
              className="absolute inset-0 -z-10 size-full object-cover"
              fallbackAlt="Verto Homes"
            />
            <div className="absolute inset-0 -z-10 bg-black opacity-40" />
            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />

            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
              <div className="-ml-4 flex items-center gap-x-4">
                <svg
                  viewBox="0 0 2 2"
                  className="-ml-0.5 size-0.5 flex-none fill-white/50"
                >
                  <circle r={1} cx={1} cy={1} />
                </svg>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-x-4 text-xs">
              <p
                field={featuredArticle}
                className={clsx(
                  `bg-vertoLightGreen text-white hover:text-gray-600 relative z-10 rounded-full tagColor px-3 py-1.5 font-medium hover:bg-gray-100`
                )}
              >
                {featuredArticle.data?.category?.data?.name}
              </p>
              <span className="text-white">
                <DateFormat
                  dateString={featuredArticle.last_publication_date}
                />
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              <PrismicNextLink field={featuredArticle}>
                <span className="absolute inset-0" />
                {asText(featuredArticle.data.title)}
              </PrismicNextLink>
            </h3>
            <p className="mt-5 line-clamp-5 text-md text-white">
              {asText(featuredArticle.data.introduction)}
            </p>
          </article>
        </div>
      )}

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
            if (post.uid === slice.primary?.featured_article?.uid) {
              return null;
            }
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
                    fallbackAlt="Verto Homes"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-vertoDarkBlue/10 ring-inset" />
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <p
                      className={clsx(
                        tagColors,
                        `relative z-10 rounded-full tagColor px-3 py-1.5 font-medium hover:bg-gray-100`
                      )}
                    >
                      {post.data?.category?.data?.name}
                    </p>
                    <span className="text-gray-500">
                      <DateFormat dateString={post.last_publication_date} />
                    </span>
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
