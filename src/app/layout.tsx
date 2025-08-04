import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "渓谷の湯 旅館『月影の郷』 | 創業100年の老舗旅館",
  description: "創業100年を迎える老舗旅館『月影の郷』。自家源泉かけ流しの温泉、四季折々の会席料理、渓谷を望む絶景の露天風呂で、静寂の贅沢をお楽しみください。",
  keywords: "旅館,温泉,月影の郷,渓谷,露天風呂,会席料理,日本旅館,温泉旅館",
  authors: [{ name: "渓谷の湯 旅館『月影の郷』" }],
  creator: "渓谷の湯 旅館『月影の郷』",
  publisher: "渓谷の湯 旅館『月影の郷』",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tsukikage-sato.com'),
  openGraph: {
    title: "渓谷の湯 旅館『月影の郷』 | 創業100年の老舗旅館",
    description: "創業100年を迎える老舗旅館『月影の郷』。自家源泉かけ流しの温泉、四季折々の会席料理、渓谷を望む絶景の露天風呂で、静寂の贅沢をお楽しみください。",
    url: 'https://tsukikage-sato.com',
    siteName: '渓谷の湯 旅館『月影の郷』',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '渓谷の湯 旅館『月影の郷』',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "渓谷の湯 旅館『月影の郷』 | 創業100年の老舗旅館",
    description: "創業100年を迎える老舗旅館『月影の郷』。自家源泉かけ流しの温泉、四季折々の会席料理、渓谷を望む絶景の露天風呂で、静寂の贅沢をお楽しみください。",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#fefcf8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased texture-paper">
        {children}
      </body>
    </html>
  );
}
