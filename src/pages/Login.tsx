import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            navigate('/admin');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Admin Login</h2>
                {error && (
                    <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded border border-gray-300 p-2 focus:border-primary focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded border border-gray-300 p-2 focus:border-primary focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded bg-primary py-2 text-white hover:bg-primary/90 disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
