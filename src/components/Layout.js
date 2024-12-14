import { Header } from "./Header";
import { Footer } from "./Footer";

export async function Layout({ navigation, settings, children }) {
  const serializedNavigation = JSON.parse(JSON.stringify(navigation));
  return (
    <div>
      <Header navigation={navigation} settings={settings} />
      <main className="overflow-x-hidden">{children}</main>
      <Footer navigation={serializedNavigation} />
    </div>
  );
}
