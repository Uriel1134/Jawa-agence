import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-display font-bold text-jawaBlack">Tableau de bord</h2>
                <p className="text-gray-500 mt-1">Bienvenue sur votre espace d'administration.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Carte de bienvenue */}
                <div className="col-span-2 overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[#2C14C7] p-8 text-white shadow-lg shadow-primary/20">
                    <h3 className="text-2xl font-bold mb-2">Bonjour, Admin</h3>
                    <p className="text-white/80 mb-6 max-w-md">
                        Prêt à mettre à jour votre site ? Ajoutez de nouveaux projets ou modifiez vos services en quelques clics.
                    </p>
                    <div className="flex gap-3">
                        <a href="/admin/portfolio" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-white/90">
                            Gérer le Portfolio
                        </a>
                        <a href="/" target="_blank" className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">
                            Voir le site
                        </a>
                    </div>
                </div>

                {/* Carte Info Rapide */}
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-3 text-xl font-bold">
                        OK
                    </div>
                    <h4 className="font-semibold text-gray-900">Site en ligne</h4>
                    <p className="text-sm text-gray-500 mt-1">Votre site est visible et performant.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
