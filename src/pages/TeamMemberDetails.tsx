import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    photo_url?: string;
    email: string;
    social_links?: {
        linkedin?: string;
        twitter?: string;
        github?: string;
    };
    skills: string[];
    quote?: string;
}

const TeamMemberDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [member, setMember] = useState<TeamMember | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMember();
    }, [id]);

    const fetchMember = async () => {
        if (!id) return;

        const { data, error } = await supabase
            .from('team_members')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching team member:', error);
            navigate('/');
        } else {
            setMember(data);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-jawaWhite dark:bg-jawaBlack flex items-center justify-center">
                <div className="text-gray-400 dark:text-white/40">Chargement...</div>
            </div>
        );
    }

    if (!member) {
        return null;
    }

    return (
        <div className="bg-jawaWhite text-jawaBlack dark:bg-jawaBlack dark:text-white transition-colors duration-300">
            <Header />

            {/* Hero - Minimal & Centered */}
            <section className="pt-40 pb-32">
                <div className="container-wide max-w-4xl">
                    {/* Photo - Centered */}
                    <div className="flex justify-center mb-16">
                        <div className="relative w-40 h-40 md:w-48 md:h-48">
                            <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 dark:bg-white/5 ring-1 ring-gray-200 dark:ring-white/10">
                                {member.photo_url ? (
                                    <img
                                        src={member.photo_url}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-white/40 font-display font-bold text-6xl">
                                        {member.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content - Centered */}
                    <div className="text-center space-y-8">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-white/40 mb-6">
                                {member.role}
                            </p>
                            <h1 className="text-5xl md:text-6xl font-display font-bold text-jawaBlack dark:text-white mb-8 tracking-tight">
                                {member.name}
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 dark:text-white/60 leading-relaxed max-w-2xl mx-auto">
                                {member.bio}
                            </p>
                        </div>

                        {/* Contact - Single Line */}
                        <div className="flex items-center justify-center gap-6 pt-4">
                            <a
                                href={`mailto:${member.email}`}
                                className="text-sm text-gray-500 dark:text-white/50 hover:text-primary dark:hover:text-primary transition"
                            >
                                {member.email}
                            </a>

                            {member.social_links && (
                                <div className="flex gap-3">
                                    {member.social_links.linkedin && (
                                        <a
                                            href={member.social_links.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-primary transition"
                                            aria-label="LinkedIn"
                                        >
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </a>
                                    )}
                                    {member.social_links.twitter && (
                                        <a
                                            href={member.social_links.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-primary transition"
                                            aria-label="Twitter"
                                        >
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                            </svg>
                                        </a>
                                    )}
                                    {member.social_links.github && (
                                        <a
                                            href={member.social_links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-primary transition"
                                            aria-label="GitHub"
                                        >
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills - Clean Grid */}
            {member.skills && member.skills.length > 0 && (
                <section className="py-24 border-t border-gray-200 dark:border-white/10">
                    <div className="container-wide max-w-4xl">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-white/40 mb-12 text-center">
                            Compétences
                        </p>

                        <div className="flex flex-wrap justify-center gap-3">
                            {member.skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="px-6 py-3 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary transition-all text-sm font-medium text-gray-700 dark:text-white/70"
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Quote - Minimal */}
            {member.quote && (
                <section className="py-24 border-t border-gray-200 dark:border-white/10">
                    <div className="container-wide max-w-3xl text-center">
                        <blockquote className="text-2xl md:text-3xl font-display font-medium text-gray-700 dark:text-white/80 leading-relaxed italic">
                            "{member.quote}"
                        </blockquote>
                    </div>
                </section>
            )}

            {/* Navigation */}
            <section className="py-20 border-t border-gray-200 dark:border-white/10">
                <div className="container-wide max-w-4xl">
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => navigate('/team')}
                            className="px-6 py-3 rounded-full text-sm font-medium text-gray-600 dark:text-white/60 hover:text-primary dark:hover:text-primary transition border border-gray-200 dark:border-white/10 hover:border-primary dark:hover:border-primary"
                        >
                            ← Retour à l'équipe
                        </button>
                        <a
                            href="/contact"
                            className="px-6 py-3 rounded-full text-sm font-medium bg-primary text-white hover:bg-primary/90 transition"
                        >
                            Nous contacter
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default TeamMemberDetails;
