-- Ajout de la colonne description pour la page détail
alter table projects 
add column if not exists description text;
