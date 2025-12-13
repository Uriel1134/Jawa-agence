import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import SectionHeader from "./SectionHeader";

interface FAQ {
    id: number;
    question: string;
    answer: string;
    category: string;
    order: number;
}

const FAQ: React.FC = () => {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Tous');
    const [openId, setOpenId] = useState<number | null>(null);

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        const { data, error } = await supabase
            .from('faq')
            .select('*')
            .eq('is_active', true)
            .order('order', { ascending: true });

        if (error) {
            console.error('Error fetching FAQs:', error);
        } else {
            setFaqs(data || []);
        }
        setLoading(false);
    };

    const categories = ['Tous', ...Array.from(new Set(faqs.map(faq => faq.category)))];

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = activeCategory === 'Tous' || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <section className="section-padding bg-white dark:bg-jawaBlack transition-colors duration-300">
                <div className="container-wide max-w-4xl">
                    <div className="h-1 w-32 bg-gray-200 dark:bg-white/10 animate-pulse"></div>
                </div>
            </section>
        );
    }

    if (faqs.length === 0) return null;

    return (
        <section id="faq" className="section-padding bg-white dark:bg-jawaBlack transition-colors duration-300">
            <div className="container-wide max-w-4xl">
                <SectionHeader
                    number="07."
                    title="Questions fréquentes"
                    backgroundTitle="FAQ"
                    description="Trouvez rapidement des réponses à vos questions"
                    align="left"
                    className="mb-20"
                />

                {/* Search - Minimalist */}
                <div className="mb-12">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Rechercher..."
                        className="w-full border-b-2 border-gray-200 dark:border-white/10 bg-transparent pb-4 text-lg dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-jawaBlack dark:focus:border-white transition-colors duration-300"
                    />
                </div>

                {/* Categories - Clean Pills */}
                {categories.length > 1 && (
                    <div className="flex flex-wrap gap-2 mb-16 pb-8 border-b border-gray-100 dark:border-white/5">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all duration-200 ${activeCategory === category
                                        ? 'text-jawaBlack dark:text-white border-b-2 border-jawaBlack dark:border-white'
                                        : 'text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/60'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}

                {/* FAQ List - Ultra Clean */}
                <div className="space-y-0">
                    {filteredFaqs.length === 0 ? (
                        <p className="text-gray-400 dark:text-white/40 py-12 text-center text-sm">
                            Aucune question trouvée
                        </p>
                    ) : (
                        filteredFaqs.map((faq, index) => (
                            <div
                                key={faq.id}
                                className="border-b border-gray-100 dark:border-white/5 last:border-0"
                            >
                                <button
                                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                    className="w-full group py-8 flex items-start justify-between gap-8 text-left transition-all duration-200 hover:opacity-60"
                                >
                                    {/* Question */}
                                    <div className="flex-1">
                                        <div className="flex items-baseline gap-4 mb-1">
                                            <span className="text-xs font-mono text-gray-300 dark:text-white/20 select-none">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <h3 className="font-medium text-lg text-jawaBlack dark:text-white leading-relaxed">
                                                {faq.question}
                                            </h3>
                                        </div>
                                        {faq.category && activeCategory === 'Tous' && (
                                            <span className="ml-10 text-xs text-gray-400 dark:text-white/30 uppercase tracking-wider">
                                                {faq.category}
                                            </span>
                                        )}
                                    </div>

                                    {/* Icon - Minimalist */}
                                    <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''
                                        }`}>
                                        <svg
                                            className="w-4 h-4 text-gray-400 dark:text-white/40"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                {/* Answer - Smooth Reveal */}
                                <div className={`grid transition-all duration-300 ease-out ${openId === faq.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                    }`}>
                                    <div className="overflow-hidden">
                                        <div className="pb-8 pl-10 pr-10">
                                            <p className="text-base text-gray-600 dark:text-white/60 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* CTA - Minimal */}
                <div className="mt-20 pt-12 border-t border-gray-100 dark:border-white/5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-white/50 mb-1">
                                Vous ne trouvez pas votre réponse ?
                            </p>
                            <p className="text-xs text-gray-400 dark:text-white/30">
                                Notre équipe est là pour vous aider
                            </p>
                        </div>
                        <a
                            href="#contact"
                            className="group inline-flex items-center gap-2 text-sm font-medium text-jawaBlack dark:text-white hover:gap-3 transition-all duration-200"
                        >
                            Nous contacter
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
