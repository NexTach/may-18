import type { Metadata } from "next";
import { Noto_Sans_KR, Press_Start_2P } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "그날의 선택 — 5.18 민주화운동",
  description:
    "1980년 5월 광주의 시민들이 마주한 상황과 기록을 따라가는 5·18민주화운동 인터랙티브 스토리",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
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
      <body className="h-full overflow-hidden bg-[#060907]">{children}</body>
    </html>
  );
}
