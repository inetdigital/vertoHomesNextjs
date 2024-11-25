import { PrismicNextLink } from "@prismicio/next";

export const MultiSubMenu = ({ navItems, openSubMenuIndex, developments }) => {
  console.log(developments);
  return (
    <div className="pt-24 pb-32 w-full">
      <div className="grid grid-cols-2 gap-12">
        {navItems[openSubMenuIndex].primary.sub_menus_group.map(
          (item, index) => {
            return (
              <div key={index}>
                <h3 className="flex items-center">
                  {item.sub_menu_item_in_group.uid === "for-sale-sub-menu" && (
                    <span className="mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                      </svg>
                    </span>
                  )}

                  {item.sub_menu_item_in_group.uid === "coming-soon-menu" && (
                    <span className="mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                        />
                      </svg>
                    </span>
                  )}

                  {item?.sub_menu_item_in_group?.data?.sub_menu_header}
                </h3>
                <hr className="border-t border-gray-300 my-8" />
                <div className="grid grid-cols-2 gap-4">
                  {item.sub_menu_item_in_group.uid === "for-sale-sub-menu" && (
                    <ForSaleSubMenuWrapper item={item} />
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

const ForSaleSubMenuWrapper = ({ item }) => {
  return (
    <>
      {item.sub_menu_item_in_group.data.slices.map((item, index) => {
        return (
          <div key={index}>
            {item.primary.show_developments_of_status.uid === "available" && (
              <ForSaleHomesPanel />
            )}
          </div>
        );
      })}
    </>
  );
};

const ForSaleHomesPanel = () => {
  return <div>FOR SALE PANEL</div>;
};

const DevelopmentThumbnail = ({ item }) => {
  return (
    <div
      className="relative w-full h-[260px] cursor-pointer group" // Add group class here
    >
      {/* Image as Background */}
      <PrismicNextLink
        field={item.primary.development}
        className="relative w-full h-full block"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out"
          style={{
            backgroundImage: `url(${item.primary.development.data.banner_image.url})`, // Setting the background image
            backgroundPosition: "center", // Ensures the image is centered
            backgroundSize: "cover", // Ensures the image covers the entire container
          }}
        />
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 border-0 border-solid border-vertoDarkBlue transition-all duration-500 ease-in-out group-hover:opacity-75 group-hover:border-8"></div>

        {/* Link Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 transition-all duration-500 ease-in-out group-hover:translate-y-[-10px]">
          <p className="text-2xl font-medium">
            {item.primary.development.data.name}
          </p>

          {/* Caption (Fades in on hover) */}
          <div className="opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
            <p className="mt-2 text-sm flex items-center">
              <span className="mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </span>
              {item.primary.development.data.location_town},{" "}
              {item.primary.development.data.location_city}
            </p>
          </div>
        </div>
      </PrismicNextLink>
    </div>
  );
};
