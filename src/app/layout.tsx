import type { Metadata } from "next";
import { Providers } from "@/providers/provider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "HookAI - AI-Powered Content Generation",
  description: "Generate engaging social media content with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
