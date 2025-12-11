-- Clear existing plans to avoid duplicates
TRUNCATE TABLE pricing_plans RESTART IDENTITY;

INSERT INTO pricing_plans (title, price, features, is_popular, category, button_text) VALUES

-- 1. DÉVELOPPEMENT WEB
(
    'Site Vitrine',
    '899',
    ARRAY[
        'Design sur mesure (UI/UX)',
        'Responsive (Mobile & Tablette)',
        'Optimisation SEO de base',
        'Formulaire de contact',
        'Intégration Réseaux Sociaux',
        'Hébergement & NDD offerts (1 an)'
    ],
    false,
    'Développement Web',
    'Commander'
),
(
    'E-Commerce Pro',
    '1899',
    ARRAY[
        'Boutique en ligne complète',
        'Gestion Stocks & Commandes',
        'Paiements Sécurisés (Stripe/PayPal)',
        'Tableau de bord Admin',
        'Formation prise en main (2h)',
        'Optimisation Conversion (CRO)'
    ],
    true,
    'Développement Web',
    'Lancer ma boutique'
),
(
    'Application Web / SaaS',
    'Sur Devis',
    ARRAY[
        'Architecture complexe & Scalable',
        'Fonctionnalités avancées',
        'API & Intégrations tierces',
        'Espace Membre / Auth',
        'Tests automatisés',
        'Maintenance évolutive'
    ],
    false,
    'Développement Web',
    'Contactez-nous'
),

-- 2. DÉVELOPPEMENT MOBILE
(
    'App Mobile Hybride',
    '2499',
    ARRAY[
        'Développement Cross-Platform (React Native)',
        'Compatible iOS & Android',
        'Design UI/UX Mobile First',
        'Publication sur les Stores',
        'Notifications Push',
        'Performance native'
    ],
    false,
    'Développement Mobile',
    'Démarrer'
),
(
    'App Native Premium',
    '4999',
    ARRAY[
        'Développement Natif (Swift/Kotlin)',
        'Performance Maximale',
        'Fonctionnalités avancées (GPS, Caméra...)',
        'Animations fluides & complexes',
        'Back-office d''administration',
        'Maintenance 6 mois offerte'
    ],
    true,
    'Développement Mobile',
    'Créer mon app'
),
(
    'MVP Startup',
    '1999',
    ARRAY[
        'Version minimale viable',
        'Fonctionnalités essentielles',
        'Délai de livraison rapide',
        'Design épuré et fonctionnel',
        'Scalabilité prévue',
        'Conseil stratégique lancement'
    ],
    false,
    'Développement Mobile',
    'Lancer mon idée'
),

-- 3. DESIGN GRAPHIQUE
(
    'Supports Print',
    '299',
    ARRAY[
        'Cartes de visite',
        'Flyers & Dépliants',
        'Affiches publicitaires',
        'Fichiers prêts pour impression',
        'Formats vectoriels',
        '2 Révisions incluses'
    ],
    false,
    'Design Graphique',
    'Commander'
),
(
    'Pack Communication',
    '599',
    ARRAY[
        'Plaquette commerciale',
        'Roll-up / Kakemono',
        'Papeterie complète',
        'Visuels Réseaux Sociaux (10)',
        'Signature Email',
        'Guide d''utilisation'
    ],
    true,
    'Design Graphique',
    'Commander'
),
(
    'Illustration & Iconographie',
    'Sur Devis',
    ARRAY[
        'Illustrations sur mesure',
        'Set d''icônes personnalisé',
        'Infographies complexes',
        'Motion Design (Animation)',
        'Direction artistique unique',
        'Cession des droits'
    ],
    false,
    'Design Graphique',
    'Devis'
),

-- 4. BRANDING & IDENTITÉ
(
    'Logo Start',
    '499',
    ARRAY[
        '3 Pistes créatives',
        'Logo final vectoriel',
        'Déclinaisons Noir & Blanc',
        'Favicon',
        'Cession des droits',
        'Livraison rapide'
    ],
    false,
    'Branding & Identité',
    'Créer mon logo'
),
(
    'Identité Complète',
    '1299',
    ARRAY[
        'Logo Premium + Variantes',
        'Charte Graphique détaillée',
        'Palette Couleurs & Typographie',
        'Brand Book (Guide de marque)',
        'Univers graphique complet',
        'Conseil en image de marque'
    ],
    true,
    'Branding & Identité',
    'Sublimer ma marque'
),
(
    'Rebranding',
    'Sur Devis',
    ARRAY[
        'Audit de l''image actuelle',
        'Refonte stratégique du logo',
        'Modernisation de la charte',
        'Déploiement sur tous supports',
        'Stratégie de lancement',
        'Accompagnement au changement'
    ],
    false,
    'Branding & Identité',
    'Renouveler'
),

-- 5. MAINTENANCE
(
    'Maintenance Essentielle',
    '49',
    ARRAY[
        'Mises à jour techniques',
        'Sauvegarde hebdomadaire',
        'Monitoring sécurité',
        'Rapport mensuel',
        'Support Email'
    ],
    false,
    'Maintenance',
    'S''abonner'
),
(
    'Maintenance Pro',
    '99',
    ARRAY[
        'Mises à jour prioritaires',
        'Sauvegarde journalière',
        'Optimisation performances',
        '1h de modification / mois',
        'Support prioritaire 24h',
        'Restauration garantie'
    ],
    true,
    'Maintenance',
    'S''abonner'
),
(
    'Infogérance',
    '199',
    ARRAY[
        'Gestion complète serveur',
        'Sécurité avancée (WAF)',
        'Interventions illimitées',
        'Audit trimestriel',
        'Astreinte technique',
        'Contact dédié'
    ],
    false,
    'Maintenance',
    'S''abonner'
),

-- 6. UX/UI DESIGN (Nouveau - Remplace Marketing Digital)
(
    'Audit & Wireframing',
    '899',
    ARRAY[
        'Audit ergonomique (Heuristique)',
        'Parcours utilisateurs (User Flows)',
        'Architecture de l''information',
        'Wireframes basse fidélité',
        'Recommandations UX',
        'Atelier de co-conception'
    ],
    false,
    'UX/UI Design',
    'Auditer'
),
(
    'Design System & Proto',
    '1699',
    ARRAY[
        'Maquettes UI Haute Fidélité',
        'Prototypage interactif (Figma)',
        'Création du Design System',
        'Bibliothèque de composants',
        'Tests utilisateurs modérés',
        'Handover développeurs complet'
    ],
    true,
    'UX/UI Design',
    'Designer'
),
(
    'Product Design',
    'Sur Devis',
    ARRAY[
        'Accompagnement produit complet',
        'Recherche utilisateur (User Research)',
        'Design Sprints',
        'Itérations continues',
        'Analyse comportementale (Hotjar)',
        'Direction Artistique avancée'
    ],
    false,
    'UX/UI Design',
    'Collaborer'
);
