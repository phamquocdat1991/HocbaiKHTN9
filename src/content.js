// Học liệu bổ trợ tự biên soạn theo mục lục KNTT 9; không sao chép toàn văn SGK.
export const topics=[
  {
    "id": "intro",
    "name": "Kĩ năng khoa học",
    "color": "teal",
    "icon": "FlaskConical",
    "description": "Thực hành an toàn, trình bày có bằng chứng."
  },
  {
    "id": "energy",
    "name": "Năng lượng & tương tác",
    "color": "blue",
    "icon": "Zap",
    "description": "Cơ học, ánh sáng, điện và điện từ."
  },
  {
    "id": "matter",
    "name": "Chất & vật liệu",
    "color": "orange",
    "icon": "Atom",
    "description": "Kim loại, hợp chất hữu cơ và vật liệu."
  },
  {
    "id": "earth",
    "name": "Tài nguyên & Trái Đất",
    "color": "purple",
    "icon": "Orbit",
    "description": "Khoáng sản, chu trình carbon và khí hậu."
  },
  {
    "id": "life",
    "name": "Di truyền & tiến hoá",
    "color": "green",
    "icon": "Sprout",
    "description": "Từ DNA đến tính trạng và lịch sử sự sống."
  }
];
export const chapters=[
  {
    "id": 0,
    "name": "Mở đầu",
    "start": 1,
    "end": 1
  },
  {
    "id": 1,
    "name": "Năng lượng cơ học",
    "start": 2,
    "end": 4
  },
  {
    "id": 2,
    "name": "Ánh sáng",
    "start": 5,
    "end": 10
  },
  {
    "id": 3,
    "name": "Điện",
    "start": 11,
    "end": 13
  },
  {
    "id": 4,
    "name": "Điện từ",
    "start": 14,
    "end": 15
  },
  {
    "id": 5,
    "name": "Năng lượng với cuộc sống",
    "start": 16,
    "end": 17
  },
  {
    "id": 6,
    "name": "Kim loại. Sự khác nhau cơ bản giữa phi kim và kim loại",
    "start": 18,
    "end": 21
  },
  {
    "id": 7,
    "name": "Giới thiệu về hợp chất hữu cơ. Hydrocarbon và nguồn nhiên liệu",
    "start": 22,
    "end": 25
  },
  {
    "id": 8,
    "name": "Ethylic alcohol và acetic acid",
    "start": 26,
    "end": 27
  },
  {
    "id": 9,
    "name": "Lipid. Carbohydrate. Protein. Polymer",
    "start": 28,
    "end": 32
  },
  {
    "id": 10,
    "name": "Khai thác tài nguyên từ vỏ Trái Đất",
    "start": 33,
    "end": 35
  },
  {
    "id": 11,
    "name": "Di truyền học Mendel. Cơ sở phân tử của hiện tượng di truyền",
    "start": 36,
    "end": 41
  },
  {
    "id": 12,
    "name": "Di truyền nhiễm sắc thể",
    "start": 42,
    "end": 46
  },
  {
    "id": 13,
    "name": "Di truyền học với con người và đời sống",
    "start": 47,
    "end": 48
  },
  {
    "id": 14,
    "name": "Tiến hoá",
    "start": 49,
    "end": 51
  }
];
export const lessons=[
  {
    "id": "kntt-9-1",
    "number": 1,
    "title": "Bài 1. Nhận biết một số dụng cụ, hoá chất. Thuyết trình một vấn đề khoa học",
    "topic": "intro",
    "chapter": 0,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Khi gặp chai hoá chất không có nhãn, nên làm gì?",
    "concepts": [
      "Đọc nhãn và biểu tượng cảnh báo trước khi dùng hoá chất.",
      "Dụng cụ đo cần có giới hạn đo và độ chia phù hợp.",
      "Một báo cáo khoa học có câu hỏi, phương pháp, kết quả và kết luận dựa trên bằng chứng.",
      "Chỉ thực hành dưới hướng dẫn giáo viên; không nếm hoặc tự trộn hoá chất."
    ],
    "activity": "Lập dàn ý thuyết trình về tiết kiệm điện, chỉ rõ dữ liệu cần thu thập.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-1",
      "lessonId": "kntt-9-1",
      "topic": "intro",
      "text": "Khi gặp chai hoá chất không có nhãn, nên làm gì?",
      "options": [
        "Báo giáo viên, không tự dùng",
        "Ngửi sát để nhận biết",
        "Nếm thử",
        "Trộn với nước bất kì"
      ],
      "correct": 0,
      "explanation": "Không có nhãn thì chưa xác định được chất và nguy cơ, cần để giáo viên xử lí.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-2",
    "number": 2,
    "title": "Bài 2. Động năng. Thế năng",
    "topic": "energy",
    "chapter": 1,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Vật 2 kg chuyển động 3 m/s có động năng bao nhiêu?",
    "concepts": [
      "Động năng là năng lượng do chuyển động: Wđ = mv²/2.",
      "Thế năng trọng trường gần mặt đất: Wt = mgh, phụ thuộc mốc độ cao.",
      "Khối lượng tính bằng kg, tốc độ m/s, độ cao m; năng lượng tính bằng joule (J).",
      "Tăng tốc độ hai lần làm động năng tăng bốn lần nếu khối lượng không đổi."
    ],
    "activity": "Tính động năng của xe đồ chơi 0,5 kg chuyển động với tốc độ 2 m/s.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-2",
      "lessonId": "kntt-9-2",
      "topic": "energy",
      "text": "Vật 2 kg chuyển động 3 m/s có động năng bao nhiêu?",
      "options": [
        "6 J",
        "9 J",
        "18 J",
        "3 J"
      ],
      "correct": 1,
      "explanation": "Wđ = 2 × 3² / 2 = 9 J.",
      "level": "Vận dụng"
    }
  },
  {
    "id": "kntt-9-3",
    "number": 3,
    "title": "Bài 3. Cơ năng",
    "topic": "energy",
    "chapter": 1,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Bỏ qua lực cản, khi vật rơi xuống thì thế năng thế nào?",
    "concepts": [
      "Cơ năng bằng tổng động năng và thế năng.",
      "Khi vật rơi, thế năng có thể chuyển thành động năng.",
      "Nếu chỉ có trọng lực tác dụng, cơ năng được bảo toàn.",
      "Ma sát có thể chuyển một phần cơ năng thành nhiệt, nhưng tổng năng lượng vẫn bảo toàn."
    ],
    "activity": "Vẽ sơ đồ chuyển hoá năng lượng của quả bóng rơi trước lúc chạm đất.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-3",
      "lessonId": "kntt-9-3",
      "topic": "energy",
      "text": "Bỏ qua lực cản, khi vật rơi xuống thì thế năng thế nào?",
      "options": [
        "Tăng",
        "Luôn bằng động năng",
        "Giảm",
        "Không đổi"
      ],
      "correct": 2,
      "explanation": "Độ cao giảm nên thế năng trọng trường giảm.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-4",
    "number": 4,
    "title": "Bài 4. Công và công suất",
    "topic": "energy",
    "chapter": 1,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Thực hiện công 600 J trong 3 s thì công suất là bao nhiêu?",
    "concepts": [
      "Lực cùng hướng chuyển động thực hiện công A = Fs.",
      "Công đo bằng joule, với F tính bằng newton và s bằng mét.",
      "Công suất P = A/t cho biết tốc độ thực hiện công.",
      "Hai máy thực hiện cùng công, máy mất ít thời gian hơn có công suất lớn hơn."
    ],
    "activity": "Một người kéo hộp bằng lực 20 N trên 3 m theo hướng lực: tính công và công suất nếu mất 6 s.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-4",
      "lessonId": "kntt-9-4",
      "topic": "energy",
      "text": "Thực hiện công 600 J trong 3 s thì công suất là bao nhiêu?",
      "options": [
        "1800 W",
        "603 W",
        "2 W",
        "200 W"
      ],
      "correct": 3,
      "explanation": "P = 600/3 = 200 W.",
      "level": "Vận dụng"
    }
  },
  {
    "id": "kntt-9-5",
    "number": 5,
    "title": "Bài 5. Khúc xạ ánh sáng",
    "topic": "energy",
    "chapter": 2,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Tia từ không khí vào nước với góc tới khác 0 thường lệch thế nào?",
    "concepts": [
      "Khúc xạ là sự đổi hướng truyền ánh sáng khi đi xiên qua mặt phân cách hai môi trường trong suốt.",
      "Góc tới và góc khúc xạ đo từ pháp tuyến.",
      "Khi ánh sáng từ không khí vào nước, tia khúc xạ thường lệch về phía pháp tuyến.",
      "Hệ thức n₁ sin i = n₂ sin r mô tả khúc xạ giữa hai môi trường."
    ],
    "activity": "Vẽ tia sáng từ không khí vào nước và chỉ ra pháp tuyến, góc tới, góc khúc xạ.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-5",
      "lessonId": "kntt-9-5",
      "topic": "energy",
      "text": "Tia từ không khí vào nước với góc tới khác 0 thường lệch thế nào?",
      "options": [
        "Gần pháp tuyến hơn",
        "Xa pháp tuyến hơn",
        "Luôn nằm trên mặt nước",
        "Quay ngược về nguồn hoàn toàn"
      ],
      "correct": 0,
      "explanation": "Nước có chiết suất lớn hơn không khí nên góc khúc xạ nhỏ hơn góc tới.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-6",
    "number": 6,
    "title": "Bài 6. Phản xạ toàn phần",
    "topic": "energy",
    "chapter": 2,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Trường hợp nào có thể xảy ra phản xạ toàn phần?",
    "concepts": [
      "Phản xạ toàn phần có thể xảy ra khi ánh sáng đi từ môi trường chiết suất lớn sang nhỏ.",
      "Góc tới phải lớn hơn góc giới hạn.",
      "Khi xảy ra phản xạ toàn phần, không có tia khúc xạ truyền ra môi trường thứ hai.",
      "Sợi quang có thể dẫn ánh sáng nhờ phản xạ toàn phần."
    ],
    "activity": "So sánh điều kiện truyền ánh sáng từ nước ra không khí và từ không khí vào nước.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-6",
      "lessonId": "kntt-9-6",
      "topic": "energy",
      "text": "Trường hợp nào có thể xảy ra phản xạ toàn phần?",
      "options": [
        "Từ không khí vào nước ở mọi góc",
        "Từ nước ra không khí với góc tới đủ lớn",
        "Từ nước ra không khí với góc tới 0°",
        "Ở mọi mặt phân cách bất kì"
      ],
      "correct": 1,
      "explanation": "Cần truyền từ môi trường chiết suất lớn sang nhỏ và góc tới vượt góc giới hạn.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-7",
    "number": 7,
    "title": "Bài 7. Lăng kính",
    "topic": "energy",
    "chapter": 2,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Lăng kính tách ánh sáng trắng thành dải màu là hiện tượng gì?",
    "concepts": [
      "Lăng kính là khối chất trong suốt có hai mặt phẳng không song song.",
      "Ánh sáng bị khúc xạ khi qua các mặt lăng kính.",
      "Ánh sáng trắng có thể tách thành dải màu do tán sắc.",
      "Các màu khác nhau bị lệch khác nhau khi truyền qua lăng kính."
    ],
    "activity": "Quan sát ảnh quang phổ và giải thích vì sao ánh sáng trắng không phải ánh sáng đơn sắc.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-7",
      "lessonId": "kntt-9-7",
      "topic": "energy",
      "text": "Lăng kính tách ánh sáng trắng thành dải màu là hiện tượng gì?",
      "options": [
        "Đông đặc",
        "Nhiễm điện",
        "Tán sắc",
        "Cảm ứng điện từ"
      ],
      "correct": 2,
      "explanation": "Tán sắc là sự phân tách ánh sáng thành các thành phần màu.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-8",
    "number": 8,
    "title": "Bài 8. Thấu kính",
    "topic": "energy",
    "chapter": 2,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Chùm tia song song trục chính qua thấu kính hội tụ gặp nhau ở đâu?",
    "concepts": [
      "Thấu kính hội tụ có thể biến chùm tia song song thành chùm hội tụ.",
      "Thấu kính phân kì làm chùm tia song song trở thành chùm phân kì.",
      "Quang tâm, trục chính, tiêu điểm và tiêu cự là các yếu tố dùng dựng ảnh.",
      "Tia đi qua quang tâm thấu kính mỏng được coi như truyền thẳng."
    ],
    "activity": "Vẽ hai tia đặc biệt để dựng ảnh vật đặt ngoài tiêu cự của thấu kính hội tụ.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-8",
      "lessonId": "kntt-9-8",
      "topic": "energy",
      "text": "Chùm tia song song trục chính qua thấu kính hội tụ gặp nhau ở đâu?",
      "options": [
        "Mọi điểm trên trục",
        "Quang tâm trước kính",
        "Vô cực",
        "Tiêu điểm ảnh"
      ],
      "correct": 3,
      "explanation": "Theo mô hình thấu kính mỏng, các tia ló hội tụ tại tiêu điểm ảnh.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-9",
    "number": 9,
    "title": "Bài 9. Thực hành đo tiêu cự của thấu kính hội tụ",
    "topic": "energy",
    "chapter": 2,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Ảnh thật bằng vật, khoảng cách vật–màn 80 cm thì f xấp xỉ bao nhiêu?",
    "concepts": [
      "Có thể đo tiêu cự bằng vị trí vật và ảnh thật rõ nét trên màn.",
      "Khi ảnh thật có kích thước bằng vật, vật và màn cách kính khoảng 2f.",
      "Trong bố trí này, khoảng cách vật đến màn xấp xỉ 4f.",
      "Đo nhiều lần, ghi đơn vị và nhận xét sai số; không dùng Mặt Trời làm nguồn sáng."
    ],
    "activity": "Với bộ dụng cụ giáo viên chuẩn bị, tìm ảnh bằng vật rồi ghi khoảng cách vật–màn và tính f.",
    "minutes": 30,
    "question": {
      "id": "kntt9-q-9",
      "lessonId": "kntt-9-9",
      "topic": "energy",
      "text": "Ảnh thật bằng vật, khoảng cách vật–màn 80 cm thì f xấp xỉ bao nhiêu?",
      "options": [
        "20 cm",
        "80 cm",
        "40 cm",
        "160 cm"
      ],
      "correct": 0,
      "explanation": "Ở bố trí ảnh bằng vật, khoảng cách vật–màn bằng 4f nên f = 80/4.",
      "level": "Vận dụng"
    }
  },
  {
    "id": "kntt-9-10",
    "number": 10,
    "title": "Bài 10. Kính lúp. Bài tập thấu kính",
    "topic": "energy",
    "chapter": 2,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Khi dùng kính lúp đúng cách, ảnh quan sát là gì?",
    "concepts": [
      "Kính lúp là thấu kính hội tụ có tiêu cự ngắn.",
      "Vật đặt trong khoảng tiêu cự tạo ảnh ảo, cùng chiều và lớn hơn vật.",
      "Ảnh ảo không hứng được trực tiếp trên màn.",
      "Dựng ảnh bằng tia qua quang tâm và tia song song trục chính."
    ],
    "activity": "Vẽ ảnh một vật nhỏ đặt giữa quang tâm và tiêu điểm của kính lúp.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-10",
      "lessonId": "kntt-9-10",
      "topic": "energy",
      "text": "Khi dùng kính lúp đúng cách, ảnh quan sát là gì?",
      "options": [
        "Ảnh thật, ngược chiều",
        "Ảnh ảo, cùng chiều, lớn hơn vật",
        "Ảnh ảo, nhỏ hơn vật",
        "Ảnh thật luôn bằng vật"
      ],
      "correct": 1,
      "explanation": "Vật nằm trong tiêu cự của thấu kính hội tụ cho ảnh ảo phóng đại.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-11",
    "number": 11,
    "title": "Bài 11. Điện trở. Định luật Ohm",
    "topic": "energy",
    "chapter": 3,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "U = 12 V, R = 6 Ω thì I bằng bao nhiêu?",
    "concepts": [
      "Điện trở biểu thị mức cản trở dòng điện, đơn vị ohm (Ω).",
      "Với điện trở không đổi, I = U/R.",
      "Cường độ dòng điện đo bằng ampere, hiệu điện thế bằng volt.",
      "Điện trở dây dẫn phụ thuộc vật liệu, chiều dài và tiết diện; không thực hành với điện lưới."
    ],
    "activity": "Với điện trở 10 Ω và nguồn thấp áp giả định 5 V, tính cường độ dòng điện.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-11",
      "lessonId": "kntt-9-11",
      "topic": "energy",
      "text": "U = 12 V, R = 6 Ω thì I bằng bao nhiêu?",
      "options": [
        "72 A",
        "0,5 A",
        "2 A",
        "18 A"
      ],
      "correct": 2,
      "explanation": "I = U/R = 12/6 = 2 A.",
      "level": "Vận dụng"
    }
  },
  {
    "id": "kntt-9-12",
    "number": 12,
    "title": "Bài 12. Đoạn mạch nối tiếp, song song",
    "topic": "energy",
    "chapter": 3,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Hai điện trở 6 Ω mắc song song có điện trở tương đương bao nhiêu?",
    "concepts": [
      "Nối tiếp: dòng điện qua các phần tử có cùng cường độ.",
      "Nối tiếp: U = U₁ + U₂ và R = R₁ + R₂.",
      "Song song: các nhánh có cùng hiệu điện thế, I = I₁ + I₂.",
      "Hai điện trở song song có 1/R = 1/R₁ + 1/R₂."
    ],
    "activity": "So sánh điện trở tương đương của hai điện trở 6 Ω khi mắc nối tiếp và song song.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-12",
      "lessonId": "kntt-9-12",
      "topic": "energy",
      "text": "Hai điện trở 6 Ω mắc song song có điện trở tương đương bao nhiêu?",
      "options": [
        "12 Ω",
        "6 Ω",
        "36 Ω",
        "3 Ω"
      ],
      "correct": 3,
      "explanation": "Hai điện trở bằng nhau mắc song song có điện trở tương đương bằng một nửa mỗi điện trở.",
      "level": "Vận dụng"
    }
  },
  {
    "id": "kntt-9-13",
    "number": 13,
    "title": "Bài 13. Năng lượng của dòng điện và công suất điện",
    "topic": "energy",
    "chapter": 3,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Đèn 20 W hoạt động 5 giờ tiêu thụ bao nhiêu điện năng?",
    "concepts": [
      "Điện năng có thể chuyển thành nhiệt, ánh sáng hoặc cơ năng.",
      "Công suất điện P = UI với đơn vị watt.",
      "Điện năng A = Pt; khi P tính bằng kW và t bằng giờ thì A tính bằng kWh.",
      "1 kWh = 3,6 triệu joule."
    ],
    "activity": "Đọc công suất trên nhãn thiết bị và ước tính điện năng nếu sử dụng 2 giờ.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-13",
      "lessonId": "kntt-9-13",
      "topic": "energy",
      "text": "Đèn 20 W hoạt động 5 giờ tiêu thụ bao nhiêu điện năng?",
      "options": [
        "0,1 kWh",
        "100 kWh",
        "4 kWh",
        "25 kWh"
      ],
      "correct": 0,
      "explanation": "20 W = 0,02 kW; A = 0,02 × 5 = 0,1 kWh.",
      "level": "Vận dụng"
    }
  },
  {
    "id": "kntt-9-14",
    "number": 14,
    "title": "Bài 14. Cảm ứng điện từ. Nguyên tắc tạo ra dòng điện xoay chiều",
    "topic": "energy",
    "chapter": 4,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Điều kiện cốt lõi để xuất hiện dòng điện cảm ứng trong cuộn dây kín là gì?",
    "concepts": [
      "Dòng điện cảm ứng xuất hiện trong cuộn dây kín khi số đường sức từ xuyên qua tiết diện biến thiên.",
      "Chuyển động tương đối giữa nam châm và cuộn dây có thể gây cảm ứng điện từ.",
      "Dòng điện xoay chiều đổi chiều theo thời gian.",
      "Máy phát điện biến cơ năng thành điện năng bằng cảm ứng điện từ."
    ],
    "activity": "Mô tả điều xảy ra khi đưa nam châm vào rồi rút khỏi cuộn dây nối dụng cụ chỉ thị.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-14",
      "lessonId": "kntt-9-14",
      "topic": "energy",
      "text": "Điều kiện cốt lõi để xuất hiện dòng điện cảm ứng trong cuộn dây kín là gì?",
      "options": [
        "Nam châm đứng yên mãi cạnh cuộn dây",
        "Từ trường xuyên qua cuộn dây biến thiên",
        "Cuộn dây luôn nóng",
        "Cuộn dây không kín"
      ],
      "correct": 1,
      "explanation": "Sự biến thiên từ thông qua cuộn dây kín gây dòng điện cảm ứng.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-15",
    "number": 15,
    "title": "Bài 15. Tác dụng của dòng điện xoay chiều",
    "topic": "energy",
    "chapter": 4,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Bàn là điện sử dụng chủ yếu tác dụng nào?",
    "concepts": [
      "Dòng điện xoay chiều có tác dụng nhiệt.",
      "Dòng điện xoay chiều có thể gây tác dụng phát sáng và tác dụng từ.",
      "Điện có thể gây nguy hiểm cho cơ thể.",
      "Chỉ khảo sát với nguồn thấp áp và thiết bị được giáo viên hướng dẫn."
    ],
    "activity": "Ghép bàn là với tác dụng nhiệt, đèn với phát sáng, nam châm điện với tác dụng từ.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-15",
      "lessonId": "kntt-9-15",
      "topic": "energy",
      "text": "Bàn là điện sử dụng chủ yếu tác dụng nào?",
      "options": [
        "Tác dụng di truyền",
        "Tác dụng khúc xạ",
        "Tác dụng nhiệt",
        "Tác dụng tán sắc"
      ],
      "correct": 2,
      "explanation": "Dòng điện làm phần tử đốt nóng tăng nhiệt độ.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-16",
    "number": 16,
    "title": "Bài 16. Vòng năng lượng trên Trái Đất. Năng lượng hoá thạch",
    "topic": "energy",
    "chapter": 5,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Nguồn nào là nhiên liệu hoá thạch?",
    "concepts": [
      "Mặt Trời cung cấp năng lượng cho nhiều quá trình trên Trái Đất.",
      "Năng lượng truyền và chuyển hoá qua khí quyển, nước và sinh vật.",
      "Than, dầu và khí tự nhiên hình thành qua thời gian địa chất dài.",
      "Đốt nhiên liệu hoá thạch tạo khí thải và làm tăng lượng CO₂ trong khí quyển."
    ],
    "activity": "Vẽ chuỗi Mặt Trời → cây xanh → thức ăn → hoạt động của con người.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-16",
      "lessonId": "kntt-9-16",
      "topic": "energy",
      "text": "Nguồn nào là nhiên liệu hoá thạch?",
      "options": [
        "Gió",
        "Ánh sáng Mặt Trời",
        "Sóng biển",
        "Than đá"
      ],
      "correct": 3,
      "explanation": "Than đá được hình thành từ vật chất hữu cơ qua thời gian rất dài.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-17",
    "number": 17,
    "title": "Bài 17. Một số dạng năng lượng tái tạo",
    "topic": "energy",
    "chapter": 5,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Hạn chế đặc trưng của pin mặt trời là gì?",
    "concepts": [
      "Năng lượng mặt trời, gió và nước được bổ sung bởi các quá trình tự nhiên.",
      "Điện mặt trời phụ thuộc cường độ chiếu sáng.",
      "Điện gió phụ thuộc điều kiện gió và vị trí lắp đặt.",
      "Cần xét cả lợi ích, tác động môi trường và khả năng lưu trữ khi lựa chọn nguồn."
    ],
    "activity": "So sánh điện mặt trời và điện gió theo điều kiện hoạt động, ưu điểm, hạn chế.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-17",
      "lessonId": "kntt-9-17",
      "topic": "energy",
      "text": "Hạn chế đặc trưng của pin mặt trời là gì?",
      "options": [
        "Sản lượng phụ thuộc ánh sáng",
        "Chỉ hoạt động trong tối",
        "Luôn cần đốt than",
        "Không chuyển đổi năng lượng"
      ],
      "correct": 0,
      "explanation": "Mức phát điện thay đổi theo điều kiện chiếu sáng.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-18",
    "number": 18,
    "title": "Bài 18. Tính chất chung của kim loại",
    "topic": "matter",
    "chapter": 6,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Phương trình nào cân bằng đúng?",
    "concepts": [
      "Nhiều kim loại có tính dẻo, dẫn điện, dẫn nhiệt và ánh kim.",
      "Kim loại có thể phản ứng với oxygen tạo oxide.",
      "Một số kim loại phản ứng với acid loãng giải phóng hydrogen.",
      "Mức phản ứng khác nhau theo kim loại và điều kiện; không tự thử acid."
    ],
    "activity": "Viết phương trình magnesium phản ứng với oxygen và cân bằng số nguyên tử.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-18",
      "lessonId": "kntt-9-18",
      "topic": "matter",
      "text": "Phương trình nào cân bằng đúng?",
      "options": [
        "Mg + O₂ → MgO",
        "2Mg + O₂ → 2MgO",
        "2Mg + O₂ → MgO",
        "Mg + O → 2MgO"
      ],
      "correct": 1,
      "explanation": "Hai vế đều có 2 nguyên tử Mg và 2 nguyên tử O.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-19",
    "number": 19,
    "title": "Bài 19. Dãy hoạt động hoá học",
    "topic": "matter",
    "chapter": 6,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Sắt cho vào dung dịch CuSO₄ phù hợp tạo kim loại nào?",
    "concepts": [
      "Dãy hoạt động sắp xếp kim loại theo mức hoạt động hoá học giảm dần.",
      "Kim loại đứng trước H thường phản ứng với một số acid loãng tạo H₂.",
      "Kim loại hoạt động mạnh hơn có thể đẩy kim loại yếu hơn khỏi dung dịch muối trong điều kiện phù hợp.",
      "Không áp dụng máy móc quy tắc đẩy kim loại cho kim loại phản ứng mạnh với nước."
    ],
    "activity": "Dự đoán hiện tượng khi nhúng đinh sắt sạch vào dung dịch CuSO₄ trong thí nghiệm do giáo viên thực hiện.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-19",
      "lessonId": "kntt-9-19",
      "topic": "matter",
      "text": "Sắt cho vào dung dịch CuSO₄ phù hợp tạo kim loại nào?",
      "options": [
        "Natri",
        "Magnesium",
        "Đồng",
        "Vàng"
      ],
      "correct": 2,
      "explanation": "Fe hoạt động mạnh hơn Cu: Fe + CuSO₄ → FeSO₄ + Cu.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-20",
    "number": 20,
    "title": "Bài 20. Tách kim loại và việc sử dụng hợp kim",
    "topic": "matter",
    "chapter": 6,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Thép được xếp vào loại vật liệu nào?",
    "concepts": [
      "Kim loại thường tồn tại trong tự nhiên dưới dạng hợp chất trong quặng.",
      "Phương pháp tách phụ thuộc mức hoạt động hoá học của kim loại.",
      "Một số kim loại được tách bằng khử oxide; kim loại hoạt động mạnh cần phương pháp thích hợp như điện phân nóng chảy.",
      "Hợp kim chứa kim loại nền và các nguyên tố khác, thường có tính chất hữu ích hơn cho mục đích sử dụng."
    ],
    "activity": "So sánh sắt nguyên chất với thép về thành phần và ứng dụng.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-20",
      "lessonId": "kntt-9-20",
      "topic": "matter",
      "text": "Thép được xếp vào loại vật liệu nào?",
      "options": [
        "Đơn chất phi kim",
        "Chất khí",
        "Dung môi hữu cơ",
        "Hợp kim"
      ],
      "correct": 3,
      "explanation": "Thép là hợp kim nền sắt chứa carbon và có thể có các nguyên tố khác.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-21",
    "number": 21,
    "title": "Bài 21. Sự khác nhau cơ bản giữa phi kim và kim loại",
    "topic": "matter",
    "chapter": 6,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Nhận định nào đúng?",
    "concepts": [
      "Kim loại thường dẫn điện tốt, nhiều phi kim dẫn điện kém.",
      "Có ngoại lệ như graphite dẫn điện.",
      "Kim loại thường nhường electron trong phản ứng; nhiều phi kim có xu hướng nhận electron.",
      "Tính chất và ứng dụng cần xét từng chất thay vì suy diễn tuyệt đối."
    ],
    "activity": "Nêu lí do lõi dây điện thường dùng đồng còn graphite dùng làm điện cực trong một số thiết bị.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-21",
      "lessonId": "kntt-9-21",
      "topic": "matter",
      "text": "Nhận định nào đúng?",
      "options": [
        "Graphite là phi kim có thể dẫn điện",
        "Mọi phi kim đều dẫn điện tốt",
        "Mọi kim loại đều là chất khí",
        "Mọi phi kim đều không dẫn điện"
      ],
      "correct": 0,
      "explanation": "Graphite là ngoại lệ của nhận xét nhiều phi kim dẫn điện kém.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-22",
    "number": 22,
    "title": "Bài 22. Giới thiệu về hợp chất hữu cơ",
    "topic": "matter",
    "chapter": 7,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Chất nào là hydrocarbon?",
    "concepts": [
      "Hợp chất hữu cơ là hợp chất của carbon, trừ một số nhóm như CO, CO₂ và muối carbonate.",
      "Hydrocarbon chỉ gồm carbon và hydrogen.",
      "Dẫn xuất hydrocarbon có thêm nguyên tố khác như oxygen hoặc nitrogen.",
      "Công thức phân tử cho biết loại và số nguyên tử trong phân tử."
    ],
    "activity": "Phân loại CH₄, C₂H₅OH và CO₂ thành hydrocarbon, dẫn xuất hoặc hợp chất vô cơ.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-22",
      "lessonId": "kntt-9-22",
      "topic": "matter",
      "text": "Chất nào là hydrocarbon?",
      "options": [
        "CO₂",
        "CH₄",
        "Na₂CO₃",
        "C₂H₅OH"
      ],
      "correct": 1,
      "explanation": "CH₄ chỉ chứa C và H.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-23",
    "number": 23,
    "title": "Bài 23. Alkane",
    "topic": "matter",
    "chapter": 7,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Alkane có 3 nguyên tử carbon có công thức gì?",
    "concepts": [
      "Alkane là hydrocarbon no mạch hở, chỉ có liên kết đơn giữa các nguyên tử carbon.",
      "Công thức chung CₙH₂ₙ₊₂ với n ≥ 1.",
      "Methane CH₄ là alkane đơn giản nhất.",
      "Alkane cháy hoàn toàn tạo CO₂ và nước, giải phóng năng lượng."
    ],
    "activity": "Cân bằng phương trình cháy hoàn toàn của CH₄ trên giấy; không tự đốt khí.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-23",
      "lessonId": "kntt-9-23",
      "topic": "matter",
      "text": "Alkane có 3 nguyên tử carbon có công thức gì?",
      "options": [
        "C₃H₆",
        "C₃H₄",
        "C₃H₈",
        "C₃H₃"
      ],
      "correct": 2,
      "explanation": "Thay n = 3 vào CₙH₂ₙ₊₂ được C₃H₈.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-24",
    "number": 24,
    "title": "Bài 24. Alkene",
    "topic": "matter",
    "chapter": 7,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Đặc điểm phân biệt alkene với alkane mạch hở tương ứng là gì?",
    "concepts": [
      "Alkene mạch hở có một liên kết đôi C=C, công thức CₙH₂ₙ với n ≥ 2.",
      "Ethylene có công thức C₂H₄.",
      "Liên kết đôi tham gia phản ứng cộng, ví dụ cộng bromine.",
      "Ethylene có thể trùng hợp tạo polyethylene."
    ],
    "activity": "So sánh công thức và liên kết giữa ethane C₂H₆ và ethylene C₂H₄.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-24",
      "lessonId": "kntt-9-24",
      "topic": "matter",
      "text": "Đặc điểm phân biệt alkene với alkane mạch hở tương ứng là gì?",
      "options": [
        "Không có carbon",
        "Chỉ chứa oxygen",
        "Không cháy được",
        "Có liên kết đôi C=C"
      ],
      "correct": 3,
      "explanation": "Alkene có liên kết đôi giữa hai nguyên tử carbon.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-25",
    "number": 25,
    "title": "Bài 25. Nguồn nhiên liệu",
    "topic": "matter",
    "chapter": 7,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Chưng cất phân đoạn dầu mỏ chủ yếu dựa vào khác biệt nào?",
    "concepts": [
      "Dầu mỏ là hỗn hợp nhiều hydrocarbon.",
      "Chưng cất phân đoạn tách các phần dựa trên khoảng nhiệt độ sôi.",
      "Khí thiên nhiên thường giàu methane.",
      "Sử dụng nhiên liệu cần hiệu quả, thông khí phù hợp và bảo đảm an toàn cháy nổ."
    ],
    "activity": "Giải thích vì sao dầu mỏ cần được chế biến thành các sản phẩm khác nhau.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-25",
      "lessonId": "kntt-9-25",
      "topic": "matter",
      "text": "Chưng cất phân đoạn dầu mỏ chủ yếu dựa vào khác biệt nào?",
      "options": [
        "Nhiệt độ sôi",
        "Màu nhãn chai",
        "Khối lượng của bình",
        "Tên gọi sản phẩm"
      ],
      "correct": 0,
      "explanation": "Các thành phần bay hơi ở các khoảng nhiệt độ khác nhau.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-26",
    "number": 26,
    "title": "Bài 26. Ethylic alcohol",
    "topic": "matter",
    "chapter": 8,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "100 mL dung dịch ethanol 40 độ chứa bao nhiêu mL ethanol?",
    "concepts": [
      "Ethylic alcohol hay ethanol có công thức C₂H₅OH.",
      "Ethanol là chất lỏng tan trong nước và dễ cháy.",
      "Độ cồn biểu thị số mL ethanol có trong 100 mL dung dịch ở điều kiện quy định.",
      "Ethanol được dùng làm dung môi, nhiên liệu và nguyên liệu; không uống mẫu thực hành."
    ],
    "activity": "Tính thể tích ethanol trong 200 mL dung dịch 40 độ theo định nghĩa độ cồn.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-26",
      "lessonId": "kntt-9-26",
      "topic": "matter",
      "text": "100 mL dung dịch ethanol 40 độ chứa bao nhiêu mL ethanol?",
      "options": [
        "4 mL",
        "40 mL",
        "60 mL",
        "140 mL"
      ],
      "correct": 1,
      "explanation": "Độ cồn 40 nghĩa là 40 mL ethanol trong 100 mL dung dịch.",
      "level": "Vận dụng"
    }
  },
  {
    "id": "kntt-9-27",
    "number": 27,
    "title": "Bài 27. Acetic acid",
    "topic": "matter",
    "chapter": 8,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Muối tạo thành khi CH₃COOH phản ứng với NaOH là gì?",
    "concepts": [
      "Acetic acid có công thức CH₃COOH.",
      "Dung dịch acetic acid thể hiện tính acid và có trong giấm ăn.",
      "Acetic acid phản ứng với base tạo muối và nước.",
      "Acetic acid có thể phản ứng với ethanol tạo ester trong điều kiện thích hợp."
    ],
    "activity": "Viết phương trình CH₃COOH phản ứng với NaOH và nêu sản phẩm.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-27",
      "lessonId": "kntt-9-27",
      "topic": "matter",
      "text": "Muối tạo thành khi CH₃COOH phản ứng với NaOH là gì?",
      "options": [
        "NaCl",
        "Na₂SO₄",
        "CH₃COONa",
        "CaCO₃"
      ],
      "correct": 2,
      "explanation": "CH₃COOH + NaOH → CH₃COONa + H₂O.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-28",
    "number": 28,
    "title": "Bài 28. Lipid",
    "topic": "matter",
    "chapter": 9,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Chất béo có tính chất nào sau đây?",
    "concepts": [
      "Lipid gồm nhiều nhóm chất, trong đó có chất béo.",
      "Chất béo là triester của glycerol với các acid béo.",
      "Chất béo ít tan trong nước, có vai trò dự trữ và cung cấp năng lượng.",
      "Thuỷ phân chất béo trong kiềm là cơ sở của phản ứng xà phòng hoá."
    ],
    "activity": "Quan sát dầu và nước trong cốc kín, giải thích vì sao tạo lớp riêng; không đun hoặc thêm kiềm.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-28",
      "lessonId": "kntt-9-28",
      "topic": "matter",
      "text": "Chất béo có tính chất nào sau đây?",
      "options": [
        "Luôn tan vô hạn trong nước",
        "Là kim loại",
        "Không chứa carbon",
        "Ít tan trong nước"
      ],
      "correct": 3,
      "explanation": "Phần lớn chất béo không hoà tan đáng kể trong nước.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-29",
    "number": 29,
    "title": "Bài 29. Carbohydrate. Glucose và saccharose",
    "topic": "matter",
    "chapter": 9,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Công thức phân tử của glucose là gì?",
    "concepts": [
      "Carbohydrate là nhóm hợp chất hữu cơ quan trọng trong sinh vật.",
      "Glucose có công thức C₆H₁₂O₆, cung cấp năng lượng cho tế bào.",
      "Saccharose có công thức C₁₂H₂₂O₁₁.",
      "Saccharose có thể thuỷ phân tạo glucose và fructose trong điều kiện thích hợp."
    ],
    "activity": "So sánh công thức phân tử của glucose và saccharose; đọc thành phần đường trên nhãn thực phẩm.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-29",
      "lessonId": "kntt-9-29",
      "topic": "matter",
      "text": "Công thức phân tử của glucose là gì?",
      "options": [
        "C₆H₁₂O₆",
        "C₂H₅OH",
        "CH₃COOH",
        "CH₄"
      ],
      "correct": 0,
      "explanation": "Glucose là carbohydrate có công thức C₆H₁₂O₆.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-30",
    "number": 30,
    "title": "Bài 30. Tinh bột và cellulose",
    "topic": "matter",
    "chapter": 9,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Chất nào thường dùng nhận biết tinh bột trong thí nghiệm?",
    "concepts": [
      "Tinh bột và cellulose đều là carbohydrate có phân tử lớn.",
      "Tinh bột là chất dự trữ phổ biến ở thực vật.",
      "Cellulose là thành phần cấu trúc quan trọng của thành tế bào thực vật.",
      "Tinh bột tạo màu xanh tím với iodine trong điều kiện nhận biết phù hợp."
    ],
    "activity": "Lập bảng so sánh nơi có nhiều tinh bột và nơi có nhiều cellulose.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-30",
      "lessonId": "kntt-9-30",
      "topic": "matter",
      "text": "Chất nào thường dùng nhận biết tinh bột trong thí nghiệm?",
      "options": [
        "Nước tinh khiết",
        "Dung dịch iodine",
        "Dung dịch NaCl",
        "Dầu ăn"
      ],
      "correct": 1,
      "explanation": "Iodine tạo màu xanh tím đặc trưng với tinh bột.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-31",
    "number": 31,
    "title": "Bài 31. Protein",
    "topic": "matter",
    "chapter": 9,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Đơn vị cấu tạo nên protein là gì?",
    "concepts": [
      "Protein là đại phân tử được cấu tạo từ các đơn vị amino acid.",
      "Protein có vai trò cấu trúc, xúc tác và vận chuyển trong cơ thể.",
      "Nhiệt hoặc thay đổi môi trường có thể làm protein biến tính.",
      "Thuỷ phân protein có thể tạo các amino acid."
    ],
    "activity": "Giải thích sự thay đổi lòng trắng trứng khi nấu bằng kiến thức về protein.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-31",
      "lessonId": "kntt-9-31",
      "topic": "matter",
      "text": "Đơn vị cấu tạo nên protein là gì?",
      "options": [
        "Nucleotide",
        "Nguyên tử sắt",
        "Amino acid",
        "Hạt tinh bột"
      ],
      "correct": 2,
      "explanation": "Các amino acid nối với nhau tạo chuỗi polypeptide của protein.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-32",
    "number": 32,
    "title": "Bài 32. Polymer",
    "topic": "matter",
    "chapter": 9,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Polymer nào có nguồn gốc tự nhiên?",
    "concepts": [
      "Polymer có phân tử khối lớn gồm nhiều mắt xích lặp lại.",
      "Polymer có thể tự nhiên như cellulose hoặc tổng hợp như polyethylene.",
      "Tính chất phụ thuộc cấu trúc và thành phần polymer.",
      "Phân loại, tái sử dụng và giảm nhựa dùng một lần giúp hạn chế ô nhiễm."
    ],
    "activity": "Phân loại giấy, chai PE và sợi bông theo nguồn polymer tự nhiên hoặc tổng hợp.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-32",
      "lessonId": "kntt-9-32",
      "topic": "matter",
      "text": "Polymer nào có nguồn gốc tự nhiên?",
      "options": [
        "Polyethylene tổng hợp",
        "PVC tổng hợp",
        "Polystyrene tổng hợp",
        "Cellulose"
      ],
      "correct": 3,
      "explanation": "Cellulose được thực vật tổng hợp và có trong thành tế bào.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-33",
    "number": 33,
    "title": "Bài 33. Sơ lược về hoá học vỏ Trái Đất và khai thác tài nguyên từ vỏ Trái Đất",
    "topic": "earth",
    "chapter": 10,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Nguyên tố nào cùng oxygen rất phổ biến trong vỏ Trái Đất?",
    "concepts": [
      "Vỏ Trái Đất gồm nhiều nguyên tố chủ yếu tồn tại trong khoáng vật.",
      "Oxygen và silicon là các nguyên tố phổ biến trong vỏ Trái Đất.",
      "Quặng là nguồn để khai thác các chất và kim loại có giá trị.",
      "Khai thác cần sử dụng hợp lí tài nguyên và phục hồi môi trường."
    ],
    "activity": "Nêu mối liên hệ khoáng vật → nguyên liệu → sản phẩm cùng một tác động môi trường.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-33",
      "lessonId": "kntt-9-33",
      "topic": "earth",
      "text": "Nguyên tố nào cùng oxygen rất phổ biến trong vỏ Trái Đất?",
      "options": [
        "Silicon",
        "Helium",
        "Neon",
        "Krypton"
      ],
      "correct": 0,
      "explanation": "Nhiều khoáng vật trong vỏ Trái Đất chứa silicon và oxygen.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-34",
    "number": 34,
    "title": "Bài 34. Khai thác đá vôi. Công nghiệp silicate",
    "topic": "earth",
    "chapter": 10,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Nung CaCO₃ đủ điều kiện tạo khí nào?",
    "concepts": [
      "Đá vôi thường chứa chủ yếu calcium carbonate CaCO₃.",
      "Nung CaCO₃ tạo CaO và CO₂.",
      "Công nghiệp silicate gồm sản xuất thuỷ tinh, gốm và xi măng.",
      "Sản xuất vật liệu cần kiểm soát bụi, khí thải và sử dụng năng lượng."
    ],
    "activity": "Cân bằng phản ứng phân huỷ CaCO₃ và xác định chất khí tạo ra.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-34",
      "lessonId": "kntt-9-34",
      "topic": "earth",
      "text": "Nung CaCO₃ đủ điều kiện tạo khí nào?",
      "options": [
        "H₂",
        "CO₂",
        "N₂",
        "O₂"
      ],
      "correct": 1,
      "explanation": "CaCO₃ → CaO + CO₂ khi nung.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-35",
    "number": 35,
    "title": "Bài 35. Khai thác nhiên liệu hoá thạch. Nguồn carbon. Chu trình carbon và sự ấm lên toàn cầu",
    "topic": "earth",
    "chapter": 10,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Quá trình nào lấy CO₂ từ khí quyển để tạo chất hữu cơ?",
    "concepts": [
      "Carbon luân chuyển giữa khí quyển, sinh vật, nước và đất đá.",
      "Quang hợp lấy CO₂; hô hấp và đốt nhiên liệu trả CO₂ vào môi trường.",
      "Khai thác và đốt nhiên liệu hoá thạch đưa carbon dự trữ lâu dài vào khí quyển.",
      "Tăng khí nhà kính làm thay đổi cân bằng năng lượng và góp phần gây nóng lên toàn cầu."
    ],
    "activity": "Vẽ chu trình carbon với quang hợp, hô hấp và đốt nhiên liệu; chỉ rõ chiều mũi tên.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-35",
      "lessonId": "kntt-9-35",
      "topic": "earth",
      "text": "Quá trình nào lấy CO₂ từ khí quyển để tạo chất hữu cơ?",
      "options": [
        "Đốt than",
        "Hô hấp",
        "Quang hợp",
        "Đốt xăng"
      ],
      "correct": 2,
      "explanation": "Cây sử dụng CO₂ trong quang hợp để tổng hợp chất hữu cơ.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-36",
    "number": 36,
    "title": "Bài 36. Khái quát về di truyền học",
    "topic": "life",
    "chapter": 11,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Sự truyền đặc điểm từ thế hệ trước sang sau gọi là gì?",
    "concepts": [
      "Di truyền là sự truyền đạt đặc điểm qua các thế hệ.",
      "Biến dị là những khác biệt giữa các cá thể và giữa con với bố mẹ.",
      "Tính trạng là đặc điểm hình thái, sinh lí hoặc hoá sinh của cơ thể.",
      "Di truyền học nghiên cứu cơ chế và quy luật di truyền, biến dị."
    ],
    "activity": "Dùng ví dụ màu hoa để phân biệt tính trạng, di truyền và biến dị.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-36",
      "lessonId": "kntt-9-36",
      "topic": "life",
      "text": "Sự truyền đặc điểm từ thế hệ trước sang sau gọi là gì?",
      "options": [
        "Khúc xạ",
        "Bay hơi",
        "Cảm ứng điện từ",
        "Di truyền"
      ],
      "correct": 3,
      "explanation": "Di truyền mô tả sự truyền đạt thông tin và đặc điểm qua thế hệ.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-37",
    "number": 37,
    "title": "Bài 37. Các quy luật di truyền của Mendel",
    "topic": "life",
    "chapter": 11,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Phép lai Aa × aa cho xác suất aa là bao nhiêu?",
    "concepts": [
      "Các allele trong một cặp phân li khi hình thành giao tử.",
      "Lai Aa × Aa cho tỉ lệ kiểu gene 1AA : 2Aa : 1aa trong mô hình Mendel.",
      "Khi trội hoàn toàn, kiểu hình tương ứng có tỉ lệ 3 trội : 1 lặn ở số lượng con đủ lớn.",
      "Phân li độc lập áp dụng cho các cặp gene phân li độc lập; không đúng cho mọi cặp gene."
    ],
    "activity": "Lập bảng Punnett cho Aa × aa và tính xác suất kiểu gene aa.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-37",
      "lessonId": "kntt-9-37",
      "topic": "life",
      "text": "Phép lai Aa × aa cho xác suất aa là bao nhiêu?",
      "options": [
        "1/2",
        "1/4",
        "3/4",
        "1"
      ],
      "correct": 0,
      "explanation": "Bố mẹ Aa tạo giao tử A và a, còn aa chỉ tạo a; một nửa tổ hợp là aa.",
      "level": "Vận dụng"
    }
  },
  {
    "id": "kntt-9-38",
    "number": 38,
    "title": "Bài 38. Nucleic acid và gene",
    "topic": "life",
    "chapter": 11,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Mạch bổ sung của ATGC là gì?",
    "concepts": [
      "DNA và RNA là nucleic acid được cấu tạo từ nucleotide.",
      "DNA thường gồm hai mạch, các base bổ sung A–T và G–C.",
      "RNA thường có một mạch và sử dụng U thay T.",
      "Gene là một đoạn DNA mang thông tin tạo sản phẩm chức năng."
    ],
    "activity": "Viết mạch bổ sung của đoạn DNA ATGC và kiểm tra từng cặp base.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-38",
      "lessonId": "kntt-9-38",
      "topic": "life",
      "text": "Mạch bổ sung của ATGC là gì?",
      "options": [
        "AUGC",
        "TACG",
        "ATGC",
        "TAGC"
      ],
      "correct": 1,
      "explanation": "A ghép T, T ghép A, G ghép C, C ghép G.",
      "level": "Vận dụng"
    }
  },
  {
    "id": "kntt-9-39",
    "number": 39,
    "title": "Bài 39. Tái bản DNA và phiên mã tạo RNA",
    "topic": "life",
    "chapter": 11,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Sản phẩm trực tiếp của phiên mã là gì?",
    "concepts": [
      "Tái bản tạo DNA mới dựa trên khuôn DNA có sẵn.",
      "Mỗi DNA con thường có một mạch cũ và một mạch mới theo nguyên tắc bán bảo toàn.",
      "Phiên mã tạo RNA dựa trên một mạch khuôn DNA.",
      "Khi phiên mã, A trên khuôn ghép U của RNA; T ghép A, G ghép C và C ghép G."
    ],
    "activity": "Phân biệt tái bản và phiên mã theo khuôn, sản phẩm và mục đích.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-39",
      "lessonId": "kntt-9-39",
      "topic": "life",
      "text": "Sản phẩm trực tiếp của phiên mã là gì?",
      "options": [
        "Lipid",
        "Protein hoàn chỉnh",
        "RNA",
        "Tinh bột"
      ],
      "correct": 2,
      "explanation": "Phiên mã tổng hợp RNA từ thông tin trên mạch khuôn DNA.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-40",
    "number": 40,
    "title": "Bài 40. Dịch mã và mối quan hệ từ gene đến tính trạng",
    "topic": "life",
    "chapter": 11,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Nơi diễn ra quá trình dịch mã là gì?",
    "concepts": [
      "Dịch mã tổng hợp chuỗi polypeptide dựa trên mRNA.",
      "Ribosome đọc mRNA theo các bộ ba nucleotide.",
      "tRNA vận chuyển amino acid phù hợp đến ribosome.",
      "Thông tin thường truyền theo chiều DNA → RNA → protein; protein góp phần biểu hiện tính trạng."
    ],
    "activity": "Vẽ sơ đồ từ gene đến protein và giải thích vai trò của mRNA.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-40",
      "lessonId": "kntt-9-40",
      "topic": "life",
      "text": "Nơi diễn ra quá trình dịch mã là gì?",
      "options": [
        "Thành tế bào",
        "Không bào",
        "Màng nhân",
        "Ribosome"
      ],
      "correct": 3,
      "explanation": "Ribosome là nơi lắp ráp amino acid thành chuỗi polypeptide.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-41",
    "number": 41,
    "title": "Bài 41. Đột biến gene",
    "topic": "life",
    "chapter": 11,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Thay một cặp nucleotide trong gene là dạng biến đổi nào?",
    "concepts": [
      "Đột biến gene là biến đổi trong trình tự nucleotide của gene.",
      "Đột biến có thể là thay thế, thêm hoặc mất nucleotide.",
      "Ảnh hưởng có thể có hại, trung tính hoặc có lợi tuỳ bối cảnh.",
      "Đột biến tạo nguồn biến dị di truyền, không xuất hiện vì sinh vật chủ động cần nó."
    ],
    "activity": "So sánh hai đoạn DNA giả định để xác định thay thế hay mất một nucleotide.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-41",
      "lessonId": "kntt-9-41",
      "topic": "life",
      "text": "Thay một cặp nucleotide trong gene là dạng biến đổi nào?",
      "options": [
        "Đột biến gene",
        "Chỉ là thay đổi môi trường",
        "Nguyên phân",
        "Thụ tinh"
      ],
      "correct": 0,
      "explanation": "Trình tự nucleotide của gene thay đổi là đột biến gene.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-42",
    "number": 42,
    "title": "Bài 42. Nhiễm sắc thể và bộ nhiễm sắc thể",
    "topic": "life",
    "chapter": 12,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Loài 2n = 8 có giao tử bình thường chứa bao nhiêu nhiễm sắc thể?",
    "concepts": [
      "Nhiễm sắc thể gồm DNA liên kết với protein.",
      "Gene phân bố trên nhiễm sắc thể.",
      "Tế bào lưỡng bội có các cặp nhiễm sắc thể tương đồng, kí hiệu 2n.",
      "Giao tử thường có bộ đơn bội n; cần phân biệt số nhiễm sắc thể và số chromatid."
    ],
    "activity": "Với loài 2n = 8, xác định số nhiễm sắc thể trong giao tử bình thường.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-42",
      "lessonId": "kntt-9-42",
      "topic": "life",
      "text": "Loài 2n = 8 có giao tử bình thường chứa bao nhiêu nhiễm sắc thể?",
      "options": [
        "8",
        "4",
        "16",
        "2"
      ],
      "correct": 1,
      "explanation": "Giao tử có n = 2n/2 = 4 nhiễm sắc thể.",
      "level": "Vận dụng"
    }
  },
  {
    "id": "kntt-9-43",
    "number": 43,
    "title": "Bài 43. Nguyên phân và giảm phân",
    "topic": "life",
    "chapter": 12,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Giảm phân từ tế bào 2n thường tạo tế bào con có bộ nào?",
    "concepts": [
      "Nguyên phân thường tạo hai tế bào con giữ nguyên số nhiễm sắc thể của tế bào mẹ.",
      "Giảm phân gồm hai lần phân bào sau một lần nhân đôi DNA.",
      "Giảm phân thường tạo tế bào đơn bội từ tế bào lưỡng bội.",
      "Giảm phân và thụ tinh góp phần duy trì bộ nhiễm sắc thể đặc trưng qua thế hệ hữu tính."
    ],
    "activity": "Lập bảng số lần phân bào, số tế bào con và bộ nhiễm sắc thể của hai quá trình.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-43",
      "lessonId": "kntt-9-43",
      "topic": "life",
      "text": "Giảm phân từ tế bào 2n thường tạo tế bào con có bộ nào?",
      "options": [
        "2n",
        "4n",
        "n",
        "8n"
      ],
      "correct": 2,
      "explanation": "Số nhiễm sắc thể giảm còn một nửa sau giảm phân bình thường.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-44",
    "number": 44,
    "title": "Bài 44. Nhiễm sắc thể giới tính và cơ chế xác định giới tính",
    "topic": "life",
    "chapter": 12,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Trong mô hình XX/XY điển hình, trứng mang nhiễm sắc thể nào?",
    "concepts": [
      "Nhiễm sắc thể giới tính tham gia cơ chế xác định giới tính ở nhiều loài.",
      "Trong mô hình XX/XY điển hình ở người, trứng mang X còn tinh trùng có thể mang X hoặc Y.",
      "Sự kết hợp giao tử tạo XX hoặc XY với xác suất gần bằng nhau trong mô hình đơn giản.",
      "Đây là mô hình sinh học cơ bản; không dùng để đánh giá giá trị hoặc vai trò xã hội của cá nhân."
    ],
    "activity": "Lập sơ đồ giao tử X kết hợp với tinh trùng X hoặc Y theo mô hình XX/XY.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-44",
      "lessonId": "kntt-9-44",
      "topic": "life",
      "text": "Trong mô hình XX/XY điển hình, trứng mang nhiễm sắc thể nào?",
      "options": [
        "Y",
        "XY",
        "YY",
        "X"
      ],
      "correct": 3,
      "explanation": "Trứng bình thường mang một nhiễm sắc thể X trong mô hình này.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-45",
    "number": 45,
    "title": "Bài 45. Di truyền liên kết",
    "topic": "life",
    "chapter": 12,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "AB/ab liên kết hoàn toàn tạo các loại giao tử nào?",
    "concepts": [
      "Các gene trên cùng nhiễm sắc thể có xu hướng được di truyền cùng nhau.",
      "Di truyền liên kết làm hạn chế một số tổ hợp so với phân li độc lập.",
      "Trong mô hình liên kết hoàn toàn, cơ thể AB/ab tạo giao tử AB và ab.",
      "Không áp dụng tỉ lệ phân li độc lập cho các gene liên kết hoàn toàn."
    ],
    "activity": "Liệt kê giao tử của AB/ab khi liên kết hoàn toàn và so sánh với phân li độc lập.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-45",
      "lessonId": "kntt-9-45",
      "topic": "life",
      "text": "AB/ab liên kết hoàn toàn tạo các loại giao tử nào?",
      "options": [
        "AB và ab",
        "Ab và aB",
        "AA và BB",
        "A và B riêng lẻ"
      ],
      "correct": 0,
      "explanation": "Hai nhóm allele trên hai nhiễm sắc thể được truyền cùng nhau khi không có hoán vị.",
      "level": "Vận dụng"
    }
  },
  {
    "id": "kntt-9-46",
    "number": 46,
    "title": "Bài 46. Đột biến nhiễm sắc thể",
    "topic": "life",
    "chapter": 12,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Bộ nhiễm sắc thể 3n thuộc dạng nào?",
    "concepts": [
      "Đột biến nhiễm sắc thể có thể thay đổi cấu trúc hoặc số lượng.",
      "Mất đoạn, lặp đoạn, đảo đoạn là các dạng biến đổi cấu trúc.",
      "Lệch bội làm thay đổi số lượng ở một hoặc một số cặp.",
      "Đa bội làm tăng số bộ nhiễm sắc thể đơn bội."
    ],
    "activity": "Phân biệt ví dụ 2n + 1 và 3n theo lệch bội hoặc đa bội.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-46",
      "lessonId": "kntt-9-46",
      "topic": "life",
      "text": "Bộ nhiễm sắc thể 3n thuộc dạng nào?",
      "options": [
        "Thay thế một nucleotide",
        "Đa bội",
        "Lệch bội 2n + 1",
        "Mất một đoạn DNA luôn luôn"
      ],
      "correct": 1,
      "explanation": "3n gồm ba bộ nhiễm sắc thể đơn bội.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-47",
    "number": 47,
    "title": "Bài 47. Di truyền học với con người",
    "topic": "life",
    "chapter": 13,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Phả hệ dùng để theo dõi điều gì?",
    "concepts": [
      "Nghiên cứu phả hệ giúp theo dõi sự xuất hiện của tính trạng qua thế hệ.",
      "Một số bệnh hoặc hội chứng liên quan biến đổi gene hay nhiễm sắc thể.",
      "Tư vấn di truyền sử dụng thông tin chuyên môn để hỗ trợ quyết định sức khoẻ.",
      "Tôn trọng riêng tư và không kì thị người có đặc điểm di truyền khác biệt."
    ],
    "activity": "Phân tích một phả hệ giả định do giáo viên cung cấp; không thu thập bệnh sử của bạn trong lớp.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-47",
      "lessonId": "kntt-9-47",
      "topic": "life",
      "text": "Phả hệ dùng để theo dõi điều gì?",
      "options": [
        "Điện trở dây dẫn",
        "Nhiệt độ sôi",
        "Tính trạng qua các thế hệ",
        "Công suất động cơ"
      ],
      "correct": 2,
      "explanation": "Phả hệ biểu diễn quan hệ họ hàng và sự xuất hiện tính trạng theo thế hệ.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-48",
    "number": 48,
    "title": "Bài 48. Ứng dụng công nghệ di truyền vào đời sống",
    "topic": "life",
    "chapter": 13,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Ví dụ nào là ứng dụng công nghệ di truyền?",
    "concepts": [
      "Công nghệ di truyền tác động hoặc khai thác vật chất di truyền.",
      "DNA tái tổ hợp có thể giúp tế bào sản xuất protein hữu ích.",
      "Ứng dụng gồm y dược, nông nghiệp và nghiên cứu.",
      "Đánh giá ứng dụng cần xem lợi ích, rủi ro, đạo đức và an toàn sinh học."
    ],
    "activity": "Lập bảng lợi ích và điều cần kiểm soát khi sản xuất insulin bằng công nghệ di truyền.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-48",
      "lessonId": "kntt-9-48",
      "topic": "life",
      "text": "Ví dụ nào là ứng dụng công nghệ di truyền?",
      "options": [
        "Lọc cát khỏi nước",
        "Đo chiều dài",
        "Mài thấu kính",
        "Vi sinh vật sản xuất insulin nhờ gene được đưa vào"
      ],
      "correct": 3,
      "explanation": "Gene phù hợp giúp tế bào sản xuất protein insulin theo quy trình công nghệ.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-49",
    "number": 49,
    "title": "Bài 49. Khái niệm tiến hoá và các hình thức chọn lọc",
    "topic": "life",
    "chapter": 14,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Con người chọn cây quả to để nhân giống là hình thức nào?",
    "concepts": [
      "Tiến hoá sinh học liên quan sự thay đổi đặc điểm di truyền của quần thể qua thế hệ.",
      "Chọn lọc tự nhiên gắn với sự khác nhau về sống sót và sinh sản trong môi trường.",
      "Chọn lọc nhân tạo do con người lựa chọn cá thể theo mục tiêu.",
      "Cá thể không tự biến đổi gene theo nhu cầu để thích nghi."
    ],
    "activity": "So sánh chọn giống cây do người thực hiện với sự thay đổi tỉ lệ màu sắc sinh vật ngoài tự nhiên.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-49",
      "lessonId": "kntt-9-49",
      "topic": "life",
      "text": "Con người chọn cây quả to để nhân giống là hình thức nào?",
      "options": [
        "Chọn lọc nhân tạo",
        "Phản xạ toàn phần",
        "Phiên mã",
        "Chọn lọc hoàn toàn ngẫu nhiên"
      ],
      "correct": 0,
      "explanation": "Con người chủ động chọn đặc điểm mong muốn nên đây là chọn lọc nhân tạo.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-50",
    "number": 50,
    "title": "Bài 50. Cơ chế tiến hoá",
    "topic": "life",
    "chapter": 14,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Nguồn có thể tạo allele mới là gì?",
    "concepts": [
      "Biến dị di truyền cung cấp nguyên liệu cho tiến hoá.",
      "Đột biến có thể tạo allele mới; sinh sản hữu tính tạo tổ hợp allele.",
      "Chọn lọc tự nhiên tác động thông qua sự khác biệt thành công sinh sản.",
      "Đặc điểm có lợi phụ thuộc môi trường và có thể thay đổi qua thời gian."
    ],
    "activity": "Giải thích vì sao một màu ngụy trang có lợi ở môi trường này nhưng bất lợi ở môi trường khác.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-50",
      "lessonId": "kntt-9-50",
      "topic": "life",
      "text": "Nguồn có thể tạo allele mới là gì?",
      "options": [
        "Chỉ tập luyện cơ bắp",
        "Đột biến",
        "Chỉ thay đổi thức ăn",
        "Mong muốn của cá thể"
      ],
      "correct": 1,
      "explanation": "Đột biến làm thay đổi DNA và có thể tạo allele mới.",
      "level": "Thông hiểu"
    }
  },
  {
    "id": "kntt-9-51",
    "number": 51,
    "title": "Bài 51. Sự phát sinh và phát triển sự sống trên Trái Đất",
    "topic": "life",
    "chapter": 14,
    "book": "Kết nối tri thức với cuộc sống",
    "hook": "Bằng chứng nào giúp nghiên cứu sinh vật đã sống trong quá khứ?",
    "concepts": [
      "Lịch sử sự sống diễn ra qua thời gian địa chất rất dài.",
      "Các dạng sống đơn giản xuất hiện trước nhiều nhóm sinh vật đa bào phức tạp.",
      "Hoá thạch và các bằng chứng khác giúp tái dựng lịch sử sự sống.",
      "Tiến hoá phân nhánh; các loài hiện nay không xếp thành một chiếc thang từ thấp đến cao."
    ],
    "activity": "Vẽ một cây phân nhánh giả định có tổ tiên chung, phân biệt với cách vẽ một hàng loài nối tiếp.",
    "minutes": 20,
    "question": {
      "id": "kntt9-q-51",
      "lessonId": "kntt-9-51",
      "topic": "life",
      "text": "Bằng chứng nào giúp nghiên cứu sinh vật đã sống trong quá khứ?",
      "options": [
        "Số đo điện trở",
        "Nhãn chai hoá chất",
        "Hoá thạch",
        "Điểm kiểm tra hiện tại"
      ],
      "correct": 2,
      "explanation": "Hoá thạch lưu giữ dấu tích hoặc di thể sinh vật trong quá khứ.",
      "level": "Thông hiểu"
    }
  }
];
export const questions=lessons.map(l=>({...l.question,lessonId:l.id}));
export const games=[['brain','Siêu trí tuệ','Brain','Nhớ kiến thức qua 5 câu hỏi.','purple'],['climb','Nhà leo núi','Mountain','Chinh phục 5 chặng kiến thức.','orange'],['terms','Vua thuật ngữ','Crown','Nhận diện thuật ngữ khoa học.','blue'],['bell','Rung chuông vàng','Bell','Giữ chuỗi trả lời đúng.','orange'],['dive','Thợ lặn tài ba','Waves','Khám phá di truyền và tiến hoá.','blue'],['space','Phi hành gia','Rocket','Khám phá tài nguyên và chu trình carbon.','purple'],['detective','Thám tử khoa học','Search','Tìm lời giải từ bằng chứng.','teal'],['farm','Nông trại xanh','Sprout','Chăm vườn bằng kiến thức.','green'],['duel','Đấu sĩ tri thức','Swords','Thử thách lực và năng lượng.','orange'],['artist','Hoạ sĩ tài ba','Palette','Ghép màu với mạch kiến thức.','purple']].map(([id,name,icon,description,color])=>({id,name,icon,description,color}));
export function initialSchool(){return {schemaVersion:2,classes:[],lessons:structuredClone(lessons),questions:structuredClone(questions),exams:[],assignments:[],announcements:[],settings:{schoolName:'KHTN 9 · Kết nối tri thức với cuộc sống',year:'2026–2027'}}}
export function demoSchool(){const s=initialSchool();s.classes=[{id:'demo-class',name:'Lớp 9A1 · Minh hoạ',code:'KHTN9DEMO'}];s.exams=[{id:'exam-demo',title:'Ôn tập mở đầu, cơ học và ánh sáng',classId:'demo-class',duration:15,maxAttempts:3,category:'ĐTX',questionIds:questions.slice(0,10).map(q=>q.id),essay:'Vì sao cần tuân thủ nội quy phòng thực hành? Nêu hai ví dụ.',essayPoints:2,proctor:false}];s.assignments=[{id:'assignment-demo',title:'Khảo sát sử dụng điện trong gia đình',classId:'demo-class',description:'Ghi công suất trên nhãn ba thiết bị điện, ước lượng thời gian sử dụng và tính điện năng trong một ngày. Chỉ đọc nhãn, không tháo hoặc đo điện lưới.',dueDate:new Date(Date.now()+7*86400000).toISOString().slice(0,10)}];s.announcements=[{id:'welcome',title:'Chào mừng em đến với KHTN 9',body:'Bắt đầu từ một câu hỏi nhỏ. Mỗi bài học là một cơ hội khám phá thế giới quanh em.',classId:'demo-class'}];return s}
