import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

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

const Pricing: React.FC = () => {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        const { data, error } = await supabase
            .from('pricing_plans')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            console.error('Error fetching pricing plans:', error);
        } else {
            setPlans(data || []);
            // Extract unique categories
            const uniqueCategories = Array.from(new Set(data?.map(p => p.category) || []));
            setCategories(uniqueCategories);
            if (uniqueCategories.length > 0) {
                setActiveCategory(uniqueCategories[0]);
            }
        }
        setLoading(false);
    };

    const filteredPlans = plans.filter(plan => plan.category === activeCategory);

    return (
        <section id="pricing" className="bg-slate-50 py-32">
            <div className="container-wide">
                {/* Header */}
                <div className="mb-20 flex flex-col items-center text-center">
                    <span className="mb-6 inline-block rounded-full border border-gray-200 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                        Tarifs
                    </span>
                    <h2 className="font-display text-4xl font-bold leading-tight text-jawaBlack md:text-5xl">
                        Des offres claires <br />
                        <span className="text-gray-400">et transparentes.</span>
                    </h2>
                </div>

                {/* Tabs */}
                {categories.length > 0 && (
                    <div className="mb-16 flex justify-center">
                        <div className="inline-flex rounded-full bg-white p-1.5 shadow-sm border border-gray-100">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === category
                                            ? 'bg-primary text-white shadow-md'
                                            : 'text-gray-500 hover:text-jawaBlack'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Cards Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                        {filteredPlans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`relative flex flex-col rounded-[2rem] p-8 transition-all duration-300 hover:-translate-y-2 ${plan.is_popular
                                        ? 'bg-jawaBlack text-white shadow-2xl shadow-jawaBlack/20 scale-105 z-10'
                                        : 'bg-white text-jawaBlack border border-gray-100 shadow-soft hover:shadow-xl'
                                    }`}
                            >
                                {plan.is_popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-primary/30">
                                        Recommandé
                                    </div>
                                )}

                                <div className="mb-8 text-center">
                                    <h3 className={`mb-2 text-lg font-bold ${plan.is_popular ? 'text-white' : 'text-jawaBlack'}`}>
                                        {plan.title}
                                    </h3>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-xs font-medium opacity-60">À partir de</span>
                                        <span className={`font-display text-5xl font-bold ${plan.is_popular ? 'text-primary' : 'text-jawaBlack'}`}>
                                            {plan.price}
                                        </span>
                                        <span className="text-xl font-bold opacity-60">{plan.currency}</span>
                                    </div>
                                </div>

                                <ul className="mb-8 flex-1 space-y-4">
                                    {plan.features?.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3 text-sm">
                                            <svg
                                                className={`mt-0.5 h-4 w-4 flex-shrink-0 ${plan.is_popular ? 'text-primary' : 'text-jawaBlack'}`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className={plan.is_popular ? 'text-gray-300' : 'text-gray-600'}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href={plan.button_link}
                                    className={`block w-full rounded-xl py-4 text-center text-xs font-bold uppercase tracking-widest transition-all ${plan.is_popular
                                            ? 'bg-primary text-white hover:bg-white hover:text-primary'
                                            : 'bg-jawaBlack text-white hover:bg-primary hover:text-white'
                                        }`}
                                >
                                    {plan.button_text}
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Pricing;
