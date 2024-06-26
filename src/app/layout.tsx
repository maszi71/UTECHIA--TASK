"use client";

import "./globals.css";
import { ItemListProvider } from "@/store/ItemListContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ItemListProvider>
        <body>{children}</body>
      </ItemListProvider>
    </html>
  );
}
