import React from 'react';
import { Link } from 'react-router-dom';

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string;
    category: {
        name: string;
        slug: string;
    } | null;
    published_at: string;
}

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
    // Calculate reading time
    const readingTime = Math.max(1, Math.round((post.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0) / 200));

    return (
        <Link
            to={`/blog/${post.slug}`}
            className="group flex flex-col gap-3 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Image Container - Tighter Aspect Ratio (16:9) */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-white/5">
                {post.cover_image ? (
                    <img
                        src={post.cover_image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-300 dark:bg-white/5 dark:text-white/20">
                        <svg className="h-8 w-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}

                {/* Subtle scrim */}
                <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity group-hover:opacity-10 dark:bg-white/5"></div>
            </div>

            {/* Content Stack - Very Dense */}
            <div className="flex flex-col gap-2">
                {/* Metadata Row: Category & Date - Condensed */}
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                    {post.category ? (
                        <span className="text-primary">
                            {post.category.name}
                        </span>
                    ) : (
                        <span className="text-gray-400">Blog</span>
                    )}
                    <span className=" text-gray-300">•</span>
                    <span className="text-gray-400 dark:text-gray-500">
                        {post.published_at && new Date(post.published_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short'
                        })}
                    </span>
                    <span className=" text-gray-300">•</span>
                    <span className="text-gray-400 dark:text-gray-500">{readingTime} min</span>
                </div>

                {/* Title - Smaller, cleaner */}
                <h3 className="font-display text-lg font-bold leading-snug text-jawaBlack dark:text-white group-hover:text-primary transition-colors">
                    {post.title}
                </h3>

                {/* Excerpt - Optional or extremely clamped */}
                <p className="line-clamp-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                    {post.excerpt}
                </p>

                {/* Read More - Removed to save space, the card is clickable enough */}
            </div>
        </Link>
    );
};

export default BlogCard;
