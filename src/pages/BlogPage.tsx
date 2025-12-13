import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import SectionHeader from "../components/SectionHeader";
import BlogCard, { BlogPost } from "../components/BlogCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [categories, setCategories] = useState<{ id: number; name: string; slug: string }[]>([]);

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        let query = supabase
            .from("blog_posts")
            .select(`
        *,
        category:blog_categories(name, slug)
      `)
            .eq("is_published", true)
            .order("published_at", { ascending: false });

        // Note: Filtering by category usually requires a join filter or careful query structuring
        // For simplicity, we filter on client side if dataset is small, or use exact match if we have category_id

        const { data, error } = await query;

        if (error) {
            console.error("Error fetching posts:", error);
        } else {
            setPosts(data || []);
        }
        setLoading(false);
    };

    const fetchCategories = async () => {
        const { data } = await supabase.from("blog_categories").select("*");
        if (data) setCategories(data);
    };

    const filteredPosts = selectedCategory === "All"
        ? posts
        : posts.filter(post => post.category?.slug === selectedCategory);

    return (
        <div className="min-h-screen bg-jawaWhite dark:bg-jawaBlack transition-colors duration-300">
            <Header alwaysOpaque />
            {/* Header Space */}
            <div className="h-24"></div>

            <section className="section-padding">
                <div className="container-wide">
                    <SectionHeader
                        number="BLOG"
                        title="Insights & Expertise"
                        backgroundTitle="BLOG"
                        description="Explorez nos derniers articles sur le design, la technologie et la stratégie digitale."
                        align="left"
                    />

                    {/* Categories Filter */}
                    <div className="mb-12 flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <button
                            onClick={() => setSelectedCategory("All")}
                            className={`rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 
                ${selectedCategory === "All"
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "bg-white dark:bg-white/5 text-gray-500 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/10"
                                }`}
                        >
                            Tous
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.slug)}
                                className={`rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 
                  ${selectedCategory === cat.slug
                                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                                        : "bg-white dark:bg-white/5 text-gray-500 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/10"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Posts Grid */}
                    {loading ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                        </div>
                    ) : filteredPosts.length > 0 ? (
                        <div className="space-y-16">
                            {/* Featured Post (First Item) */}
                            {filteredPosts.length > 0 && (
                                <Link
                                    to={`/blog/${filteredPosts[0].slug}`}
                                    className="group relative block overflow-hidden rounded-3xl bg-white dark:bg-white/5 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1"
                                >
                                    <div className="grid md:grid-cols-2 gap-0">
                                        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                                            {filteredPosts[0].cover_image ? (
                                                <img
                                                    src={filteredPosts[0].cover_image}
                                                    alt={filteredPosts[0].title}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-gray-200 dark:bg-white/10" />
                                            )}
                                        </div>
                                        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                                            <div className="mb-6 flex items-center gap-3">
                                                {filteredPosts[0].category && (
                                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                                                        {filteredPosts[0].category.name}
                                                    </span>
                                                )}
                                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                                                    À la une
                                                </span>
                                            </div>
                                            <h2 className="mb-6 font-display text-3xl font-bold leading-tight text-jawaBlack dark:text-white md:text-4xl lg:text-5xl group-hover:text-primary transition-colors">
                                                {filteredPosts[0].title}
                                            </h2>
                                            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 line-clamp-3">
                                                {filteredPosts[0].excerpt}
                                            </p>
                                            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-jawaBlack dark:text-white group-hover:gap-4 transition-all">
                                                Lire l'article
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* Standard Grid (Remaining Items) */}
                            {filteredPosts.length > 1 && (
                                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredPosts.slice(1).map((post, index) => (
                                        <BlogCard key={post.id} post={post} index={index + 1} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
                            <div className="mb-4 rounded-full bg-gray-100 dark:bg-white/5 p-6">
                                <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-jawaBlack dark:text-white">Aucun article trouvé</h3>
                            <p className="mt-2 text-gray-500">Revenez bientôt pour de nouveaux contenus !</p>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </div >
    );
};

export default BlogPage;
