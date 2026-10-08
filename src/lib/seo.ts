import type { Metadata } from "next";

function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/+$/, "");
  return "http://localhost:3000";
}

const indexableRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true },
};

export function createMetadata(overrides: Metadata = {}): Metadata {
  const url = siteUrl();
  return {
    metadataBase: new URL(url),
    alternates: { canonical: "/" },
    robots: indexableRobots,
    keywords: [
      "cat in the hat",
      "the cat the hat",
      "sighting archive",
      "Inlet Beach",
      "30A",
      "fictional map",
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: "The Cat. The Hat.",
    },
    twitter: {
      card: "summary_large_image",
    },
    ...overrides,
  };
}

export function absoluteUrl(path: string): string {
  const base = siteUrl();
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
