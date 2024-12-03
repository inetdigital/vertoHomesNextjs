import { PrismicNextLink } from "@prismicio/next";

export const ThreeColumnSubMenu = ({ navItems, openSubMenuIndex }) => {
  const subMenus = navItems[openSubMenuIndex]?.primary?.sub_menus_group || [];
  return (
    <div className="pt-12 lg:pt-12 xl:pt-24 pb-32 w-full">
      <div className="grid grid-cols-3 gap-12">
        {subMenus.map((item, index) => {
          return (
            <div key={index}>
              <h3 className="flex items-center">
                {item.sub_menu_item_in_group.data.uid ===
                  "buying-with-us-menu" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 mr-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {item.sub_menu_item_in_group.data.uid === "news-menu" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 mr-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
                      clipRule="evenodd"
                    />
                    <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
                  </svg>
                )}
                {item.sub_menu_item_in_group.data.uid ===
                  "our-company-menu" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 mr-4"
                  >
                    <path d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 0 0-3-3h-3.879a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H6a3 3 0 0 0-3 3v3.162A3.756 3.756 0 0 1 4.094 9h15.812ZM4.094 10.5a2.25 2.25 0 0 0-2.227 2.568l.857 6A2.25 2.25 0 0 0 4.951 21H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-2.227-2.568H4.094Z" />
                  </svg>
                )}
                {item.sub_menu_item_in_group.data.sub_menu_header}
              </h3>
              <hr className="border-t border-gray-300 my-8" />
              <ul>
                {item.sub_menu_item_in_group.data.slices[0].primary.links.map(
                  (item, index) => {
                    return (
                      <li
                        key={index}
                        className="flex items-center mb-2 text-vertoDarkBlue transition-all duration-300 ease-in-out group"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-3 -translate-x-[5px] opacity-0 group-hover:opacity-100 group-hover:translate-x-[0px] transition-all duration-300 ease-in-out"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <PrismicNextLink
                          field={item.link}
                          className="-translate-x-[12px] group-hover:translate-x-[2px] transition-all duration-300 ease-in-out"
                        />
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
