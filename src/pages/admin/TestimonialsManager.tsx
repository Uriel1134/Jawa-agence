import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

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

const TestimonialsManager: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        quote: '',
        name: '',
        role: '',
        company: '',
        email: '',
        avatar_url: ''
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching testimonials:', error);
        else setTestimonials(data || []);
        setLoading(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const uploadAvatar = async (file: File): Promise<string | null> => {
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
        e.preventDefault();

        let avatarUrl = formData.avatar_url;

        if (selectedFile) {
            const uploadedUrl = await uploadAvatar(selectedFile);
            if (uploadedUrl) {
                avatarUrl = uploadedUrl;
            } else {
                return;
            }
        }

        const dataToSubmit = { ...formData, avatar_url: avatarUrl || null, approved: true };

        if (editingId) {
            const { error } = await supabase
                .from('testimonials')
                .update(dataToSubmit)
                .eq('id', editingId);
            if (!error) {
                resetForm();
                fetchTestimonials();
            }
        } else {
            const { error } = await supabase.from('testimonials').insert([dataToSubmit]);
            if (!error) {
                resetForm();
                fetchTestimonials();
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Supprimer ce témoignage ?')) {
            const { error } = await supabase.from('testimonials').delete().eq('id', id);
            if (!error) fetchTestimonials();
        }
    };

    const handleApprove = async (id: number, approved: boolean) => {
        const { error } = await supabase
            .from('testimonials')
            .update({ approved })
            .eq('id', id);
        if (!error) fetchTestimonials();
    };

    const handleEdit = (testimonial: Testimonial) => {
        setEditingId(testimonial.id);
        setFormData({
            quote: testimonial.quote,
            name: testimonial.name,
            role: testimonial.role,
            company: testimonial.company,
            email: testimonial.email,
            avatar_url: testimonial.avatar_url || ''
        });
    };

    const resetForm = () => {
        setFormData({
            quote: '',
            name: '',
            role: '',
            company: '',
            email: '',
            avatar_url: ''
        });
        setEditingId(null);
        setSelectedFile(null);
    };

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-display font-bold text-jawaBlack dark:text-white">Témoignages</h2>
                <p className="text-gray-500 dark:text-white/60 mt-1">Gérez les témoignages clients.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Formulaire */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 rounded-2xl bg-white dark:bg-white/5 p-6 shadow-sm border border-gray-100 dark:border-white/10">
                        <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
                            {editingId ? 'Modifier' : 'Ajouter'} un témoignage
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Citation</label>
                                <textarea
                                    value={formData.quote}
                                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                    rows={4}
                                    placeholder="Le témoignage du client..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Nom</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                    placeholder="Ex: Sarah L."
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Poste</label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                    placeholder="Ex: CEO"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Entreprise</label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                    placeholder="Ex: TechCorp"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                    placeholder="email@exemple.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Avatar (optionnel)</label>
                                {formData.avatar_url && !selectedFile && (
                                    <div className="mb-2 h-16 w-16 rounded-full overflow-hidden border border-gray-200 dark:border-white/10">
                                        <img src={formData.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-2 text-xs text-gray-500 dark:text-white/60 file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-primary hover:file:bg-primary/20 dark:file:bg-primary dark:file:text-white"
                                />
                                {editingId && <p className="mt-1 text-[10px] text-gray-400 dark:text-white/30">Laissez vide pour conserver l'avatar actuel.</p>}
                            </div>
                            <div className="pt-2 flex gap-2">
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 hover:shadow-primary/40 disabled:opacity-50"
                                >
                                    {uploading ? 'Enregistrement...' : editingId ? 'Mettre à jour' : 'Ajouter'}
                                </button>
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="rounded-xl bg-gray-100 dark:bg-white/10 px-4 py-3 text-sm font-bold text-gray-600 dark:text-white transition hover:bg-gray-200 dark:hover:bg-white/20"
                                    >
                                        Annuler
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Liste */}
                <div className="lg:col-span-2">
                    <div className="rounded-2xl bg-white dark:bg-white/5 shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden">
                        {loading ? (
                            <div className="p-12 text-center text-gray-500 dark:text-white/60">Chargement...</div>
                        ) : testimonials.length === 0 ? (
                            <div className="p-12 text-center text-gray-500 dark:text-white/60">Aucun témoignage.</div>
                        ) : (
                            <div className="divide-y divide-gray-100 dark:divide-white/10">
                                {testimonials.map((testimonial) => (
                                    <div key={testimonial.id} className="group flex items-start gap-4 p-6 transition hover:bg-gray-50 dark:hover:bg-white/5">
                                        <div className="flex-shrink-0">
                                            {testimonial.avatar_url ? (
                                                <img src={testimonial.avatar_url} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover" />
                                            ) : (
                                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                    {testimonial.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <p className="text-sm text-gray-600 dark:text-white/60 italic">"{testimonial.quote}"</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                                                {testimonial.approved ? (
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400">Approuvé</span>
                                                ) : (
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">En attente</span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-white/40">{testimonial.role} · {testimonial.company}</p>
                                            <p className="text-xs text-gray-400 dark:text-white/30">✉️ {testimonial.email}</p>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
                                            {!testimonial.approved && (
                                                <button
                                                    onClick={() => handleApprove(testimonial.id, true)}
                                                    className="rounded-lg p-2 text-gray-400 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-500/20 dark:hover:text-green-400 transition text-xs font-medium uppercase"
                                                >
                                                    Approuver
                                                </button>
                                            )}
                                            {testimonial.approved && (
                                                <button
                                                    onClick={() => handleApprove(testimonial.id, false)}
                                                    className="rounded-lg p-2 text-gray-400 hover:bg-yellow-50 hover:text-yellow-600 dark:hover:bg-yellow-500/20 dark:hover:text-yellow-400 transition text-xs font-medium uppercase"
                                                >
                                                    Désapprouver
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleEdit(testimonial)}
                                                className="rounded-lg p-2 text-gray-400 hover:bg-primary/5 hover:text-primary dark:hover:bg-primary dark:hover:text-white transition text-xs font-medium uppercase"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(testimonial.id)}
                                                className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/20 dark:hover:text-red-400 transition text-xs font-medium uppercase"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsManager;
