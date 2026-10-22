import { tracking } from "./config";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type Kind = keyof typeof tracking.conversions;

export function trackConversion(kind: Kind, url?: string) {
  if (typeof window === "undefined") return;
  const sendTo = tracking.conversions[kind];
  if (window.gtag && !sendTo.includes("XXXX")) {
    window.gtag("event", "conversion", {
      send_to: sendTo,
      event_callback: url ? () => (window.location.href = url) : undefined,
    });
  }
  window.dataLayer?.push({ event: `lead_${kind}` });
}
