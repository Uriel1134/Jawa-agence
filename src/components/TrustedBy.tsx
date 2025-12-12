import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface TrustedCompany {
    id: number;
    name: string;
    logo_url: string;
}

const TrustedBy: React.FC = () => {
    const [companies, setCompanies] = useState<TrustedCompany[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        const { data, error } = await supabase
            .from('trusted_companies')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching companies:', error);
        else setCompanies(data || []);
        setLoading(false);
    };

    if (loading || companies.length === 0) return null;

    return (
        <section className="section-padding-sm bg-gray-50/50 dark:bg-white/[0.02] backdrop-blur-sm border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
            <div className="container-wide">
                <div className="text-center mb-12">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-white/40">
                        Ils nous font confiance
                    </p>
                </div>

                <div className="relative w-full overflow-hidden">
                    {/* Gradient overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 dark:from-jawaBlack to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 dark:from-jawaBlack to-transparent z-10 pointer-events-none"></div>

                    <div className="flex w-max animate-scroll gap-16 md:gap-24">
                        {/* Triple the list for seamless infinite scroll */}
                        {[...companies, ...companies, ...companies].map((company, index) => (
                            <div
                                key={`${company.id}-${index}`}
                                className="flex h-16 w-40 items-center justify-center"
                            >
                                <img
                                    src={company.logo_url}
                                    alt={company.name}
                                    className="max-h-full max-w-full object-contain filter grayscale transition hover:grayscale-0"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;
