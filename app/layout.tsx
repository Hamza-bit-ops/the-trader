import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/navbar";
import { Facebook, Instagram, Music2 } from "lucide-react";


const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Th3 Trad3rs Academy - Master Forex Trading",
  description:
    "Transform your financial future with our comprehensive forex trading courses. Learn from industry experts and join thousands of successful traders.",
  keywords:
    "forex trading, forex academy, trading courses, financial education, forex strategies",
  authors: [{ name: "Th3 Trad3rs Academy" }],
  openGraph: {
    title: "Th3 Trad3rs Academy - Master Forex Trading",
    description:
      "Transform your financial future with our comprehensive forex trading courses.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Th3 Trad3rs Academy - Master Forex Trading",
    description:
      "Transform your financial future with our comprehensive forex trading courses.",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-dark-gradient min-h-screen`}>
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-1/2 -left-40 w-60 h-60 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-0 right-1/2 w-40 h-40 bg-orange-500/5 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="relative z-10 pt-20">{children}</main>

        {/* Footer */}
       <footer className="relative z-10 bg-slate-900/80 backdrop-blur-xl border-t border-slate-700/50 py-12 mt-20">
  <div className="container mx-auto px-6">
    <div className="grid md:grid-cols-4 gap-8 mb-8">
      {/* Company Info */}
      <div className="md:col-span-2">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Th3 Trad3rs Academy
          </span>
        </div>
        <p className="text-slate-400 leading-relaxed mb-4">
          Empowering traders worldwide with knowledge, strategy, and confidence since 2018. 
          Transform your trading potential with our comprehensive educational programs.
        </p>
        <div className="flex space-x-4">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/th3trad3rsofficial"
            target="_blank"
            className="w-10 h-10 bg-slate-800/50 hover:bg-amber-500/20 rounded-full flex items-center justify-center text-slate-400 hover:text-amber-400 transition-all duration-300 border border-slate-700/50 hover:border-amber-500/50"
          >
            <Facebook size={18} />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/th3_trad3rs?igsh=eGx4ejIwZjN6MHNn"
            target="_blank"
            className="w-10 h-10 bg-slate-800/50 hover:bg-amber-500/20 rounded-full flex items-center justify-center text-slate-400 hover:text-amber-400 transition-all duration-300 border border-slate-700/50 hover:border-amber-500/50"
          >
            <Instagram size={18} />
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@sherii6160?_t=ZS-8vThENIPXCZ&_r=1"
            target="_blank"
            className="w-10 h-10 bg-slate-800/50 hover:bg-amber-500/20 rounded-full flex items-center justify-center text-slate-400 hover:text-amber-400 transition-all duration-300 border border-slate-700/50 hover:border-amber-500/50"
          >
            <Music2 size={18} />
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-blue-400 font-bold mb-4">Quick Links</h4>
        <ul className="space-y-2">
          {[
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
            { label: "Courses", href: "/course" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-slate-400 hover:text-amber-400 transition-colors duration-300 text-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h4 className="font-bold mb-4">Contact</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li>Email: th3trad3rsofficial@gmail.com</li>
          <li>Phone: +92 343 1304090</li>
          <li>Address: Layyah</li>
        </ul>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="pt-8 border-t border-slate-700/50">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-slate-500 text-sm mb-4 md:mb-0">
          © 2025 Th3 Trad3rs. All rights reserved.
        </p>
        <div className="flex space-x-6 text-sm">
          <a href="#" className="text-slate-400 hover:text-amber-400 duration-300">
            Privacy Policy
          </a>
          <a href="#" className="text-slate-400 hover:text-amber-400 duration-300">
            Terms of Service
          </a>
          <a href="#" className="text-slate-400 hover:text-amber-400 duration-300">
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>
      </body>
    </html>
  );
}
