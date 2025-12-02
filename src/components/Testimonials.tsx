import React from "react";

const testimonials = [
  {
    quote:
      "JAWA a conçu une plateforme performante et élégante qui a augmenté nos conversions tout en simplifiant la gestion au quotidien.",
    name: "Amine B.",
    role: "CEO",
    company: "NovaTech"
  },
  {
    quote:
      "Une équipe à l’écoute, réactive et force de proposition. Le nouveau branding reflète enfin l’ADN de notre marque.",
    name: "Sarah L.",
    role: "Responsable Marketing",
    company: "Café District"
  },
  {
    quote:
      "Grâce à leur accompagnement, notre infrastructure est plus stable et sécurisée, avec un support de grande qualité.",
    name: "Youssef K.",
    role: "Directeur IT",
    company: "OptiLog"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="section-padding bg-white paper-abstract"
    >
      <div className="container-wide">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="section-title">Ce que disent nos clients</h2>
            <p className="section-subtitle">
              Nous concevons des expériences digitales qui marquent, et nos
              clients partagent ici leurs retours sur les projets menés avec
              JAWA.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex -space-x-2">
              <div className="h-9 w-9 rounded-full border-2 border-white bg-primary/70" />
              <div className="h-9 w-9 rounded-full border-2 border-white bg-primary/40" />
              <div className="h-9 w-9 rounded-full border-2 border-white bg-primary/20" />
            </div>
            <p className="text-xs font-medium text-neutral-700">
              <span className="text-sm font-semibold text-jawaBlack">
                120+
              </span>{" "}
              clients accompagnés
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-8 shadow-soft"
            >
              <div className="mb-6">
                <span className="mb-4 inline-block text-4xl text-primary">
                  “
                </span>
                <p className="text-sm leading-relaxed text-neutral-800">
                  {t.quote}
                </p>
              </div>

              <div className="mt-auto flex items-center gap-3 pt-4">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-primary/10">
                  {/* Placeholder avatar */}
                </div>
                <figcaption className="text-xs text-neutral-600">
                  <p className="font-semibold text-neutral-900">{t.name}</p>
                  <p>
                    {t.role} · {t.company}
                  </p>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 shadow-sm transition hover:border-primary hover:text-primary">
            ←
          </button>
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-900 bg-neutral-900 text-white shadow-sm transition hover:bg-primary hover:border-primary">
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


