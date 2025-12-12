import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

interface FAQ {
    id: number;
    question: string;
    answer: string;
    category: string;
    order: number;
    is_active: boolean;
}

const FAQManager: React.FC = () => {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        category: '',
        order: 0,
        is_active: true
    });

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        const { data, error } = await supabase
            .from('faq')
            .select('*')
            .order('order', { ascending: true });

        if (error) {
            console.error('Error fetching FAQs:', error);
        } else {
            setFaqs(data || []);
        }
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            const { error } = await supabase
                .from('faq')
                .update(formData)
                .eq('id', editingId);

            if (error) {
                console.error('Error updating FAQ:', error);
                alert('Erreur lors de la mise à jour');
                return;
            }
        } else {
            const { error } = await supabase
                .from('faq')
                .insert([formData]);

            if (error) {
                console.error('Error creating FAQ:', error);
                alert('Erreur lors de la création');
                return;
            }
        }

        resetForm();
        fetchFAQs();
    };

    const handleEdit = (faq: FAQ) => {
        setEditingId(faq.id);
        setFormData({
            question: faq.question,
            answer: faq.answer,
            category: faq.category,
            order: faq.order,
            is_active: faq.is_active
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Supprimer cette question ?')) return;

        const { error } = await supabase
            .from('faq')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting FAQ:', error);
            alert('Erreur lors de la suppression');
        } else {
            fetchFAQs();
        }
    };

    const resetForm = () => {
        setFormData({
            question: '',
            answer: '',
            category: '',
            order: 0,
            is_active: true
        });
        setEditingId(null);
    };

    const categories = Array.from(new Set(faqs.map(f => f.category)));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form - Sticky */}
            <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-6 bg-white/5 rounded-xl p-6 border border-white/10">
                    <h2 className="text-lg font-bold text-white mb-6">
                        {editingId ? 'Modifier FAQ' : 'Nouvelle FAQ'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-white/80 mb-2">
                                Question *
                            </label>
                            <input
                                type="text"
                                value={formData.question}
                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                required
                                className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white focus:outline-none focus:border-primary transition"
                                placeholder="Quelle est votre question ?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white/80 mb-2">
                                Réponse *
                            </label>
                            <textarea
                                value={formData.answer}
                                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                required
                                rows={5}
                                className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white focus:outline-none focus:border-primary transition resize-none"
                                placeholder="La réponse détaillée..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white/80 mb-2">
                                Catégorie *
                            </label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                required
                                list="categories"
                                className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white focus:outline-none focus:border-primary transition"
                                placeholder="Général, Services, Tarifs..."
                            />
                            <datalist id="categories">
                                {categories.map(cat => (
                                    <option key={cat} value={cat} />
                                ))}
                            </datalist>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white/80 mb-2">
                                Ordre d'affichage
                            </label>
                            <input
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white focus:outline-none focus:border-primary transition"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={formData.is_active}
                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                className="w-4 h-4 text-primary bg-white/5 border-white/10 rounded focus:ring-primary focus:ring-2"
                            />
                            <label htmlFor="is_active" className="text-sm text-white/80">
                                Publier immédiatement
                            </label>
                        </div>

                        <div className="flex gap-2 pt-4">
                            <button
                                type="submit"
                                className="flex-1 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary/90 transition"
                            >
                                {editingId ? 'Mettre à jour' : 'Créer'}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-3 rounded-lg border border-white/10 text-sm font-medium text-white hover:bg-white/5 transition"
                                >
                                    Annuler
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-2 space-y-4">
                <h2 className="text-lg font-bold text-white mb-4">
                    Questions ({faqs.length})
                </h2>

                {loading ? (
                    <div className="text-center py-12 text-white/60">Chargement...</div>
                ) : faqs.length === 0 ? (
                    <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white/60">Aucune FAQ pour le moment</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {faqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-white/5 rounded-xl border border-white/10 p-6 hover:border-white/20 transition"
                            >
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
                                                {faq.category}
                                            </span>
                                            {!faq.is_active && (
                                                <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-400 font-medium">
                                                    Brouillon
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                                        <p className="text-sm text-white/60 line-clamp-2">{faq.answer}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(faq)}
                                            className="text-primary hover:text-primary/80 transition text-sm font-medium"
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            onClick={() => handleDelete(faq.id)}
                                            className="text-red-400 hover:text-red-300 transition text-sm font-medium"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                                <div className="text-xs text-white/40">
                                    Ordre: {faq.order}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQManager;
