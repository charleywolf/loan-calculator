import "./globals.css";

import { ErrorProvider } from "@/contexts/useErrors";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Loan Calculator",
  description: "See your loan details and monthly payments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="min-h-screen">
            <Navbar />
            {children}
          </div>
        </body>
      </html>
    </ErrorProvider>
  );
}
