import React, { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    label: "Immersion",
    description: "Analyse de votre marché et définition de la stratégie.",
    tags: ["Audit UX", "Ateliers", "Stratégie"],
  },
  {
    number: "02",
    label: "Design UI",
    description: "Création d'interfaces ergonomiques et esthétiques.",
    tags: ["Maquettes", "Prototype", "Design System"],
  },
  {
    number: "03",
    label: "Développement",
    description: "Code robuste et performant (React, Node, Supabase).",
    tags: ["Frontend", "Backend", "QA Testing"],
  },
  {
    number: "04",
    label: "Lancement",
    description: "Mise en ligne sécurisée et accompagnement.",
    tags: ["Déploiement", "Formation", "Analytics"],
  },
];

const ProcessStep: React.FC<{ step: typeof steps[0]; index: number }> = ({ step, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col gap-8 md:flex-row md:items-center ${isEven ? "md:flex-row-reverse" : ""
        } opacity-0 ${isVisible ? (isEven ? "animate-slide-in-left" : "animate-slide-in-right") : ""}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Content Side */}
      <div className="flex-1">
        <div
          className={`group relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-500 hover:border-primary/20 hover:shadow-lg md:p-8 dark:bg-white/5 dark:border-white/10 ${isEven ? "md:text-left" : "md:text-left"
            }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="font-display text-4xl font-bold text-gray-100 transition-colors duration-500 group-hover:text-primary/10 dark:text-white/5 dark:group-hover:text-primary/20">
                {step.number}
              </span>
              <h3 className="font-display text-xl font-bold text-jawaBlack dark:text-white">
                {step.label}
              </h3>
            </div>
          </div>

          <p className="mb-6 text-sm leading-relaxed text-gray-500 dark:text-white/60">
            {step.description}
          </p>

          {/* Tags Grid */}
          <div className="flex flex-wrap gap-2">
            {step.tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 transition-colors group-hover:bg-primary/5 group-hover:text-primary dark:bg-white/10 dark:text-white/70 dark:group-hover:bg-primary/20 dark:group-hover:text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Center Dot (Desktop) */}
      <div className="relative z-10 hidden flex-shrink-0 items-center justify-center md:flex">
        <div className={`flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 transition-all duration-700 ${isVisible ? "scale-100" : "scale-0"} group-hover:bg-primary dark:bg-white/20 dark:group-hover:bg-primary`}>
          <div className={`h-2 w-2 rounded-full bg-white ${isVisible ? "opacity-100" : "opacity-0"}`} />
        </div>
      </div>

      {/* Empty Side for Balance */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
};

const Process: React.FC = () => {
  return (
    <section id="process" className="bg-white dark:bg-jawaBlack py-32 overflow-hidden transition-colors duration-300">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-24 flex flex-col items-end justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="mb-6 inline-block rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary dark:bg-white/5 dark:border-white/10 dark:text-white">
              Notre Méthode
            </span>
            <h2 className="font-display text-5xl font-bold leading-tight text-jawaBlack dark:text-white md:text-6xl lg:text-7xl">
              Simple & <br />
              <span className="text-gray-300 dark:text-white/40">Efficace.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-gray-500 dark:text-white/60">
            Une approche structurée et transparente. Nous décomposons la complexité pour livrer des produits d'exception, étape par étape.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          {/* Central Line (Desktop) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gray-100 dark:bg-white/10 md:block" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => (
              <ProcessStep key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
