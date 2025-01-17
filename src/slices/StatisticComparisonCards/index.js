"use client";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage } from "@prismicio/next";

import { useSettings } from "@/context/Settings";

const EnergyComparison = ({ slice }) => {
  const backgroundColorClass =
    {
      VertoBlue: "vertoDarkBlue",
      VertoGreen: "vertoDarkGreen",
    }[slice.primary.theme_color] || "vertoDarkBlue";

  const titleTextColorClass =
    {
      VertoBlue: "vertoLightBlue",
      VertoGreen: "white",
    }[slice.primary.theme_color] || "white";
  return (
    <Bounded as="section" paddingAs="fullWidthBlock">
      <div className={`bg-${backgroundColorClass} py-36`}>
        <div className="max-w-7xl mx-auto px-6">
          <div>
            {slice.primary?.title && (
              <h2
                className={`text-${titleTextColorClass} tracking-wide mb-16 text-4xl`}
              >
                {slice.primary.title}
              </h2>
            )}
          </div>
          {slice.variation === "default" && <StatsCards slice={slice} />}
          {slice.variation === "withGlobalStatistics" && (
            <GlobalStats slice={slice} />
          )}
          {slice.variation === "asStatisticsGrid" && (
            <StatsGrid slice={slice} />
          )}
        </div>
      </div>
    </Bounded>
  );
};

const StatsGrid = ({ slice }) => {
  const borderColorClass =
    {
      VertoBlue: "vertoLightBlue",
      VertoGreen: "vertoLightGreen",
    }[slice.primary.theme_color] || "vertoLightBlue";

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 text-white">
      {slice.primary.statistic.map((stat, index) => (
        <div
          key={index}
          className={`border-t-4 border-${borderColorClass} pt-6`}
        >
          <p className="font-semibold flex items-center mb-4 text-white text-2xl">
            <span className="mr-4">
              <PrismicNextImage field={stat.icon} fallbackAlt="Verto Homes" />
            </span>
            {stat.value}
          </p>
          <p className="text-base text-white">{stat.caption}</p>
        </div>
      ))}
    </div>
  );
};

const GlobalStats = ({ slice }) => {
  const settings = useSettings();
  const stats = [
    {
      icon: <HouseIcon />,
      value: settings[0]?.data?.homes_completed,
      label: "homes completed",
    },
    {
      icon: <ComingSoonIcon />,
      value: settings[0]?.data?.homes_coming_soon,
      label: "homes coming soon",
    },
    {
      icon: <CarbonIcon />,
      value: `${settings[0]?.data?.co2_produced_by_each_home} Tonnes`,
      label: "of CO2 produced by each home (the average home emits 6 tonnes)",
    },
    {
      icon: <EpcIcon />,
      value: settings[0]?.data?.highest_epc_rating,
      label: "highest EPC rating",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 text-white">
        {stats.map((stat, index) => (
          <div key={index} className="border-t-4 border-vertoLightBlue pt-6">
            <p className="font-semibold flex items-center mb-4 text-white">
              {stat.icon} {stat.value}
            </p>
            <p className="text-base text-white">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-24">
        <PrismicNextImage
          field={slice.primary.image}
          fallbackAlt="Verto Homes"
          loading="lazy"
        />
      </div>
    </div>
  );
};

const HouseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8 mr-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );
};

const ComingSoonIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8 mr-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

const CarbonIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8 mr-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
      />
    </svg>
  );
};

const EpcIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8 mr-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
      />
    </svg>
  );
};

const StatsCards = ({ slice }) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-0 lg:gap-x-16 gap-y-16 lg:gap-y-0">
        <div className="text-white">
          <PrismicRichText
            field={slice.primary.content}
            components={{
              paragraph: ({ children }) => (
                <p className="text-white">{children}</p>
              ),
            }}
          />
        </div>
        <div className="grid gap-12">
          {slice.primary?.cards?.length > 0 && (
            <>
              {slice.primary.cards.map((item, index) => {
                return (
                  <div key={index} className="bg-white p-6 rounded-lg relative">
                    <div
                      style={{ backgroundColor: item.highlight_color }}
                      className="absolute left-0 top-0 -translate-y-1/4 -translate-x-3 px-4 py-4 rounded-lg text-white"
                    >
                      <span className="text-base md:text-xl lg:text-2xl font-medium tracking-wide">
                        {item.statistic}
                      </span>
                    </div>
                    <div className="flex items-center pt-12 pb-8">
                      <div>
                        <PrismicNextImage
                          field={item.icon}
                          fallbackAlt="Verto Homes"
                        />
                      </div>
                      <div className="px-8">
                        <PrismicRichText
                          field={item.content}
                          components={{
                            paragraph: ({ children }) => (
                              <p className="text-xl lg:text-2xl">{children}</p>
                            ),
                            heading6: ({ children }) => (
                              <p className="text-base lg:text-md mt-6 font-extralight">
                                {children}
                              </p>
                            ),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EnergyComparison;
