-- Ajout des colonnes pour les liens et technologies
alter table projects 
add column if not exists github_url text,
add column if not exists figma_url text,
add column if not exists technologies text; -- Stocké comme une chaîne séparée par des virgules (ex: "React, Node.js, Tailwind")
