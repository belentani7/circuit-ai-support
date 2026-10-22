export async function copyText(text, clipboard, fallback) {
  if (clipboard && typeof clipboard.writeText === "function") {
    try {
      await clipboard.writeText(text);
      return true;
    } catch {
      // Continue to the legacy copy path when clipboard permission is denied.
    }
  }

  if (typeof fallback !== "function") return false;

  try {
    return fallback(text) === true;
  } catch {
    return false;
  }
}
