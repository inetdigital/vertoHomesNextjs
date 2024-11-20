import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import Image from "next/image";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { components } from "@/slices";

import { Layout } from "@/components/Layout";

import HomePageBanner from "@/components/HomePageBanner";

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
  const navigation = await client.getSingle("navigation", {
    graphQuery: `
    {
      navigation {
        ...navigationFields
        slices {
          ...on menu_item {
            variation {
              ...on default {
                primary {
                  ...primaryFields
                }
              }
              ...on menuItemWithSubMenu {
                primary {
                  link_label
                  standard_sub_menu {
                    ...standard_sub_menuFields
                    slices {
                      ...on sub_menu_item {
                        variation {
                          ...on default {
                            primary {
                              ...primaryFields
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              ...on withMultipleSubMenus {
                primary {
                  link_label
                  sub_menus_group {
                    sub_menu_item_in_group {
                      ...sub_menu_item_in_groupFields
                      slices {
                      ...on sub_menu_item {
                        variation {
                          ...on withDevelopmentReference {
                            primary {
                              ...primaryFields
                              development {
                                ...on development {
                                  name
                                  uid
                                  banner_image
                                  location_town
                                  location_city
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
  });

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
      {/* Static fallback content for SEO */}
      <div className="absolute w-full h-screen overflow-hidden invisible">
        <Image
          src={homePage.data.home_page_banner_images[0].image.url}
          alt={
            homePage.data.home_page_banner_images[0].image.alt || "Verto Homes"
          }
          width={100}
          height={100}
          quality={1}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white p-4 bg-black bg-opacity-50">
          <PrismicRichText
            field={homePage.data.home_page_banner_images[0].banner_content}
          />
        </div>
      </div>
      {/* Animated client-rendered banner for users */}
      <HomePageBanner banners={homePage.data.home_page_banner_images} />
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
