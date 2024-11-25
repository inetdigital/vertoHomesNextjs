import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";

import { Layout } from "@/components/Layout";
import { Bounded } from "@/components/Bounded";
import { Search } from "@/components/ui/Search";
import { SearchTabs } from "@/components/SearchTabs";
import { SearchResults } from "@/components/SearchResults";

import { fetchNavigation } from "@/lib/fetchNavigation";

export async function generateMetadata() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const page = await client.getSingle("search");

  return {
    title: `${page.data.title} | ${prismic.asText(settings.data.name)}`,
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

export default async function SearchPage() {
  const client = createClient();

  const page = await client.getSingle("search");
  const navigation = await fetchNavigation(client);
  const settings = await client.getSingle("settings");

  const developments = await client.getAllByType("development");
  const properties = await client.getAllByType("property");
  const locations = await client.getAllByType("taxonomy_location");
  const statuses = await client.getAllByType("taxonomy_status");
  const price_range = await client.getAllByType("taxonomy_price_range");
  const number_of_rooms = await client.getAllByType(
    "taxonomy_number_of_bedrooms"
  );

  return (
    <Layout navigation={navigation} settings={settings}>
      <div className="bg-vertoDarkGreen">
        <Bounded
          as="section"
          size="widest"
          paddingAs="searchHeader"
          className="text-center"
        >
          {page.data.title_lead && (
            <p className="uppercase text-vertoLightGreen tracking-wide font-medium text-xl">
              {page.data.title_lead}
            </p>
          )}

          {page.data.title && (
            <>
              <h2 className="uppercase text-white tracking-widest">
                {page.data.title}
              </h2>
              <div className="bg-vertoLightGreen w-[100px] h-[2px] mx-auto my-8" />
            </>
          )}
          <Search
            locations={locations}
            statuses={statuses}
            price_range={price_range}
            number_of_rooms={number_of_rooms}
          />
          <SearchTabs />
        </Bounded>
      </div>
      <Bounded as="section" size="widest" paddingAs="tight">
        <SearchResults
          locations={locations}
          developments={developments}
          properties={properties}
        />
      </Bounded>
    </Layout>
  );
}
