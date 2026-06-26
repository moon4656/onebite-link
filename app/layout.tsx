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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "xcuceuhtfe");`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <FoldersProvider>
          <LinksProvider>{children}</LinksProvider>
        </FoldersProvider>
      </body>
    </html>
  );
}
