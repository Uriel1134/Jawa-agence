import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Service {
    id: number;
    title: string;
    description: string;
    details: string;
    image: string;
    gradient: string;
}

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

const ServiceDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [service, setService] = useState<Service | null>(null);
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setLoading(true);

            // 1. Fetch Service Details
            const { data: serviceData, error: serviceError } = await supabase
                .from('services')
                .select('*')
                .eq('id', id)
                .single();

            if (serviceError) {
                console.error('Error fetching service:', serviceError);
                setLoading(false);
                return;
            }

            setService(serviceData);

            // 2. Fetch Associated Pricing Plans (based on service title matching category)
            if (serviceData) {
                const { data: plansData, error: plansError } = await supabase
                    .from('pricing_plans')
                    .select('*')
                    .eq('category', serviceData.title)
                    .order('id', { ascending: true });

                if (plansError) {
                    console.error('Error fetching plans:', plansError);
                } else {
                    setPlans(plansData || []);
                }
            }
            setLoading(false);
        };

        fetchData();
    }, [id]);

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-white">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
    );

    if (!service) return (
        <div className="flex h-screen items-center justify-center bg-white text-jawaBlack">
            Service introuvable.
        </div>
    );

    return (
        <div className="bg-white">
            <Header alwaysOpaque />
            <main className="pt-32 pb-20">
                <div className="container-wide">
                    {/* Back Button */}
                    <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour à l'accueil
                    </Link>

                    {/* Header Section */}
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center mb-16">
                        <div className="max-w-2xl">
                            <span className="mb-6 inline-block rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                                Expertise
                            </span>
                            <h1 className="font-display text-5xl font-bold leading-tight text-jawaBlack md:text-6xl mb-6">
                                {service.title}
                            </h1>
                            <p className="text-lg text-gray-500 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gray-100 shadow-2xl">
                            {service.image ? (
                                <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
                            ) : (
                                <div className={`h-full w-full bg-gradient-to-br ${service.gradient}`} />
                            )}
                        </div>
                    </div>

                    {/* Details Content */}
                    <div className="mx-auto max-w-4xl border-t border-gray-100 pt-16 mb-20">
                        <h2 className="text-2xl font-bold text-jawaBlack mb-8 font-display">Notre approche</h2>
                        <div className="prose prose-lg prose-slate text-gray-600 max-w-none">
                            {service.details ? (
                                service.details.split('\n').map((paragraph, i) => (
                                    <p key={i} className="mb-4">{paragraph}</p>
                                ))
                            ) : (
                                <p className="italic text-gray-400">Détails à venir pour ce service.</p>
                            )}
                        </div>
                    </div>

                    {/* Pricing Section (Replaces Generic CTA) */}
                    {plans.length > 0 && (
                        <div className="border-t border-gray-100 pt-16">
                            <div className="text-center mb-12">
                                <h2 className="font-display text-3xl font-bold text-jawaBlack mb-4">Nos offres pour {service.title}</h2>
                                <p className="text-gray-500">Choisissez le plan adapté à vos besoins.</p>
                            </div>

                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                                {plans.map((plan) => (
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
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ServiceDetails;
