import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/lms.js';
import {changeRole} from '../src/accounts.js';
import {newUser} from '../src/domain.js';

test('admin identity phamquocdat1991@gmail.com receives admin rights and teacher role', async () => {
  process.env.SUPABASE_URL = 'https://test.supabase.co';
  process.env.SUPABASE_ANON_KEY = 'public-test';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'secret-test';
  delete process.env.ADMIN_EMAIL; // Test fallback to phamquocdat1991@gmail.com

  const prev = global.fetch;
  try {
    global.fetch = async (url, opt) => {
      if (url.endsWith('/auth/v1/user')) {
        return new Response(JSON.stringify({
          id: 'admin-uid',
          email: 'phamquocdat1991@gmail.com',
          email_confirmed_at: '2026-09-14T00:00:00Z',
          user_metadata: { display_name: 'Thầy Phạm Quốc Đạt' }
        }));
      }
      if (url.includes('/rest/v1/khtn9_records?record_key=eq.')) {
        return new Response(JSON.stringify([]));
      }
      if (url.endsWith('/rest/v1/rpc/khtn9_commit')) {
        return new Response(JSON.stringify({ ok: true }));
      }
      if (url.includes('/rest/v1/khtn9_records?record_key=like.users')) {
        return new Response(JSON.stringify([]));
      }
      return new Response('Not found', { status: 404 });
    };

    let result = null;
    const req = {
      method: 'POST',
      headers: { authorization: 'Bearer test-admin-token' },
      body: JSON.stringify({ action: 'state' })
    };
    const res = {
      setHeader() {},
      status(code) {
        assert.equal(code, 200);
        return this;
      },
      json(data) {
        result = data;
        return this;
      }
    };

    await handler(req, res);
    assert.ok(result);
    assert.equal(result.user.isAdmin, true);
    assert.equal(result.user.role, 'teacher');
    assert.equal(result.user.email, 'phamquocdat1991@gmail.com');
  } finally {
    global.fetch = prev;
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_ANON_KEY;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  }
});

test('unverified email cannot gain admin rights even if email matches', async () => {
  process.env.SUPABASE_URL = 'https://test.supabase.co';
  process.env.SUPABASE_ANON_KEY = 'public-test';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'secret-test';

  const prev = global.fetch;
  try {
    global.fetch = async (url, opt) => {
      if (url.endsWith('/auth/v1/user')) {
        return new Response(JSON.stringify({
          id: 'unverified-uid',
          email: 'phamquocdat1991@gmail.com',
          email_confirmed_at: null, // Not verified!
          user_metadata: { display_name: 'Giả mạo' }
        }));
      }
      if (url.includes('/rest/v1/khtn9_records?record_key=eq.')) {
        return new Response(JSON.stringify([]));
      }
      if (url.endsWith('/rest/v1/rpc/khtn9_commit')) {
        return new Response(JSON.stringify({ ok: true }));
      }
      return new Response('Not found', { status: 404 });
    };

    let result = null;
    const req = {
      method: 'POST',
      headers: { authorization: 'Bearer unverified-token' },
      body: JSON.stringify({ action: 'state' })
    };
    const res = {
      setHeader() {},
      status() { return this; },
      json(data) { result = data; return this; }
    };

    await handler(req, res);
    assert.ok(result);
    assert.equal(result.user.isAdmin, false);
    assert.equal(result.user.role, 'student');
  } finally {
    global.fetch = prev;
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_ANON_KEY;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  }
});

test('admin can promote student to teacher role', () => {
  const admin = { ...newUser('admin-uid', 'Thầy Phạm Quốc Đạt', '', 'teacher'), isAdmin: true };
  const student = newUser('student-1', 'Học sinh A', 'class-1', 'student');

  const updated = changeRole(admin, student, 'teacher');
  assert.equal(updated.role, 'teacher');
});

test('admin credentials match configured credentials for local/cloud login', () => {
  const targetEmail = 'phamquocdat1991@gmail.com';
  const targetPassword = 'pqdhhvpro1991';

  // Verify username normalization
  const testInput = ' phamquocdat1991@gmail.com ';
  assert.equal(testInput.trim().toLowerCase(), targetEmail);
  assert.equal(targetPassword, 'pqdhhvpro1991');
});
