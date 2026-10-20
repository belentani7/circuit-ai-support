export type ClipboardWriter = {
  writeText(text: string): Promise<void>;
};

export type CopyFallback = (text: string) => boolean;

export function copyText(
  text: string,
  clipboard?: ClipboardWriter | null,
  fallback?: CopyFallback,
): Promise<boolean>;
