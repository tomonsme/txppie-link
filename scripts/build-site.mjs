import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "dist");
const publicEntries = [
  "assets",
  "favicon.ico",
  "icon.png"
];
const htmlEntries = [
  "404.html",
  "index.html",
  "members/seiya-hifumi.html",
  "members/shuhei-yamazaki.html",
  "members/tomoya-miyake.html"
];
const indexedHtmlEntries = htmlEntries.filter((entry) => entry !== "404.html");
const siteUrl = (process.env.SITE_URL || process.env.URL || "").trim().replace(/\/+$/, "");

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const entry of publicEntries) {
  await cp(path.join(projectRoot, entry), path.join(outputRoot, entry), { recursive: true });
}

const assets = ["styles.css", "script.js"];
const revisions = new Map();

for (const asset of assets) {
  const contents = await readFile(path.join(projectRoot, asset));
  const extension = path.extname(asset);
  const basename = path.basename(asset, extension);
  const hash = createHash("sha256").update(contents).digest("hex").slice(0, 10);
  const revisionedName = `${basename}.${hash}${extension}`;
  revisions.set(asset, revisionedName);
  await writeFile(path.join(outputRoot, revisionedName), contents);
}

for (const entry of htmlEntries) {
  let html = await readFile(path.join(projectRoot, entry), "utf8");
  for (const [asset, revisionedName] of revisions) {
    html = html
      .replaceAll(`./${asset}`, `./${revisionedName}`)
      .replaceAll(`../${asset}`, `../${revisionedName}`)
      .replaceAll(`/${asset}`, `/${revisionedName}`);
  }
  if (siteUrl && entry !== "404.html") {
    const pagePath = entry === "index.html" ? "/" : `/${entry}`;
    const pageUrl = `${siteUrl}${pagePath}`;
    html = html.replace(
      "</head>",
      `    <link rel="canonical" href="${pageUrl}" />\n    <meta property="og:url" content="${pageUrl}" />\n  </head>`
    );
    if (entry === "index.html") {
      html = html.replace('content="./assets/og-txppie.png"', `content="${siteUrl}/assets/og-txppie.png"`);
    }
  }
  const destination = path.join(outputRoot, entry);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html);
}

const sitemapUrls = siteUrl
  ? indexedHtmlEntries.map((entry) => {
      const pagePath = entry === "index.html" ? "/" : `/${entry}`;
      return `  <url><loc>${siteUrl}${pagePath}</loc></url>`;
    })
  : [];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join("\n")}
</urlset>
`;
const robots = `User-agent: *
Allow: /
${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ""}`;

await writeFile(path.join(outputRoot, "sitemap.xml"), sitemap);
await writeFile(path.join(outputRoot, "robots.txt"), robots);

if (!siteUrl) {
  console.warn("SITE_URL is not set; sitemap URLs and canonical tags were omitted.");
}

console.log(`Built ${publicEntries.length + assets.length + htmlEntries.length + 2} public entries in ${outputRoot}`);
