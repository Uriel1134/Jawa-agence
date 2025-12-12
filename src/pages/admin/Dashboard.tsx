import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

interface Testimonial {
    id: number;
    name: string;
    email: string;
    company: string;
    approved: boolean;
    created_at: string;
}

const Dashboard: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        const { data, error } = await supabase
            .from('testimonials')
            .select('id, name, email, company, approved, created_at')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching testimonials:', error);
        } else {
            setTestimonials(data || []);
        }
        setLoading(false);
    };

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-display font-bold text-jawaBlack dark:text-white">Tableau de bord</h2>
                <p className="text-gray-500 dark:text-white/60 mt-1">Bienvenue sur votre espace d'administration.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-8">
                {/* Carte de bienvenue */}
                <div className="col-span-2 overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[#2C14C7] p-8 text-white shadow-lg shadow-primary/20">
                    <h3 className="text-2xl font-bold mb-2">Bonjour, Admin</h3>
                    <p className="text-white/80 mb-6 max-w-md">
                        Prêt à mettre à jour votre site ? Ajoutez de nouveaux projets ou modifiez vos services en quelques clics.
                    </p>
                    <div className="flex gap-3">
                        <a href="/admin/portfolio" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-white/90">
                            Gérer le Portfolio
                        </a>
                        <a href="/" target="_blank" className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">
                            Voir le site
                        </a>
                    </div>
                </div>

                {/* Carte Info Rapide */}
                <div className="rounded-2xl bg-white dark:bg-white/5 p-6 shadow-sm border border-gray-100 dark:border-white/10 flex flex-col justify-center items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400 mb-3 text-xl font-bold">
                        OK
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Site en ligne</h4>
                    <p className="text-sm text-gray-500 dark:text-white/60 mt-1">Votre site est visible et performant.</p>
                </div>
            </div>

            {/* Tableau des témoignages */}
            <div className="rounded-2xl bg-white dark:bg-white/5 shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-white/10">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Témoignages soumis</h3>
                    <p className="text-sm text-gray-500 dark:text-white/60 mt-1">Liste des utilisateurs ayant soumis un témoignage</p>
                </div>

                {loading ? (
                    <div className="p-12 text-center text-gray-500 dark:text-white/60">Chargement...</div>
                ) : testimonials.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 dark:text-white/60">Aucun témoignage pour le moment.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-white/5">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-white/60 uppercase tracking-wider">Nom</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-white/60 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-white/60 uppercase tracking-wider">Entreprise</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-white/60 uppercase tracking-wider">Statut</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-white/60 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                                {testimonials.map((testimonial) => (
                                    <tr key={testimonial.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            {testimonial.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-white/60">
                                            {testimonial.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-white/60">
                                            {testimonial.company}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {testimonial.approved ? (
                                                <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400">
                                                    Approuvé
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">
                                                    En attente
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white/40">
                                            {new Date(testimonial.created_at).toLocaleDateString('fr-FR')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
