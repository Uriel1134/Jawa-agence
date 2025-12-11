import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

interface ProcessStep {
    id: number;
    number: string;
    label: string;
    description: string;
    tags: string[];
}

const ProcessManager: React.FC = () => {
    const [steps, setSteps] = useState<ProcessStep[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        number: '',
        label: '',
        description: '',
        tags: ['']
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchSteps();
    }, []);

    const fetchSteps = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('process_steps')
            .select('*')
            .order('number', { ascending: true });

        if (error) console.error('Error fetching steps:', error);
        else setSteps(data || []);
        setLoading(false);
    };

    const handleTagChange = (index: number, value: string) => {
        const newTags = [...formData.tags];
        newTags[index] = value;
        setFormData({ ...formData, tags: newTags });
    };

    const addTag = () => {
        setFormData({ ...formData, tags: [...formData.tags, ''] });
    };

    const removeTag = (index: number) => {
        const newTags = formData.tags.filter((_, i) => i !== index);
        setFormData({ ...formData, tags: newTags });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const cleanTags = formData.tags.filter(t => t.trim() !== '');
        const dataToSubmit = { ...formData, tags: cleanTags };

        if (editingId) {
            const { error } = await supabase
                .from('process_steps')
                .update(dataToSubmit)
                .eq('id', editingId);
            if (!error) {
                setEditingId(null);
                resetForm();
                fetchSteps();
            }
        } else {
            const { error } = await supabase.from('process_steps').insert([dataToSubmit]);
            if (!error) {
                resetForm();
                fetchSteps();
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Supprimer cette étape ?')) {
            const { error } = await supabase.from('process_steps').delete().eq('id', id);
            if (!error) fetchSteps();
        }
    };

    const handleEdit = (step: ProcessStep) => {
        setEditingId(step.id);
        setFormData({
            number: step.number,
            label: step.label,
            description: step.description,
            tags: step.tags && step.tags.length > 0 ? step.tags : ['']
        });
    };

    const resetForm = () => {
        setFormData({
            number: '',
            label: '',
            description: '',
            tags: ['']
        });
        setEditingId(null);
    };

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-display font-bold text-jawaBlack dark:text-white">Processus</h2>
                <p className="text-gray-500 dark:text-white/60 mt-1">Gérez les étapes de votre méthode de travail.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Formulaire */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 rounded-2xl bg-white dark:bg-white/5 p-6 shadow-sm border border-gray-100 dark:border-white/10">
                        <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
                            {editingId ? 'Modifier l\'étape' : 'Ajouter une étape'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-1">
                                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">N°</label>
                                    <input
                                        type="text"
                                        value={formData.number}
                                        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                        className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                        placeholder="01"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Label</label>
                                    <input
                                        type="text"
                                        value={formData.label}
                                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                        className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                        placeholder="Immersion"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none"
                                    rows={3}
                                    placeholder="Description de l'étape..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">
                                    Tags
                                    <button type="button" onClick={addTag} className="text-primary hover:text-primary/80 text-[10px]">
                                        + Ajouter
                                    </button>
                                </label>
                                <div className="space-y-2">
                                    {formData.tags.map((tag, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={tag}
                                                onChange={(e) => handleTagChange(index, e.target.value)}
                                                className="w-full rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-2 text-xs font-medium dark:text-white focus:border-primary focus:outline-none"
                                                placeholder="Tag..."
                                            />
                                            {formData.tags.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeTag(index)}
                                                    className="text-gray-400 hover:text-red-500"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="pt-2 flex gap-2">
                                <button
                                    type="submit"
                                    className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 hover:shadow-primary/40"
                                >
                                    {editingId ? 'Mettre à jour' : 'Ajouter'}
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
                        ) : steps.length === 0 ? (
                            <div className="p-12 text-center text-gray-500 dark:text-white/60">Aucune étape définie.</div>
                        ) : (
                            <div className="divide-y divide-gray-100 dark:divide-white/10">
                                {steps.map((step) => (
                                    <div key={step.id} className="group flex items-start gap-4 p-6 transition hover:bg-gray-50 dark:hover:bg-white/5">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-xl">
                                            {step.number}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-base font-bold text-gray-900 dark:text-white">{step.label}</h4>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-white/60">{step.description}</p>
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {step.tags?.map((tag, i) => (
                                                    <span key={i} className="inline-block rounded bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 text-[10px] text-gray-600 dark:text-white/60">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
                                            <button
                                                onClick={() => handleEdit(step)}
                                                className="rounded-lg p-2 text-gray-400 hover:bg-primary/5 hover:text-primary dark:hover:bg-primary dark:hover:text-white transition text-xs font-medium uppercase"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(step.id)}
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

export default ProcessManager;
