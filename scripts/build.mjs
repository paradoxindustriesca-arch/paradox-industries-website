import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(".");
const dist = resolve(root, "dist");
const assetDir = resolve(dist, "assets");

if (!existsSync(dist)) {
  mkdirSync(dist, { recursive: true });
}

if (!existsSync(assetDir)) {
  mkdirSync(assetDir, { recursive: true });
}

cpSync(resolve(root, "src", "main.js"), resolve(assetDir, "main.js"));
cpSync(resolve(root, "src", "robots.txt"), resolve(dist, "robots.txt"));
cpSync(resolve(root, "src", "sitemap.xml"), resolve(dist, "sitemap.xml"));

const html = readFileSync(resolve(root, "index.html"), "utf8");
writeFileSync(resolve(dist, "index.html"), html);
