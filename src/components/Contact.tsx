import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import SectionHeader from "./SectionHeader";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const [footerData, setFooterData] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      const { data, error } = await supabase
        .from('company_info')
        .select('email')
        .single();

      if (error) {
        console.error('Error fetching company info:', error);
      } else {
        setFooterData(data);
      }
    };

    fetchFooterData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section-padding-lg bg-white/50 dark:bg-jawaBlack/50 backdrop-blur-sm transition-colors duration-300">
      <div className="container-wide max-w-6xl">
        <div className="mb-20">
          <SectionHeader
            number="09."
            title="Prêt à surclasser la concurrence ?"
            backgroundTitle="CONTACT"
            description="Votre vision mérite une exécution parfaite. Dites-nous où vous voulez aller, nous tracerons la route."
            align="left"
            className="mb-0"
          />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Contact Info */}
          <div className="flex flex-col gap-6">
            {/* Email */}
            <a
              href={`mailto:${footerData?.email || 'contact@jawa-agence.tech'}`}
              className="group flex items-center gap-4 p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-primary dark:hover:border-primary bg-white dark:bg-white/[0.02] transition-all"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all flex-shrink-0">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/60 mb-1">Email</p>
                <p className="text-base font-bold text-jawaBlack dark:text-white">{footerData?.email || 'contact@jawa-agence.tech'}</p>
              </div>
            </a>

            {/* Google Map */}
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden flex-1">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126182.77764357384!2d2.3508946!3d6.3702928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1024a9a3001d66e3%3A0xd8b0a9f7e0e5d0d0!2sCotonou%2C%20Benin!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '450px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JAWA Agency Location"
              />
            </div>
          </div>

          {/* Right - Form */}
          <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-8 lg:p-10">
            <h3 className="text-2xl font-display font-bold text-jawaBlack dark:text-white mb-2">
              Envoyez-nous un message
            </h3>
            <p className="text-sm text-gray-500 dark:text-white/60 mb-8">
              Nous vous répondons sous 24h
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-white/60 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-jawaBlack dark:text-white text-sm focus:outline-none focus:border-primary dark:focus:border-primary transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-white/60 mb-2">
                    Société
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-jawaBlack dark:text-white text-sm focus:outline-none focus:border-primary dark:focus:border-primary transition"
                    placeholder="Votre entreprise"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-white/60 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-jawaBlack dark:text-white text-sm focus:outline-none focus:border-primary dark:focus:border-primary transition"
                    placeholder="vous@exemple.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-white/60 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-jawaBlack dark:text-white text-sm focus:outline-none focus:border-primary dark:focus:border-primary transition"
                    placeholder="+229..."
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-white/60 mb-2">
                    Type de projet *
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-jawaBlack dark:text-white text-sm focus:outline-none focus:border-primary dark:focus:border-primary transition"
                  >
                    <option value="">Sélectionner</option>
                    <option value="web">Site Web</option>
                    <option value="mobile">App Mobile</option>
                    <option value="uiux">UI/UX</option>
                    <option value="branding">Branding</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-white/60 mb-2">
                    Budget
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-jawaBlack dark:text-white text-sm focus:outline-none focus:border-primary dark:focus:border-primary transition"
                  >
                    <option value="">À définir</option>
                    <option value="1">&lt; 5K €</option>
                    <option value="2">5K – 15K €</option>
                    <option value="3">15K – 30K €</option>
                    <option value="4">&gt; 30K €</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-white/60 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-jawaBlack dark:text-white text-sm focus:outline-none focus:border-primary dark:focus:border-primary transition resize-none"
                  placeholder="Décrivez votre projet..."
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
              >
                Lancer la transformation
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
