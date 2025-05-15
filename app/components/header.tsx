"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Lightbulb, HelpCircle } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-white"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Lightbulb className="h-6 w-6 text-[#0066CC] mr-2" />
          <h1 className="text-xl font-bold text-[#1A1A1A]">CHIP 400</h1>
        </div>
        
        <nav className="flex items-center space-x-4">
          <a
            href="#"
            className="flex items-center text-[#1A1A1A] hover:text-[#0066CC] transition-colors"
          >
            <Home className="h-5 w-5 mr-1" />
            <span className="hidden md:inline">Home</span>
          </a>
          <a
            href="#"
            className="flex items-center text-[#1A1A1A] hover:text-[#0066CC] transition-colors"
          >
            <HelpCircle className="h-5 w-5 mr-1" />
            <span className="hidden md:inline">Help</span>
          </a>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;