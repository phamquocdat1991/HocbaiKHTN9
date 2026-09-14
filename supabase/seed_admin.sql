-- ==============================================================================
-- KHTN 9: Khởi tạo tài khoản Quản trị viên (Admin / Giáo viên chính)
-- Email: phamquocdat1991@gmail.com
-- Mật khẩu: pqdhhvpro1991
-- Chạy script này trong Supabase Dashboard -> SQL Editor
-- Script an toàn để chạy lại nhiều lần (idempotent).
-- ==============================================================================

begin;

-- Kích hoạt extension pgcrypto nếu chưa có (cần thiết cho gen_salt và crypt)
create extension if not exists pgcrypto with schema extensions;

do $$
declare
  target_email text := 'phamquocdat1991@gmail.com';
  target_password text := 'pqdhhvpro1991';
  target_name text := 'Thầy Phạm Quốc Đạt';
  user_uid uuid;
  encrypted_pw text;
begin
  encrypted_pw := extensions.crypt(target_password, extensions.gen_salt('bf'));

  -- 1. Kiểm tra tài khoản trong auth.users
  select id into user_uid from auth.users where lower(email) = lower(target_email);

  if user_uid is null then
    user_uid := gen_random_uuid();

    insert into auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) values (
      '00000000-0000-0000-0000-000000000000',
      user_uid,
      'authenticated',
      'authenticated',
      target_email,
      encrypted_pw,
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      jsonb_build_object('display_name', target_name),
      now(),
      now(),
      '',
      '',
      '',
      ''
    );

    insert into auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) values (
      gen_random_uuid(),
      user_uid,
      format('{"sub":"%s","email":"%s"}', user_uid, target_email)::jsonb,
      'email',
      target_email,
      now(),
      now(),
      now()
    );

    raise notice 'Đã tạo mới tài khoản admin: % (UID: %)', target_email, user_uid;
  else
    update auth.users
    set encrypted_password = encrypted_pw,
        email_confirmed_at = coalesce(email_confirmed_at, now()),
        raw_user_meta_data = jsonb_set(coalesce(raw_user_meta_data, '{}'::jsonb), '{display_name}', to_jsonb(target_name)),
        updated_at = now()
    where id = user_uid;

    raise notice 'Đã cập nhật mật khẩu và kích hoạt email cho admin: % (UID: %)', target_email, user_uid;
  end if;

  -- 2. Đồng bộ bản ghi trong public.khtn9_records
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'khtn9_records') then
    insert into public.khtn9_records (record_key, payload, version, updated_at)
    values (
      'users/' || user_uid,
      jsonb_build_object(
        'id', user_uid,
        'name', target_name,
        'classId', '',
        'role', 'teacher',
        'isAdmin', true,
        'email', target_email,
        'progress', jsonb_build_object(
          'completed', '[]'::jsonb,
          'studySeconds', 0,
          'activeDates', '[]'::jsonb,
          'gameWins', '[]'::jsonb
        ),
        'attempts', '[]'::jsonb,
        'submissions', '[]'::jsonb
      ),
      1,
      now()
    )
    on conflict (record_key) do update
    set payload = jsonb_set(
          jsonb_set(
            jsonb_set(public.khtn9_records.payload, '{role}', '"teacher"'),
            '{isAdmin}', 'true'
          ),
          '{email}', to_jsonb(target_email)
        ),
        updated_at = now();

    raise notice 'Đã cấu hình hồ sơ users/% với vai trò giáo viên quản trị (isAdmin=true).', user_uid;
  end if;
end $$;

commit;
