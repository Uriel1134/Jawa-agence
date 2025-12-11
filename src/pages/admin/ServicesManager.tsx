import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

interface Service {
    id: number;
    title: string;
    description: string;
    details: string; // New field
    image: string;
    gradient: string;
}

const GRADIENT_OPTIONS = [
    { label: 'Bleu Jawa', value: 'from-[#2C14C7] via-[#1B1B3A] to-[#02010A]', preview: 'bg-gradient-to-br from-[#2C14C7] via-[#1B1B3A] to-[#02010A]' },
    { label: 'Sombre Profond', value: 'from-[#02010A] via-[#2C14C7] to-[#181824]', preview: 'bg-gradient-to-br from-[#02010A] via-[#2C14C7] to-[#181824]' },
    { label: 'Nuit & Bleu', value: 'from-[#111827] via-[#2C14C7] to-[#060714]', preview: 'bg-gradient-to-br from-[#111827] via-[#2C14C7] to-[#060714]' },
    { label: 'Bleu & Noir', value: 'from-[#2C14C7] via-[#111827] to-[#020617]', preview: 'bg-gradient-to-br from-[#2C14C7] via-[#111827] to-[#020617]' },
    { label: 'Noir & Bleu', value: 'from-[#020617] via-[#2C14C7] to-[#111827]', preview: 'bg-gradient-to-br from-[#020617] via-[#2C14C7] to-[#111827]' },
    { label: 'Noir & Indigo', value: 'from-[#020617] via-[#111827] to-[#2C14C7]', preview: 'bg-gradient-to-br from-[#020617] via-[#111827] to-[#2C14C7]' },
];

const ServicesManager: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        details: '', // New field
        image: '',
        gradient: GRADIENT_OPTIONS[0].value,
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('id', { ascending: true });

        if (error) console.error('Error fetching services:', error);
        else setServices(data || []);
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
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

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

        let imageUrl = formData.image;

        if (selectedFile) {
            const uploadedUrl = await uploadImage(selectedFile);
            if (uploadedUrl) {
                imageUrl = uploadedUrl;
            } else {
                return; // Stop if upload failed
            }
        }

        const dataToSubmit = { ...formData, image: imageUrl };

        if (editingId) {
            const { error } = await supabase
                .from('services')
                .update(dataToSubmit)
                .eq('id', editingId);
            if (!error) {
                setEditingId(null);
                resetForm();
                fetchServices();
            }
        } else {
            const { error } = await supabase.from('services').insert([dataToSubmit]);
            if (!error) {
                resetForm();
                fetchServices();
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
            const { error } = await supabase.from('services').delete().eq('id', id);
            if (!error) fetchServices();
        }
    };

    const handleEdit = (service: Service) => {
        setEditingId(service.id);
        setFormData({
            title: service.title,
            description: service.description,
            details: service.details || '', // New field
            image: service.image || '',
            gradient: service.gradient || GRADIENT_OPTIONS[0].value,
        });
        setSelectedFile(null);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            details: '', // New field
            image: '',
            gradient: GRADIENT_OPTIONS[0].value,
        });
        setEditingId(null);
        setSelectedFile(null);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-display font-bold text-jawaBlack">Services</h2>
                    <p className="text-gray-500 mt-1">Gérez les prestations affichées sur la page d'accueil.</p>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Formulaire */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                        <h3 className="mb-6 text-lg font-bold text-gray-900">
                            {editingId ? 'Modifier le service' : 'Ajouter un service'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Titre</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm font-medium transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="Ex: Développement Web"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Description Courte</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm font-medium transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    rows={3}
                                    placeholder="Description courte du service..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Détails Complets</label>
                                <textarea
                                    value={formData.details}
                                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm font-medium transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    rows={6}
                                    placeholder="Description détaillée pour la page dédiée..."
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Image</label>
                                <div className="flex flex-col gap-2">
                                    {formData.image && !selectedFile && (
                                        <div className="relative h-32 w-full overflow-hidden rounded-xl border border-gray-200">
                                            <img src={formData.image} alt="Aperçu" className="h-full w-full object-cover" />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2 text-xs text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-primary hover:file:bg-primary/20"
                                    />
                                    <p className="text-[10px] text-gray-400">Laissez vide pour conserver l'image actuelle.</p>
                                </div>
                            </div>


                            <div className="pt-2 flex gap-2">
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 hover:shadow-primary/40 disabled:opacity-50"
                                >
                                    {uploading ? 'Upload en cours...' : (editingId ? 'Mettre à jour' : 'Ajouter')}
                                </button>
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="rounded-xl bg-gray-100 px-4 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-200"
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
                    <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                        {loading ? (
                            <div className="p-12 text-center text-gray-500">Chargement...</div>
                        ) : services.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold">
                                    S
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Aucun service</h3>
                                <p className="text-gray-500">Commencez par ajouter votre premier service.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {services.map((service) => (
                                    <div key={service.id} className="group flex items-start gap-4 p-6 transition hover:bg-gray-50">
                                        <div className={`h-16 w-16 flex-shrink-0 rounded-xl bg-gradient-to-br ${service.gradient} shadow-sm`} />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-base font-bold text-gray-900">{service.title}</h4>
                                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{service.description}</p>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
                                            <button
                                                onClick={() => handleEdit(service)}
                                                className="rounded-lg p-2 text-gray-400 hover:bg-primary/5 hover:text-primary transition text-xs font-medium uppercase"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(service.id)}
                                                className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition text-xs font-medium uppercase"
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

export default ServicesManager;

