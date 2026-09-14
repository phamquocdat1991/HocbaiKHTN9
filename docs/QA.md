# Kiểm thử và giới hạn

- Build production thành công.
- Kiểm thử logic: toàn vẹn học liệu, liên kết chương/bài/câu hỏi, chống cộng XP lặp, quyền học sinh/giáo viên, bài tập, lưu/đóng bài thi đúng hạn, 3 vi phạm, chấm điểm, phần thưởng trò chơi, ngày học Việt Nam, cấu trúc XLSX, tài khoản và cấu hình AI.
- Đây là bản mới độc lập: namespace trình duyệt, nhận diện app, học liệu và cấu hình triển khai riêng. Không lấy khóa hoặc dữ liệu lớp 6.

## Giới hạn

Supabase/Gemini chưa được cấu hình và chưa có kiểm thử với tài khoản dịch vụ thật. Cần hoàn tất SETUP và kiểm tra bằng hai tài khoản trước khi vận hành lớp thật. Demo không tạo tài khoản Supabase thật.

CSS responsive; chưa chứng nhận trên thiết bị iOS/Android thật. Cache PWA chủ yếu phục vụ giao diện, không có hàng đợi đồng bộ offline. Cloud cập nhật qua thao tác làm mới, chưa dùng listener thời gian thực. 10 trò chơi là 10 chủ đề dùng chung cơ chế câu hỏi, không phải 10 mô phỏng riêng.

Dữ liệu trường lưu JSONB dùng chung một bản ghi học liệu và bản ghi riêng cho từng người dùng. Cần tách collection/phân trang khi nội dung lớn; chưa kiểm thử tải cao. Giám sát thi dựa trên trạng thái hiển thị/toàn màn hình, không thay thế giám thị. Ngân hàng 51 câu là dữ liệu khởi tạo, cần giáo viên duyệt và mở rộng.

## Nâng cấp 14/09/2026
- 27/27 kiểm thử Node đạt: bổ sung khoá tiết, điểm củng cố, giới hạn lượt, hoàn thành nhiều tiết, lọc HTML, URL media, ẩn câu hỏi riêng và xác thực Supabase qua API giả lập.
- Build Vite production đạt. Trình đọc và trang giáo viên được tải theo nhu cầu; media chỉ tải sau khi bấm mở.
- Browser trên Vercel Preview: giáo viên sửa bài, thêm tiết khoá, soạn HTML, lưu; học sinh làm củng cố 10/10, hoàn thành 1/2 tiết, không đọc được tiết khoá; giáo viên xem đúng điểm cao nhất và 1/2 tiến độ.
- Sửa xung đột CSS `aside`/`header` cũ với menu lộ trình và phần đầu bài.
- Kiểm thử adapter dùng HTTP giả lập, không thay thế kiểm thử Supabase thật. SQL migration và RLS chưa thực thi trên project Supabase do chưa đăng nhập.
