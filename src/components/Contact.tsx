import React from "react";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="section-padding bg-slate-950">
      <div className="container-wide grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center text-white">
        <div>
          <h2 className="section-title text-white">
            Parlons de votre prochain projet
          </h2>
          <p className="section-subtitle mb-6 text-white/70">
            Décrivez vos besoins en quelques lignes et nous reviendrons vers
            vous avec une proposition claire et adaptée à vos enjeux.
          </p>
          <div className="space-y-3 text-sm text-white/70">
            <p>
              <span className="font-semibold text-white">Email :</span>{" "}
              contact@jawa-agency.com
            </p>
            <p>
              <span className="font-semibold text-white">Téléphone :</span>{" "}
              +212 6 00 00 00 00
            </p>
            <p>
              <span className="font-semibold text-white">Horaires :</span> Lun
              – Ven · 9h00 – 18h30
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white/5 p-6 shadow-soft backdrop-blur-lg">
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-[0.16em] text-white/70">
                  Nom complet
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-primary"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-[0.16em] text-white/70">
                  Société
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-primary"
                  placeholder="Nom de votre entreprise"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-[0.16em] text-white/70">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-primary"
                  placeholder="vous@exemple.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-[0.16em] text-white/70">
                  Téléphone
                </label>
                <input
                  type="tel"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-primary"
                  placeholder="+212..."
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-[0.16em] text-white/70">
                  Type de projet
                </label>
                <select className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-primary">
                  <option className="bg-slate-900 text-white">
                    Sélectionner
                  </option>
                  <option className="bg-slate-900 text-white">
                    Développement Web
                  </option>
                  <option className="bg-slate-900 text-white">
                    Développement Mobile
                  </option>
                  <option className="bg-slate-900 text-white">
                    UI/UX &amp; Design
                  </option>
                  <option className="bg-slate-900 text-white">
                    Branding &amp; Identité
                  </option>
                  <option className="bg-slate-900 text-white">
                    Maintenance Informatique
                  </option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-[0.16em] text-white/70">
                  Budget estimé
                </label>
                <select className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-primary">
                  <option className="bg-slate-900 text-white">
                    À définir
                  </option>
                  <option className="bg-slate-900 text-white">
                    &lt; 20 000 MAD
                  </option>
                  <option className="bg-slate-900 text-white">
                    20 000 – 60 000 MAD
                  </option>
                  <option className="bg-slate-900 text-white">
                    60 000 – 150 000 MAD
                  </option>
                  <option className="bg-slate-900 text-white">
                    &gt; 150 000 MAD
                  </option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-[0.16em] text-white/70">
                Détails du projet
              </label>
              <textarea
                rows={4}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-primary"
                placeholder="Parlez-nous de vos objectifs, de vos fonctionnalités clés, de vos contraintes..."
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Envoyer la demande
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;


