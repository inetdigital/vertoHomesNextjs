import "../styles/globals.css";

import { Montserrat } from "next/font/google";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import { SearchTabProvider } from "@/context/SearchTabContext";
import { SearchOptionsProvider } from "@/context/SearchOptions";
import { LocationsProvider } from "@/context/TaxonomyLocations";
import { DevelopmentsProvider } from "@/context/AllDevelopments";
import { MenuStatusProvider } from "@/context/MenuStatus";
import { StatusProvider } from "@/context/TaxonomyStatus";
import { StatusSelectedProvider } from "@/context/StatusSelected";
import { PriceRangeProvider } from "@/context/TaxonomyPriceRange";
import { RoomsProvider } from "@/context/TaxonomyRooms";

import BodyClassManager from "@/components/BodyClassManager";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Include any weights you need
  variable: "--font-montserrat", // Use a custom CSS variable to reference the font
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} font-sans`}>
      <head>{/* Adobe Fonts link */}</head>
      <body className="overflow-x-hidden antialiased">
        <SearchTabProvider>
          <SearchOptionsProvider>
            <LocationsProvider>
              <DevelopmentsProvider>
                <MenuStatusProvider>
                  <StatusProvider>
                    <StatusSelectedProvider>
                      <PriceRangeProvider>
                        <RoomsProvider>
                          <BodyClassManager />
                          <main>
                            {children}
                            <PrismicPreview repositoryName={repositoryName} />
                          </main>
                        </RoomsProvider>
                      </PriceRangeProvider>
                    </StatusSelectedProvider>
                  </StatusProvider>
                </MenuStatusProvider>
              </DevelopmentsProvider>
            </LocationsProvider>
          </SearchOptionsProvider>
        </SearchTabProvider>
      </body>
    </html>
  );
}
