# Kết nối Supabase và Vercel

## 1. Cơ sở dữ liệu
Tạo/chọn project Supabase dành cho KHTN 9. Trong SQL Editor chạy toàn bộ `supabase/migrations/20260914_khtn9.sql`. Script có thể chạy lại, chỉ dùng bảng `khtn9_records` và hàm `khtn9_commit` có tiền tố riêng.

Dữ liệu lưu dạng JSONB: một bản ghi học liệu `school/main`, mỗi người dùng một bản ghi `users/{uuid}`. Không còn giới hạn document 1 MiB của Firestore. Cập nhật nhiều bản ghi dùng transaction và version, phát hiện ghi đồng thời thay vì ghi đè. Dữ liệu trường vẫn được tải chung; cần phân trang/tách bảng khi quy mô tăng, không tuyên bố phục vụ tải lớn chưa kiểm thử.

RLS được bật; quyền đọc/ghi trực tiếp của anon/authenticated bị thu hồi. Mọi dữ liệu đi qua API Vercel xác thực Supabase Auth và kiểm tra vai trò. `service_role` chỉ ở server. Không tạo policy cho học sinh tự ghi điểm hoặc vai trò.

## 2. Biến môi trường Vercel
Vào project `hocbai-khtn9` → Settings → Environment Variables:

- `SUPABASE_URL`: URL project HTTPS.
- `SUPABASE_ANON_KEY`: khóa công khai anon/publishable.
- `SUPABASE_SERVICE_ROLE_KEY`: khóa service_role/secret phía máy chủ. Không gửi qua chat hay commit GitHub.
- `ADMIN_EMAIL`: email quản trị gốc, phải xác nhận email trong Supabase.
- `GEMINI_API_KEY`: tuỳ chọn cho trợ lý AI.
- `GEMINI_MODELS`: danh sách model được tài khoản hỗ trợ, phân tách dấu phẩy.

Redeploy sau khi cấu hình. GET `/api/lms` trả `provider: supabase`, `configured: true` khi đủ biến (đây chỉ là kiểm tra cấu hình, chưa chứng minh migration thành công).

## 3. Xác thực
Bật Email/Password trong Supabase Auth. Site URL đặt domain production. Bật xác nhận email cho người tự đăng ký. Tài khoản tự đăng ký cần email thật; sau xác nhận, đăng nhập và tham gia lớp bằng mã trong Hồ sơ.

Tạo/xác nhận tài khoản có email đúng ADMIN_EMAIL. API cấp quyền quản trị khi Supabase xác nhận email đó. Giáo viên được cấp bởi quản trị, không lấy role từ metadata do người đăng ký gửi lên. Tài khoản học sinh do giáo viên cấp dùng tên đăng nhập quy đổi sang `@students.khtn9.local`; API xác nhận tài khoản này khi tạo. Giáo viên có thể đặt lại mật khẩu học sinh.

## 4. Kiểm tra trước khi dùng lớp thật
Dùng tài khoản quản trị và một học sinh: tạo lớp, cấp tài khoản, soạn/mở tiết, làm củng cố, nộp bài, chấm điểm. Mở trình duyệt thứ hai để kiểm tra dữ liệu lưu trên Supabase. Kiểm tra học sinh không mở được tiết khoá hoặc tự cấp vai trò. Chạy kiểm tra SQL trong `supabase/tests/access.sql`.

## 5. Dữ liệu cũ và demo
Phiên Firebase cũ phải đăng nhập lại. Không tự sao chép tài khoản/mật khẩu Firebase. Nếu có dữ liệu Firebase thật, cần xuất và lập ánh xạ UID Supabase trước khi nhập; bản nâng cấp này chưa di chuyển dữ liệu Firebase thật. Demo được giữ trong trình duyệt, không tự nhập vào cloud.

Học liệu khởi tạo có 51 bài/51 câu hỏi. Mỗi bài hiện có một tiết nền, giáo viên có thể thêm tiết, media và câu hỏi. App không có bản quyền để tự nạp nguyên văn SGK. Tài liệu media dùng liên kết HTTPS do giáo viên cung cấp; nhà cung cấp có thể chặn nhúng, app luôn có liên kết mở tab mới. Chưa triển khai tải tệp nhị phân trực tiếp lên Supabase Storage.
