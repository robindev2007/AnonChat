import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import ChatContextProvider from "@/context/ChatContextProvider";
import { Toaster } from "sonner";

const jost = Jost({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="golden">
      <body className={`${jost.className} antialiased`}>
        <ChatContextProvider>
          <Toaster position="top-right" richColors />
          <main className="flex h-full min-h-screen flex-col">{children}</main>
        </ChatContextProvider>
      </body>
    </html>
  );
}
