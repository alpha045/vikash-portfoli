import React, { useState, useEffect } from "react";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { HiMenu, HiX } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Achievements", id: "achievements" },
  { name: "Education", id: "education" },
  { name: "Research", id: "research" },
  { name: "Contact", id: "contact" },
];

function Navbar({ theme, setTheme }) {
  const data = usePortfolioData();

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;

      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].id);

        if (el && el.offsetTop <= scrollY) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollTo(id) {
    setIsOpen(false);

    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  function handleResume() {
    if (data?.personal?.resumeUrl) {
      window.open(data.personal.resumeUrl, "_blank");
    }
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => scrollTo("home")}
            className="text-2xl font-bold text-primary"
          >
            VK
          </button>

          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-2 rounded-md text-sm transition ${
                  activeSection === link.id
                    ? "text-primary"
                    : "text-muted-foreground"
                } hover:text-primary`}
              >
                {link.name}
              </button>
            ))}

            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-md  hover:text-primary transition"
            >
              {theme === "dark" ? (
                <FiSun size={20} />
              ) : (
                <FiMoon size={20} />
              )}
            </button>

            <button
              onClick={handleResume}
              className="ml-1 px-3 py-1 rounded-md text-muted-foreground hover:text-primary transition"
            >
              Resume
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-card border-b border-border">
          <div className="p-3 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block w-full text-left px-3 py-2 rounded-md hover:bg-primary/10"
              >
                {link.name}
              </button>
            ))}

            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-primary/10"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>

            <button
              onClick={handleResume}
              className="block w-full text-left px-3 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-white transition"
            >
              Download Resume
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;