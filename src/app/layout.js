import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import Nav from "@/components/Nav";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CodeGists - TUF",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader color="white" showSpinner={false} />
        <Nav />
        <ToastProvider>
          {children}
        </ToastProvider>

        <noscript>
          Javascript is required to run this app.
        </noscript>
      </body>
    </html>
  );
}
