import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lookitup | Evidence before publication",
  description: "A trusted-source evidence workspace for journalists before publication."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
