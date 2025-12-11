import React from "react";

const steps = [
  {
    label: "Immersion & Stratégie",
    description:
      "Nous plongeons dans votre écosystème pour définir une feuille de route précise et ambitieuse.",
  },
  {
    label: "Design System & UI",
    description:
      "Création d'interfaces ergonomiques et esthétiques, pensées pour l'utilisateur et votre image de marque.",
  },
  {
    label: "Développement Craft",
    description:
      "Code robuste, performant et évolutif. Nous utilisons les meilleures stacks (React, Node, Supabase).",
  },
  {
    label: "Lancement & Scale",
    description:
      "Déploiement sécurisé, monitoring et accompagnement pour faire grandir votre produit.",
  },
];

const Process: React.FC = () => {
  return (
    <section id="process" className="bg-white py-24 text-jawaBlack">
      <div className="container-wide">
        <div className="mb-20 flex flex-col items-start justify-between gap-8 border-b border-gray-100 pb-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Notre Méthode
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Une approche structurée <br />
              <span className="text-gray-400">pour des résultats concrets.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-gray-500">
            Nous ne laissons rien au hasard. Chaque étape de notre processus est
            conçue pour sécuriser votre investissement et garantir l'excellence
            du produit final.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.label}
              className="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-slate-50 p-8 transition-all duration-500 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5"
            >
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-display text-4xl font-bold text-gray-200 transition-colors duration-500 group-hover:text-primary">
                    0{index + 1}
                  </span>
                  <div className="h-px w-12 bg-gray-200 transition-colors duration-500 group-hover:bg-primary/30" />
                </div>
                <h3 className="mb-4 text-xl font-bold tracking-tight text-jawaBlack">
                  {step.label}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 transition-colors duration-500 group-hover:text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
