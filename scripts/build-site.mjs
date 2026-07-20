import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "dist");

// 公開に必要なファイルだけを選び、PDF・開発サーバー・編集用ファイルを配信対象から外す。
const publicEntries = [
  "404.html",
  "assets",
  "company",
  "favicon.ico",
  "icon.png",
  "img",
  "index.html",
  "news",
  "privacy",
  "robots.txt",
  "script.js",
  "service",
  "site-policy",
  "sitemap.xml",
  "styles.css"
];

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const entry of publicEntries) {
  await cp(path.join(projectRoot, entry), path.join(outputRoot, entry), {
    recursive: true
  });
}

console.log(`Built ${publicEntries.length} public entries in ${outputRoot}`);
