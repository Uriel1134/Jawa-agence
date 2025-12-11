import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Project {
    id: number;
    title: string;
    category: string;
    tag: string;
    image: string;
    github_url?: string;
    figma_url?: string;
    technologies?: string;
    description?: string;
}

const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;

            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching project:', error);
            } else {
                setProject(data);
            }
            setLoading(false);
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-jawaBlack">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-jawaBlack">
                <h1 className="text-2xl font-bold text-jawaBlack dark:text-white">Projet introuvable</h1>
                <Link to="/" className="mt-4 text-primary hover:underline">Retour à l'accueil</Link>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-jawaBlack transition-colors duration-300 min-h-screen">
            <Header alwaysOpaque />

            <main className="pt-32 pb-20">
                <div className="container-wide">
                    {/* Back Button */}
                    <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary dark:text-white/60 dark:hover:text-primary transition">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour aux projets
                    </Link>

                    {/* Header Section */}
                    <div className="grid gap-12 lg:grid-cols-[1.5fr,1fr] lg:items-end mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-sm font-bold uppercase tracking-widest text-primary">{project.category}</span>
                                {project.tag && (
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-white/10 dark:text-white/80">
                                        {project.tag}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl font-display font-bold text-jawaBlack dark:text-white md:text-5xl lg:text-6xl leading-tight">
                                {project.title}
                            </h1>
                        </div>

                        <div className="flex flex-col gap-6 lg:border-l lg:border-gray-100 dark:lg:border-white/10 lg:pl-12">
                            {project.technologies && (
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-white/40 mb-3">Technologies</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.split(',').map((tech, i) => (
                                            <span key={i} className="rounded-md bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-100 dark:bg-white/5 dark:text-white/80 dark:border-white/10">
                                                {tech.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4">
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white transition hover:bg-gray-800 dark:bg-white dark:text-jawaBlack dark:hover:bg-white/90"
                                        title="Voir le code"
                                    >
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                    </a>
                                )}
                                {project.figma_url && (
                                    <a
                                        href={project.figma_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center transition hover:opacity-80"
                                        title="Maquette Figma"
                                    >
                                        <img src="/figma-logo.png" alt="Figma" className="h-10 w-10" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Image */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-gray-100 dark:bg-white/5 shadow-2xl mb-16">
                        {project.image ? (
                            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-300 dark:text-white/20">Aucune image</div>
                        )}
                    </div>

                    {/* Description Content */}
                    <div className="mx-auto max-w-3xl">
                        <h2 className="text-2xl font-bold text-jawaBlack dark:text-white mb-6">À propos du projet</h2>
                        <div className="prose prose-lg prose-slate dark:prose-invert text-gray-600 dark:text-white/80">
                            {project.description ? (
                                project.description.split('\n').map((paragraph, i) => (
                                    <p key={i} className="mb-4">{paragraph}</p>
                                ))
                            ) : (
                                <p className="italic text-gray-400 dark:text-white/40">Aucune description disponible pour ce projet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProjectDetails;
