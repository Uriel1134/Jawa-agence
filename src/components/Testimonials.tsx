import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import SectionHeader from "./SectionHeader";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
  email: string;
  avatar_url?: string;
  approved: boolean;
}

const Testimonials: React.FC = () => {
  // ... state declarations
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    quote: '',
    name: '',
    role: '',
    company: '',
    email: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Error fetching testimonials:', error);
    } else if (data) {
      setTestimonials(data);
    }
    setLoading(false);
  };

  const uploadAvatar = async (file: File): Promise<string | null> => {
    // ... uploadAvatar implementation
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `avatar-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Erreur lors de l\'upload de l\'avatar');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // ... handleSubmit implementation
    e.preventDefault();
    setSubmitting(true);

    let avatarUrl = null;
    if (selectedFile) {
      avatarUrl = await uploadAvatar(selectedFile);
    }

    const { error } = await supabase
      .from('testimonials')
      .insert([{ ...formData, avatar_url: avatarUrl, approved: false }]);

    if (!error) {
      alert('Merci ! Votre témoignage a été soumis et sera affiché après validation.');
      setFormData({ quote: '', name: '', role: '', company: '', email: '' });
      setSelectedFile(null);
      setShowForm(false);
    } else {
      alert('Erreur lors de la soumission. Veuillez réessayer.');
    }
    setSubmitting(false);
  };

  return (
    <section
      id="testimonials"
      className="section-padding bg-white/50 paper-abstract dark:bg-jawaBlack/50 backdrop-blur-sm transition-colors duration-300"
    >
      <div className="container-wide">
        <div className="mb-24 relative">
          <SectionHeader
            number="06."
            title="Avis Clients"
            description="Nous concevons des expériences digitales qui marquent, et nos clients partagent ici leurs retours sur les projets menés avec JAWA."
            align="left"
          />
          <div className="absolute top-0 right-0 flex flex-col gap-3 mt-10 md:mt-0">
            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="flex -space-x-2">
                <div className="h-9 w-9 rounded-full border-2 border-white dark:border-jawaBlack bg-primary/70" />
                <div className="h-9 w-9 rounded-full border-2 border-white dark:border-jawaBlack bg-primary/40" />
                <div className="h-9 w-9 rounded-full border-2 border-white dark:border-jawaBlack bg-primary/20" />
              </div>
              <p className="text-xs font-medium text-neutral-700 dark:text-white/70">
                <span className="text-sm font-semibold text-jawaBlack dark:text-white">
                  120+
                </span>{" "}
                clients accompagnés
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="self-start px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition"
            >
              {showForm ? 'Annuler' : 'Laisser un témoignage'}
            </button>
          </div>
        </div>

        {/* Formulaire de soumission */}
        {showForm && (
          <div className="mb-8 rounded-2xl bg-gray-50 dark:bg-white/5 p-6 border border-gray-200 dark:border-white/10">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Partagez votre expérience</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-white/60 mb-1.5">Votre témoignage *</label>
                <textarea
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-3 text-sm dark:text-white focus:border-primary focus:outline-none"
                  rows={4}
                  placeholder="Parlez-nous de votre expérience avec JAWA..."
                  required
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-white/60 mb-1.5">Votre nom *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-3 text-sm dark:text-white focus:border-primary focus:outline-none"
                    placeholder="Ex: Sarah L."
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-white/60 mb-1.5">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-3 text-sm dark:text-white focus:border-primary focus:outline-none"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-white/60 mb-1.5">Votre poste *</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-3 text-sm dark:text-white focus:border-primary focus:outline-none"
                    placeholder="Ex: CEO"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-white/60 mb-1.5">Entreprise *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-3 text-sm dark:text-white focus:border-primary focus:outline-none"
                    placeholder="Ex: TechCorp"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-white/60 mb-1.5">Votre photo (optionnel)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-2 text-xs text-gray-500 dark:text-white/60 file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-primary hover:file:bg-primary/20 dark:file:bg-primary dark:file:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={submitting || uploading}
                className="w-full md:w-auto px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition disabled:opacity-50"
              >
                {uploading ? 'Upload en cours...' : submitting ? 'Envoi en cours...' : 'Envoyer mon témoignage'}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500 dark:text-white/60 py-12">Chargement...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-white/60 py-12">Aucun témoignage pour le moment.</div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <figure
                  key={t.id}
                  className="flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-8 shadow-soft dark:bg-white/5 dark:border-white/10"
                >
                  <div className="mb-6">
                    <span className="mb-4 inline-block text-4xl text-primary">
                      "
                    </span>
                    <p className="text-sm leading-relaxed text-neutral-800 dark:text-white/80">
                      {t.quote}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-3 pt-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full bg-primary/10">
                      {t.avatar_url ? (
                        <img src={t.avatar_url} alt={t.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-primary font-bold">
                          {t.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <figcaption className="text-xs text-neutral-600 dark:text-white/60">
                      <p className="font-semibold text-neutral-900 dark:text-white">{t.name}</p>
                      <p>
                        {t.role} · {t.company}
                      </p>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 shadow-sm transition hover:border-primary hover:text-primary dark:bg-white/10 dark:border-white/10 dark:text-white dark:hover:bg-primary dark:hover:border-primary">
                ←
              </button>
              <button className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-900 bg-neutral-900 text-white shadow-sm transition hover:bg-primary hover:border-primary dark:bg-white dark:text-jawaBlack dark:border-white dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary">
                →
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Testimonials;


