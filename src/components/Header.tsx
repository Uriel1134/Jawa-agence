import React, { useEffect, useState } from "react";
import LogoMark from "./LogoMark";

interface HeaderProps {
  alwaysOpaque?: boolean;
}

const Header: React.FC<HeaderProps> = ({ alwaysOpaque = false }) => {
  const [onLightSection, setOnLightSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Quand on dépasse la hero (environ 80px), on considère qu'on est sur une zone blanche
      setOnLightSection(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${alwaysOpaque || onLightSection
          ? "bg-jawaBlack/95 backdrop-blur-md"
          : "bg-transparent"
        }`}
    >
      <div className="container-wide flex items-center justify-between py-3">
        <a href="#home" className="flex items-center gap-2">
          <LogoMark size="lg" />
        </a>

        <nav className="hidden items-center gap-8 text-xs font-medium text-white/80 md:flex">
          <a href="#services" className="hover:text-primary">
            Services
          </a>
          <a href="#portfolio" className="hover:text-primary">
            Portfolio
          </a>
          <a href="#about" className="hover:text-primary">
            À propos
          </a>
          <a href="#process" className="hover:text-primary">
            Processus
          </a>
          <a href="#testimonials" className="hover:text-primary">
            Témoignages
          </a>
          <a href="#contact" className="hover:text-primary">
            Contact
          </a>
          <a href="#contact" className="btn-primary text-xs">
            Demander un devis
          </a>
        </nav>

        <a
          href="#contact"
          className="btn-primary text-xs md:hidden"
          aria-label="Demander un devis"
        >
          Devis
        </a>
      </div>
    </header>
  );
};

export default Header;


