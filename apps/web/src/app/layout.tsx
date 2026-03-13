import type { Metadata } from "next";

import { SiteFrame } from "@/components/site-frame";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AI Skills Hub",
    template: "%s | AI Skills Hub",
  },
  description:
    "A GitHub-first platform for discovering, ranking, generating, and publishing AI agent skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-background font-sans text-foreground antialiased">
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
