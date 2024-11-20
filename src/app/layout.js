import "../styles/globals.css";

import { Montserrat } from "next/font/google";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Include any weights you need
  variable: "--font-montserrat", // Use a custom CSS variable to reference the font
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} font-sans`}>
      <head>
        {/* Adobe Fonts link */}
        <link rel="stylesheet" href="https://use.typekit.net/xno3cen.css" />
      </head>
      <body className="overflow-x-hidden antialiased">
        <main>
          {children}
          <PrismicPreview repositoryName={repositoryName} />
        </main>
      </body>
    </html>
  );
}
