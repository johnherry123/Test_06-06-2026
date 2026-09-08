/* ══════════════════════════════════════════════════════════════════════
   WEDDING DATA — Centralized configuration
   Luxury Editorial Wedding Configuration
══════════════════════════════════════════════════════════════════════ */

/* ── Couple ── */
export const COUPLE = {
  groom: {
    firstName:   'Đại Nghĩa',
    fullName:    'Trần Đại Nghĩa',
    role:        'Chú Rể',
    roleLabel:   'Trưởng Nam',
    title:       'Kỹ sư Phần mềm',
    quote:       '"Từ khoảnh khắc đầu tiên thấy em cười, anh đã biết trái tim mình đã tìm được nơi thuộc về trọn đời."',
    photo: {
      src:      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=90&fm=webp',
      fallback: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=85',
      alt:      'Chú rể Trần Đại Nghĩa',
    },
    details: [
      { label: 'Sở thích',        value: 'Nhiếp ảnh, Du lịch & Cà phê sáng' },
      { label: 'Tính cách',       value: 'Điềm đạm, chu đáo và chân thành' },
      { label: 'Yêu nhất ở cô dâu', value: 'Nụ cười tỏa nắng và sự thấu hiểu' },
    ],
  },
  bride: {
    firstName:   'Trịnh Nhung',
    fullName:    'Trịnh Thị Nhung',
    role:        'Cô Dâu',
    roleLabel:   'Út Nữ',
    title:       'Nhà Thiết Kế Thời Trang',
    quote:       '"Hạnh phúc không phải là tìm được một người hoàn hảo, mà là tìm thấy một người cùng ta hoàn thiện tình yêu."',
    photo: {
      src:      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=90&fm=webp',
      fallback: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=85',
      alt:      'Cô dâu Trịnh Thị Nhung',
    },
    details: [
      { label: 'Sở thích',        value: 'Hội họa, Cắm hoa & Nấu ăn gia đình' },
      { label: 'Tính cách',       value: 'Dịu dàng, tinh tế và luôn lắng nghe' },
      { label: 'Yêu nhất ở chú rể', value: 'Bờ vai vững chãi và sự ấm áp' },
    ],
  },
};

/* ── Wedding day ── */
export const WEDDING = {
  date:        '20.10.2026',
  dateISO:     '2026-10-20',
  dateDisplay: 'Thứ Ba, 20 tháng 10, 2026',
  lunarDate:   'Ngày 10 tháng 09 năm Bính Ngọ (Âm Lịch)',
  calendarTarget: '2026-10-20T07:30:00+07:00',
};

/* ── Family ── */
export const FAMILY = {
  groom: {
    father:  'Ông Trần Văn Hùng',
    mother:  'Bà Nguyễn Thị Mai',
    role:    'Trưởng Nam',
    address: '48 Trường Chinh, Phường 14, Quận Tân Bình, TP. HCM',
    locationName: 'Tư Gia Nhà Trai',
    eventTitle: 'Lễ Thành Hôn & Tiệc Mừng',
    time: '10:30',
    banquetTime: '11:30',
    mapUrl: 'https://maps.google.com/?q=48+Truong+Chinh+Tan+Binh+TP+HCM',
  },
  bride: {
    father:  'Ông Trịnh Văn Thành',
    mother:  'Bà Phạm Thị Lan',
    role:    'Út Nữ',
    address: '125 Nam Kỳ Khởi Nghĩa, Phường Võ Thị Sáu, Quận 3, TP. HCM',
    locationName: 'Tư Gia Nhà Gái',
    eventTitle: 'Lễ Vu Quy & Tiệc Mừng',
    time: '07:30',
    banquetTime: '11:00',
    mapUrl: 'https://maps.google.com/?q=125+Nam+Ky+Khoi+Nghia+Quan+3+TP+HCM',
  },
};

/* ── Traditional Events ── */
export const TRADITIONAL_PARTIES = {
  nhaGai: {
    id: 'nha-gai',
    tabLabel: '🌸 Tiệc Nhà Gái (Lễ Vu Quy)',
    badge: 'Tư Gia Nhà Gái',
    title: 'LỄ VU QUY & TIỆC MỪNG',
    subtitle: 'Nghi thức xuất giá tại Tư Gia Họ Nhà Gái',
    parents: 'Ông Trịnh Văn Thành & Bà Phạm Thị Lan',
    brideGroomLine: 'Hôn lễ của con gái Trịnh Thị Nhung (Út Nữ)',
    timeCeremony: '07:30',
    timeBanquet: '11:00',
    labelCeremony: 'LỄ VU QUY XUẤT GIÁ',
    labelBanquet: 'TIỆC MỪNG THÂN MẬT',
    address: '125 Nam Kỳ Khởi Nghĩa, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh',
    mapUrl: 'https://maps.google.com/?q=125+Nam+Ky+Khoi+Nghia+Quan+3+TP+HCM',
  },
  nhaTrai: {
    id: 'nha-trai',
    tabLabel: '🎩 Tiệc Nhà Trai (Lễ Thành Hôn)',
    badge: 'Tư Gia Nhà Trai',
    title: 'LỄ THÀNH HÔN & TIỆC MỪNG',
    subtitle: 'Nghi thức rước dâu tại Tư Gia Họ Nhà Trai',
    parents: 'Ông Trần Văn Hùng & Bà Nguyễn Thị Mai',
    brideGroomLine: 'Hôn lễ của con trai Trần Đại Nghĩa (Trưởng Nam)',
    timeCeremony: '10:30',
    timeBanquet: '11:30',
    labelCeremony: 'LỄ THÀNH HÔN RƯỚC DÂU',
    labelBanquet: 'TIỆC MỪNG BÁO HỶ',
    address: '48 Trường Chinh, Phường 14, Quận Tân Bình, TP. Hồ Chí Minh',
    mapUrl: 'https://maps.google.com/?q=48+Truong+Chinh+Tan+Binh+TP+HCM',
  },
};

