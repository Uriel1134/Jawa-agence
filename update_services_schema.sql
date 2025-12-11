-- Ajout de la colonne 'details' à la table 'services'
ALTER TABLE services ADD COLUMN IF NOT EXISTS details TEXT;
