import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { TokenChecker } from "@/components/ui/com/tokenChecker/TokenChecker";
import { Toaster } from "react-hot-toast";
import NextCookiesProvider from "./cookieProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "JobsHub- Job Portal",
  description: "Find your dream job with the best companies",
  keywords: ["jobs", "recruitment", "career", "hiring"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <NextCookiesProvider>
          <StoreProvider>
            <TokenChecker />
            {children}
            <Toaster />
          </StoreProvider>
        </NextCookiesProvider>
      </body>
    </html>
  );
}
