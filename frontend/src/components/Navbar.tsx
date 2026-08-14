import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["Home", "Features", "About", "Contact"];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-gray-950/70 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 group cursor-pointer">
        <span className="text-2xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
          🚀
        </span>
        <h1 className="text-xl font-bold text-white tracking-wide">
          Janadel <span className="text-blue-400">AI</span>
        </h1>
      </div>

      {/* Links */}
      <ul className="hidden md:flex items-center gap-10">
        {links.map((link) => (
          <li key={link} className="relative group cursor-pointer">
            <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors duration-300">
              {link}
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full" />
          </li>
        ))}
      </ul>

      {/* Button */}
      <button className="relative px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-md shadow-blue-500/30 hover:shadow-blue-400/50 transition-all duration-300 hover:scale-105">
        Get Started
      </button>
    </nav>
  );
}