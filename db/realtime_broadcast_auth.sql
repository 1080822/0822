drop policy if exists "authenticated can receive broadcasts" on realtime.messages;
create policy "authenticated can receive broadcasts"
on realtime.messages
for select
to authenticated
using (true);
