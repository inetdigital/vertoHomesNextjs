import Link from "next/link";
import * as prismic from "@prismicio/client";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { Layout } from "@/components/Layout";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { HorizontalDivider } from "@/components/HorizontalDivider";

import { fetchNavigation } from "@/lib/fetchNavigation";
import { PrismicRichText } from "@/components/PrismicRichText";

import { DateFormat } from "@/lib/DateFormat";
import clsx from "clsx";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function LatestArticle({ article }) {
  const date = prismic.asDate(
    article.data.publishDate || article.first_publication_date
  );
  const tagColors =
    {
      news: "bg-gray-50 text-gray-600",
      "sustainable-living": "bg-vertoLightGreen text-white",
      "buying-guides": "bg-vertoLightBlue text-white",
    }[article.data.category.uid] || "gray-50 text-gray-600";

  return (
    <div>
      <div className="relative w-full">
        <PrismicNextImage
          field={article.data.featuredImage}
          className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"
          fallbackAlt="Verto Homes"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-vertoDarkBlue/10 ring-inset">
          <PrismicNextLink field={article} className="block w-full h-full" />
        </div>
      </div>
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <p
            className={clsx(
              `relative z-10 rounded-full px-3 py-1.5 text-sm`,
              tagColors
            )}
          >
            {article.data?.category?.data?.name}
          </p>
          <span className="text-gray-500">
            <DateFormat dateString={article.last_publication_date} />
          </span>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
            <PrismicNextLink field={article}>
              <span className="absolute inset-0" />
              <PrismicText field={article.data.title} />
            </PrismicNextLink>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
            <PrismicText field={article.data.introduction} />
          </p>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { uid } = await params;
  const client = createClient();
  const settings = await client.getSingle("settings");
  const article = await client.getByUID("article", uid).catch(() => notFound());

  return {
    title: `${prismic.asText(article.data.title)} | ${prismic.asText(
      settings.data.name
    )}`,
    description: article.data.meta_description,
    openGraph: {
      title: article.data.meta_title,
      images: [
        {
          url: article.data.meta_image.url,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const { uid } = await params;
  const client = createClient();

  const article = await client
    .getByUID("article", uid, {
      fetchLinks: [
        "taxonomy_news_article_category.uid",
        "taxonomy_news_article_category.name",
      ],
    })
    .catch(() => notFound());
  const latestArticles = await client.getAllByType("article", {
    limit: 3,
    orderings: [
      { field: "my.article.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
    fetchLinks: [
      "taxonomy_news_article_category.uid",
      "taxonomy_news_article_category.name",
    ],
  });
  const navigation = await fetchNavigation(client);
  const settings = await client.getSingle("settings");

  const date = prismic.asDate(
    article.data.publishDate || article.first_publication_date
  );

  return (
    <Layout
      navigation={navigation}
      withHeaderDivider={false}
      withProfile={false}
      settings={settings}
    >
      <Bounded as="article" size="wide">
        <div className="mb-24 mt-24">
          <h1 className="mb-6 text-3xl font-light tracking-wide text-vertoBlack md:text-4xl lg:text-5xl text-center uppercase">
            <PrismicText field={article.data.title} />
          </h1>
          <p className="tracking-tighter text-vertoDarkGreen text-center mb-12">
            {dateFormatter.format(date)}
          </p>
          <p className={clsx(`text-md mb-12 text-center underline`)}>
            {article.data?.category?.data?.name}
          </p>
          <HorizontalDivider />
          <div className="my-24">
            <div className="max-w-4xl px-6 mx-auto">
              <PrismicNextImage
                field={article.data.featuredImage}
                className="object-contain"
                fallbackAlt="Verto Homes"
              />
            </div>
          </div>
          <HorizontalDivider />
        </div>
        <div>
          <PrismicRichText field={article.data.content} />
        </div>
      </Bounded>
      {latestArticles.length > 0 && (
        <Bounded size="widest">
          <div className="">
            <div className="w-full">
              <h2 className="mb-14 text-4xl uppercase">
                Explore Latest Articles
              </h2>
              <div className="grid grid-cols-3 gap-12">
                {latestArticles.map((article) => (
                  <LatestArticle key={article.id} article={article} />
                ))}
              </div>
            </div>
          </div>
        </Bounded>
      )}
    </Layout>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const articles = await client.getAllByType("article");

  return articles.map((article) => {
    return { uid: article.uid };
  });
}
