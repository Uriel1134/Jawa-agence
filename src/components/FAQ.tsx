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

    // Get unique categories
    const categories = ['Tous', ...Array.from(new Set(faqs.map(faq => faq.category)))];

    // Filter FAQs
    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = activeCategory === 'Tous' || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <section className="section-padding bg-white dark:bg-jawaBlack transition-colors duration-300">
                <div className="container-wide max-w-4xl text-center">
                    <p className="text-gray-500 dark:text-white/60">Chargement...</p>
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
                    align="center"
                    className="mb-12"
                />

                {/* Search */}
                <div className="mb-8">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Rechercher une question..."
                        className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:border-primary dark:focus:border-primary transition"
                    />
                </div>

                {/* Categories */}
                {categories.length > 1 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeCategory === category
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/10'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}

                {/* FAQ List */}
                <div className="space-y-4">
                    {filteredFaqs.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-white/60 py-8">
                            Aucune question trouvée
                        </p>
                    ) : (
                        filteredFaqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden transition-all hover:border-primary dark:hover:border-primary"
                            >
                                <button
                                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                    className="w-full flex items-center justify-between p-6 text-left bg-white dark:bg-white/[0.02] hover:bg-gray-50 dark:hover:bg-white/5 transition"
                                >
                                    <span className="font-semibold text-jawaBlack dark:text-white pr-4">
                                        {faq.question}
                                    </span>
                                    <svg
                                        className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${openId === faq.id ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {openId === faq.id && (
                                    <div className="px-6 pb-6 pt-2 bg-gray-50 dark:bg-white/[0.02]">
                                        <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 dark:text-white/60 mb-4">
                        Vous ne trouvez pas votre réponse ?
                    </p>
                    <a
                        href="#contact"
                        className="btn-primary"
                    >
                        Posez votre question
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
