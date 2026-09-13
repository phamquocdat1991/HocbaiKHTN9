# Cấu hình lớp học thật

1. Tạo Firebase project và Firestore database `(default)`; bật Authentication Email/Password. Thêm domain ứng dụng vào authorized domains.
2. Tạo service account có quyền Firestore và quản trị Firebase Authentication phù hợp; bật các API tương ứng. Không đưa JSON service account hoặc private key vào GitHub.
3. Trong Vercel Project → Settings → Environment Variables, đặt các biến trong `.env.example` cho Production:
   - `FIREBASE_PROJECT_ID`: project ID.
   - `FIREBASE_API_KEY`: Web API key của Firebase project.
   - `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`: thông tin service account. Private key có thể dùng newline hoặc chuỗi `\n`.
   - `ADMIN_EMAIL`: email quản trị chính xác.
   - `GEMINI_API_KEY`: khóa Gemini phía máy chủ.
   - `GEMINI_MODELS`: danh sách model được tài khoản hỗ trợ, ngăn bằng dấu phẩy. Có thể điều chỉnh trong quản trị.
4. Áp dụng `firestore.rules` (chặn truy cập client trực tiếp); ứng dụng truy cập qua API xác thực. Redeploy sau khi thay biến môi trường.
5. Tạo tài khoản quản trị với email thật trong Firebase Authentication, hoàn tất xác minh email. API chỉ cấp quyền quản trị gốc nếu email trùng ADMIN_EMAIL và đã xác minh. Đăng nhập app, tạo lớp rồi cấp tài khoản học sinh.
6. Kiểm tra bằng hai tài khoản độc lập: học sinh nộp bài → giáo viên chấm → học sinh xem kết quả; bài thi tải lại giữ nháp; học sinh không gọi được API giáo viên; đổi mật khẩu và phân quyền hoạt động. Kiểm tra AI bằng khóa thật.

## Vercel

Framework Vite; Build `npm run build`; Output `dist`; Node 24. API `/api/lms` được Vercel triển khai riêng. `vercel.json` hỗ trợ tải trực tiếp đường dẫn `/app/*` và `/admin/*`.

Mã nguồn nằm ở GitHub `phamquocdat1991/HocbaiKHTN9`. Có thể liên kết repository trong Vercel Settings → Git để các commit main tự triển khai. Không cần chuyển source sang GitHub Pages: GitHub Pages không chạy Vercel Function.

## Dữ liệu

Chế độ demo dùng localStorage, độc lập với Firebase. Xóa dữ liệu trình duyệt sẽ mất demo. Cloud dùng Firestore `school/main` và `users/{uid}`; sao lưu Firestore trước khi thay cấu trúc. Không có mật khẩu được lưu vào hồ sơ Firestore. Khóa AI cá nhân chỉ giữ tạm trong bộ nhớ giao diện và gửi tới API khi hỏi.
