import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Layout } from "@/components/Layout";
import { HeadingDetails } from "@/components/property/HeadingDetails";
import { BannerImage } from "@/components/BannerImage";
import { FooterContact } from "@/components/FooterContact";

import { fetchNavigation } from "@/lib/fetchNavigation";

export async function generateMetadata({ params }) {
  const { uid } = await params;
  const client = createClient();
  const settings = await client.getSingle("settings");
  const page = await client.getByUID("property", uid).catch(() => notFound());

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

export default async function Property({ params }) {
  const { uid } = await params;
  const client = createClient();

  const page = await client
    .getByUID("property", uid, {
      fetchLinks: [
        "development.uid",
        "development.name",
        "development.site_plan",
        "development.brochure",
        "type.uid",
        "taxonomy_house_type.name",
        "taxonomy_number_of_bedrooms.number_of_bedrooms",
      ],
    })
    .catch(() => notFound());

  const navigation = await fetchNavigation(client);
  const settings = await client.getSingle("settings");
  return (
    <Layout navigation={navigation} settings={settings} pageId="property">
      {prismic.isFilled.image(page.data.banner_image) && (
        <BannerImage
          image={page.data.banner_image}
          title={page.data.title}
          caption={page.data.banner_caption}
          status={page.data.development_status}
        />
      )}
      <HeadingDetails page={page} />
      <SliceZone slices={page.data.slices5} components={components} />
      <FooterContact
        themeColor="vertoDarkBlue"
        highlightColor="vertoLightBlue"
        marginTop="24"
        page={page}
        property={true}
      />
    </Layout>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("property");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
