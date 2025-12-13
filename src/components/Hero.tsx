import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    fetchHeroImage();
  }, []);

  const fetchHeroImage = async () => {
    const { data } = await supabase.from("company_info").select("hero_image_url").single();
    if (data?.hero_image_url) {
      setHeroImage(data.hero_image_url);
    } else {
      setHeroImage("/background.png"); // Fallback if DB is empty
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[#05071A] via-[#06042A] to-[#020011] pt-28 text-white"
    >
      {/* Glow & particules de fond */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute -left-40 top-24 h-80 w-80 rounded-full bg-primary/40 blur-3xl mix-blend-screen opacity-50" />
        <div className="animate-blob animation-delay-2000 absolute right-[-10%] bottom-[-10%] h-[380px] w-[380px] rounded-[4rem] bg-primary/30 blur-3xl mix-blend-screen opacity-50" />
        <div className="animate-blob animation-delay-4000 absolute left-[20%] bottom-[20%] h-64 w-64 rounded-full bg-purple-500/20 blur-3xl mix-blend-screen opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />
      </div>

      <div className="container-wide relative grid min-h-[80vh] items-center gap-12 pb-20 lg:grid-cols-2">
        {/* Colonne gauche : contenu texte */}
        <div className="space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display leading-tight animate-fade-in-up">
            Transformez votre vision en{" "}
            <span className="block text-primary">empire digital.</span>
          </h1>

          <p className="max-w-xl text-[0.97rem] text-white/80 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <span className="font-brand tracking-[0.28em] uppercase">JAWA</span>{" "}
            ne crée pas simplement des sites. Nous bâtissons des écosystèmes numériques sur mesure qui <span className="text-white font-medium">captivent votre audience</span> et <span className="text-white font-medium">multiplient votre chiffre d'affaires</span>.
          </p>

          <div className="flex flex-wrap items-center gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <a href="#contact" className="btn-primary-light">
              Discuter de mon projet
            </a>
            <Link to="/projects" className="group flex items-center gap-2 px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-80">
              Voir nos réalisations
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

        </div>

        {/* Colonne droite : visuel type carte produit Yumix */}
        <div className="relative flex justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="relative w-full max-w-md">
            <div className="animate-blob absolute -left-6 -top-6 h-16 w-16 rounded-3xl bg-primary/40 blur-2xl" />
            <div className="animate-blob animation-delay-2000 absolute -right-4 bottom-4 h-24 w-24 rounded-[2rem] bg-black/60 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/40 shadow-[0_32px_80px_rgba(0,0,0,0.65)] backdrop-blur-lg transition-transform duration-700 hover:scale-[1.02]">
              {/* Image de fond du hero : mets ton visuel dans /public/jawa-hero-visual.jpg */}
              <div className="relative aspect-[4/3] w-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.14),_transparent_60%)]">
                {heroImage ? (
                  <img
                    src={heroImage}
                    alt="JAWA Hero"
                    className="h-full w-full object-cover transition-opacity duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between px-5 py-4 text-xs text-white/80">
                <div>
                  <p className="font-semibold uppercase tracking-[0.16em]">
                    Creative &amp; Innovative
                  </p>
                  <p className="text-white/60">
                    Agence digitale{" "}
                    <span className="font-brand tracking-[0.22em] uppercase">
                      JAWA
                    </span>
                  </p>
                </div>
                <div className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                  100% Digital
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
