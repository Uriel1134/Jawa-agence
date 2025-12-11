-- Création de la table pour la section A Propos (Singleton)
create table about_section (
  id int primary key default 1 check (id = 1), -- Force une seule ligne
  image_url text,
  satisfaction_score text default '4,9/5',
  satisfaction_text text default 'Basé sur plus de 120 retours clients vérifiés.',
  intro_title text default 'JAWA Agence',
  intro_text text,
  history_text text,
  mission_text text,
  vision_text text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Activation RLS
alter table about_section enable row level security;

-- Politiques (Lecture publique, Modification Admin)
create policy "Public Read About"
  on about_section for select
  using (true);

create policy "Admin Update About"
  on about_section for update
  using (auth.role() = 'authenticated');

create policy "Admin Insert About"
  on about_section for insert
  with check (auth.role() = 'authenticated');

-- Insertion des données initiales (basées sur le contenu actuel)
insert into about_section (
  id,
  image_url,
  intro_text,
  history_text,
  mission_text,
  vision_text
) values (
  1,
  '/Teams.jpeg',
  'JAWA est une agence digitale spécialisée dans la conception d''expériences web & mobile premium. Nous combinons stratégie, design et technologie pour bâtir des produits utiles, élégants et performants.',
  'Née de la rencontre entre profils créatifs et profils techniques, JAWA s''est construite autour d''une conviction simple : un bon produit digital doit être aussi agréable à utiliser qu''efficace pour le business.',
  'Transformer vos idées en interfaces claires, rapides et sécurisées, en vous guidant à chaque étape du projet : cadrage, design, développement et accompagnement post‑lancement.',
  'Devenir le partenaire digital long terme des marques qui veulent innover, en proposant des solutions durables, scalables et pensées pour évoluer avec vos enjeux.'
) on conflict (id) do nothing;
