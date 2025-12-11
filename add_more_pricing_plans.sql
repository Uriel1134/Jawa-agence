-- Insert additional pricing plans for other categories
INSERT INTO pricing_plans (title, price, features, is_popular, category, button_text) VALUES
-- Design & Branding
(
    'Identité Visuelle',
    '499',
    ARRAY[
        'Logo professionnel (3 propositions)',
        'Charte graphique complète',
        'Palette de couleurs & Typographie',
        'Déclinaisons (Favicon, RS)',
        'Fichiers sources (AI, PDF, PNG)',
        'Cession des droits d''auteur'
    ],
    false,
    'Design & Branding',
    'Commander'
),
(
    'Pack Branding Complet',
    '999',
    ARRAY[
        'Tout le pack Identité Visuelle',
        'Design cartes de visite & papeterie',
        'Templates Réseaux Sociaux (5)',
        'Signature email HTML',
        'Guide d''utilisation de la marque',
        'Support prioritaire'
    ],
    true,
    'Design & Branding',
    'Démarrer'
),
(
    'UI/UX Design App',
    '1299',
    ARRAY[
        'Recherche utilisateur & Personas',
        'Wireframes & Prototypage',
        'Design d''interface (UI) complet',
        'Design System',
        'Maquettes interactives (Figma)',
        'Tests utilisateurs basiques'
    ],
    false,
    'Design & Branding',
    'Devis'
),

-- Maintenance
(
    'Maintenance Standard',
    '49',
    ARRAY[
        'Mises à jour WordPress/Plugins',
        'Sauvegarde hebdomadaire',
        'Sécurité & Monitoring 24/7',
        'Rapport mensuel PDF',
        'Support par email (48h)'
    ],
    false,
    'Maintenance',
    'S''abonner'
),
(
    'Maintenance Business',
    '99',
    ARRAY[
        'Tout le pack Standard',
        'Sauvegarde journalière',
        '1h d''intervention / mois',
        'Optimisation des performances',
        'Support prioritaire (24h)',
        'Restauration gratuite si piratage'
    ],
    true,
    'Maintenance',
    'S''abonner'
);
