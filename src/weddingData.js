/* ══════════════════════════════════════════════════════════════════════
   WEDDING DATA — Centralized configuration
   Luxury Editorial Wedding Configuration
══════════════════════════════════════════════════════════════════════ */

/* ── Couple ── */
export const COUPLE = {
  groom: {
    firstName:   'Đại Nghĩa',
    fullName:    'Nguyễn Đại Nghĩa',
    role:        'Chú Rể',
    roleLabel:   'Trưởng Nam',
    title:       'Kỹ sư Phần mềm',
    quote:       '"Từ khoảnh khắc đầu tiên thấy em cười, anh đã biết trái tim mình đã tìm được nơi thuộc về trọn đời."',
    photo: {
      src:      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=90&fm=webp',
      fallback: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=85',
      alt:      'Chú rể Nguyễn Đại Nghĩa',
    },
    details: [
      { label: 'Sở thích',        value: 'Nhiếp ảnh, Du lịch & Cà phê sáng' },
      { label: 'Tính cách',       value: 'Điềm đạm, chu đáo và chân thành' },
      { label: 'Yêu nhất ở cô dâu', value: 'Nụ cười tỏa nắng và sự thấu hiểu' },
    ],
  },
  bride: {
    firstName:   'Thị Nhung',
    fullName:    'Lê Thị Nhung',
    role:        'Cô Dâu',
    roleLabel:   'Út Nữ',
    title:       'Nhà Thiết Kế Thời Trang',
    quote:       '"Hạnh phúc không phải là tìm được một người hoàn hảo, mà là tìm thấy một người cùng ta hoàn thiện tình yêu."',
    photo: {
      src:      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=90&fm=webp',
      fallback: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=85',
      alt:      'Cô dâu Lê Thị Nhung',
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
  venue:       'Trung Tâm Sự Kiện Gem Center',
  venueAddress:'8 Nguyễn Bỉnh Khiêm, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh',
  venueHall:   'Grand Ballroom Castor · Tầng 5',
  receptionTime: '17:30',
  banquetTime:   '19:00',
  calendarTarget: '2026-10-20T17:30:00+07:00',
};

/* ── Family ── */
export const FAMILY = {
  groom: {
    father:  'Ông Nguyễn Văn Hùng',
    mother:  'Bà Trần Thị Mai',
    address: '48 Trường Chinh, Phường 14, Tân Bình, TP. HCM',
  },
  bride: {
    father:  'Ông Lê Văn Thành',
    mother:  'Bà Phạm Thị Lan',
    address: '125 Nam Kỳ Khởi Nghĩa, Võ Thị Sáu, Quận 3, TP. HCM',
  },
};

/* ── Events ── */
export const EVENTS = [
  {
    id:          'vu-quy',
    time:        '07:30',
    period:      'Sáng',
    title:       'Lễ Vu Quy',
    subtitle:    'Nghi thức xuất giá tại Tư Gia Nhà Gái',
    description: 'Nghi lễ gia tiên truyền thống trang trọng, dâng hương kính báo tổ tiên và đón nhận lời chúc phúc thiêng liêng từ gia đình họ nhà gái.',
    locationName:'Tư Gia Nhà Gái',
    address:     '125 Nam Kỳ Khởi Nghĩa, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh',
    mapUrl:      'https://maps.google.com/?q=125+Nam+Ky+Khoi+Nghia+Quan+3+TP+HCM',
    isMain:      false,
  },
  {
    id:          'thanh-hon',
    time:        '10:30',
    period:      'Sáng',
    title:       'Lễ Thành Hôn',
    subtitle:    'Nghi thức đón dâu tại Tư Gia Nhà Trai',
    description: 'Thời khắc đón cô dâu về dinh, cử hành lễ gia tiên báo hỷ và ra mắt quan viên hai họ trong niềm hân hoan chúc phúc.',
    locationName:'Tư Gia Nhà Trai',
    address:     '48 Trường Chinh, Phường 14, Quận Tân Bình, TP. Hồ Chí Minh',
    mapUrl:      'https://maps.google.com/?q=48+Truong+Chinh+Tan+Binh+TP+HCM',
    isMain:      false,
  },
  {
    id:          'tiec-cuoi',
    time:        '17:30',
    period:      'Tối',
    title:       'Tiệc Cưới & Mừng Hạnh Phúc',
    subtitle:    'Đón Khách: 17:30 · Khai Tiệc: 19:00',
    description: 'Đêm tiệc thân mật — cùng nâng ly chúc mừng, hòa mình vào không gian âm nhạc lãng mạn, thưởng thức ẩm thực tinh hoa và lưu lại những khoảnh khắc đáng nhớ nhất.',
    locationName:'Sảnh Castor (Tầng 5) · Gem Center',
    address:     '8 Nguyễn Bỉnh Khiêm, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh',
    mapUrl:      'https://maps.google.com/?q=Gem+Center+8+Nguyễn+Bỉnh+Khiêm+Quận+1+TP+HCM',
    isMain:      true,
  },
];

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
    name:          'NGUYỄN ĐẠI NGHĨA',
    bank:          'Vietcombank',
    bankShort:     'VCB',
    accountNumber: '1018899889',
    branch:        'Chi nhánh Tân Bình, TP. HCM',
    qrUrl:         'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=2|99|00020101021238540010A00000072701240006970436011010188998890208QRIBFTTA53037045802VN6304',
    qrFallback:    'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=MUNG_CUOI_CHU_RE_NGUYEN_DAI_NGHIA_1018899889',
  },
  {
    id:            'bride',
    role:          'Cô Dâu',
    name:          'LÊ THỊ NHUNG',
    bank:          'Techcombank',
    bankShort:     'TCB',
    accountNumber: '1903668866',
    branch:        'Chi nhánh Sài Gòn, TP. HCM',
    qrUrl:         'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=2|99|00020101021238540010A00000072701240006970407011019036688660208QRIBFTTA53037045802VN6304',
    qrFallback:    'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=MUNG_CUOI_CO_DAU_LE_THI_NHUNG_1903668866',
  },
];

/* ── Intro photo ── */
export const INTRO_PHOTO = {
  src:      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=88&fm=webp',
  fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
  alt:      'Đại Nghĩa & Thị Nhung',
};
