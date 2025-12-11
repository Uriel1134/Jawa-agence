---
description: Configurer un nom de domaine personnalisé (Namecheap) sur Vercel
---

# Configuration du domaine `jawa-agence.me`

Suivez ces étapes pour relier votre domaine Namecheap à votre projet Vercel.

## Étape 1 : Ajouter le domaine sur Vercel

1.  Connectez-vous à votre tableau de bord **Vercel**.
2.  Sélectionnez votre projet **jawa-agence**.
3.  Allez dans **Settings** (Paramètres) > **Domains**.
4.  Entrez `jawa-agence.me` dans le champ de saisie et cliquez sur **Add**.
5.  Vercel va vous proposer d'ajouter également `www.jawa-agence.me`. Acceptez (Recommended).
6.  Vercel va afficher une erreur de configuration (Invalid Configuration) et vous donner des enregistrements DNS à ajouter (A Record et CNAME). Gardez cette page ouverte.

## Étape 2 : Configurer les DNS sur Namecheap

1.  Connectez-vous à votre compte **Namecheap**.
2.  Allez dans **Domain List** et cliquez sur **Manage** à côté de `jawa-agence.me`.
3.  Allez dans l'onglet **Advanced DNS**.
4.  Supprimez les enregistrements existants s'il y en a (souvent des parkings pages).
5.  Ajoutez les enregistrements demandés par Vercel :

    *   **Type** : `A Record`
    *   **Host** : `@`
    *   **Value** : `76.76.21.21` (C'est l'IP standard de Vercel, vérifiez si Vercel vous en donne une autre)
    *   **TTL** : Automatic

    *   **Type** : `CNAME Record`
    *   **Host** : `www`
    *   **Value** : `cname.vercel-dns.com`
    *   **TTL** : Automatic

## Étape 3 : Vérification

1.  Retournez sur **Vercel**.
2.  Vercel vérifie périodiquement les DNS. Cela peut prendre de quelques minutes à quelques heures (propagation DNS).
3.  Une fois les deux coches vertes apparues, votre site sera accessible via `jawa-agence.me` et `www.jawa-agence.me`.
4.  Vercel générera automatiquement un certificat SSL (HTTPS) pour vous.
