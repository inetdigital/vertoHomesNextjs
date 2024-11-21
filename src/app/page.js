import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import Image from "next/image";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { components } from "@/slices";

import { Layout } from "@/components/Layout";
import HomePageBanner from "@/components/HomePageBanner";

import { fetchNavigation } from "@/lib/fetchNavigation";

export async function generateMetadata() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: prismic.asText(settings.data.name),
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
