import assert from "node:assert/strict";
import test from "node:test";
import { securityHeaders } from "../server/security-headers.mjs";

test("static site cannot frame, execute remote JavaScript or access APIs", () => {
  const csp = securityHeaders["Content-Security-Policy"];
  assert.match(csp, /script-src 'self'(?:;|$)/);
  assert.match(csp, /connect-src 'self'(?:;|$)/);
  assert.match(csp, /object-src 'none'/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.doesNotMatch(csp, /unsafe-eval|script-src[^;]*unsafe-inline|connect-src[^;]*\*/);
});

test("the current bundled Google Fonts remain allowed without permissive remote scripts", () => {
  const csp = securityHeaders["Content-Security-Policy"];
  assert.match(csp, /style-src[^;]*https:\/\/fonts\.googleapis\.com/);
  assert.match(csp, /font-src[^;]*https:\/\/fonts\.gstatic\.com/);
  assert.equal(securityHeaders["X-Content-Type-Options"], "nosniff");
  assert.equal(securityHeaders["X-Frame-Options"], "DENY");
  assert.match(securityHeaders["Permissions-Policy"], /microphone=\(\)/);
});
