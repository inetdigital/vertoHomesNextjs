const fs = require("fs");
const path = require("path");
const prismic = require("@prismicio/client");

// List of Prismic custom types to include in the sitemap
const prismicTypes = ["page", "article", "development", "property"];

async function getPrismicPages() {
  const client = prismic.createClient("verto-homes"); // Replace with your Prismic repo name
  let allPages = [];

  for (const type of prismicTypes) {
    const documents = await client.getAllByType(type);
    const urls = documents.map((doc) => `/${type}/${doc.uid}`); // Adjust URL structure if needed
    allPages = [...allPages, ...urls];
  }

  return allPages;
}

async function generateSitemapData() {
  const prismicPages = await getPrismicPages();
  const filePath = path.join(__dirname, "../public/prismic-pages.json");

  fs.writeFileSync(filePath, JSON.stringify(prismicPages, null, 2));
  console.log("✅ Prismic pages sitemap data saved!");
}

generateSitemapData().catch((err) => {
  console.error("❌ Error generating Prismic sitemap data:", err);
  process.exit(1);
});
