import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { notFound } from "next/navigation";

import { Layout } from "@/components/Layout";
import HomePageBanner from "@/components/HomePageBanner";

import { fetchNavigation } from "@/lib/fetchNavigation";

export async function generateMetadata() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const page = await client.getSingle("home_page").catch(() => notFound());

  return {
    title: `${page.data.meta_title} | ${prismic.asText(settings.data.name)}`,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title,
      images: [
        {
          url: page.data.meta_image.url,
        },
      ],
    },
  };
}

export default async function Index() {
  const client = createClient();

  const settings = await client.getSingle("settings");
  const navigation = await fetchNavigation(client);

  // Fetch home page content
  const homePage = await client.getSingle("home_page", {
    fetchLinks: [
      "development.uid",
      "development.name",
      "development.property_types",
      "development.prices_from",
      "development.location_town",
      "development.location_city",
      "development.listing_images",
    ],
  });

  // Preprocess slices to detect consecutive BlockContent slices
  const enhancedSlices = homePage.data.slices2.map((slice, index, slices) => {
    const isConsecutive =
      slice.slice_type === "block_content" &&
      slices[index - 1]?.slice_type === "block_content";

    return { ...slice, isConsecutive };
  });

  return (
    <Layout navigation={navigation} settings={settings}>
      {/* Animated client-rendered banner for users */}
      <HomePageBanner
        singleHomePage={homePage}
        banners={homePage.data.home_page_banner_images}
      />
      <SliceZone
        slices={enhancedSlices}
        components={{
          ...components,
          block_content: (props) => (
            <components.block_content
              {...props}
              isConsecutive={props.slice.isConsecutive}
            />
          ),
        }}
      />
    </Layout>
  );
}
