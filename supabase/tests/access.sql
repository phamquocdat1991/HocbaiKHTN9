-- Run after migration. Rolls back all test data.
begin;
select 1 / case when relrowsecurity then 1 else 0 end from pg_class where oid='public.khtn9_records'::regclass;
select 1 / case when not has_table_privilege('anon','public.khtn9_records','SELECT') then 1 else 0 end;
select 1 / case when not has_table_privilege('authenticated','public.khtn9_records','UPDATE') then 1 else 0 end;
select 1 / case when not has_function_privilege('authenticated','public.khtn9_commit(jsonb)','EXECUTE') then 1 else 0 end;
select 1 / case when has_function_privilege('service_role','public.khtn9_commit(jsonb)','EXECUTE') then 1 else 0 end;
rollback;
