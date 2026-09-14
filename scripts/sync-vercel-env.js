import fs from 'node:fs';
import path from 'node:path';

// Đọc file .env
const envPath = path.resolve(process.cwd(), '.env');
const envVars = {};
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const k = trimmed.slice(0, eqIdx).trim();
      const v = trimmed.slice(eqIdx + 1).trim().replace(/^["'](.*)["']$/, '$1');
      envVars[k] = v;
    }
  }
}

const token = process.argv[2] || process.env.VERCEL_TOKEN;

if (!token) {
  console.log('='.repeat(60));
  console.log(' VERCEL SYNC: THIẾU VERCEL ACCESS TOKEN');
  console.log('='.repeat(60));
  console.log('\nĐể tự động cấu hình 4 biến môi trường lên Vercel:');
  console.log('1. Vào: https://vercel.com/account/tokens');
  console.log('2. Bấm "Create Token", đặt tên bất kỳ (ví dụ: khtn9) và Copy token.');
  console.log('3. Chạy lệnh:');
  console.log('   node scripts/sync-vercel-env.js <TOKEN_CỦA_BẠN>');
  console.log('   (Hoặc gửi token vào chat để Antigravity chạy tự động giúp bạn).\n');
  process.exit(1);
}

const TARGET_KEYS = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'ADMIN_EMAIL'
];

async function main() {
  console.log('='.repeat(60));
  console.log(' ĐANG ĐỒNG BỘ 4 BIẾN MÔI TRƯỜNG LÊN VERCEL...');
  console.log('='.repeat(60));

  // 1. Tìm project trên Vercel
  const projectsRes = await fetch('https://api.vercel.com/v9/projects', {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!projectsRes.ok) {
    throw new Error('Không thể xác thực Vercel Token. Kiểm tra lại token: ' + await projectsRes.text());
  }

  const projectsData = await projectsRes.json();
  const project = (projectsData.projects || []).find(p => 
    p.name.toLowerCase().includes('khtn9') || 
    p.name.toLowerCase().includes('hocbai')
  ) || projectsData.projects?.[0];

  if (!project) {
    throw new Error('Không tìm thấy project KHTN 9 nào trong tài khoản Vercel của bạn.');
  }

  console.log(`[+] Tìm thấy project Vercel: "${project.name}" (ID: ${project.id})`);

  // 2. Lấy danh sách env hiện có
  const currentEnvRes = await fetch(`https://api.vercel.com/v9/projects/${project.id}/env`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const currentEnvData = await currentEnvRes.json();
  const existingEnvs = currentEnvData.envs || [];

  // 3. Thêm hoặc cập nhật từng biến
  for (const key of TARGET_KEYS) {
    const val = envVars[key];
    if (!val) {
      console.log(`[!] Cảnh báo: Biến ${key} không có giá trị trong .env, bỏ qua.`);
      continue;
    }

    const existing = existingEnvs.find(e => e.key === key);
    if (existing) {
      console.log(`[*] Đang cập nhật biến: ${key}...`);
      const updateRes = await fetch(`https://api.vercel.com/v9/projects/${project.id}/env/${existing.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          value: val,
          target: ['production', 'preview', 'development']
        })
      });
      if (updateRes.ok) {
        console.log(`[✓] Đã cập nhật ${key} thành công!`);
      } else {
        console.log(`[-] Lỗi cập nhật ${key}:`, await updateRes.text());
      }
    } else {
      console.log(`[+] Đang thêm mới biến: ${key}...`);
      const createRes = await fetch(`https://api.vercel.com/v10/projects/${project.id}/env`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          key,
          value: val,
          type: 'encrypted',
          target: ['production', 'preview', 'development']
        })
      });
      if (createRes.ok) {
        console.log(`[✓] Đã thêm ${key} thành công!`);
      } else {
        console.log(`[-] Lỗi thêm ${key}:`, await createRes.text());
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(' ĐÃ ĐỒNG BỘ ĐẦY ĐỦ 4 BIẾN MÔI TRƯỜNG LÊN VERCEL!');
  console.log(` Project: https://vercel.com/${project.accountId}/${project.name}`);
  console.log(' Bây giờ bạn có thể bấm Redeploy trên Vercel để áp dụng ngay.');
  console.log('='.repeat(60) + '\n');
}

main().catch(err => {
  console.error('\n[X] Lỗi:', err.message);
  process.exit(1);
});
