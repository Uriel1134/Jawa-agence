import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

interface TrustedCompany {
    id: number;
    name: string;
    logo_url: string;
}

const TrustedManager: React.FC = () => {
    const [companies, setCompanies] = useState<TrustedCompany[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('trusted_companies')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching companies:', error);
        else setCompanies(data || []);
        setLoading(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const uploadLogo = async (file: File): Promise<string | null> => {
        try {
            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `logo-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            return data.publicUrl;
        } catch (error) {
            console.error('Error uploading logo:', error);
            alert('Erreur lors de l\'upload du logo');
            return null;
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile || !name) {
            alert('Veuillez fournir un nom et un logo.');
            return;
        }

        const logoUrl = await uploadLogo(selectedFile);
        if (!logoUrl) return;

        const { error } = await supabase
            .from('trusted_companies')
            .insert([{ name, logo_url: logoUrl }]);

        if (!error) {
            setName('');
            setSelectedFile(null);
            fetchCompanies();
        } else {
            alert('Erreur lors de l\'ajout.');
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Supprimer ce partenaire ?')) {
            const { error } = await supabase.from('trusted_companies').delete().eq('id', id);
            if (!error) fetchCompanies();
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-display font-bold text-jawaBlack dark:text-white">Partenaires</h2>
                <p className="text-gray-500 dark:text-white/60 mt-1">Gérez les logos de la section "Ils nous font confiance".</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Formulaire */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 rounded-2xl bg-white dark:bg-white/5 p-6 shadow-sm border border-gray-100 dark:border-white/10">
                        <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">Ajouter un partenaire</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Nom de l'entreprise</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                    placeholder="Ex: Google"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Logo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-2 text-xs text-gray-500 dark:text-white/60 file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-primary hover:file:bg-primary/20 dark:file:bg-primary dark:file:text-white"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={uploading}
                                className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 hover:shadow-primary/40 disabled:opacity-50"
                            >
                                {uploading ? 'Ajout en cours...' : 'Ajouter'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Liste */}
                <div className="lg:col-span-2">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {loading ? (
                            <div className="col-span-full text-center text-gray-500 dark:text-white/60">Chargement...</div>
                        ) : companies.length === 0 ? (
                            <div className="col-span-full text-center text-gray-500 dark:text-white/60">Aucun partenaire.</div>
                        ) : (
                            companies.map((company) => (
                                <div key={company.id} className="group relative flex flex-col items-center rounded-2xl bg-white dark:bg-white/5 p-6 shadow-sm border border-gray-100 dark:border-white/10 transition hover:shadow-md">
                                    <div className="h-16 w-full flex items-center justify-center mb-4">
                                        <img src={company.logo_url} alt={company.name} className="max-h-full max-w-full object-contain filter grayscale transition group-hover:grayscale-0" />
                                    </div>
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{company.name}</h4>
                                    <button
                                        onClick={() => handleDelete(company.id)}
                                        className="mt-4 w-full rounded-lg bg-red-50 dark:bg-red-500/10 py-2 text-xs font-semibold text-red-600 dark:text-red-400 transition hover:bg-red-100 dark:hover:bg-red-500/20"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrustedManager;
