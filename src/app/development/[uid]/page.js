import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Layout } from "@/components/Layout";
import { BannerImage } from "@/components/BannerImage";
import { HeadingDetails } from "@/components/development-page/HeadingDetails";
import { FooterContact } from "@/components/FooterContact";

import { fetchNavigation } from "@/lib/fetchNavigation";

export async function generateMetadata({ params }) {
  const { uid } = await params;
  const client = createClient();
  const settings = await client.getSingle("settings");
  const page = await client
    .getByUID("development", uid)
    .catch(() => notFound());

  return {
    title: `${page.data.name} | ${prismic.asText(settings.data.name)}`,
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

export default async function Development({ params }) {
  const { uid } = await params;
  const client = createClient();

  const page = await client
    .getByUID("development", uid)
    .catch(() => notFound());
  const navigation = await fetchNavigation(client);
  const settings = await client.getSingle("settings");
  return (
    <Layout navigation={navigation} settings={settings}>
      {prismic.isFilled.image(page.data.banner_image) && (
        <BannerImage
          image={page.data.banner_image}
          title={page.data.name}
          caption={page.data.banner_caption}
          status={page.data.development_status}
        />
      )}
      <HeadingDetails page={page} />
      <SliceZone slices={page.data.slices4} components={components} />
      <FooterContact page={page} themeColor="vertoDarkGreen" />
    </Layout>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("development");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
