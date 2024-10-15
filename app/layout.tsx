import type { Metadata } from "next";
import "./globals.css";
import { Orbitron } from "next/font/google";
import Header from "./ui/header";

export const metadata: Metadata = {
  title: "Waldoverse",
  description: "Photo tagging app similar to where is waldo",
};

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.className} antialiased min-h-screen`}>
        <Header />

        {children}
      </body>
    </html>
  );
}
