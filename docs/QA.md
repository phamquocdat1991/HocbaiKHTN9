# Kiểm thử và giới hạn

- Build production thành công.
- 15/15 unit tests: toàn vẹn học liệu, liên kết chương/bài/câu hỏi, chống cộng XP lặp, quyền học sinh/giáo viên, bài tập, lưu/đóng bài thi đúng hạn, 3 vi phạm, chấm điểm, phần thưởng trò chơi, ngày học Việt Nam, cấu trúc XLSX, tài khoản và cấu hình AI.
- Đây là bản mới độc lập: namespace trình duyệt, nhận diện app, học liệu và cấu hình triển khai riêng. Không lấy khóa hoặc dữ liệu lớp 6.

## Giới hạn

Firebase/Gemini chưa được cấu hình và chưa có kiểm thử với tài khoản dịch vụ thật. Cần hoàn tất SETUP và kiểm tra bằng hai tài khoản trước khi vận hành lớp thật. Demo không tạo tài khoản Firebase thật.

CSS responsive; chưa chứng nhận trên thiết bị iOS/Android thật. Cache PWA chủ yếu phục vụ giao diện, không có hàng đợi đồng bộ offline. Cloud cập nhật qua thao tác làm mới, chưa dùng listener thời gian thực. 10 trò chơi là 10 chủ đề dùng chung cơ chế câu hỏi, không phải 10 mô phỏng riêng.

Dữ liệu trường lưu một document Firestore, giới hạn 1 MiB. Cần tách collection/phân trang khi nội dung lớn; chưa kiểm thử tải cao. Giám sát thi dựa trên trạng thái hiển thị/toàn màn hình, không thay thế giám thị. Ngân hàng 51 câu là dữ liệu khởi tạo, cần giáo viên duyệt và mở rộng.
