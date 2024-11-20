import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Layout } from "@/components/Layout";

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
  const settings = await client.getSingle("settings");

  return (
    <Layout navigation={navigation} settings={settings}>
      A PAGE
      <SliceZone slices={page.data.slices} components={components} />
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
