import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexus AI — AI 챗봇 · 이미지 생성 · 업무 자동화",
  description:
    "AI 챗봇, 이미지 생성, 업무 자동화를 하나의 플랫폼에서. 대화하고, 시각화하고, 반복 업무를 자동화하세요.",
  icons: {
    icon: "/nexus-ai-logo.png",
    apple: "/nexus-ai-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          id="pretendard-font"
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          media="print"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(()=>{const l=document.getElementById('pretendard-font');if(!l)return;const a=()=>{l.media='all'};l.addEventListener('load',a);if(l.sheet)a();})();",
          }}
        />
        <noscript>
          <link
            rel="stylesheet"
            crossOrigin="anonymous"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          />
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
