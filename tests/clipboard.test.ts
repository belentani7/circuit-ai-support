import { describe, expect, it, vi } from "vitest";
import { copyTextToClipboard } from "../client/src/lib/clipboard";

describe("CIRCUIT template copying", () => {
  it("only confirms copying when clipboard returns success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    expect(await copyTextToClipboard("mensaje sensible", { writeText })).toBe(true);
    expect(writeText).toHaveBeenCalledWith("mensaje sensible");
  });

  it("does not lie about copying when access is denied", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("NotAllowedError"));
    expect(await copyTextToClipboard("mensaje", { writeText })).toBe(false);
  });

  it("reports unsupported clipboard instead of showing success", async () => {
    expect(await copyTextToClipboard("mensaje")).toBe(false);
  });
});
