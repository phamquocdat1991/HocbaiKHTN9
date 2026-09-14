import fs from 'node:fs';
import path from 'node:path';

// Đọc file .env nếu có
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const k = trimmed.slice(0, eqIdx).trim();
      const v = trimmed.slice(eqIdx + 1).trim().replace(/^["'](.*)["']$/, '$1');
      if (!process.env[k]) process.env[k] = v;
    }
  }
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'phamquocdat1991@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'pqdhhvpro1991';
const ADMIN_NAME = 'Thầy Phạm Quốc Đạt';
const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, '');
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

console.log('='.repeat(60));
console.log(' KHTN 9: KHỞI TẠO TÀI KHOẢN ADMIN QUẢN TRỊ');
console.log(' Email:    ' + ADMIN_EMAIL);
console.log(' Mật khẩu: ' + ADMIN_PASSWORD);
console.log('='.repeat(60));

async function run() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.log('\n[!] Chưa cấu hình đầy đủ biến môi trường Supabase trong file .env:');
    if (!SUPABASE_URL) console.log('    - Thiếu SUPABASE_URL');
    if (!SUPABASE_SERVICE_ROLE_KEY) console.log('    - Thiếu SUPABASE_SERVICE_ROLE_KEY');
    console.log('\n HƯỚNG DẪN KHỞI TẠO TÀI KHOẢN ADMIN:');
    console.log(' 1. CÁCH 1 (Khuyên dùng trên Supabase Dashboard):');
    console.log('    - Mở Supabase Project của bạn -> Vào mục SQL Editor.');
    console.log('    - Mở file supabase/seed_admin.sql, copy toàn bộ nội dung và bấm RUN.');
    console.log('    - Tài khoản sẽ được tạo ngay lập tức với email xác nhận và cấp quyền Admin.');
    console.log('\n 2. CÁCH 2 (Dùng script tự động này):');
    console.log('    - Mở file .env và điền SUPABASE_URL và SUPABASE_SERVICE_ROLE_KEY.');
    console.log('    - Chạy lại lệnh: npm run init-admin');
    console.log('\n 3. CÁCH 3 (Chạy thử nghiệm trên máy cục bộ - Local Dev):');
    console.log('    - Chạy: npm run dev');
    console.log('    - Mở trình duyệt, tại màn hình Đăng nhập nhập:');
    console.log('      Email:    ' + ADMIN_EMAIL);
    console.log('      Mật khẩu: ' + ADMIN_PASSWORD);
    console.log('    - Bấm "Vào lớp học" để vào thẳng Không gian giáo viên với quyền Admin.\n');
    return;
  }

  console.log('\n[1/3] Đang kết nối đến Supabase Auth Admin API...');
  
  let userId = null;
  // Thử tạo tài khoản mới qua Admin API
  const createRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: {
        display_name: ADMIN_NAME
      }
    })
  });

  const createData = await createRes.json();

  if (createRes.ok && createData?.id) {
    userId = createData.id;
    console.log(`[+] Đã tạo mới tài khoản admin thành công! (UID: ${userId})`);
  } else {
    // Tài khoản có thể đã tồn tại, tìm UID để cập nhật mật khẩu
    console.log('[*] Tài khoản có thể đã tồn tại, đang tìm kiếm UID để cập nhật...');
    const listRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?per_page=100`, {
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
      }
    });

    if (listRes.ok) {
      const listData = await listRes.json();
      const existing = (listData.users || []).find(u => u.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());
      if (existing) {
        userId = existing.id;
        console.log(`[*] Tìm thấy tài khoản hiện có (UID: ${userId}). Đang cập nhật mật khẩu...`);
        const updateRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
          method: 'PUT',
          headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            password: ADMIN_PASSWORD,
            email_confirm: true,
            user_metadata: {
              display_name: ADMIN_NAME
            }
          })
        });

        if (updateRes.ok) {
          console.log('[+] Đã cập nhật mật khẩu và xác nhận email thành công!');
        } else {
          const err = await updateRes.text();
          throw new Error('Không thể cập nhật mật khẩu: ' + err);
        }
      }
    }

    if (!userId) {
      throw new Error('Lỗi tạo tài khoản admin: ' + JSON.stringify(createData));
    }
  }

  console.log('\n[2/3] Đang đồng bộ quyền Admin vào bảng khtn9_records...');
  const userPayload = {
    id: userId,
    name: ADMIN_NAME,
    classId: '',
    role: 'teacher',
    isAdmin: true,
    email: ADMIN_EMAIL,
    progress: { completed: [], studySeconds: 0, activeDates: [], gameWins: [] },
    attempts: [],
    submissions: []
  };

  const commitRes = await fetch(`${SUPABASE_URL}/rest/v1/khtn9_records`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates'
    },
    body: JSON.stringify({
      record_key: `users/${userId}`,
      payload: userPayload,
      version: 1,
      updated_at: new Date().toISOString()
    })
  });

  if (commitRes.ok) {
    console.log('[+] Đã lưu bản ghi quản trị viên vào khtn9_records!');
  } else {
    console.log('[-] Lưu khtn9_records thông báo:', await commitRes.text());
    console.log('    (Lưu ý: Nếu chưa chạy migration 20260914_khtn9.sql, hãy chạy migration trước).');
  }

  // Thử đăng nhập kiểm tra nếu có anon key
  if (SUPABASE_ANON_KEY) {
    console.log('\n[3/3] Đang kiểm tra đăng nhập bằng Supabase Auth Token API...');
    const testLogin = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      })
    });

    if (testLogin.ok) {
      const tokenData = await testLogin.json();
      console.log('[✓] KIỂM TRA ĐĂNG NHẬP THÀNH CÔNG!');
      console.log('    Access token được tạo hợp lệ. Hết hạn trong:', tokenData.expires_in, 'giây');
    } else {
      console.log('[!] Thử đăng nhập thất bại:', await testLogin.text());
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(' HOÀN TẤT KHỞI TẠO TÀI KHOẢN ADMIN KHTN 9!');
  console.log(' Bây giờ bạn có thể đăng nhập trên web bằng:');
  console.log(' Email:    ' + ADMIN_EMAIL);
  console.log(' Mật khẩu: ' + ADMIN_PASSWORD);
  console.log('='.repeat(60) + '\n');
}

run().catch(err => {
  console.error('\n[X] Lỗi:', err.message);
  process.exit(1);
});
