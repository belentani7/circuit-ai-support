import assert from "node:assert/strict";
import test from "node:test";
import { copyText } from "../client/src/lib/copy-text.mjs";

test("reports success only after the browser clipboard accepts the template", async () => {
  let copiedText = "";
  const copy = await copyText(
    "Respuesta propuesta",
    { writeText: async (text) => { copiedText = text; } },
    () => assert.fail("fallback should not run after clipboard success"),
  );

  assert.equal(copy, true);
  assert.equal(copiedText, "Respuesta propuesta");
});

test("uses the accessible fallback when Clipboard API is unavailable", async () => {
  let fallbackText = "";
  const copy = await copyText("Respuesta propuesta", undefined, (text) => {
    fallbackText = text;
    return true;
  });

  assert.equal(copy, true);
  assert.equal(fallbackText, "Respuesta propuesta");
});

test("tries the fallback after Clipboard API rejects", async () => {
  let fallbackText = "";
  const copy = await copyText(
    "Respuesta propuesta",
    { writeText: async () => { throw new Error("permission denied"); } },
    (text) => {
      fallbackText = text;
      return false;
    },
  );

  assert.equal(copy, false);
  assert.equal(fallbackText, "Respuesta propuesta");
});

test("reports failure when neither clipboard route can copy", async () => {
  assert.equal(await copyText("Respuesta propuesta", undefined, () => false), false);
  assert.equal(await copyText("Respuesta propuesta", undefined), false);
});
