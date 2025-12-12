import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    photo_url?: string;
    email: string;
    social_links?: {
        linkedin?: string;
        twitter?: string;
        github?: string;
    };
    skills: string[];
    quote?: string;
}

const TeamManager: React.FC = () => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bio: '',
        email: '',
        social_links: { linkedin: '', twitter: '', github: '' },
        skills: '',
        quote: '',
        photo_url: ''
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('team_members')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching team members:', error);
        else setMembers(data || []);
        setLoading(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const uploadPhoto = async (file: File): Promise<string | null> => {
        try {
            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `team-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            return data.publicUrl;
        } catch (error) {
            console.error('Error uploading photo:', error);
            alert('Erreur lors de l\'upload de la photo');
            return null;
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let photoUrl = formData.photo_url;

        if (selectedFile) {
            const uploadedUrl = await uploadPhoto(selectedFile);
            if (uploadedUrl) {
                photoUrl = uploadedUrl;
            } else {
                return;
            }
        }

        const dataToSubmit = {
            name: formData.name,
            role: formData.role,
            bio: formData.bio,
            email: formData.email,
            photo_url: photoUrl || null,
            social_links: formData.social_links,
            skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
            quote: formData.quote || null
        };

        if (editingId) {
            const { error } = await supabase
                .from('team_members')
                .update(dataToSubmit)
                .eq('id', editingId);
            if (!error) {
                resetForm();
                fetchMembers();
            }
        } else {
            const { error } = await supabase.from('team_members').insert([dataToSubmit]);
            if (!error) {
                resetForm();
                fetchMembers();
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Supprimer ce membre ?')) {
            const { error } = await supabase.from('team_members').delete().eq('id', id);
            if (!error) fetchMembers();
        }
    };

    const handleEdit = (member: TeamMember) => {
        setEditingId(member.id);
        setFormData({
            name: member.name,
            role: member.role,
            bio: member.bio,
            email: member.email,
            social_links: member.social_links || { linkedin: '', twitter: '', github: '' },
            skills: member.skills?.join(', ') || '',
            quote: member.quote || '',
            photo_url: member.photo_url || ''
        });
    };

    const resetForm = () => {
        setFormData({
            name: '',
            role: '',
            bio: '',
            email: '',
            social_links: { linkedin: '', twitter: '', github: '' },
            skills: '',
            quote: '',
            photo_url: ''
        });
        setEditingId(null);
        setSelectedFile(null);
    };

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-display font-bold text-jawaBlack dark:text-white">Équipe</h2>
                <p className="text-gray-500 dark:text-white/60 mt-1">Gérez les membres de votre équipe.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Formulaire */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 rounded-2xl bg-white dark:bg-white/5 p-6 shadow-sm border border-gray-100 dark:border-white/10 max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">
                        <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
                            {editingId ? 'Modifier' : 'Ajouter'} un membre
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Nom</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Rôle</label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                    placeholder="CEO & Founder"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                    rows={3}
                                    placeholder="Courte biographie..."
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
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Compétences (séparées par virgule)</label>
                                <input
                                    type="text"
                                    value={formData.skills}
                                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                    placeholder="React, Node.js, Design"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Citation (optionnel)</label>
                                <textarea
                                    value={formData.quote}
                                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                    rows={2}
                                    placeholder="Une citation inspirante..."
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">LinkedIn (optionnel)</label>
                                <input
                                    type="url"
                                    value={formData.social_links.linkedin}
                                    onChange={(e) => setFormData({ ...formData, social_links: { ...formData.social_links, linkedin: e.target.value } })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                    placeholder="https://linkedin.com/in/..."
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Photo</label>
                                {formData.photo_url && !selectedFile && (
                                    <div className="mb-2 h-24 w-24 rounded-full overflow-hidden border border-gray-200 dark:border-white/10">
                                        <img src={formData.photo_url} alt="Photo" className="h-full w-full object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-2 text-xs text-gray-500 dark:text-white/60 file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-primary hover:file:bg-primary/20 dark:file:bg-primary dark:file:text-white"
                                />
                            </div>
                            <div className="pt-2 flex gap-2">
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 hover:shadow-primary/40 disabled:opacity-50"
                                >
                                    {uploading ? 'Upload...' : editingId ? 'Mettre à jour' : 'Ajouter'}
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
                    <div className="grid gap-4 sm:grid-cols-2">
                        {loading ? (
                            <div className="col-span-full text-center text-gray-500 dark:text-white/60">Chargement...</div>
                        ) : members.length === 0 ? (
                            <div className="col-span-full text-center text-gray-500 dark:text-white/60">Aucun membre.</div>
                        ) : (
                            members.map((member) => (
                                <div key={member.id} className="group relative rounded-2xl bg-white dark:bg-white/5 p-6 shadow-sm border border-gray-100 dark:border-white/10 transition hover:shadow-md">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            {member.photo_url ? (
                                                <img src={member.photo_url} alt={member.name} className="h-16 w-16 rounded-full object-cover" />
                                            ) : (
                                                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                                    {member.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">{member.name}</h4>
                                            <p className="text-xs text-gray-500 dark:text-white/40">{member.role}</p>
                                            <p className="text-xs text-gray-600 dark:text-white/60 mt-2 line-clamp-2">{member.bio}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(member)}
                                            className="flex-1 rounded-lg bg-gray-100 dark:bg-white/10 py-2 text-xs font-semibold text-gray-600 dark:text-white transition hover:bg-gray-200 dark:hover:bg-white/20"
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            onClick={() => handleDelete(member.id)}
                                            className="flex-1 rounded-lg bg-red-50 dark:bg-red-500/10 py-2 text-xs font-semibold text-red-600 dark:text-red-400 transition hover:bg-red-100 dark:hover:bg-red-500/20"
                                        >
                                            Supprimer
                                        </button>
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

export default TeamManager;
