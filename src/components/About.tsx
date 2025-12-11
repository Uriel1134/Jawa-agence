import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

interface AboutData {
  image_url: string;
  satisfaction_score: string;
  satisfaction_text: string;
  intro_title: string;
  intro_text: string;
  history_text: string;
  mission_text: string;
  vision_text: string;
}

const About: React.FC = () => {
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      const { data, error } = await supabase
        .from('about_section')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching about data:', error);
      } else {
        setData(data);
      }
    };

    fetchAboutData();
  }, []);

  if (!data) return null;

  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden bg-white dark:bg-jawaBlack transition-colors duration-300"
    >
      {/* Abstract Background Elements */}
      <div className="pointer-events-none absolute top-0 left-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-[#FFE04A]/10 blur-[100px]" />

      <div className="container-wide grid gap-16 lg:grid-cols-[1.15fr,1.1fr] lg:items-start">
        {/* Colonne gauche : visuels */}
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-white/5 p-2 shadow-soft transition-transform duration-500 hover:scale-[1.01]">
            <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.5fr,1fr]">
              {/* Grande image principale - Prend toute la hauteur disponible */}
              <div className="relative h-full min-h-[300px] overflow-hidden rounded-[1.8rem] bg-gray-100 dark:bg-white/10">
                {data.image_url && (
                  <img
                    src={data.image_url}
                    alt="Équipe JAWA"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] border border-white/20 ring-1 ring-black/5" />
              </div>

              {/* Carte rating / secondaire */}
              <div className="flex flex-col gap-4 justify-between h-full">
                <div className="relative flex-1 flex flex-col justify-center overflow-hidden rounded-[1.8rem] bg-jawaBlack text-white p-6 shadow-lg shadow-jawaBlack/10 dark:bg-primary">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                    Satisfaction
                  </p>
                  <p className="text-4xl font-display font-bold tracking-tight">{data.satisfaction_score}</p>
                  <p className="mt-2 text-xs font-medium text-white/60 leading-relaxed">
                    {data.satisfaction_text}
                  </p>
                  <div className="mt-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-sm text-[#FFD54A]">
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative flex-1 flex flex-col justify-center overflow-hidden rounded-[1.8rem] bg-gray-50 dark:bg-white/10 border border-gray-100 dark:border-white/10 p-6 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-white/60">
                    Expertise
                  </p>
                  <p className="mt-2 text-sm font-medium text-neutral-800 dark:text-white leading-relaxed">
                    Une synergie parfaite entre <span className="text-primary dark:text-primary-light">Design</span> et <span className="text-primary dark:text-primary-light">Tech</span> pour des produits d'exception.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bandeau équipe */}
          <div className="flex flex-col gap-4 rounded-[2rem] bg-[#FFE04A] dark:bg-white/10 px-8 py-6 shadow-lg shadow-[#FFE04A]/20 dark:shadow-none sm:flex-row sm:items-center sm:justify-between transition-transform duration-300 hover:-translate-y-1">
            <div>
              <p className="text-base font-bold text-jawaBlack dark:text-white">
                Les talents derrière JAWA
              </p>
              <p className="text-xs font-medium text-jawaBlack/70 dark:text-white/60 mt-0.5">
                Experts dédiés à votre réussite.
              </p>
            </div>
            <div className="flex -space-x-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-[#FFE04A] dark:border-white/10 bg-jawaBlack/90 shadow-sm"
                />
              ))}
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#FFE04A] dark:border-white/10 bg-white text-xs font-bold text-jawaBlack">
                +
              </div>
            </div>
          </div>
        </div>

        {/* Colonne droite : contenu */}
        <div className="space-y-10 lg:pt-8">
          <div>
            <h2 className="section-title text-jawaBlack dark:text-white leading-tight">
              {data.intro_title}
            </h2>
            <p className="section-subtitle text-lg leading-relaxed text-neutral-600 dark:text-white/60">
              {data.intro_text}
            </p>
          </div>

          <div className="space-y-4">
            <div className="group cursor-default rounded-2xl border border-transparent p-4 transition-all hover:border-gray-100 hover:bg-gray-50 dark:hover:bg-white/5 dark:hover:border-white/10">
              <h3 className="flex items-center gap-4 text-lg font-bold text-jawaBlack dark:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold transition-colors group-hover:bg-primary group-hover:text-white">01</span>
                Notre histoire
              </h3>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="mt-4 text-neutral-600 dark:text-white/60 leading-relaxed pl-[3.5rem]">
                    {data.history_text}
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-default rounded-2xl border border-transparent p-4 transition-all hover:border-gray-100 hover:bg-gray-50 dark:hover:bg-white/5 dark:hover:border-white/10">
              <h3 className="flex items-center gap-4 text-lg font-bold text-jawaBlack dark:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold transition-colors group-hover:bg-primary group-hover:text-white">02</span>
                Notre mission
              </h3>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="mt-4 text-neutral-600 dark:text-white/60 leading-relaxed pl-[3.5rem]">
                    {data.mission_text}
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-default rounded-2xl border border-transparent p-4 transition-all hover:border-gray-100 hover:bg-gray-50 dark:hover:bg-white/5 dark:hover:border-white/10">
              <h3 className="flex items-center gap-4 text-lg font-bold text-jawaBlack dark:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold transition-colors group-hover:bg-primary group-hover:text-white">03</span>
                Notre vision
              </h3>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="mt-4 text-neutral-600 dark:text-white/60 leading-relaxed pl-[3.5rem]">
                    {data.vision_text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
