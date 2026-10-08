import type { Metadata } from "next";

export function createMetadata(overrides: Metadata = {}): Metadata {
  return {
    robots: { index: false, follow: false },
    ...overrides,
  };
}
