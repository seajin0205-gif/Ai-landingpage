import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { copy } from "@/lib/copy";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: copy.ko.meta.title,
  description: copy.ko.meta.description,
  icons: {
    icon: "/nexus-ai-logo.png",
    apple: "/nexus-ai-logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await headers()).get("x-locale") === "en" ? "en" : "ko";

  return (
    <html
      lang={locale}
      className={`${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
