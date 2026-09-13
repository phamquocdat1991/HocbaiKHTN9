# Học bài KHTN 9 — Kết nối tri thức với cuộc sống

App độc lập, kế thừa chức năng của Học bài KHTN 6. React + Vite, API Vercel, Firebase Authentication/Firestore, Gemini phía máy chủ.

## Học liệu

51 bài theo mục lục KNTT 9: bài mở đầu và 14 chương. Mỗi bài có 4 ý kiến thức, hoạt động vận dụng và câu hỏi có đáp án, giải thích. 51 câu hỏi khởi tạo dùng cho luyện tập, trò chơi và tạo đề. Nội dung tự biên soạn để dùng cùng SGK; không sao chép toàn văn sách. Giáo viên cần duyệt và bổ sung ma trận câu hỏi trước khi đánh giá chính thức.

## Chức năng

- Học sinh: đọc bài, tìm kiếm/lọc chương, chế độ tập trung, cỡ chữ/nền đọc, tiến độ, XP/chuỗi ngày học, bài tập, bài thi có đồng hồ/lưu nháp/chấm trắc nghiệm, 10 chủ đề trò chơi, hồ sơ.
- Giáo viên: lớp, tài khoản, bài học, ngân hàng câu hỏi, đề thi, bài tập, thông báo, chấm tự luận/bài tập, bảng điểm XLSX, cấu hình AI.
- AI: ngữ cảnh KHTN 9, model dự phòng, kho văn bản, khóa hệ thống phía máy chủ hoặc khóa cá nhân tạm thời. Chặn AI khi có bài thi đang làm.
- PWA cache giao diện, responsive, tải các phần quản trị/thi/trò chơi khi cần.

## Chạy và triển khai

Node >=22.12; `npm install`; `npm run dev`; `npm test`; `npm run build`.
Vercel: framework Vite, build `npm run build`, output `dist`, Node 24. API `/api/lms` chạy trên Vercel Function.

[Hướng dẫn kết nối](docs/SETUP.md) · [Học liệu và nguồn đối chiếu](docs/CURRICULUM.md) · [Kiểm thử](docs/QA.md) · [Đề xuất chưa triển khai](docs/PROPOSALS.md).

Demo dùng dữ liệu trình duyệt riêng của KHTN 9. Chưa có cấu hình Firebase/Gemini cho lớp thật. Không dùng chung project Firebase với lớp 6 vì cấu trúc hiện tại sử dụng school/main. Không đưa private key vào repository.
