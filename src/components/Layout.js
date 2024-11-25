import { Header } from "./Header";
import { Footer } from "./Footer";

import { createClient } from "@/prismicio";

export async function Layout({ navigation, settings, children }) {
  const client = createClient();
  const serializedNavigation = JSON.parse(JSON.stringify(navigation));
  const developments = await client.getAllByType("development");
  return (
    <div>
      <Header
        navigation={navigation}
        developments={developments}
        settings={settings}
      />
      <main>{children}</main>
      <Footer navigation={serializedNavigation} />
      <div className="fixed w-[50px] h-[50px] bg-black text-white flex items-center justify-center right-10 bottom-10">
        {/* Below 'sm' (Mobile) */}
        <div className="block sm:hidden">M</div>
        {/* Small (sm) */}
        <div className="hidden sm:block md:hidden">sm</div>
        {/* Medium (md) */}
        <div className="hidden md:block lg:hidden">md</div>
        {/* Large (lg) */}
        <div className="hidden lg:block xl:hidden">lg</div>
        {/* Extra Large (xl) */}
        <div className="hidden xl:block 2xl:hidden">xl</div>
        {/* 2XL */}
        <div className="hidden 2xl:block">2xl</div>
      </div>
    </div>
  );
}
