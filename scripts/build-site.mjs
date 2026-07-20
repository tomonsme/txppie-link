import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
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

// 英語版を公開するまでは、旧サイトへ戻る暫定リンクを公開物へ含めない。
async function removeLegacyEnglishLinks(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await removeLegacyEnglishLinks(target);
    } else if (entry.name.endsWith(".html")) {
      const html = await readFile(target, "utf8");
      const cleaned = html
        .replaceAll('href="/styles.css"', 'href="/styles.css?v=20260720-compact-footer"')
        .replaceAll('<a href="https://txp.co.jp/en/" lang="en">English</a>', "")
        .replace(/<a href="\/company\/"[^>]*><span>03<\/span> 私たちについて<\/a>/g, "")
        .replaceAll("© 2025 TxPPIE株式会社. All rights reserved.", "© 2026 TxPPIE株式会社. All rights reserved.");
      if (cleaned !== html) await writeFile(target, cleaned);
    }
  }
}

await removeLegacyEnglishLinks(outputRoot);

console.log(`Built ${publicEntries.length} public entries in ${outputRoot}`);
