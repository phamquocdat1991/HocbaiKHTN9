-- KHTN 9: namespaced records with atomic optimistic concurrency.
-- Safe to run again. Does not modify other apps' tables.
begin;
create table if not exists public.khtn9_records (
  record_key text primary key check (record_key = 'school/main' or record_key ~ '^users/[a-zA-Z0-9_-]+$'),
  payload jsonb not null check(jsonb_typeof(payload) = 'object'),
  version bigint not null default 1,
  updated_at timestamptz not null default now()
);
alter table public.khtn9_records enable row level security;
revoke all on public.khtn9_records from public, anon, authenticated;
grant select, insert, update on public.khtn9_records to service_role;
-- Browser clients have NO direct data access. The API verifies Supabase Auth,
-- authorizes each action and strips private answers before responding.
create or replace function public.khtn9_commit(changes jsonb)
returns void language plpgsql security invoker set search_path = '' as $$
declare item jsonb; affected integer;
begin
  if jsonb_typeof(changes) <> 'array' or jsonb_array_length(changes) > 10 then
    raise exception 'Invalid changes';
  end if;
  -- Deterministic row order avoids deadlocks for multi-record writes.
  for item in select value from jsonb_array_elements(changes) order by value->>'key'
  loop
    if (item->>'expected_version')::bigint = 0 then
      insert into public.khtn9_records(record_key,payload)
      values(item->>'key',item->'payload') on conflict do nothing;
    else
      update public.khtn9_records set payload=item->'payload',version=version+1,updated_at=now()
      where record_key=item->>'key' and version=(item->>'expected_version')::bigint;
    end if;
    get diagnostics affected = row_count;
    if affected <> 1 then
      raise exception 'Concurrent update' using errcode='40001';
    end if;
  end loop;
end;
$$;
revoke all on function public.khtn9_commit(jsonb) from public, anon, authenticated;
grant execute on function public.khtn9_commit(jsonb) to service_role;
commit;
