import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-jawaBlack text-white">
      <div className="container-wide pt-14 pb-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Bloc marque */}
          <div className="max-w-md space-y-4">
            <div className="flex items-center gap-3">
                <img src="/background.png" alt="JAWA" className=" lg:w-30
                 lg:h-10" />
            </div>
            <p className="text-sm text-white/70">
              Chez JAWA, nous imaginons et développons des expériences
              numériques sur‑mesure
            </p>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-white">Suivez‑nous sur</p>
              <div className="flex gap-3">
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center text-white/70 hover:border-primary hover:text-primary"
                >
                  <img
                    src="/icons/linkedin.svg"
                    alt=""
                    className="h-6 w-6"
                  />
                </a>
                <a
                  href="#"
                  aria-label="Behance"
                  className="flex h-10 w-10 items-center justify-center text-white/70 hover:border-primary hover:text-primary"
                >
                  <img src="/icons/behance.svg" alt="" className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  aria-label="Dribbble"
                  className="flex h-10 w-10 items-center justify-center text-white/70 hover:border-primary hover:text-primary"
                >
                  <img src="/icons/dribbble.svg" alt="" className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center text-white/70 hover:border-primary hover:text-primary"
                >
                  <img src="/icons/instagram.svg" alt="" className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Liens utiles */}
          <div className="grid flex-1 gap-8 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="mb-4 font-semibold text-primary">Liens utiles</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a href="#contact" className="hover:text-primary">
                    Contactez‑nous
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-primary">
                    Portfolio
                  </a>
                </li>
                <li>
                  <span className="cursor-default text-white/50">
                    Politique de confidentialité
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-primary">Liens rapides</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a href="#about" className="hover:text-primary">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-primary">
                    Processus
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-primary">
                    Témoignages
                  </a>
                </li>
                <li>
                  <span className="cursor-default text-white/50">Blog &amp; Article</span>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 font-semibold text-primary">Contactez‑nous</h3>
              <ul className="space-y-4 text-white/80">
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40">
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
                  <p className="text-sm">+229 01XXXXXXXX</p>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40">
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
                  <p className="text-sm">contact@jawa-agence.tech</p>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40">
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
                  <p className="text-sm">
                    Bénin, Cotonou
                    <br />
                    Sur rendez‑vous
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-4">
          <p className="text-center text-[11px] text-white/60">
            © {new Date().getFullYear()}{" "}
            <span className="font-brand tracking-[0.24em] uppercase">
              JAWA
            </span>{" "}
            Agency. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



