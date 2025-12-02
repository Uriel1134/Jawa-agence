import React from "react";

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="section-padding bg-[#FFF7E0] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.8),_transparent_55%)]"
    >
      <div className="container-wide grid gap-12 lg:grid-cols-[1.15fr,1.1fr] lg:items-start">
        {/* Colonne gauche : visuels */}
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-soft">
            <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.5fr,1fr]">
              {/* Grande image principale */}
              <div className="relative overflow-hidden rounded-[1.8rem]">
                <img
                  src="/Teams.jpeg"
                  alt="Équipe JAWA au travail"
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] border border-white/40" />
              </div>

              {/* Carte rating / secondaire */}
              <div className="flex flex-col gap-4">
                <div className="relative overflow-hidden rounded-[1.6rem] bg-jawaBlack text-white p-5">
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-white/70">
                    Score de satisfaction
                  </p>
                  <p className="text-2xl font-display">4,9/5</p>
                  <p className="mt-1 text-xs text-white/70">
                    Basé sur plus de 120 retours clients vérifiés.
                  </p>
                  <div className="mt-3 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-sm text-[#FFD54A]">
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[1.6rem] bg-white/80 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
                    Une équipe pluridisciplinaire
                  </p>
                  <p className="mt-2 text-xs text-neutral-700">
                    Designers, développeurs et experts IT collaborent au
                    quotidien pour livrer des projets cohérents de bout en
                    bout.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bandeau équipe */}
          <div className="flex flex-col gap-3 rounded-[2rem] bg-[#FFE04A] px-6 py-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-jawaBlack">
                Les talents derrière JAWA
              </p>
              <p className="text-xs text-jawaBlack/80">
                Une équipe resserrée de spécialistes dédiés à votre réussite
                digitale.
              </p>
            </div>
            <div className="flex -space-x-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-9 w-9 rounded-full border-2 border-[#FFE04A] bg-jawaBlack/80"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Colonne droite : histoire / mission / vision */}
        <div className="space-y-8">
          <div>
          
            <h2 className="section-title text-jawaBlack">
            <span className="font-brand ">
                JAWA {" "}
              </span>
              Agence
            </h2>
            <p className="section-subtitle">
              <span className="font-brand ">
                JAWA
              </span>{" "}
              est une agence digitale spécialisée dans la conception
              d&apos;expériences web &amp; mobile premium. Nous combinons
              stratégie, design et technologie pour bâtir des produits utiles,
              élégants et performants.
            </p>
          </div>

          <div className="space-y-6 text-sm text-neutral-700">
            <div>
              <h3 className="mb-2 text-base font-semibold text-jawaBlack">
                Notre histoire
              </h3>
              <p>
                Née de la rencontre entre profils créatifs et profils
                techniques,{" "}
                <span className="font-brand">
                  JAWA
                </span>{" "}
                s&apos;est construite autour d&apos;une
                conviction simple : un bon produit digital doit être aussi
                agréable à utiliser qu&apos;efficace pour le business.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold text-jawaBlack">
                Notre mission
              </h3>
              <p>
                Transformer vos idées en interfaces claires, rapides et
                sécurisées, en vous guidant à chaque étape du projet : cadrage,
                design, développement et accompagnement post‑lancement.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold text-jawaBlack">
                Notre vision
              </h3>
              <p>
                Devenir le partenaire digital long terme des marques qui
                veulent innover, en proposant des solutions durables, scalables
                et pensées pour évoluer avec vos enjeux.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


