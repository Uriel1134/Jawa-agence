import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LogoMark from '../../components/LogoMark';

const AdminLayout: React.FC = () => {
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    return (
        <div className="flex min-h-screen bg-[#F3F4F6] dark:bg-jawaBlack font-body transition-colors duration-300">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-72 bg-jawaBlack text-white shadow-2xl border-r border-white/5 flex flex-col z-50">
                <div className="flex h-24 items-center px-8 border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-3">
                        <LogoMark size="md" />
                        <span className="font-display text-xl font-bold tracking-wide">JAWA Admin</span>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 no-scrollbar hover:scrollbar-thumb-white/20">
                    <Link
                        to="/admin"
                        className={`group flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${location.pathname === '/admin'
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        Tableau de bord
                    </Link>

                    <div className="pt-6 pb-2 px-4 text-[10px] font-bold uppercase tracking-widest text-white/30">
                        Contenu
                    </div>

                    <Link
                        to="/admin/blog"
                        className={`group flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${isActive('/admin/blog')
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        Blog
                    </Link>

                    <Link
                        to="/admin/services"
                        className={`group flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${isActive('/admin/services')
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        Services
                    </Link>
                    <Link
                        to="/admin/footer"
                        className={`group flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${isActive('/admin/footer')
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        Footer & Contact
                    </Link>
                    <Link
                        to="/admin/portfolio"
                        className={`group flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${isActive('/admin/portfolio')
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        Portfolio
                    </Link>
                    <Link
                        to="/admin/pricing"
                        className={`group flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${isActive('/admin/pricing')
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        Tarifs
                    </Link>
                    <Link
                        to="/admin/process"
                        className={`group flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${isActive('/admin/process')
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        Processus
                    </Link>
                    <Link
                        to="/admin/team"
                        className={`group flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${isActive('/admin/team')
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        Équipe
                    </Link>
                    <Link
                        to="/admin/newsletter"
                        className={`group flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${isActive('/admin/newsletter')
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        Newsletter
                    </Link>
                    <Link
                        to="/admin/faq"
                        className={`group flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${isActive('/admin/faq')
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        FAQ
                    </Link>
                    <Link
                        to="/admin/testimonials"
                        className={`group flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${isActive('/admin/testimonials')
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        Témoignages
                    </Link>
                    <Link
                        to="/admin/trusted"
                        className={`group flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${isActive('/admin/trusted')
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        Partenaires
                    </Link>
                    <Link
                        to="/admin/about"
                        className={`group flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${isActive('/admin/about')
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        A Propos
                    </Link>
                </nav>

                <div className="border-t border-white/10 bg-white/5 p-4 shrink-0">
                    <button
                        onClick={handleSignOut}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/20 hover:text-red-300 border border-red-500/20"
                    >
                        <span>Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-72 flex-1 p-10">
                <div className="mx-auto max-w-5xl">
                    <Outlet />
                </div>
            </main>
        </div >
    );
};

export default AdminLayout;
