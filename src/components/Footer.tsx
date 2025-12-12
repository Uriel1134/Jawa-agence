import React from "react";

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

interface CompanyInfo {
  description: string;
  email: string;
  phone: string;
  address: string;
  address_details: string;
  social_linkedin: string;
  social_instagram: string;
  social_behance: string;
  social_dribbble: string;
}

const Footer: React.FC = () => {
  const [info, setInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    const { data } = await supabase.from("company_info").select("*").single();
    if (data) setInfo(data);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-jawaBlack text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container-wide pt-20 pb-10 relative z-10">

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Bloc marque */}
          <div className="max-w-md space-y-6">
            <div className="flex items-center gap-3">
              <img src="/background.png" alt="JAWA" className=" lg:w-30
                 lg:h-10" />
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {info?.description || "Chez JAWA, nous imaginons et développons des expériences numériques sur‑mesure qui allient esthétique, performance et résultats."}
            </p>
            <div className="space-y-3 text-sm">
              <p className="font-medium text-white">Suivez‑nous sur</p>
              <div className="flex gap-3">
                {['linkedin', 'behance', 'dribbble', 'instagram'].map((social) => (
                  <a
                    key={social}
                    href={info ? (info as any)[`social_${social}`] : "#"}
                    aria-label={social}
                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/25"
                  >
                    <img
                      src={`/icons/${social}.svg`}
                      alt=""
                      className="h-5 w-5 transition-transform group-hover:scale-110"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Liens utiles */}
          <div className="grid flex-1 gap-8 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="mb-6 font-bold text-white">Liens utiles</h3>
              <ul className="space-y-3 text-white/60">
                <li>
                  <a href="#contact" className="hover:text-primary transition-colors">
                    Contactez‑nous
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-primary transition-colors">
                    Portfolio
                  </a>
                </li>
                <li>
                  <span className="cursor-default text-white/30">
                    Politique de confidentialité
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 font-bold text-white">Liens rapides</h3>
              <ul className="space-y-3 text-white/60">
                <li>
                  <a href="#about" className="hover:text-primary transition-colors">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-primary transition-colors">
                    Processus
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-primary transition-colors">
                    Témoignages
                  </a>
                </li>
                <li>
                  <span className="cursor-default text-white/30">Blog &amp; Article</span>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-6 font-bold text-white">Contactez‑nous</h3>
              <ul className="space-y-4 text-white/80">
                <li className="flex items-center gap-3 group">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors group-hover:border-primary group-hover:bg-primary/10 group-hover:text-primary">
                    {/* icône téléphone */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M6.6 3.4 4.5 5.5a2 2 0 0 0-.3 2.4 21.6 21.6 0 0 0 7.9 7.9 2 2 0 0 0 2.4-.3l2.1-2.1a1 1 0 0 0-.1-1.5l-2.6-1.7a1 1 0 0 0-1.2.1l-.9.9a10.8 10.8 0 0 1-3-3l.9-.9a1 1 0 0 0 .1-1.2L8.1 3.5a1 1 0 0 0-1.5-.1Z" />
                    </svg>
                  </span>
                  <p className="text-sm group-hover:text-white transition-colors">{info?.phone || "+229 01XXXXXXXX"}</p>
                </li>
                <li className="flex items-center gap-3 group">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors group-hover:border-primary group-hover:bg-primary/10 group-hover:text-primary">
                    {/* icône email */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
                      <path d="m5 7 7 5 7-5" />
                    </svg>
                  </span>
                  <p className="text-sm group-hover:text-white transition-colors">{info?.email || "contact@jawa-agence.tech"}</p>
                </li>
                <li className="flex items-center gap-3 group">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors group-hover:border-primary group-hover:bg-primary/10 group-hover:text-primary">
                    {/* icône localisation */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M12 21s-6-4.4-6-10a6 6 0 1 1 12 0c0 5.6-6 10-6 10Z" />
                      <circle cx="12" cy="11" r="2.3" />
                    </svg>
                  </span>
                  <p className="text-sm group-hover:text-white transition-colors">
                    {info?.address || "Bénin, Cotonou"}
                    <br />
                    {info?.address_details || "Sur rendez‑vous"}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center text-[11px] text-white/40">
            © {new Date().getFullYear()}{" "}
            <span className="font-brand tracking-[0.24em] uppercase text-white/80">
              JAWA
            </span>{" "}
            Agency. Tous droits réservés.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-primary transition-colors"
          >
            Retour en haut
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




