import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

interface AboutData {
    image_url: string;
    satisfaction_score: string;
    satisfaction_text: string;
    intro_title: string;
    intro_text: string;
    history_text: string;
    mission_text: string;
    vision_text: string;
}

const AboutManager: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState<AboutData>({
        image_url: '',
        satisfaction_score: '',
        satisfaction_text: '',
        intro_title: '',
        intro_text: '',
        history_text: '',
        mission_text: '',
        vision_text: '',
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        fetchAboutData();
    }, []);

    const fetchAboutData = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('about_section')
            .select('*')
            .single();

        if (error) {
            console.error('Error fetching about data:', error);
        } else if (data) {
            setFormData(data);
        }
        setLoading(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        try {
            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `about-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            return data.publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Erreur lors de l\'upload de l\'image');
            return null;
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let imageUrl = formData.image_url;

        if (selectedFile) {
            const uploadedUrl = await uploadImage(selectedFile);
            if (uploadedUrl) {
                imageUrl = uploadedUrl;
            } else {
                return;
            }
        }

        const dataToSubmit = { ...formData, image_url: imageUrl };

        const { error } = await supabase
            .from('about_section')
            .update(dataToSubmit)
            .eq('id', 1);

        if (!error) {
            alert('Mise à jour réussie !');
            fetchAboutData();
            setSelectedFile(null);
        } else {
            alert('Erreur lors de la mise à jour.');
        }
    };

    if (loading) return <div className="p-10 text-center">Chargement...</div>;

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-display font-bold text-jawaBlack dark:text-white">A Propos</h2>
                <p className="text-gray-500 dark:text-white/60 mt-1">Modifiez le contenu de la section "A Propos".</p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-white/5 p-8 shadow-sm border border-gray-100 dark:border-white/10 max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Section Image & Stats */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Image Principale</label>
                            <div className="flex flex-col gap-3">
                                {formData.image_url && !selectedFile && (
                                    <div className="relative h-48 w-full overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
                                        <img src={formData.image_url} alt="Aperçu" className="h-full w-full object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-2 text-xs text-gray-500 dark:text-white/60 file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-primary hover:file:bg-primary/20 dark:file:bg-primary dark:file:text-white"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Score de satisfaction</label>
                                <input
                                    type="text"
                                    value={formData.satisfaction_score}
                                    onChange={(e) => setFormData({ ...formData, satisfaction_score: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                    placeholder="Ex: 4,9/5"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Texte Satisfaction</label>
                                <input
                                    type="text"
                                    value={formData.satisfaction_text}
                                    onChange={(e) => setFormData({ ...formData, satisfaction_text: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                    placeholder="Ex: Basé sur 120 avis"
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100 dark:border-white/10" />

                    {/* Section Textes */}
                    <div className="space-y-6">
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Titre Principal</label>
                            <input
                                type="text"
                                value={formData.intro_title}
                                onChange={(e) => setFormData({ ...formData, intro_title: e.target.value })}
                                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Introduction</label>
                            <textarea
                                value={formData.intro_text}
                                onChange={(e) => setFormData({ ...formData, intro_text: e.target.value })}
                                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                rows={3}
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Notre Histoire</label>
                            <textarea
                                value={formData.history_text}
                                onChange={(e) => setFormData({ ...formData, history_text: e.target.value })}
                                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                rows={3}
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Notre Mission</label>
                            <textarea
                                value={formData.mission_text}
                                onChange={(e) => setFormData({ ...formData, mission_text: e.target.value })}
                                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                rows={3}
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Notre Vision</label>
                            <textarea
                                value={formData.vision_text}
                                onChange={(e) => setFormData({ ...formData, vision_text: e.target.value })}
                                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full rounded-xl bg-primary py-4 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 hover:shadow-primary/40 disabled:opacity-50"
                        >
                            {uploading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AboutManager;
