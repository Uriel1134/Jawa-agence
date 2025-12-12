import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const NewsletterForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setStatus('error');
            setMessage('Veuillez entrer votre email');
            return;
        }

        setLoading(true);
        setStatus('idle');

        try {
            const { error } = await supabase
                .from('newsletter_subscribers')
                .insert([
                    {
                        email: email.toLowerCase().trim(),
                        name: name.trim() || null,
                        source: 'website_contact'
                    }
                ]);

            if (error) {
                if (error.code === '23505') {
                    setStatus('error');
                    setMessage('Cet email est déjà inscrit');
                } else {
                    throw error;
                }
            } else {
                setStatus('success');
                setMessage('Merci ! Vous êtes inscrit 🎉');
                setEmail('');
                setName('');
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            setStatus('error');
            setMessage('Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-base font-bold text-jawaBlack dark:text-white">Newsletter</h3>
                    <p className="text-xs text-gray-500 dark:text-white/60">
                        Restez informé de nos actualités
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom (optionnel)"
                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm text-jawaBlack dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:border-primary dark:focus:border-primary transition"
                />
                <div className="flex gap-2">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        required
                        className="flex-1 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm text-jawaBlack dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:border-primary dark:focus:border-primary transition"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? '...' : "S'inscrire"}
                    </button>
                </div>

                {status !== 'idle' && (
                    <p className={`text-xs ${status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {message}
                    </p>
                )}
            </form>

            <p className="text-xs text-gray-400 dark:text-white/40">
                Désinscription possible à tout moment
            </p>
        </div>
    );
};

export default NewsletterForm;
