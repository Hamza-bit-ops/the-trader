"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
        : 'bg-white shadow-md'
    }`}>
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo with animation */}
        <Link href="/" className="group">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">FX</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              The Trader
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium">
          {[
            { href: "/", label: "Home" },
            { href: "/students", label: "Students" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" }
          ].map((item, index) => (
            <li key={item.href}>
              <Link 
                href={item.href} 
                className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 group py-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-700 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button for Desktop */}
        <div className="hidden md:block">
          <Link
            href="/enroll"
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 group"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}></span>
          <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}></span>
          <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white/95 backdrop-blur-lg border-t border-gray-100">
          <ul className="flex flex-col p-4 font-medium space-y-1">
            {[
              { href: "/", label: "Home" },
              { href: "/courses", label: "Courses" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" }
            ].map((item, index) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/enroll"
                className="block bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg font-semibold text-center transform hover:scale-105 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}