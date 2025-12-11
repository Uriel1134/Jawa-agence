import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

interface PricingPlan {
    id: number;
    title: string;
    price: string;
    currency: string;
    features: string[];
    is_popular: boolean;
    category: string;
    button_text: string;
    button_link: string;
}

interface Service {
    id: number;
    title: string;
}

const PricingManager: React.FC = () => {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        currency: '€',
        features: [''],
        is_popular: false,
        category: '',
        button_text: 'Commander',
        button_link: '/contact'
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const [plansResponse, servicesResponse] = await Promise.all([
            supabase.from('pricing_plans').select('*').order('id', { ascending: true }),
            supabase.from('services').select('id, title').order('title', { ascending: true })
        ]);

        if (plansResponse.error) console.error('Error fetching plans:', plansResponse.error);
        else setPlans(plansResponse.data || []);

        if (servicesResponse.error) console.error('Error fetching services:', servicesResponse.error);
        else {
            setServices(servicesResponse.data || []);
            // Set default category if available and not set
            if (servicesResponse.data && servicesResponse.data.length > 0 && !formData.category) {
                setFormData(prev => ({ ...prev, category: servicesResponse.data[0].title }));
            }
        }
        setLoading(false);
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ''] });
    };

    const removeFeature = (index: number) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const cleanFeatures = formData.features.filter(f => f.trim() !== '');

        // Ensure category is set (fallback to first service if empty)
        let categoryToSubmit = formData.category;
        if (!categoryToSubmit && services.length > 0) {
            categoryToSubmit = services[0].title;
        }

        const dataToSubmit = { ...formData, features: cleanFeatures, category: categoryToSubmit };

        if (editingId) {
            const { error } = await supabase
                .from('pricing_plans')
                .update(dataToSubmit)
                .eq('id', editingId);
            if (!error) {
                setEditingId(null);
                resetForm();
                fetchData();
            }
        } else {
            const { error } = await supabase.from('pricing_plans').insert([dataToSubmit]);
            if (!error) {
                resetForm();
                fetchData();
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
            const { error } = await supabase.from('pricing_plans').delete().eq('id', id);
            if (!error) fetchData();
        }
    };

    const handleEdit = (plan: PricingPlan) => {
        setEditingId(plan.id);
        setFormData({
            title: plan.title,
            price: plan.price,
            currency: plan.currency,
            features: plan.features && plan.features.length > 0 ? plan.features : [''],
            is_popular: plan.is_popular,
            category: plan.category,
            button_text: plan.button_text,
            button_link: plan.button_link
        });
    };

    const resetForm = () => {
        setFormData({
            title: '',
            price: '',
            currency: '€',
            features: [''],
            is_popular: false,
            category: services.length > 0 ? services[0].title : '',
            button_text: 'Commander',
            button_link: '/contact'
        });
        setEditingId(null);
    };

    // Group plans by category
    const groupedPlans = plans.reduce((acc, plan) => {
        if (!acc[plan.category]) {
            acc[plan.category] = [];
        }
        acc[plan.category].push(plan);
        return acc;
    }, {} as Record<string, PricingPlan[]>);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-display font-bold text-jawaBlack dark:text-white">Tarifs</h2>
                    <p className="text-gray-500 dark:text-white/60 mt-1">Gérez vos offres et abonnements.</p>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Formulaire */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 rounded-2xl bg-white dark:bg-white/5 p-6 shadow-sm border border-gray-100 dark:border-white/10">
                        <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
                            {editingId ? 'Modifier l\'offre' : 'Ajouter une offre'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Titre</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white transition focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="Ex: Site Vitrine"
                                    required
                                />
                            </div>

                            {/* Category Dropdown */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Catégorie</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white transition focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                                    required
                                >
                                    <option value="" disabled className="dark:bg-jawaBlack">Sélectionner une catégorie</option>
                                    {services.map(service => (
                                        <option key={service.id} value={service.title} className="dark:bg-jawaBlack">
                                            {service.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Prix</label>
                                    <input
                                        type="text"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white transition focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="Ex: 899"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">Devise</label>
                                    <input
                                        type="text"
                                        value={formData.currency}
                                        onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                        className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm font-medium dark:text-white transition focus:border-primary focus:bg-white dark:focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="Ex: €"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40">
                                    Fonctionnalités
                                    <button type="button" onClick={addFeature} className="text-primary hover:text-primary/80 text-[10px]">
                                        + Ajouter
                                    </button>
                                </label>
                                <div className="space-y-2">
                                    {formData.features.map((feature, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                className="w-full rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-2 text-xs font-medium dark:text-white focus:border-primary focus:outline-none"
                                                placeholder="Fonctionnalité..."
                                            />
                                            {formData.features.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeFeature(index)}
                                                    className="text-gray-400 hover:text-red-500"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 py-2">
                                <input
                                    type="checkbox"
                                    id="is_popular"
                                    checked={formData.is_popular}
                                    onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor="is_popular" className="text-sm font-medium text-gray-700 dark:text-white/80">
                                    Mettre en avant (Populaire)
                                </label>
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

                {/* Liste Groupée */}
                <div className="lg:col-span-2 space-y-8">
                    {loading ? (
                        <div className="p-12 text-center text-gray-500 dark:text-white/60 bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10">Chargement...</div>
                    ) : plans.length === 0 ? (
                        <div className="p-12 text-center bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Aucune offre</h3>
                            <p className="text-gray-500 dark:text-white/60">Commencez par ajouter votre première offre.</p>
                        </div>
                    ) : (
                        Object.entries(groupedPlans).map(([category, categoryPlans]) => (
                            <div key={category} className="bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden">
                                <div className="bg-gray-50 dark:bg-white/5 px-6 py-4 border-b border-gray-100 dark:border-white/10">
                                    <h3 className="font-bold text-gray-900 dark:text-white">{category}</h3>
                                </div>
                                <div className="divide-y divide-gray-100 dark:divide-white/10">
                                    {categoryPlans.map((plan) => (
                                        <div key={plan.id} className="group flex items-start gap-4 p-6 transition hover:bg-gray-50 dark:hover:bg-white/5">
                                            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${plan.is_popular ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-white/60'}`}>
                                                <span className="font-bold">{plan.currency}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="text-base font-bold text-gray-900 dark:text-white">{plan.title}</h4>
                                                    {plan.is_popular && (
                                                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">Populaire</span>
                                                    )}
                                                </div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white/80">{plan.price} {plan.currency}</p>
                                                <div className="mt-2 flex flex-wrap gap-1">
                                                    {plan.features?.slice(0, 3).map((f, i) => (
                                                        <span key={i} className="inline-block rounded bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 text-[10px] text-gray-600 dark:text-white/60">{f}</span>
                                                    ))}
                                                    {plan.features && plan.features.length > 3 && (
                                                        <span className="inline-block rounded bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 text-[10px] text-gray-600 dark:text-white/60">+{plan.features.length - 3}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
                                                <button
                                                    onClick={() => handleEdit(plan)}
                                                    className="rounded-lg p-2 text-gray-400 hover:bg-primary/5 hover:text-primary dark:hover:bg-primary dark:hover:text-white transition text-xs font-medium uppercase"
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(plan.id)}
                                                    className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/20 dark:hover:text-red-400 transition text-xs font-medium uppercase"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default PricingManager;
