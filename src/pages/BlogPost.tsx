import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Header from "../components/Header";
import Footer from "../components/Footer";

interface BlogPostDetail {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    cover_image: string;
    published_at: string;
    author: string;
    category: {
        name: string;
        slug: string;
    };
}

interface Comment {
    id: number;
    post_id: number;
    author_name: string;
    content: string;
    created_at: string;
}

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPostDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Comments State
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState({ author_name: '', content: '' });
    const [submittingComment, setSubmittingComment] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (slug) fetchPost();
    }, [slug]);

    const fetchPost = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select(`
            *,
            category:blog_categories(name, slug)
          `)
                .eq('slug', slug)
                .eq('is_published', true)
                .single();

            if (error) throw error;
            setPost(data);

            if (data?.id) {
                fetchComments(data.id);
            }
        } catch (error) {
            console.error('Error fetching post:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async (postId: number) => {
        const { data, error } = await supabase
            .from('blog_comments')
            .select('*')
            .eq('post_id', postId)
            .order('created_at', { ascending: false });

        if (!error && data) {
            setComments(data);
        }
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!post?.id) return;
        setSubmittingComment(true);

        const { error } = await supabase
            .from('blog_comments')
            .insert([{
                post_id: post.id,
                author_name: newComment.author_name,
                content: newComment.content
            }]);

        if (!error) {
            fetchComments(post.id);
            setNewComment({ author_name: '', content: '' });
            alert('Commentaire ajouté !');
        } else {
            console.error(error);
            alert("Erreur lors de l'ajout du commentaire.");
        }
        setSubmittingComment(false);
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-jawaWhite dark:bg-jawaBlack">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
    );

    if (!post) return <div className="p-20 text-center dark:text-white">Article non trouvé</div>;

    // Calculate dynamic reading time
    const readingTime = Math.max(1, Math.round((post.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0) / 200));

    return (
        <div className="min-h-screen bg-jawaWhite dark:bg-jawaBlack transition-colors duration-300">
            <Header alwaysOpaque />

            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%` }} />

            <div className="h-24"></div>

            <article className="pb-20">
                <div className="container-narrow mx-auto px-6 max-w-4xl">
                    {/* Back Link */}
                    <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-primary transition-colors mb-12 group">
                        <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour au blog
                    </Link>

                    {/* Article Header */}
                    <header className="mb-12 text-center">
                        {post.category && (
                            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-6">
                                {post.category.name}
                            </span>
                        )}
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-jawaBlack dark:text-white leading-tight mb-8">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                    A
                                </div>
                                <span>Admin</span>
                            </div>
                            <span>•</span>
                            <time dateTime={post.published_at}>
                                {new Date(post.published_at).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </time>
                            <span>•</span>
                            <span>{readingTime} min de lecture</span>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {post.cover_image && (
                        <div className="mb-16 overflow-hidden rounded-3xl shadow-2xl aspect-video relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            <img
                                src={post.cover_image}
                                alt={post.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none 
                        prose-headings:font-display prose-headings:font-bold prose-a:text-primary 
                        prose-img:rounded-2xl prose-img:shadow-lg"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* CTA Footer */}
                    <div className="mt-20 border-t border-gray-100 dark:border-white/10 pt-12">
                        <div className="rounded-3xl bg-gray-50 dark:bg-white/5 p-8 md:p-12 text-center">
                            <h3 className="font-display text-2xl font-bold text-jawaBlack dark:text-white mb-4">
                                Vous avez aimé cet article ?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
                                Découvrez d'autres contenus sur notre blog ou contactez-nous pour échanger sur votre projet.
                            </p>
                            <Link
                                to="/blog"
                                className="inline-block rounded-xl bg-jawaBlack dark:bg-white text-white dark:text-jawaBlack px-8 py-4 font-bold transition-transform hover:-translate-y-1"
                            >
                                Lire d'autres articles
                            </Link>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-20 pt-12 border-t border-gray-100 dark:border-white/10">
                        <h3 className="font-display text-2xl font-bold text-jawaBlack dark:text-white mb-8">
                            Commentaires ({comments.length})
                        </h3>

                        {/* Comment Form */}
                        <form onSubmit={handleCommentSubmit} className="mb-12 bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Laisser un commentaire</h4>
                            <div className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Votre nom"
                                        required
                                        value={newComment.author_name}
                                        onChange={(e) => setNewComment({ ...newComment, author_name: e.target.value })}
                                        className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 p-3 text-sm dark:text-white focus:border-primary focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <textarea
                                        placeholder="Votre message..."
                                        required
                                        rows={4}
                                        value={newComment.content}
                                        onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                                        className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 p-3 text-sm dark:text-white focus:border-primary focus:outline-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={submittingComment}
                                    className="px-6 py-2 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition disabled:opacity-50"
                                >
                                    {submittingComment ? 'Envoi...' : 'Poster le commentaire'}
                                </button>
                            </div>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-6">
                            {comments.length === 0 ? (
                                <p className="text-gray-500 italic">Soyez le premier à commenter !</p>
                            ) : (
                                comments.map((comment) => (
                                    <div key={comment.id} className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5">
                                        <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {comment.author_name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-jawaBlack dark:text-white">{comment.author_name}</span>
                                                <span className="text-xs text-gray-400">
                                                    {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </div>
    );
};

export default BlogPost;
