/**
 * CIRCUIT is an editorial SPA, not an API. Missing APIs/assets must not
 * masquerade as successful HTML responses from index.html.
 */
export function shouldServeSpa(pathname) {
  if (typeof pathname !== "string" || !pathname.startsWith("/")) return false;
  if (/^\/api(?:\/|$)/i.test(pathname)) return false;
  if (/(?:^|\/)\.?[^/]*\.[a-z0-9]{1,12}$/i.test(pathname)) return false;
  return true;
}
