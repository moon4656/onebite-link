import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FoldersProvider } from "@/lib/folders-context";
import { LinksProvider } from "@/lib/links-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    template: "%s | 한입 링크",
    default: "한입 링크",
  },
  description: "링크를 폴더별로 정리하고 한입에 모아보는 북마크 서비스",
  openGraph: {
    title: "한입 링크",
    description: "링크를 폴더별로 정리하고 한입에 모아보는 북마크 서비스",
    siteName: "한입 링크",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/thumbnail.png",
        width: 2400,
        height: 1260,
        alt: "한입 링크",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "한입 링크",
    description: "링크를 폴더별로 정리하고 한입에 모아보는 북마크 서비스",
    images: ["/thumbnail.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FoldersProvider>
          <LinksProvider>{children}</LinksProvider>
        </FoldersProvider>
      </body>
    </html>
  );
}
