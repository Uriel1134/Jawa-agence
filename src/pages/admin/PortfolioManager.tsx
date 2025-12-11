import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

interface Project {
    id: number;
    title: string;
    category: string;
    tag: string;
    image: string;
    github_url?: string;
    figma_url?: string;
    technologies?: string;
}

const PortfolioManager: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        tag: '',
        image: '',
        github_url: '',
        figma_url: '',
        technologies: '',
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('id', { ascending: true });

        if (error) console.error('Error fetching projects:', error);
        else setProjects(data || []);
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
                .from('projects')
                .update(dataToSubmit)
                .eq('id', editingId);
            if (!error) {
                setEditingId(null);
                resetForm();
                fetchProjects();
            }
        } else {
            const { error } = await supabase.from('projects').insert([dataToSubmit]);
            if (!error) {
                resetForm();
                fetchProjects();
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (!error) fetchProjects();
        }
    };

    const handleEdit = (project: Project) => {
        setEditingId(project.id);
        setFormData({
            title: project.title,
            category: project.category,
            tag: project.tag || '',
            image: project.image || '',
            github_url: project.github_url || '',
            figma_url: project.figma_url || '',
            technologies: project.technologies || '',
        });
        setSelectedFile(null);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            category: '',
            tag: '',
            image: '',
            github_url: '',
            figma_url: '',
            technologies: '',
        });
        setEditingId(null);
        setSelectedFile(null);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-display font-bold text-jawaBlack">Portfolio</h2>
                    <p className="text-gray-500 mt-1">Gérez vos réalisations et projets clients.</p>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Formulaire */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                        <h3 className="mb-6 text-lg font-bold text-gray-900">
                            {editingId ? 'Modifier le projet' : 'Ajouter un projet'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Titre du projet</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm font-medium transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="Ex: Plateforme SaaS B2B"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Catégorie</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm font-medium transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="Ex: Développement Web"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Tag (Badge)</label>
                                <input
                                    type="text"
                                    value={formData.tag}
                                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm font-medium transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="Ex: SaaS"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Technologies</label>
                                <input
                                    type="text"
                                    value={formData.technologies}
                                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm font-medium transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="Ex: React, Node.js, Tailwind"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Lien Github</label>
                                    <input
                                        type="text"
                                        value={formData.github_url}
                                        onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm font-medium transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="https://github.com/..."
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Lien Figma</label>
                                    <input
                                        type="text"
                                        value={formData.figma_url}
                                        onChange={(e) => setFormData({ ...formData, figma_url: e.target.value })}
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm font-medium transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="https://figma.com/..."
                                    />
                                </div>
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
                    <div className="grid gap-6 sm:grid-cols-2">
                        {loading ? (
                            <div className="col-span-2 p-12 text-center text-gray-500">Chargement...</div>
                        ) : projects.length === 0 ? (
                            <div className="col-span-2 p-12 text-center rounded-2xl bg-white border border-gray-100">
                                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold">
                                    P
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Aucun projet</h3>
                                <p className="text-gray-500">Ajoutez votre première réalisation.</p>
                            </div>
                        ) : (
                            projects.map((project) => (
                                <div key={project.id} className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition hover:shadow-md">
                                    <div className="aspect-video w-full bg-gray-100 overflow-hidden">
                                        {project.image ? (
                                            <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center text-gray-300 bg-gray-50">No Image</div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{project.category}</span>
                                            {project.tag && (
                                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">{project.tag}</span>
                                            )}
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h4>
                                        {project.technologies && (
                                            <p className="text-xs text-gray-500 mb-4 line-clamp-1">{project.technologies}</p>
                                        )}

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(project)}
                                                className="flex-1 rounded-lg bg-gray-50 py-2 text-xs font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                className="flex-1 rounded-lg bg-gray-50 py-2 text-xs font-semibold text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioManager;
