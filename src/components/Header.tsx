import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoMark from "./LogoMark";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  alwaysOpaque?: boolean;
}

const Header: React.FC<HeaderProps> = ({ alwaysOpaque = false }) => {
  const [onLightSection, setOnLightSection] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setOnLightSection(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scrolling to hash on location change
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      // Wait for DOM to be ready, try multiple times
      const scrollToElement = () => {
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      };

      // Try immediately
      scrollToElement();
      // Try again after delays to ensure page is loaded
      const timer1 = setTimeout(scrollToElement, 200);
      const timer2 = setTimeout(scrollToElement, 500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [location]);

  // Handle navigation to sections
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();

    if (location.pathname !== '/') {
      // Navigate to homepage with hash
      navigate(`/#${sectionId}`);
    } else {
      // Already on homepage, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${alwaysOpaque || onLightSection
        ? "bg-jawaBlack/95 backdrop-blur-md border-b border-white/10"
        : "bg-transparent"
        }`}
    >
      <div className="container-wide flex items-center justify-between py-3">
        <a
          href="/#home"
          onClick={(e) => handleSectionClick(e, 'home')}
          className="flex items-center gap-2"
        >
          <LogoMark size="lg" />
        </a>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-8 text-xs font-medium text-white/80 md:flex">
            {['Services', 'Portfolio', 'Process', 'Testimonials'].map((item) => (
              <a
                key={item}
                href={`/#${item.toLowerCase()}`}
                onClick={(e) => handleSectionClick(e, item.toLowerCase())}
                className="group relative py-1 hover:text-white transition-colors"
              >
                {item === 'Process' ? 'Processus' : item === 'Testimonials' ? 'Témoignages' : item}
                <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
            <a
              href="/blog"
              className="group relative py-1 hover:text-white transition-colors"
            >
              Blog
              <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </a>
            <a
              href="/#about"
              onClick={(e) => handleSectionClick(e, 'about')}
              className="group relative py-1 hover:text-white transition-colors"
            >
              À propos
              <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          </nav>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>

          <a
            href="/#contact"
            onClick={(e) => handleSectionClick(e, 'contact')}
            className="hidden md:inline-flex btn-primary-light text-xs"
          >
            Demander un devis
          </a>

          <a
            href="/#contact"
            onClick={(e) => handleSectionClick(e, 'contact')}
            className="btn-primary-light text-xs md:hidden"
            aria-label="Demander un devis"
          >
            Devis
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

