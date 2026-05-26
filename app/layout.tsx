import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://paradoxindustries.ca"),
  title: "Paradox Industries | Engineered Visibility for Toronto Operators",
  description:
    "Paradox Industries builds custom content pipelines, back-end automation architecture, and local distribution systems for Toronto businesses, restaurants, and creators.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Paradox Industries | Engineered Visibility. Predictable Local Growth.",
    description:
      "Custom content pipelines and digital infrastructure for Toronto businesses, restaurants, and creators.",
    url: "https://paradoxindustries.ca",
    siteName: "Paradox Industries",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Paradox Industries",
    description: "Engineered visibility and predictable local growth for Toronto operators."
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
