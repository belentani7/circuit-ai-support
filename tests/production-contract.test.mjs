import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL("../" + file, import.meta.url), "utf8");

test("production launch is portable across Windows and POSIX", () => {
  const manifest = JSON.parse(read("package.json"));
  assert.equal(manifest.scripts.start, "node dist/index.js");
  const server = read("server/index.ts");
  assert.match(server, /path\.resolve\(__dirname, "public"\)/);
  assert.doesNotMatch(server, /process\.env\.NODE_ENV/);
});

test("the frontend build and bundled server share the same production output tree", () => {
  const manifest = JSON.parse(read("package.json"));
  const vite = read("vite.config.ts");
  const server = read("server/index.ts");
  assert.match(manifest.scripts.build, /vite build/);
  assert.match(manifest.scripts.build, /--outdir=dist/);
  assert.match(vite, /"dist", "public"/);
  assert.match(server, /express\.static\(staticPath\)/);
  assert.match(server, /securityHeaders/);
  assert.match(server, /app\.disable\("x-powered-by"\)/);
});
