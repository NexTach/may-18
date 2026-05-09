import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Press_Start_2P } from "next/font/google";
import "./globals.css";
import React from "react";

const BASE_URL = "https://may-18-peach.vercel.app";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-korean",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060907",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "그날의 선택 — 5.18 민주화운동",
    template: "%s | 그날의 선택",
  },
  description:
    "1980년 5월 광주의 시민들이 마주한 상황과 기록을 따라가는 5·18민주화운동 인터랙티브 스토리",
  keywords: [
    "5.18",
    "5·18민주화운동",
    "광주민주화운동",
    "인터랙티브 스토리",
    "픽셀 게임",
    "역사 게임",
    "광주",
    "1980",
    "민주화",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "그날의 선택 — 5.18 민주화운동",
    description:
      "1980년 5월 광주의 시민들이 마주한 상황과 기록을 따라가는 5·18민주화운동 인터랙티브 스토리",
    url: BASE_URL,
    siteName: "그날의 선택",
    images: [
      {
        url: "/menu-bg.png",
        width: 1535,
        height: 1024,
        alt: "그날의 선택 — 5.18 민주화운동 인터랙티브 스토리",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "그날의 선택 — 5.18 민주화운동",
    description:
      "1980년 5월 광주의 시민들이 마주한 상황과 기록을 따라가는 5·18민주화운동 인터랙티브 스토리",
    images: [`${BASE_URL}/menu-bg.png`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "그날의 선택 — 5.18 민주화운동",
  description:
    "1980년 5월 광주의 시민들이 마주한 상황과 기록을 따라가는 5·18민주화운동 인터랙티브 스토리",
  url: BASE_URL,
  applicationCategory: "Game",
  operatingSystem: "Web",
  inLanguage: "ko",
  about: {
    "@type": "Event",
    name: "5·18민주화운동",
    startDate: "1980-05-18",
    endDate: "1980-05-27",
    location: {
      "@type": "Place",
      name: "광주광역시",
      address: {
        "@type": "PostalAddress",
        addressLocality: "광주",
        addressCountry: "KR",
      },
    },
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
      className={`${pressStart2P.variable} ${notoSansKR.variable} h-full`}
    >
      <body className="h-full overflow-hidden bg-game-bg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
