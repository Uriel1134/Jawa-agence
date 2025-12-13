import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

interface Comment {
    id: number;
    post_id: number;
    author_name: string;
    content: string;
    created_at: string;
    post: {
        title: string;
        slug: string;
    }
}

const CommentsManager: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('blog_comments')
            .select(`
                *,
                post:blog_posts(title, slug)
            `)
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching comments:', error);
        else setComments(data || []);
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Supprimer ce commentaire ?')) {
            const { error } = await supabase.from('blog_comments').delete().eq('id', id);
            if (!error) fetchComments();
            else alert("Erreur lors de la suppression");
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-display font-bold text-jawaBlack dark:text-white">Commentaires Blog</h2>
                <p className="text-gray-500 dark:text-white/60 mt-1">Gérez et modérez les commentaires des articles.</p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-white/5 shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-500 dark:text-white/60">Chargement...</div>
                ) : comments.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 dark:text-white/60">Aucun commentaire à modérer.</div>
                ) : (
                    <div className="divide-y divide-gray-100 dark:divide-white/10">
                        {comments.map((comment) => (
                            <div key={comment.id} className="group flex items-start gap-4 p-6 transition hover:bg-gray-50 dark:hover:bg-white/5">
                                <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {comment.author_name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">{comment.author_name}</h4>
                                        <span className="hidden md:inline text-gray-300 dark:text-white/20">•</span>
                                        <span className="text-xs text-gray-500 dark:text-white/50">
                                            Sur : <span className="font-medium text-primary">{comment.post?.title}</span>
                                        </span>
                                        <span className="hidden md:inline text-gray-300 dark:text-white/20">•</span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-white/70 bg-gray-50 dark:bg-black/20 p-3 rounded-lg border border-gray-100 dark:border-white/5">
                                        "{comment.content}"
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(comment.id)}
                                    className="shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-lg transition"
                                    title="Supprimer"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentsManager;
