import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function assertNoDebugCollector(publicDir) {
  const indexPath = path.join(publicDir, "index.html");
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Missing production entry point: ${indexPath}`);
  }

  // Vite moves source references into hashed JS chunks; index.html alone is
  // insufficient to prove that a debug/session collector was not shipped.
  const blocked = /debug-collector\\.js|manus-debug-collector|__MANUS_DEBUG_COLLECTOR__/i;
  const inspect = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) {
        throw new Error(`Unexpected symlink in production assets: ${absolute}`);
      }
      if (entry.isDirectory()) {
        inspect(absolute);
      } else if (entry.isFile()) {
        if (blocked.test(entry.name)) {
          throw new Error(`Debug collector file copied into production assets: ${absolute}`);
        }
        if (/\\.(html?|m?js|css)$/i.test(entry.name) && blocked.test(fs.readFileSync(absolute, "utf8"))) {
          throw new Error(`Debug collector reference in production assets: ${absolute}`);
        }
      }
    }
  };
  inspect(publicDir);
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
