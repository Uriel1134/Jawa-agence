import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    photo_url?: string;
}

const TeamPage: React.FC = () => {
    const navigate = useNavigate();
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        const { data, error } = await supabase
            .from('team_members')
            .select('id, name, role, bio, photo_url')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching team members:', error);
        } else {
            setMembers(data || []);
        }
        setLoading(false);
    };

    return (
        <div className="bg-jawaWhite text-jawaBlack dark:bg-jawaBlack dark:text-white transition-colors duration-300">
            <Header />

            {/* Minimal Hero */}
            <section className="pt-40 pb-20">
                <div className="container-wide max-w-5xl">
                    <div className="space-y-4 mb-2">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-white/40">Notre Équipe</p>
                        <h1 className="text-5xl md:text-6xl font-display font-bold text-jawaBlack dark:text-white tracking-tight">
                            Les talents
                        </h1>
                    </div>
                </div>
            </section>

            {/* Clean List */}
            <section className="pb-32">
                <div className="container-wide max-w-5xl">
                    {loading ? (
                        <div className="text-center py-20 text-gray-400 dark:text-white/40">Chargement...</div>
                    ) : members.length === 0 ? (
                        <div className="text-center py-20 text-gray-400 dark:text-white/40">Aucun membre.</div>
                    ) : (
                        <div className="space-y-px border-t border-gray-200 dark:border-white/10">
                            {members.map((member, index) => (
                                <div
                                    key={member.id}
                                    onClick={() => navigate(`/team/${member.id}`)}
                                    className="group cursor-pointer border-b border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                                >
                                    <div className="py-8 flex items-center gap-8">
                                        {/* Number */}
                                        <div className="hidden md:block w-12 text-sm font-mono text-gray-400 dark:text-white/30">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>

                                        {/* Photo */}
                                        <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                                            <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 dark:bg-white/5 ring-1 ring-gray-200 dark:ring-white/10 group-hover:ring-primary dark:group-hover:ring-primary transition-all">
                                                {member.photo_url ? (
                                                    <img
                                                        src={member.photo_url}
                                                        alt={member.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-white/40 font-display font-bold text-2xl">
                                                        {member.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl md:text-2xl font-display font-bold text-jawaBlack dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm font-medium text-gray-500 dark:text-white/50">
                                                {member.role}
                                            </p>
                                        </div>

                                        {/* Arrow */}
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg className="h-5 w-5 text-gray-400 dark:text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default TeamPage;
