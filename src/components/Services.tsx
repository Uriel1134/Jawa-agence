import React from "react";

const services = [
  {
    title: "Développement Web",
    description:
      "Sites vitrines, plateformes sur mesure et solutions e‑commerce performantes, optimisées SEO et responsives.",
    image: "/web.jpg",
    gradient: "from-[#4A3CFF] via-[#1B1B3A] to-[#02010A]"
  },
  {
    title: "Développement Mobile",
    description:
      "Applications mobiles modernes, rapides et fluides pour iOS et Android, centrées sur l’expérience utilisateur.",
    image: "/mobile.jpg",
    gradient: "from-[#02010A] via-[#4A3CFF] to-[#181824]"
  },
  {
    title: "UI/UX Design",
    description:
      "Interfaces épurées, hiérarchies claires et parcours utilisateurs pensés pour convertir et fidéliser.",
    image: "/design.jpeg",
    gradient: "from-[#111827] via-[#4A3CFF] to-[#060714]"
  },
  {
    title: "Design Graphique",
    description:
      "Visuels, supports marketing et univers graphique cohérent pour renforcer votre présence digitale.",
    image: "/graphic.jpeg",
    gradient: "from-[#4A3CFF] via-[#111827] to-[#020617]"
  },
  {
    title: "Branding & Identité",
    description:
      "Création ou refonte d’identités de marque fortes, mémorables et parfaitement alignées sur vos valeurs.",
    image: "/branding.jpg",
    gradient: "from-[#020617] via-[#4A3CFF] to-[#111827]"
  },
  {
    title: "Maintenance Informatique",
    description:
      "Infogérance, sécurité, mises à jour et support pour garantir la continuité et la stabilité de vos outils.",
    image: "/it.jpeg",
    gradient: "from-[#020617] via-[#111827] to-[#4A3CFF]"
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-wide">
        <div className="mb-10 text-center">
          <h2 className="section-title">Nos prestations digitales</h2>
          <p className="section-subtitle mx-auto">
            Un accompagnement complet, du branding au développement sur mesure,
            pour construire des expériences digitales modernes, fiables et
            mémorables.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className={`service-card group bg-gradient-to-br ${service.gradient}`}
            >
              <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-md space-y-3 text-left">
                  <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/70">
                    Service
                  </p>
                  <h3 className="text-2xl font-display">{service.title}</h3>
                  <p className="text-sm text-white/80">
                    {service.description}
                  </p>
                  <button className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white transition group-hover:bg-white group-hover:text-primary">
                    Plus
                    <span aria-hidden>↗</span>
                  </button>
                </div>
                <div className="relative mt-4 w-full max-w-[180px] sm:mt-0 sm:ml-6">
                  <div className="absolute inset-3 rounded-[2rem] bg-black/30 blur-xl" />
                  <div className="relative overflow-hidden rounded-[2rem] bg-white/5">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;


