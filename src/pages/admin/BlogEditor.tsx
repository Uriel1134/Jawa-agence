import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import AdminLayout from "./AdminLayout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from "uuid"; // We might need to install uuid or just use crypto

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
    ],
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
];

const BlogEditor: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // If id is present, it's edit mode
    const navigate = useNavigate();
    const [categories, setCategories] = useState<any[]>([]);

    const [form, setForm] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category_id: "",
        cover_image: "",
        is_published: false,
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
        if (id) {
            fetchPost(id);
        }
    }, [id]);

    const fetchCategories = async () => {
        const { data } = await supabase.from("blog_categories").select("*");
        if (data) setCategories(data);
    };

    const fetchPost = async (postId: string) => {
        const { data } = await supabase
            .from("blog_posts")
            .select("*")
            .eq("id", postId)
            .single();
        if (data) {
            setForm({
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt || "",
                content: data.content || "",
                category_id: data.category_id,
                cover_image: data.cover_image || "",
                is_published: data.is_published,
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Auto-generate slug from title if slug is empty
        if (name === "title" && !id && !form.slug) {
            setForm(prev => ({ ...prev, slug: slugify(value) }));
        }
    };

    const slugify = (text: string) => {
        return text
            .toString()
            .toLowerCase()
            .normalize("NFD") // Split accented chars
            .replace(/[\u0300-\u036f]/g, "") // Remove accents
            .replace(/\s+/g, "-") // Replace spaces with -
            .replace(/[^\w-]+/g, "") // Remove all non-word chars
            .replace(/--+/g, "-"); // Replace multiple - with single -
    };

    const handleContentChange = (content: string) => {
        setForm((prev) => ({ ...prev, content }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        setLoading(true);
        const { error: uploadError } = await supabase.storage
            .from("blog-images")
            .upload(filePath, file);

        if (uploadError) {
            alert("Erreur upload image");
            console.error(uploadError);
            setLoading(false);
            return;
        }

        const { data: { publicUrl } } = supabase.storage
            .from("blog-images")
            .getPublicUrl(filePath);

        setForm((prev) => ({ ...prev, cover_image: publicUrl }));
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const postData = {
            ...form,
            category_id: form.category_id ? parseInt(form.category_id) : null,
            published_at: form.is_published ? new Date().toISOString() : null,
        };

        if (id) {
            // Update
            const { error } = await supabase.from('blog_posts').update(postData).eq('id', id);
            if (error) console.error(error);
            else navigate('/admin/blog');
        } else {
            // Create
            const { error } = await supabase.from('blog_posts').insert([postData]);
            if (error) console.error(error);
            else navigate('/admin/blog');
        }
        setLoading(false);
    };

    return (
        <div className="animate-fade-in-up">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
                        {id ? "Mode Édition" : "Nouvelle Publication"}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm font-medium">
                        {id ? "Modifiez votre contenu avec soin." : "Partagez votre expertise avec le monde."}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/blog')}
                        className="rounded-xl px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 transition"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="rounded-xl bg-primary px-6 py-2 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:scale-105 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "Sauvegarde..." : (id ? "Mettre à jour" : "Publier l'article")}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column (Left) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title Input - Minimalist */}
                    <div className="group relative">
                        <textarea
                            name="title"
                            value={form.title}
                            onChange={(e) => {
                                handleChange(e as any);
                                // Auto-grow height
                                e.target.style.height = 'auto';
                                e.target.style.height = e.target.scrollHeight + 'px';
                            }}
                            required
                            rows={1}
                            className="w-full resize-none overflow-hidden bg-transparent text-4xl font-display font-bold text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-white/20 focus:outline-none"
                            placeholder="Entrez votre titre ici..."
                        />
                        <div className="h-0.5 w-full bg-gray-100 dark:bg-white/10 mt-2 group-focus-within:bg-primary transition-colors duration-300" />
                    </div>

                    {/* Excerpt */}
                    <div>
                        <textarea
                            name="excerpt"
                            value={form.excerpt}
                            onChange={handleChange}
                            rows={3}
                            className="w-full resize-none rounded-xl border-none bg-gray-50 dark:bg-white/5 p-4 text-lg text-gray-600 dark:text-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-primary/20 transition-all"
                            placeholder="Écrivez une accroche captivante (chapeau)..."
                        />
                    </div>

                    {/* Rich Text Editor */}
                    <div className="min-h-[500px] rounded-2xl border border-gray-100 bg-white dark:border-white/10 dark:bg-white/5 shadow-sm overflow-hidden">
                        <ReactQuill
                            theme="snow"
                            value={form.content}
                            onChange={handleContentChange}
                            modules={modules}
                            formats={formats}
                            className="h-[500px] border-none"
                        />
                    </div>
                </div>

                {/* Settings Sidebar (Right) - Sticky */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 space-y-6">
                        {/* Publish Status Card */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Publication</h3>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700 dark:text-white">État</span>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        name="is_published"
                                        checked={form.is_published}
                                        onChange={(e) => setForm(prev => ({ ...prev, is_published: e.target.checked }))}
                                        className="peer sr-only"
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-white/10 dark:border-gray-600"></div>
                                </label>
                            </div>
                            <div className="mt-4 text-xs text-gray-500">
                                {form.is_published ? "Cet article est visible par tous." : "Cet article est masqué (brouillon)."}
                            </div>
                        </div>

                        {/* Metadata Card */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Métadonnées</h3>

                            {/* Category */}
                            <div>
                                <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-white">Catégorie</label>
                                <select
                                    name="category_id"
                                    value={form.category_id}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm font-medium transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:bg-white/10"
                                >
                                    <option value="">Sélectionner...</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-white">Slug URL</label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={form.slug}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm font-medium transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:bg-white/10"
                                    placeholder="url-de-l-article"
                                />
                                <p className="mt-1 text-[10px] text-gray-400">Sera utilisé dans l'adresse web.</p>
                            </div>
                        </div>

                        {/* Image Card */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Illustration</h3>
                            <div className="group relative w-full overflow-hidden rounded-xl border-2 border-dashed border-gray-300 dark:border-white/20 hover:border-primary/50 transition-colors bg-gray-50 dark:bg-white/5">
                                {form.cover_image ? (
                                    <>
                                        <img src={form.cover_image} alt="Cover" className="h-48 w-full object-cover" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                            <p className="font-bold text-white">Changer l'image</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex h-48 flex-col items-center justify-center p-4 text-center">
                                        <svg className="mb-2 h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-xs text-gray-500">Cliquez pour uploader</p>
                                    </div>
                                )}
                                <input type="file" onChange={handleImageUpload} className="absolute inset-0 cursor-pointer opacity-0" accept="image/*" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Hidden form required for validation logic if not using native browser validation properly with custom submit button */}
        </div>
    );
};

export default BlogEditor;
