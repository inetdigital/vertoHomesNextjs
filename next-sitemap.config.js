const fs = require("fs");
const path = require("path");

const prismicPagesFile = path.join(__dirname, "public/prismic-pages.json");
let prismicPages = [];

if (fs.existsSync(prismicPagesFile)) {
  prismicPages = JSON.parse(fs.readFileSync(prismicPagesFile, "utf-8"));
}

module.exports = {
  siteUrl: "https://www.vertohomes.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/preview", "/admin"],
  changefreq: "daily",
  priority: 0.7,
  additionalPaths: async () => {
    return [
      ...prismicPages.map((url) => ({
        loc: url,
        lastmod: new Date().toISOString(),
      })),
      {
        loc: "/find-your-new-home",
        lastmod: new Date().toISOString(),
      },
    ];
  },
};
