import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContextProvider from "@/modules/auth_provider";
import WebSocketProvider from "@/modules/websocket_provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatApp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <main>
          <AuthContextProvider>
            <WebSocketProvider>{children}</WebSocketProvider>
          </AuthContextProvider>
        </main>
      </body>
    </html>
  );
}
