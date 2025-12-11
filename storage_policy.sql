-- Création du bucket 'images' pour le stockage des fichiers
insert into storage.buckets (id, name, public)
values ('images', 'images', true);

-- Politique de sécurité : Tout le monde peut voir les images (Lecture publique)
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'images' );

-- Politique de sécurité : Seuls les admins connectés peuvent uploader (Insertion)
create policy "Authenticated Upload"
  on storage.objects for insert
  with check ( bucket_id = 'images' and auth.role() = 'authenticated' );

-- Politique de sécurité : Seuls les admins connectés peuvent modifier/supprimer
create policy "Authenticated Update"
  on storage.objects for update
  using ( bucket_id = 'images' and auth.role() = 'authenticated' );

create policy "Authenticated Delete"
  on storage.objects for delete
  using ( bucket_id = 'images' and auth.role() = 'authenticated' );
