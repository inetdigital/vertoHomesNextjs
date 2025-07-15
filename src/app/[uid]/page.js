import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Layout } from "@/components/Layout";

import { BannerImage } from "@/components/BannerImage";
import { BannerBlockColor } from "@/components/BannerBlockColor";

import { fetchNavigation } from "@/lib/fetchNavigation";

export async function generateMetadata({ params }) {
  const { uid } = await params;
  const client = createClient();
  const settings = await client.getSingle("settings");
  const page = await client.getByUID("page", uid).catch(() => notFound());

  return {
    title: `${prismic.asText(page.data.title)} | ${prismic.asText(
      settings.data.name
    )}`,
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

export default async function Page({ params }) {
  const { uid } = await params;
  const client = createClient();

  const page = await client.getByUID("page", uid).catch(() => notFound());
  const navigation = await fetchNavigation(client);
  const settings = await client.getSingle("settings");

  const enhancedSlices = page.data.slices.map((slice, index, slices) => {
    const isConsecutive =
      slice.slice_type === "block_content" &&
      slices[index - 1]?.slice_type === "block_content";

    return { ...slice, isConsecutive };
  });

  // Check if the last slice has `primary.background_color` set to white
  const lastSlice = enhancedSlices[enhancedSlices.length - 1];
  const shouldAddMargin =
    !lastSlice?.primary?.background_color ||
    lastSlice.primary.background_color === "White";

  return (
    <Layout navigation={navigation} settings={settings}>
      {(page.data.banner_block_color === null ||
        page.data.banner_block_color === "None") && (
        <BannerImage
          image={page.data.banner_image}
          title={page.data.title}
          themeColor="vertoLightBlue"
          caption={page.data.banner_caption}
          status={null}
          data={page.data}
        />
      )}

      {page.data.banner_block_color &&
        page.data.banner_block_color !== "None" && (
          <BannerBlockColor
            theme={page.data.banner_block_color}
            title={page.data.title}
            caption={page.data.banner_caption}
          />
        )}

      <div className={`${shouldAddMargin ? "mb-28" : "mb-0"}`}>
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
      </div>
    </Layout>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("page");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
