import { PrismicNextLink } from "@prismicio/next";

export const ThreeColumnSubMenu = ({ navItems, openSubMenuIndex }) => {
  const subMenus = navItems[openSubMenuIndex]?.primary?.sub_menus_group || [];
  return (
    <div className="pt-12 lg:pt-12 xl:pt-24 pb-32 w-full">
      <div className="grid grid-cols-4 gap-12">
        {subMenus.map((item, index) => {
          return (
            <div key={index}>
              <h3 className="flex items-center">
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
