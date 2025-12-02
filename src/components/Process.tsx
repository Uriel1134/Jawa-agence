import React from "react";

const steps = [
  {
    label: "Choix & Analyse",
    description:
      "Immersion dans votre contexte, vos objectifs et vos utilisateurs pour définir une feuille de route claire."
  },
  {
    label: "Design",
    description:
      "Ateliers UX, wireframes et maquettes UI alignés sur votre identité et vos enjeux business."
  },
  {
    label: "Développement",
    description:
      "Développement front & back moderne, intégration, tests et optimisation des performances."
  },
  {
    label: "Livraison",
    description:
      "Mise en ligne, accompagnement au lancement et maintenance continue selon vos besoins."
  }
];

const Process: React.FC = () => {
  return (
    <section id="process" className="section-padding bg-slate-50">
      <div className="container-wide">
        <div className="mb-10 text-center">
          <h2 className="section-title">Votre projet en 4 étapes simples</h2>
        </div>

        <div className="mt-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(225,233,255,0.98))] p-[1px] shadow-soft">
          <div className="rounded-[2.4rem] bg-[repeating-linear-gradient(135deg,#3877FF_0px,#3877FF_1px,#437FFF_1px,#437FFF_4px)] px-6 py-10 sm:px-10 lg:px-14">
            <div className="mb-8 flex items-center justify-between text-white">
              <h3 className="text-lg font-display sm:text-xl">
                Un process clair, conçu pour aller vite
              </h3>
              <span className="hidden rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] sm:inline-flex">
                JAWA PROCESS
              </span>
            </div>

            <div className="grid gap-10 text-white sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <article key={step.label} className="flex flex-col items-center text-center">
                  <div className="mb-4 flex items-center justify-center">
                    <div className="relative">
                      <div className="h-28 w-28 rounded-[2.5rem] bg-white/16" />
                      <div className="absolute inset-4 rounded-full bg-white/80" />
                      <div className="absolute inset-[26%] flex items-center justify-center rounded-full border border-primary/40 bg-primary/5">
                        <span className="text-xl font-display text-primary">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h4 className="mb-2 text-sm font-semibold">
                   {step.label}
                  </h4>
                  <p className="text-xs text-white/80">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;


