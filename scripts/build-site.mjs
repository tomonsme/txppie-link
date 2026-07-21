import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "dist");
const publicEntries = [
  "404.html",
  "assets",
  "favicon.ico",
  "icon.png",
  "robots.txt",
  "sitemap.xml"
];

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

let html = await readFile(path.join(projectRoot, "index.html"), "utf8");
for (const [asset, revisionedName] of revisions) {
  html = html.replace(`./${asset}`, `./${revisionedName}`);
}
await writeFile(path.join(outputRoot, "index.html"), html);

console.log(`Built ${publicEntries.length + assets.length + 1} public entries in ${outputRoot}`);
