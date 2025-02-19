import { Header } from "./Header";
import { Footer } from "./Footer";

import HubSpotFormOverlay from "@/components/ui/HubSpotFormOverlay";

export async function Layout({ navigation, settings, pageId, children }) {
  const serializedNavigation = JSON.parse(JSON.stringify(navigation));
  return (
    <div id={pageId ? pageId : "content"}>
      <HubSpotFormOverlay
        portalId={process.env.HUBSPOT_PORTAL_ID}
        formId="aceed824-92de-40a5-9021-08953b22be3a"
      />
      <Header navigation={navigation} settings={settings} />
      <main className="overflow-x-hidden">{children}</main>
      <Footer navigation={serializedNavigation} />
    </div>
  );
}
