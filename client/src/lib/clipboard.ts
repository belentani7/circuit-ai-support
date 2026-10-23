/**
 * Clipboard permissions can be denied (or clipboard unavailable on HTTP).
 * Never report success unless the browser actually confirms the write.
 */
export async function copyTextToClipboard(
  value: string,
  clipboard?: Pick<Clipboard, "writeText">,
): Promise<boolean> {
  if (!clipboard || typeof clipboard.writeText !== "function") return false;
  try {
    await clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}
