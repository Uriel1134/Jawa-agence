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
        <section className="py-12 bg-white dark:bg-jawaBlack border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
            <div className="container-wide">
                <div className="text-center mb-8">
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-white/40">
                        Ils nous font confiance
                    </p>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div className="flex w-max animate-scroll gap-12 md:gap-24">
                        {/* Double the list for seamless infinite scroll */}
                        {[...companies, ...companies].map((company, index) => (
                            <div
                                key={`${company.id}-${index}`}
                                className="flex h-12 w-32 items-center justify-center grayscale opacity-50 transition hover:grayscale-0 hover:opacity-100 dark:invert dark:brightness-200"
                            >
                                <img
                                    src={company.logo_url}
                                    alt={company.name}
                                    className="max-h-full max-w-full object-contain"
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
