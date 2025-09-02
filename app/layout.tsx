  import type { Metadata } from "next";
  import "./globals.css";
  import Navbar from "../src/components/navbar";

  export const metadata: Metadata = {
    title: "Forex Academy - Learn Forex Trading",
    description: "Enroll in professional forex trading courses and start your journey.",
  };

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body className="antialiased bg-gray-50">
          <Navbar />
          <main className="pt-20">{children}</main>
        </body>
      </html>
    );
  }
