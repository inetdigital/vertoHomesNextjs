// lib/fetchNavigation.js

export const fetchNavigation = async (client) => {
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
                  uid
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

  return navigation;
};
