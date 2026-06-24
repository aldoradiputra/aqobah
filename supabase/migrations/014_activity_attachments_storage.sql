-- Aqobah ERP — Activity feed file attachments
-- A private Storage bucket for files attached to activity-feed comments, plus RLS
-- on storage.objects scoped to that bucket. Attachments are referenced from
-- public.activity_events.metadata.attachments[] ({path,name,size,type}); the file
-- bytes live here and are served to staff via short-lived signed URLs.
--
-- Access model (matches activity_events: staff-internal, all authenticated read):
--   • any authenticated user may read and upload within the bucket
--   • a user may delete only the objects they uploaded (owner = auth.uid())
-- The bucket is private (public=false) with a 10 MB per-file cap enforced both
-- server-side (file_size_limit) and client-side (lib/storage.ts).

insert into storage.buckets (id, name, public, file_size_limit)
values ('activity-attachments', 'activity-attachments', false, 10485760)
on conflict (id) do nothing;

drop policy if exists "activity attachments authenticated read" on storage.objects;
create policy "activity attachments authenticated read"
  on storage.objects for select to authenticated
  using (bucket_id = 'activity-attachments');

drop policy if exists "activity attachments authenticated insert" on storage.objects;
create policy "activity attachments authenticated insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'activity-attachments');

drop policy if exists "activity attachments delete own" on storage.objects;
create policy "activity attachments delete own"
  on storage.objects for delete to authenticated
  using (bucket_id = 'activity-attachments' and owner = (select auth.uid()));
