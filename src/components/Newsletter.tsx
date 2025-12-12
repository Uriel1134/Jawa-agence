import React from 'react';
import NewsletterForm from './NewsletterForm';

const Newsletter: React.FC = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-jawaBlack dark:via-jawaBlack dark:to-jawaBlack transition-colors duration-300">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,224,74,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_30%,rgba(255,224,74,0.05),transparent_50%)]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            <div className="container-wide py-24 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Content Grid */}
                    <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 lg:gap-16 items-center">
                        {/* Left - Text Content */}
                        <div>
                            <span className="section-badge mb-4">
                                Newsletter
                            </span>
                            <h2 className="font-display text-5xl md:text-6xl font-bold text-jawaBlack dark:text-white mb-6 leading-tight">
                                Restez à la pointe
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-white/60 mb-8 leading-relaxed">
                                Recevez nos dernières actualités, conseils d'experts et études de cas directement dans votre boîte mail. Une dose mensuelle d'inspiration digitale.
                            </p>

                            {/* Benefits */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-jawaBlack dark:text-white text-sm">Conseils exclusifs</p>
                                        <p className="text-sm text-gray-500 dark:text-white/60">Astuces et tendances du digital</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-jawaBlack dark:text-white text-sm">Études de cas</p>
                                        <p className="text-sm text-gray-500 dark:text-white/60">Découvrez nos derniers projets</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-jawaBlack dark:text-white text-sm">1 email par mois</p>
                                        <p className="text-sm text-gray-500 dark:text-white/60">Pas de spam, désinscription facile</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right - Newsletter Form */}
                        <div>
                            <div className="bg-white dark:bg-white/[0.02] rounded-3xl border border-gray-200 dark:border-white/10 p-8 shadow-xl backdrop-blur-sm">
                                <NewsletterForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
