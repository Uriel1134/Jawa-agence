import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

interface Project {
  id: number;
  title: string;
  category: string;
  tag: string;
  image: string;
  github_url?: string;
  figma_url?: string;
  technologies?: string;
}

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <section id="portfolio" className="section-padding bg-slate-50/50 dark:bg-jawaBlack/50 backdrop-blur-sm transition-colors duration-300">
      <div className="container-wide">
        <div className="mb-12 flex flex-col items-end justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="section-badge mb-6">
              Portfolio
            </span>
            <h2 className="font-display text-5xl font-bold leading-tight text-jawaBlack dark:text-white md:text-6xl lg:text-7xl">
              Réalisations <br />
              <span className="text-gray-300 dark:text-white/40">sélectionnées.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-gray-500 dark:text-white/60">
            Une sélection de projets qui illustrent la diversité de nos
            expertises : produits SaaS, expériences mobiles, identités de
            marque et interfaces sur‑mesure.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-14 flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500 dark:text-white/60">
          <span className="rounded-full bg-white dark:bg-white/10 px-3 py-1 shadow-soft text-primary dark:text-white">
            Tous
          </span>
          <span className="px-3 py-1 hover:text-primary cursor-pointer transition-colors">Web</span>
          <span className="px-3 py-1 hover:text-primary cursor-pointer transition-colors">Mobile</span>
          <span className="px-3 py-1 hover:text-primary cursor-pointer transition-colors">Branding</span>
          <span className="px-3 py-1 hover:text-primary cursor-pointer transition-colors">UI/UX</span>
        </div>

        {loading ? (
          <div className="text-center py-10 dark:text-white">Chargement des projets...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group relative overflow-hidden rounded-3xl dark:border dark:border-white/10 shadow-soft transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Image - No Background */}
                <div className="aspect-[4/3] transition-transform duration-500 group-hover:scale-105">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-jawaBlack/95 via-jawaBlack/60 to-transparent p-6 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                        {project.category}
                      </span>
                      {project.tag && (
                        <span className="w-fit rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                          {project.tag}
                        </span>
                      )}
                    </div>

                    {/* Links Icons */}
                    <div className="relative z-10 flex gap-2 translate-y-[-10px] opacity-0 transition-all duration-300 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-black"
                          title="Code Github"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                      {project.figma_url && (
                        <a
                          href={project.figma_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition hover:bg-white/20"
                          title="Maquette Figma"
                        >
                          <img src="/figma-logo.png" alt="Figma" className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-xl font-display font-bold text-white">
                      {project.title}
                    </h3>

                    {/* Technologies Tags */}
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.split(',').map((tech, index) => (
                          <span key={index} className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-medium text-white/90 backdrop-blur-sm border border-white/10">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      to={`/project/${project.id}`}
                      className="group/btn mt-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:bg-white hover:text-jawaBlack focus:outline-none focus:ring-2 focus:ring-white/50 before:absolute before:inset-0 before:z-0"
                    >
                      Voir le détail
                      <svg
                        className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
