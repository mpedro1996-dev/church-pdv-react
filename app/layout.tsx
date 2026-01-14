
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AxiosInterceptor from "./components/axios-interceptor";
import GlobalLoading from "./components/global-loading";
import Navbar from "./components/navbar";
import { useTokenStore } from "./lib/zustand";
import ClientRoot from "./components/client-root";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Church PDV",
  description: "Solução POS para igrejas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <ClientRoot className={inter.className}>
      {children}
    </ClientRoot>
  );
}
