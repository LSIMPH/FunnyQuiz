// questions.js - CẤU HÌNH CÂU HỎI VÀ DANH SÁCH 4 TỔ
// Bạn và em có thể dễ dàng chỉnh sửa câu hỏi tại đây hoặc chỉnh sửa trực tiếp trên giao diện Web!

const DEFAULT_GAME_DATA = {
  // Cấu hình tên và thành viên của 4 Tổ (Vương Quốc)
  teams: [
    {
      id: 1,
      name: "Tổ 1 - Vương Quốc Rồng Lửa",
      members: [
        "Nguyễn Văn An", "Trần Thị Bình", "Lê Hoàng Cường", "Phạm Ngọc Dung",
        "Đỗ Minh Đức", "Vũ Mai Hoa", "Bùi Quốc Hưng", "Hoàng Kim Ngân"
      ]
    },
    {
      id: 2,
      name: "Tổ 2 - Vương Quốc Băng Phong",
      members: [
        "Đặng Gia Bảo", "Phan Thùy Chi", "Ngô Đình Dũng", "Dương Thu Hà",
        "Lý Hải Long", "Trương Thảo My", "Võ Thành Nam", "Đoàn Phương Oanh"
      ]
    },
    {
      id: 3,
      name: "Tổ 3 - Vương Quốc Lôi Thần",
      members: [
        "Hồ Quang Quân", "Mai Thị Quỳnh", "Đinh Tấn Sang", "Lâm Mỹ Tâm",
        "Trịnh Đức Thắng", "Vương Cẩm Tú", "Cao Nhật Uyên", "Tạ Thanh Vinh"
      ]
    },
    {
      id: 4,
      name: "Tổ 4 - Vương Quốc Đất Mẹ",
      members: [
        "Nguyễn Thái An", "Lê Phương Bảo", "Trần Đình Cảnh", "Phạm Trúc Diệp",
        "Hoàng Khắc Huy", "Đỗ Khánh Linh", "Vũ Hoàng Phúc", "Bùi Như Quỳnh"
      ]
    }
  ],

  // VÒNG 1: TỨ KẾT (10 câu tổng - mỗi nhánh 5 câu hoặc dự phòng nhiều câu hơn, thời gian 60 giây/câu)
  round1: [
    {
      id: 1,
      match: "1vs2",
      question: "Hành tinh nguyên bản trước khi Nữ thần trừng phạt có tên là gì?",
      options: [
        "A. HN12A10",
        "B. HN11A10",
        "C. Galaxy 12A",
        "D. Olympus 10"
      ],
      correctAnswer: 0,
      explain: "Trong truyền thuyết, hành tinh yên bình này mang tên HN12A10!"
    },
    {
      id: 2,
      match: "1vs2",
      question: "Vì lý do gì mà Nữ Thần nổi cơn thịnh nộ giáng thử thách xuống hành tinh?",
      options: [
        "A. Con người quên dâng lễ vật",
        "B. Kẻ ngu ngốc trộm nguồn năng lượng đền thờ",
        "C. Các vương quốc tự ý gây chiến tranh",
        "D. Thảm họa thiên thạch rơi"
      ],
      correctAnswer: 1,
      explain: "Có một kẻ ngu ngốc vì tham vọng quyền năng đã lẻn vào trộm mất nguồn năng lượng ở đền thờ."
    },
    {
      id: 3,
      match: "1vs2",
      question: "Trong 5 yếu tố sinh tồn, yếu tố nào khi bị mất sẽ khiến tổ bị xử THUA NGAY LẬP TỨC?",
      options: [
        "A. Lương thực và Sức khỏe",
        "B. Vũ khí và Lương thực",
        "C. Lãnh thổ hoặc Của cải",
        "D. Chỉ có Lương thực"
      ],
      correctAnswer: 2,
      explain: "Mất Lãnh thổ = Mất căn cứ (Thua); Mất Của cải = Bạo loạn đầu hàng (Thua)."
    },
    {
      id: 4,
      match: "1vs2",
      question: "Kim tự tháp Kê-ốp (Ai Cập cổ đại) là kỳ quan duy nhất còn sót lại trong danh sách nào?",
      options: [
        "A. 7 kỳ quan thiên nhiên thế giới mới",
        "B. 7 kỳ quan thế giới cổ đại",
        "C. Di sản thế giới hiện đại",
        "D. 7 công trình thế kỷ 20"
      ],
      correctAnswer: 1,
      explain: "Đại Kim tự tháp Giza là kỳ quan cổ nhất và duy nhất còn tồn tại trong 7 kỳ quan thế giới cổ đại."
    },
    {
      id: 5,
      match: "1vs2",
      question: "Đơn vị cơ bản cấu tạo nên mọi vật chất sống là gì?",
      options: [
        "A. Nguyên tử",
        "B. Phân tử",
        "C. Tế bào",
        "D. Mô"
      ],
      correctAnswer: 2,
      explain: "Tế bào là đơn vị cơ bản cấu tạo nên mọi cơ thể sống."
    },
    {
      id: 6,
      match: "3vs4",
      question: "Trong vũ trụ, hành tinh nào gần Mặt Trời nhất?",
      options: [
        "A. Sao Thủy",
        "B. Sao Kim",
        "C. Sao Hỏa",
        "D. Trái Đất"
      ],
      correctAnswer: 0,
      explain: "Sao Thủy (Mercury) là hành tinh gần Mặt Trời nhất trong Hệ Mặt Trời."
    },
    {
      id: 7,
      match: "3vs4",
      question: "Khí nào chiếm tỉ lệ phần trăm thể tích lớn nhất trong bầu khí quyển Trái Đất?",
      options: [
        "A. Oxy (O2)",
        "B. Khí Nitơ (N2)",
        "C. Khí Carbonic (CO2)",
        "D. Khí Argon (Ar)"
      ],
      correctAnswer: 1,
      explain: "Khí Nitơ chiếm khoảng 78% thể tích khí quyển."
    },
    {
      id: 8,
      match: "3vs4",
      question: "Chiến dịch Điện Biên Phủ toàn thắng vào ngày tháng năm nào?",
      options: [
        "A. 30/04/1975",
        "B. 07/05/1954",
        "C. 02/09/1945",
        "D. 19/08/1945"
      ],
      correctAnswer: 1,
      explain: "Ngày 07/05/1954 đánh dấu chiến thắng lịch sử Điện Biên Phủ lừng lẫy năm châu."
    },
    {
      id: 9,
      match: "3vs4",
      question: "Nguyên tố hóa học nào có ký hiệu là 'Au' trong bảng tuần hoàn?",
      options: [
        "A. Bạc",
        "B. Đồng",
        "C. Vàng",
        "D. Nhôm"
      ],
      correctAnswer: 2,
      explain: "'Au' xuất phát từ tiếng Latin 'Aurum' nghĩa là Vàng."
    },
    {
      id: 10,
      match: "3vs4",
      question: "Tác phẩm văn học 'Truyện Kiều' do đại thi hào nào sáng tác?",
      options: [
        "A. Nguyễn Trãi",
        "B. Nguyễn Du",
        "C. Hồ Xuân Hương",
        "D. Đoàn Thị Điểm"
      ],
      correctAnswer: 1,
      explain: "Đoạn trường tân thanh (Truyện Kiều) là kiệt tác của Đại thi hào Nguyễn Du."
    }
  ],

  // VÒNG 2: CHUNG KẾT 2 TỔ (4 câu Đúng / Sai - Thời gian: 2 phút / câu)
  round2: [
    {
      id: 1,
      question: "Mặt Trời mọc ở hướng Đông và lặn ở hướng Tây do Trái Đất tự quay từ Tây sang Đông.",
      isTrue: true,
      explain: "Chính xác! Trái Đất quay ngược chiều kim đồng hồ (từ Tây sang Đông) tạo nên hiện tượng này."
    },
    {
      id: 2,
      question: "Vạn Lý Trường Thành của Trung Quốc có thể nhìn thấy rõ ràng bằng mắt thường từ Trạm Vũ trụ Quốc tế (ISS) mà không cần ống kính phóng đại.",
      isTrue: false,
      explain: "Sai! Các phi hành gia NASA đã khẳng định Vạn Lý Trường Thành rất hẹp và chìm vào địa hình, không thể thấy bằng mắt thường."
    },
    {
      id: 3,
      question: "Vận tốc của ánh sáng trong chân không lớn hơn vận tốc của âm thanh trong không khí.",
      isTrue: true,
      explain: "Đúng! Ánh sáng truyền xấp xỉ 300.000 km/s, trong khi âm thanh chỉ khoảng 343 m/s."
    },
    {
      id: 4,
      question: "Cá voi xanh là loài động vật lớn nhất từng được biết đến từng tồn tại trên Trái Đất, lớn hơn cả các loài khủng long khổng lồ.",
      isTrue: true,
      explain: "Đúng! Cá voi xanh có thể dài hơn 30 mét và nặng tới gần 200 tấn, vượt xa mọi loài khủng long đã biết."
    }
  ],

  // VÒNG ANH HÙNG: ĐẨY NHANH 10 CÂU (Mỗi câu 30 giây, trả lời đúng +1 điểm)
  heroRound: [
    { id: 1, question: "Thủ đô của nước Pháp là gì?", answer: "Paris" },
    { id: 2, question: "1 năm dương lịch thông thường (không nhuận) có bao nhiêu ngày?", answer: "365 ngày" },
    { id: 3, question: "Hành tinh nào được mệnh danh là 'Hành tinh Đỏ'?", answer: "Sao Hỏa (Mars)" },
    { id: 4, question: "Tam giác có 3 cạnh bằng nhau gọi là tam giác gì?", answer: "Tam giác đều" },
    { id: 5, question: "Công thức hóa học của nước là gì?", answer: "H2O" },
    { id: 6, question: "Ai là người phát minh ra bóng đèn sợi đốt thương mại thành công?", answer: "Thomas Edison" },
    { id: 7, question: "Đỉnh núi nào cao nhất thế giới hiện nay?", answer: "Đỉnh Everest (Chomolungma)" },
    { id: 8, question: "Quốc kỳ Việt Nam có ngôi sao màu gì?", answer: "Màu Vàng" },
    { id: 9, question: "Bản Tuyên ngôn Độc lập của Việt Nam được Bác Hồ đọc tại quảng trường nào?", answer: "Quảng trường Ba Đình" },
    { id: 10, question: "Loài chim nào là biểu tượng của hòa bình?", answer: "Chim Bồ Câu" }
  ],

  // VÒNG BOSS: CÂU HỎI TỰ LUẬN 5 PHÚT VỚI NỮ THẦN
  bossRound: {
    title: "PHÁN QUYẾT TỐI THƯỢNG CỦA NỮ THẦN HN12A10",
    question: "Hỡi Đại Anh Hùng của hành tinh HN12A10! Hãy trình bày trước Nữ thần: 'Nếu nắm trong tay quyền năng tối thượng tái sinh hành tinh, ngươi sẽ chọn bảo vệ điều gì đầu tiên để 4 vương quốc mãi mãi hòa bình và không bao giờ xảy ra chiến tranh nữa?'",
    timeLimit: 300, // 5 phút (300 giây)
    instructions: "Đại Anh Hùng có 5 phút suy nghĩ và thuyết trình trước toàn thể hội đồng Nữ thần và các vương quốc."
  }
};