/* ── Story timeline ── */
export const STORY = [
  {
    year:    'Mùa Thu 2020',
    title:   'Lần Đầu Gặp Gỡ',
    content: 'Một buổi chiều thu tình cờ tại quán cà phê góc phố Sài Gòn, nơi hai tâm hồn đồng điệu tìm thấy nhau qua những câu chuyện say mê không dứt.',
    photo: {
      src:     'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=88&fm=webp',
      alt:     'Lần đầu gặp gỡ',
    },
  },
  {
    year:    'Mùa Hạ 2022',
    title:   'Chuyến Đi Của Kỷ Niệm',
    content: 'Cùng nhau đón bình minh trên đồi sương Đà Lạt, sẻ chia từng khoảnh khắc ngọt ngào và những ước mơ êm đềm về một mái ấm mai sau.',
    photo: {
      src:     'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=88&fm=webp',
      alt:     'Chuyến đi của kỷ niệm',
    },
  },
  {
    year:    'Mùa Đông 2024',
    title:   'Lời Hẹn Ước Trọn Đời',
    content: 'Dưới ánh hoàng hôn lộng lẫy bên bờ biển Phú Quốc, chiếc nhẫn nguyện ước được trao tay cùng cái gật đầu hạnh phúc nhất cuộc đời.',
    photo: {
      src:     'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=88&fm=webp',
      alt:     'Lời hẹn ước trọn đời',
    },
  },
  {
    year:    '20.10.2026',
    title:   'Ngày Chúng Mình Về Chung Một Nhà',
    content: 'Khép lại chặng đường hẹn hò để mở ra hành trình hôn nhân viên mãn, cùng nhau xây đắp tổ ấm trọn vẹn yêu thương.',
    photo: {
      src:     'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=88&fm=webp',
      alt:     'Ngày thành hôn',
    },
  },
];

/* ── Gallery photos ── */
export const GALLERY = [
  {
    id: 1,
    src:      'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=88&fm=webp',
    fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=75',
    alt:      'Ánh mắt đầu tiên trao nhau',
    title:    'Ánh mắt đầu tiên',
    category: 'romance',
    tall:     true,
  },
  {
    id: 2,
    src:      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&q=88&fm=webp',
    fallback: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&q=75',
    alt:      'Khoảnh khắc trang phục cưới truyền thống',
    title:    'Duyên nợ trăm năm',
    category: 'traditional',
    tall:     false,
  },
  {
    id: 3,
    src:      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=88&fm=webp',
    fallback: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=75',
    alt:      'Cái nắm tay hẹn ước',
    title:    'Nắm tay trọn đời',
    category: 'moments',
    tall:     false,
  },
  {
    id: 4,
    src:      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=88&fm=webp',
    fallback: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=75',
    alt:      'Tình yêu dịu dàng trong nắng sớm',
    title:    'Nắng mai hạnh phúc',
    category: 'traditional',
    tall:     true,
  },
  {
    id: 5,
    src:      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=88&fm=webp',
    fallback: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=75',
    alt:      'Nụ cười rạng rỡ của cô dâu',
    title:    'Nụ cười rạng ngời',
    category: 'moments',
    tall:     false,
  },
  {
    id: 6,
    src:      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=88&fm=webp',
    fallback: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=75',
    alt:      'Vũ điệu tình yêu trong hoàng hôn',
    title:    'Vũ điệu tình yêu',
    category: 'moments',
    tall:     false,
  },
  {
    id: 7,
    src:      'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=900&q=88&fm=webp',
    fallback: 'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=900&q=75',
    alt:      'Khoảnh khắc bình yên bên thềm cỏ',
    title:    'Bình yên bên anh',
    category: 'outdoor',
    tall:     true,
  },
  {
    id: 8,
    src:      'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=88&fm=webp',
    fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=75',
    alt:      'Khúc ca tình yêu vĩnh cửu',
    title:    'Mãi mãi thuộc về nhau',
    category: 'romance',
    tall:     false,
  },
];

/* ── Gifts / Bank accounts ── */
export const BANK_ACCOUNTS = [
  {
    id:            'groom',
    role:          'Chú Rể',
    name:          'TRẦN ĐẠI NGHĨA',
    bank:          'Vietcombank',
    bankShort:     'VCB',
    accountNumber: '1018899889',
    branch:        'Chi nhánh Tân Bình, TP. HCM',
    qrUrl:         'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=2|99|00020101021238540010A00000072701240006970436011010188998890208QRIBFTTA53037045802VN6304',
    qrFallback:    'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=MUNG_CUOI_CHU_RE_TRAN_DAI_NGHIA_1018899889',
  },
  {
    id:            'bride',
    role:          'Cô Dâu',
    name:          'TRỊNH THỊ NHUNG',
    bank:          'Techcombank',
    bankShort:     'TCB',
    accountNumber: '1903668866',
    branch:        'Chi nhánh Sài Gòn, TP. HCM',
    qrUrl:         'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=2|99|00020101021238540010A00000072701240006970407011019036688660208QRIBFTTA53037045802VN6304',
    qrFallback:    'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=MUNG_CUOI_CO_DAU_TRINH_THI_NHUNG_1903668866',
  },
];

/* ── Intro photo ── */
export const INTRO_PHOTO = {
  src:      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=88&fm=webp',
  fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
  alt:      'Đại Nghĩa & Trịnh Nhung',
};
