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

const ServiceDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            if (!id) return;
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching service:', error);
            } else {
                setService(data);
            }
            setLoading(false);
        };

        fetchService();
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
                    <div className="mx-auto max-w-4xl border-t border-gray-100 pt-16">
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

                        {/* CTA */}
                        <div className="mt-16 rounded-3xl bg-jawaBlack p-12 text-center text-white">
                            <h3 className="mb-4 font-display text-3xl font-bold">Prêt à démarrer ?</h3>
                            <p className="mb-8 text-white/60">Discutons de votre projet et voyons comment nous pouvons vous aider.</p>
                            <a href="mailto:contact@jawa-agence.me" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-jawaBlack transition hover:bg-gray-100">
                                Nous contacter
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ServiceDetails;
