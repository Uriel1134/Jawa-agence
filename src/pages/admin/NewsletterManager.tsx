import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

interface Subscriber {
    id: number;
    email: string;
    name: string | null;
    subscribed_at: string;
    is_active: boolean;
    source: string;
}

const NewsletterManager: React.FC = () => {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, active: 0, thisMonth: 0 });

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        const { data, error } = await supabase
            .from('newsletter_subscribers')
            .select('*')
            .order('subscribed_at', { ascending: false });

        if (error) {
            console.error('Error fetching subscribers:', error);
        } else {
            setSubscribers(data || []);
            calculateStats(data || []);
        }
        setLoading(false);
    };

    const calculateStats = (subs: Subscriber[]) => {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        setStats({
            total: subs.length,
            active: subs.filter(s => s.is_active).length,
            thisMonth: subs.filter(s => new Date(s.subscribed_at) >= firstDayOfMonth).length
        });
    };

    const toggleStatus = async (id: number, currentStatus: boolean) => {
        const { error } = await supabase
            .from('newsletter_subscribers')
            .update({ is_active: !currentStatus })
            .eq('id', id);

        if (error) {
            console.error('Error updating status:', error);
            alert('Erreur lors de la mise à jour');
        } else {
            fetchSubscribers();
        }
    };

    const deleteSubscriber = async (id: number) => {
        if (!confirm('Supprimer cet abonné ?')) return;

        const { error } = await supabase
            .from('newsletter_subscribers')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting subscriber:', error);
            alert('Erreur lors de la suppression');
        } else {
            fetchSubscribers();
        }
    };

    const exportToCSV = () => {
        const csv = [
            ['Email', 'Nom', 'Date', 'Statut', 'Source'],
            ...subscribers.map(s => [
                s.email,
                s.name || '',
                new Date(s.subscribed_at).toLocaleDateString('fr-FR'),
                s.is_active ? 'Actif' : 'Inactif',
                s.source
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Newsletter</h1>
                <button
                    onClick={exportToCSV}
                    className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition"
                >
                    📥 Exporter CSV
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <p className="text-sm text-white/60 mb-2">Total Abonnés</p>
                    <p className="text-3xl font-bold text-white">{stats.total}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <p className="text-sm text-white/60 mb-2">Actifs</p>
                    <p className="text-3xl font-bold text-green-400">{stats.active}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <p className="text-sm text-white/60 mb-2">Ce Mois-ci</p>
                    <p className="text-3xl font-bold text-primary">{stats.thisMonth}</p>
                </div>
            </div>

            {/* Subscribers List */}
            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-white/60">Chargement...</div>
                ) : subscribers.length === 0 ? (
                    <div className="p-8 text-center text-white/60">Aucun abonné</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white/60">Email</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white/60">Nom</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white/60">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white/60">Source</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white/60">Statut</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-white/60">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {subscribers.map((subscriber) => (
                                    <tr key={subscriber.id} className="hover:bg-white/5 transition">
                                        <td className="px-6 py-4 text-sm text-white">{subscriber.email}</td>
                                        <td className="px-6 py-4 text-sm text-white/80">{subscriber.name || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-white/60">
                                            {new Date(subscriber.subscribed_at).toLocaleDateString('fr-FR')}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-white/60">{subscriber.source}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${subscriber.is_active
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                {subscriber.is_active ? 'Actif' : 'Inactif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => toggleStatus(subscriber.id, subscriber.is_active)}
                                                className="text-primary hover:text-primary/80 transition text-sm"
                                            >
                                                {subscriber.is_active ? 'Désactiver' : 'Activer'}
                                            </button>
                                            <button
                                                onClick={() => deleteSubscriber(subscriber.id)}
                                                className="text-red-400 hover:text-red-300 transition text-sm"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsletterManager;
