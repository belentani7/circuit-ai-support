import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { assertNoDebugCollector } from "../scripts/assert-no-debug-collector.mjs";

function createPublicDir(t, { html = "", collector = false } = {}) {
  const root = mkdtempSync(path.join(os.tmpdir(), "circuit-public-"));
  const publicDir = path.join(root, "public");
  mkdirSync(publicDir, { recursive: true });
  writeFileSync(path.join(publicDir, "index.html"), html);

  if (collector) {
    const collectorPath = path.join(publicDir, "__manus__", "debug-collector.js");
    mkdirSync(path.dirname(collectorPath), { recursive: true });
    writeFileSync(collectorPath, "window.collector = true;");
  }

  t.after(() => rmSync(root, { recursive: true, force: true }));
  return publicDir;
}

test("rejects a debug collector copied into public build assets", (t) => {
  const publicDir = createPublicDir(t, { collector: true });
  assert.throws(() => assertNoDebugCollector(publicDir), /debug collector/i);
});

test("rejects a production entry point that loads the debug collector", (t) => {
  const publicDir = createPublicDir(t, {
    html: '<script src="/__manus__/debug-collector.js"></script>',
  });
  assert.throws(() => assertNoDebugCollector(publicDir), /debug collector/i);
});

test("accepts a clean build that still has its entry point", (t) => {
  const publicDir = createPublicDir(t, { html: "<main>ok</main>" });
  assert.equal(assertNoDebugCollector(publicDir), true);
});
