import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import AdminLayout from "./AdminLayout";

const BlogManager: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("blog_posts")
            .select("*, blog_categories(name)")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching posts:", error);
        } else {
            setPosts(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

        const { error } = await supabase.from("blog_posts").delete().eq("id", id);
        if (error) {
            alert("Erreur lors de la suppression");
            console.error(error);
        } else {
            fetchPosts();
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white tracking-tight">Blog & Insights</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm font-medium">Gérez vos articles, surveillez vos publications et engagez votre audience.</p>
                </div>
                <Link
                    to="/admin/blog/new"
                    className="group flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:scale-105 active:scale-95"
                >
                    <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Nouvel Article</span>
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-gray-100 dark:bg-white/5 dark:border-white/10 shadow-sm hover:shadow-md transition-all">
                    <div className="relative z-10">
                        <div className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Total Articles</div>
                        <div className="flex items-end gap-3">
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{posts.length}</div>
                            <div className="mb-1 text-xs font-bold text-green-500">+12%</div>
                        </div>
                    </div>
                    {/* Sparkline Decor (Fake Data) */}
                    <div className="absolute right-0 bottom-0 opacity-10 dark:opacity-20 group-hover:opacity-20 transition-opacity">
                        <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 45C20 45 20 10 40 10C60 10 60 50 80 50C100 50 100 20 120 20" stroke="currentColor" strokeWidth="4" className="text-primary" />
                        </svg>
                    </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-gray-100 dark:bg-white/5 dark:border-white/10 shadow-sm hover:shadow-md transition-all">
                    <div className="relative z-10">
                        <div className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Publiés</div>
                        <div className="flex items-end gap-3">
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{posts.filter(p => p.is_published).length}</div>
                            <div className="mb-1 text-xs font-bold text-green-500">+5%</div>
                        </div>
                    </div>
                    {/* Sparkline Decor */}
                    <div className="absolute right-0 bottom-0 opacity-10 dark:opacity-20 group-hover:opacity-20 transition-opacity">
                        <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 50C20 50 20 25 40 25C60 25 60 40 80 40C100 40 100 5 120 5" stroke="currentColor" strokeWidth="4" className="text-green-500" />
                        </svg>
                    </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-gray-100 dark:bg-white/5 dark:border-white/10 shadow-sm hover:shadow-md transition-all">
                    <div className="relative z-10">
                        <div className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Brouillons</div>
                        <div className="flex items-end gap-3">
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{posts.filter(p => !p.is_published).length}</div>
                            <div className="mb-1 text-xs font-bold text-gray-400">Stable</div>
                        </div>
                    </div>
                    {/* Sparkline Decor */}
                    <div className="absolute right-0 bottom-0 opacity-10 dark:opacity-20 group-hover:opacity-20 transition-opacity">
                        <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 30H40C60 30 60 30 80 30H120" stroke="currentColor" strokeWidth="4" strokeDasharray="8 8" className="text-gray-400" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* List Section */}
            <div className="rounded-2xl border border-gray-100 bg-white dark:border-white/10 dark:bg-white/5 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Article</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Catégorie</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">État</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Date V.</th>
                                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center">
                                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
                                    </td>
                                </tr>
                            ) : posts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 dark:bg-white/5">
                                            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Aucun article</h3>
                                        <p className="text-gray-500 text-sm mt-1">Commencez par rédiger votre premier article.</p>
                                    </td>
                                </tr>
                            ) : (
                                posts.map((post) => (
                                    <tr key={post.id} className="group hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors duration-200">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                {/* Optional: Add small thumbnail if available in post data */}
                                                <div className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                                    {post.title}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-white/10 px-2.5 py-0.5 text-xs font-bold text-gray-600 dark:text-gray-300">
                                                {post.blog_categories?.name || 'Général'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            {post.is_published ? (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 dark:bg-green-500/10 px-2.5 py-0.5 text-xs font-bold text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400"></span>
                                                    Publié
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 dark:bg-yellow-500/10 px-2.5 py-0.5 text-xs font-bold text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400"></span>
                                                    Brouillon
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                {post.created_at && new Date(post.created_at).toLocaleDateString('fr-FR', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    to={`/admin/blog/edit/${post.id}`}
                                                    className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
                                                    title="Éditer"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                                    title="Supprimer"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BlogManager;
