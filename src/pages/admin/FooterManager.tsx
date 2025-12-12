import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";


interface CompanyInfo {
    id: number;
    name: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    address_details: string;
    social_linkedin: string;
    social_instagram: string;
    social_behance: string;
    social_dribbble: string;
    social_twitter: string;
    hero_image_url: string;
}

const FooterManager: React.FC = () => {
    const [info, setInfo] = useState<CompanyInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        fetchInfo();
    }, []);

    const fetchInfo = async () => {
        try {
            const { data, error } = await supabase
                .from("company_info")
                .select("*")
                .single();

            if (error) {
                console.error("Error fetching company info:", error);
            } else {
                setInfo(data);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!info) return;
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUploadConfirm = async () => {
        if (!selectedFile || !info) return;

        try {
            setUploading(true);
            const file = selectedFile;
            const fileExt = file.name.split('.').pop();
            const fileName = `hero-image-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            const publicUrl = data.publicUrl;

            // 1. Update local state
            setInfo({ ...info, hero_image_url: publicUrl });

            // 2. Auto-save to database
            const { error: dbError } = await supabase
                .from("company_info")
                .update({ hero_image_url: publicUrl })
                .eq("id", info.id);

            if (dbError) throw dbError;

            setSelectedFile(null);
            alert("Image mise à jour succès !");
        } catch (error: any) {
            console.error('Error uploading image:', error);
            alert(`Erreur lors de l'upload: ${error.message || error.error_description || 'Inconnue'}`);
        } finally {
            setUploading(false);
            // Reset file input manually if needed, but react makes this tricky without ref.
            // For now, let's just clear state.
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!info) return;
        setSaving(true);

        try {
            const { error } = await supabase
                .from("company_info")
                .update({
                    description: info.description,
                    email: info.email,
                    phone: info.phone,
                    address: info.address,
                    address_details: info.address_details,
                    hero_image_url: info.hero_image_url,
                    social_linkedin: info.social_linkedin,
                    social_instagram: info.social_instagram,
                    social_behance: info.social_behance,
                    social_dribbble: info.social_dribbble,
                    social_twitter: info.social_twitter,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", info.id);

            if (error) throw error;
            alert("Informations mises à jour !");
        } catch (error) {
            console.error("Error updating info:", error);
            alert("Erreur lors de la sauvegarde.");
        } finally {
            setSaving(false);
        }
    }


    if (loading) return <div className="p-8 text-white">Chargement...</div>;
    if (!info) return <div className="p-8 text-white">Aucune donnée trouvée. Veuillez exécuter le script SQL.</div>;

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Configuration Générale & Footer</h1>
                <p className="text-white/60">Gérez l'image d'accueil, les contacts et le footer.</p>
            </div>

            <form onSubmit={handleSave} className="max-w-4xl space-y-8">

                {/* Hero Section Image */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 rounded-full bg-blue-500" />
                        Image Hero Section
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Aperçu</label>
                            <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-black/20">
                                {info.hero_image_url ? (
                                    <img src={info.hero_image_url} alt="Hero Preview" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-white/40">
                                        Aucune image
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Téléverser une nouvelle image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    disabled={uploading}
                                    className="w-full rounded-xl border border-white/10 bg-black/20 p-2 text-sm text-white/60 file:mr-4 file:rounded-lg file:border-0 file:bg-primary/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/30 transition shadow-inner"
                                />
                                {selectedFile && (
                                    <div className="mt-3 p-3 bg-primary/10 rounded-xl border border-primary/20 flex items-center justify-between">
                                        <span className="text-sm text-white/80 truncate max-w-[200px]">{selectedFile.name}</span>
                                        <button
                                            type="button"
                                            onClick={handleUploadConfirm}
                                            disabled={uploading}
                                            className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg text-xs font-bold transition shadow-lg shadow-primary/20 disabled:opacity-50"
                                        >
                                            {uploading ? 'Envoi...' : 'Confirmer / Upload'}
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Ou modifier l'URL manuellement</label>
                                <input
                                    type="text"
                                    name="hero_image_url"
                                    value={info.hero_image_url || ""}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full rounded-xl bg-black/20 border border-white/10 p-3 text-white focus:border-primary focus:outline-none transition"
                                />
                            </div>
                            <p className="text-xs text-white/40">Recommandé : Format 4:3 ou Carré, haute résolution.</p>
                        </div>
                    </div>
                </div>

                {/* Section Contact */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 rounded-full bg-primary" />
                        Informations de Contact
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-white/80 mb-2">Description (Footer)</label>
                            <textarea
                                name="description"
                                value={info.description || ""}
                                onChange={handleChange}
                                rows={3}
                                className="w-full rounded-xl bg-black/20 border border-white/10 p-3 text-white focus:border-primary focus:outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={info.email || ""}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-black/20 border border-white/10 p-3 text-white focus:border-primary focus:outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Téléphone</label>
                            <input
                                type="text"
                                name="phone"
                                value={info.phone || ""}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-black/20 border border-white/10 p-3 text-white focus:border-primary focus:outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Adresse</label>
                            <input
                                type="text"
                                name="address"
                                value={info.address || ""}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-black/20 border border-white/10 p-3 text-white focus:border-primary focus:outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Détails Adresse</label>
                            <input
                                type="text"
                                name="address_details"
                                value={info.address_details || ""}
                                onChange={handleChange}
                                placeholder="ex: Sur rendez-vous"
                                className="w-full rounded-xl bg-black/20 border border-white/10 p-3 text-white focus:border-primary focus:outline-none transition"
                            />
                        </div>
                    </div>
                </div>

                {/* Section Réseaux Sociaux */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 rounded-full bg-purple-500" />
                        Réseaux Sociaux
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">LinkedIn URL</label>
                            <input
                                type="url"
                                name="social_linkedin"
                                value={info.social_linkedin || ""}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-black/20 border border-white/10 p-3 text-white focus:border-primary focus:outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Instagram URL</label>
                            <input
                                type="url"
                                name="social_instagram"
                                value={info.social_instagram || ""}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-black/20 border border-white/10 p-3 text-white focus:border-primary focus:outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Behance URL</label>
                            <input
                                type="url"
                                name="social_behance"
                                value={info.social_behance || ""}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-black/20 border border-white/10 p-3 text-white focus:border-primary focus:outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Dribbble URL</label>
                            <input
                                type="url"
                                name="social_dribbble"
                                value={info.social_dribbble || ""}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-black/20 border border-white/10 p-3 text-white focus:border-primary focus:outline-none transition"
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="fixed bottom-8 right-8 btn-primary bg-primary text-white shadow-lg shadow-black/50 z-50 flex items-center gap-2"
                >
                    {saving ? "Enregistrement..." : "Sauvegarder les modifications"}
                </button>
            </form>
        </div>
    );
};

export default FooterManager;
