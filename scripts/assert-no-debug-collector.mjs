import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function assertNoDebugCollector(publicDir) {
  const indexPath = path.join(publicDir, "index.html");
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Missing production entry point: ${indexPath}`);
  }

  const collectorPath = path.join(publicDir, "__manus__", "debug-collector.js");
  if (fs.existsSync(collectorPath)) {
    throw new Error(`Debug collector was copied into production assets: ${collectorPath}`);
  }

  const html = fs.readFileSync(indexPath, "utf8");
  if (html.includes("debug-collector.js") || html.includes("manus-debug-collector")) {
    throw new Error(`Production entry point references the debug collector: ${indexPath}`);
  }

  return true;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    assertNoDebugCollector(path.resolve(process.argv[2] || "dist/public"));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
