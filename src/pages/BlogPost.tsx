import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Helmet } from 'react-helmet';
import { fr } from 'date-fns/locale';
// import { Helmet } from 'react-helmet';
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

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPostDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);

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
        const { data, error } = await supabase
            .from('blog_posts')
            .select(`
        *,
        category:blog_categories(name, slug)
      `)
            .eq('slug', slug)
            .eq('is_published', true)
            .single();

        if (error) {
            console.error('Error fetching post:', error);
        } else {
            setPost(data);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-jawaWhite dark:bg-jawaBlack">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-jawaWhite dark:bg-jawaBlack text-jawaBlack dark:text-white">
                <h1 className="text-4xl font-bold">404</h1>
                <p className="mt-4">Article non trouvé</p>
                <Link to="/blog" className="btn-primary mt-8">Retour au blog</Link>
            </div>
        );
    }

    // Schema.org Article
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "image": [post.cover_image],
        "datePublished": post.published_at,
        "dateModified": post.published_at,
        "author": [{
            "@type": "Organization",
            "name": "JAWA Agency",
            "url": "https://www.jawa-agence.me/"
        }],
        "publisher": {
            "@type": "Organization",
            "name": "JAWA Agency",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.jawa-agence.me/logo-jawa.png"
            }
        },
        "description": post.excerpt
    };

    return (
        <div className="min-h-screen bg-jawaWhite dark:bg-jawaBlack text-jawaBlack dark:text-white transition-colors duration-300 flex flex-col relative">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 z-50 h-1 bg-primary transition-all duration-100 ease-out" style={{ width: `${scrollProgress}%` }} />

            <Header alwaysOpaque />

            <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-24 sm:py-32">
                {/* Back Link - Sticky or floating could be nice, currently static */}
                <Link
                    to="/blog"
                    className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-primary transition-colors mb-12"
                >
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Retour au blog
                </Link>

                {/* Article Header */}
                <header className="mb-12 text-center md:text-left">
                    {post.category && (
                        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-6">
                            {post.category.name}
                        </span>
                    )}

                    <h1 className="font-display text-4xl font-bold leading-tight text-jawaBlack dark:text-white sm:text-5xl lg:text-6xl mb-6">
                        {post.title}
                    </h1>

                    {post.excerpt && (
                        <p className="text-xl text-gray-500 dark:text-gray-300 leading-relaxed max-w-3xl mb-8">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Metadata Row */}
                    <div className="flex items-center justify-center md:justify-start gap-4 border-t border-b border-gray-100 dark:border-white/10 py-6">
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-lg">
                            {/* Placeholder Avatar */}
                            {post.author ? post.author[0] : 'J'}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-jawaBlack dark:text-white">
                                {post.author || 'JAWA Team'}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <time dateTime={post.published_at}>
                                    {new Date(post.published_at).toLocaleDateString('fr-FR', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </time>
                                <span>•</span>
                                <span>{Math.max(1, Math.round((post.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0) / 200))} min de lecture</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Featured Image - Wide and Cinematic */}
                {post.cover_image && (
                    <div className="relative mb-16 aspect-video w-full overflow-hidden rounded-3xl bg-gray-100 shadow-2xl dark:bg-white/5">
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <article className="prose prose-lg dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-3xl prose-img:shadow-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
                </article>

                {/* Footer / Next Steps */}
                <div className="mt-24 border-t border-gray-200 dark:border-white/10 pt-16 text-center">
                    <p className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-500">Vous avez aimé cet article ?</p>
                    <h3 className="mb-8 font-display text-2xl font-bold">Découvrez nos autres sujets.</h3>
                    <Link
                        to="/blog"
                        className="btn-primary inline-flex"
                    >
                        Explorer le Blog
                    </Link>
                </div>
            </main>

            <Footer />
        </div >
    );
};

export default BlogPost;
