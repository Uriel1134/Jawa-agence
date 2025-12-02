import React from "react";

const projects = [
  {
    title: "Plateforme SaaS B2B",
    category: "Développement Web",
    tag: "SaaS"
  },
  {
    title: "Application Mobile Fintech",
    category: "Développement Mobile",
    tag: "Fintech"
  },
  {
    title: "Identité Visuelle Café",
    category: "Branding & Design",
    tag: "Branding"
  },
  {
    title: "Interface Dashboard Analytics",
    category: "UI/UX Design",
    tag: "Dashboard"
  },
  {
    title: "Site E‑commerce Mode",
    category: "Développement Web",
    tag: "E‑commerce"
  },
  {
    title: "Refonte Expérience Mobile",
    category: "UI/UX Mobile",
    tag: "UX"
  }
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="section-padding bg-slate-50">
      <div className="container-wide">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="section-title">Réalisations sélectionnées</h2>
            <p className="section-subtitle">
              Une sélection de projets qui illustrent la diversité de nos
              expertises : produits SaaS, expériences mobiles, identités de
              marque et interfaces sur‑mesure.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
            <span className="rounded-full bg-white px-3 py-1 shadow-soft">
              Tous
            </span>
            <span>Web</span>
            <span>Mobile</span>
            <span>Branding</span>
            <span>UI/UX</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-soft transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-white to-jawaBlack/5 transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-jawaBlack/90 via-jawaBlack/30 to-transparent p-5 opacity-0 transition group-hover:opacity-100">
                <div className="flex justify-between text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                  <span>{project.category}</span>
                  <span>{project.tag}</span>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-display text-white">
                    {project.title}
                  </h3>
                  <button className="inline-flex items-center gap-2 text-xs font-medium text-primary">
                    Voir le projet
                    <span aria-hidden>↗</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;


