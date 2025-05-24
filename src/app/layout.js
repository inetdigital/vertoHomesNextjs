"use client";

import "../styles/globals.css";

import { Montserrat } from "next/font/google";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import { SearchTabProvider } from "@/context/SearchTabContext";
import { SearchOptionsProvider } from "@/context/SearchOptions";
import { LocationsProvider } from "@/context/TaxonomyLocations";
import { DevelopmentsProvider } from "@/context/AllDevelopments";
import { PropertiesProvider } from "@/context/AllProperties";
import { MenuStatusProvider } from "@/context/MenuStatus";
import { StatusProvider } from "@/context/TaxonomyStatus";
import { StatusSelectedProvider } from "@/context/StatusSelected";
import { PriceRangeProvider } from "@/context/TaxonomyPriceRange";
import { RoomsProvider } from "@/context/TaxonomyRooms";
import { HouseTypesProvider } from "@/context/TaxonomyHouseType";
import { SettingsProvider } from "@/context/Settings";
import { ArticlesProvider } from "@/context/AllArticles";
import { TaxonomyArticlesProvider } from "@/context/TaxonomyArticles";
import { PressProvider } from "@/context/AllPress";
import { HubspotMainFormProvider } from "@/context/HubspotMainFormContext";

import BodyClassManager from "@/components/BodyClassManager";

import { SpeedInsights } from "@vercel/speed-insights/next";

import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Include any weights you need
  variable: "--font-montserrat", // Use a custom CSS variable to reference the font
});

export default function RootLayout({ children }) {
  const value = Math.random();
  console.log("Random value for loading state:", value);
  const loading = value < 0.5;
  console.log("Loading state:", loading);
  if (loading) {
    return (
      <html lang="en" className={`${montserrat.variable} font-sans`}>
        <head>{/* Adobe Fonts link */}</head>
        <body className="overflow-x-hidden antialiased">
          <div className="flex justify-center items-center h-screen"></div>
        </body>
      </html>
    );
  }
  return (
    <html lang="en" className={`${montserrat.variable} font-sans`}>
      <head>{/* Adobe Fonts link */}</head>
      <>
        {/* Load Google Tag Manager script asynchronously */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-H9R4TQWC7K"
        />

        <Script
          id="hubspot-tracking-script"
          src="//js-eu1.hs-scripts.com/144659623.js"
          strategy="afterInteractive"
        />

        <Script
          id="hubspot-forms-embed-script"
          src="https://js-eu1.hsforms.net/forms/embed/v2.js"
          strategy="afterInteractive"
        />

        {/* Google Analytics configuration */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-H9R4TQWC7K');
        `}
        </Script>
      </>
      <body className="overflow-x-hidden antialiased">
        <SearchTabProvider>
          <SearchOptionsProvider>
            <LocationsProvider>
              <DevelopmentsProvider>
                <PropertiesProvider>
                  <MenuStatusProvider>
                    <StatusProvider>
                      <StatusSelectedProvider>
                        <PriceRangeProvider>
                          <RoomsProvider>
                            <HouseTypesProvider>
                              <TaxonomyArticlesProvider>
                                <SettingsProvider>
                                  <ArticlesProvider>
                                    <PressProvider>
                                      <HubspotMainFormProvider>
                                        <BodyClassManager />

                                        <main>
                                          {!loading && children}
                                          <PrismicPreview
                                            repositoryName={repositoryName}
                                          />
                                          <SpeedInsights />
                                        </main>
                                      </HubspotMainFormProvider>
                                    </PressProvider>
                                  </ArticlesProvider>
                                </SettingsProvider>
                              </TaxonomyArticlesProvider>
                            </HouseTypesProvider>
                          </RoomsProvider>
                        </PriceRangeProvider>
                      </StatusSelectedProvider>
                    </StatusProvider>
                  </MenuStatusProvider>
                </PropertiesProvider>
              </DevelopmentsProvider>
            </LocationsProvider>
          </SearchOptionsProvider>
        </SearchTabProvider>
      </body>
    </html>
  );
}
