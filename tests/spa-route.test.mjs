import assert from "node:assert/strict";
import test from "node:test";
import { shouldServeSpa } from "../server/spa-route.mjs";

test("SPA root and extensionless routes remain eligible", () => {
  for (const path of ["/", "/protocolos", "/casos/ejemplo", "/apiary"]) {
    assert.equal(shouldServeSpa(path), true, path);
  }
});
test("unimplemented API routes cannot masquerade as working endpoints", () => {
  for (const path of ["/api", "/api/", "/api/contact", "/API/status"]) {
    assert.equal(shouldServeSpa(path), false, path);
  }
});
test("missing assets and configuration files do not return index.html", () => {
  for (const path of ["/assets/app-3df.js", "/favicon.ico", "/.env", "/data/config.json", "/fonts/font.woff2"]) {
    assert.equal(shouldServeSpa(path), false, path);
  }
});
test("unexpected input cannot fall through as an SPA route", () => {
  for (const path of ["", "relative/path", null, undefined]) {
    assert.equal(shouldServeSpa(path), false);
  }
});
