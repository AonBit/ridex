import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const page = await prisma.pageContent.findUnique({ where: { id: 1 } });
  const site = await prisma.siteConfig.findUnique({ where: { id: 1 } });

  return {
    title: page?.seoTitle ?? "Ridex - Rent your favourite car",
    description: page?.seoDescription ?? "Ridex is fully responsive car rental website.",
    icons: {
      icon: site?.faviconPath || "/favicon.svg"
    }
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600&family=Open+Sans&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />
        <Script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
      </body>
    </html>
  );
}
