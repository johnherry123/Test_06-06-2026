/* ══════════════════════════════════════════════════════════════════════
   WEDDING DATA — Centralized configuration
   ──────────────────────────────────────────────────────────────────────
   All couple-specific data lives here.
   Replace placeholder values with real information before going live.
   Placeholders are clearly marked with ⚠️ PLACEHOLDER comments.
══════════════════════════════════════════════════════════════════════ */

/* ── Couple ── */
export const COUPLE = {
  groom: {
    firstName:   'Đại Nghĩa',
    fullName:    'Nguyễn Đại Nghĩa',
    role:        'Chú Rể',
    roleLabel:   'Trưởng Nam',
    // ⚠️ PLACEHOLDER — replace with real portrait photo
    photo: {
      src:      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=90&fm=webp',
      fallback: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=85',
      alt:      'Chú rể Nguyễn Đại Nghĩa — thay thế bằng ảnh thật',
    },
    // ⚠️ PLACEHOLDER — replace with real personal details
    details: [
      { label: 'Thích',           value: '[ Điền thông tin ]' },
      { label: 'Không thể thiếu', value: '[ Điền thông tin ]' },
      { label: 'Người kia yêu vì',value: '[ Điền thông tin ]' },
    ],
  },
  bride: {
    firstName:   'Thị Nhung',
    fullName:    'Lê Thị Nhung',
    role:        'Cô Dâu',
    roleLabel:   'Út Nữ',
    // ⚠️ PLACEHOLDER — replace with real portrait photo
    photo: {
      src:      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=90&fm=webp',
      fallback: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=85',
      alt:      'Cô dâu Lê Thị Nhung — thay thế bằng ảnh thật',
    },
    // ⚠️ PLACEHOLDER — replace with real personal details
    details: [
      { label: 'Thích',           value: '[ Điền thông tin ]' },
      { label: 'Không thể thiếu', value: '[ Điền thông tin ]' },
      { label: 'Người kia yêu vì',value: '[ Điền thông tin ]' },
    ],
  },
};

/* ── Wedding day ── */
export const WEDDING = {
  date:        '20.10.2026',
  dateISO:     '2026-10-20',
  dateDisplay: '20 tháng 10, 2026',
  venue:       'Gem Center',
  venueAddress:'8 Nguyễn Bỉnh Khiêm, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh',
  venueHall:   'Sảnh Castor, Tầng 5',
  receptionTime: '17:30',
  banquetTime:   '19:00',
  calendarTarget: '2026-10-20T17:30:00+07:00',
};

/* ── Family ──
   ⚠️ PLACEHOLDER — verify all names and addresses with the couple */
export const FAMILY = {
  groom: {
    father:  'Ông Nguyễn Văn Hùng',    // ⚠️ PLACEHOLDER
    mother:  'Bà Trần Thị Mai',         // ⚠️ PLACEHOLDER
    address: 'Tân Bình, TP. Hồ Chí Minh', // ⚠️ PLACEHOLDER
  },
  bride: {
    father:  'Ông Lê Văn Thành',        // ⚠️ PLACEHOLDER
    mother:  'Bà Phạm Thị Lan',         // ⚠️ PLACEHOLDER
    address: 'Quận 3, TP. Hồ Chí Minh', // ⚠️ PLACEHOLDER
  },
};

/* ── Events ── */
export const EVENTS = [
  {
    time:        '07:30',
    period:      'Sáng',
    title:       'Lễ Vu Quy',
    subtitle:    'Nghi thức xuất giá tại Tư gia Nhà Gái',
    description: 'Nghi lễ gia tiên trang trọng, dâng hương kính báo tổ tiên và trao gửi lời chúc phúc từ gia đình họ nhà gái.',
    locationName:'Tư Gia Nhà Gái',
    address:     '[ Địa chỉ nhà gái ]', // ⚠️ PLACEHOLDER
    mapUrl:      '#', // ⚠️ PLACEHOLDER — replace with real Google Maps URL
    isMain:      false,
  },
  {
    time:        '10:30',
    period:      'Sáng',
    title:       'Lễ Thành Hôn',
    subtitle:    'Nghi thức rước dâu tại Tư gia Nhà Trai',
    description: 'Khoảnh khắc đón cô dâu về dinh, làm lễ gia tiên báo hỷ và đón nhận lời chúc phúc ấm áp từ quan viên hai họ.',
    locationName:'Tư Gia Nhà Trai',
    address:     '[ Địa chỉ nhà trai ]', // ⚠️ PLACEHOLDER
    mapUrl:      '#', // ⚠️ PLACEHOLDER
    isMain:      false,
  },
  {
    time:        '17:30',
    period:      'Tối',
    title:       'Tiệc Cưới',
    subtitle:    'Đón Khách 17:30 · Khai Tiệc 19:00',
    description: 'Đêm tiệc thân mật — cùng nâng ly chúc mừng, thưởng thức ẩm thực tinh hoa và lưu giữ những khoảnh khắc đáng nhớ.',
    locationName:'Sảnh Castor (Tầng 5) · Gem Center',
    address:     '8 Nguyễn Bỉnh Khiêm, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh',
    mapUrl:      'https://maps.google.com/?q=Gem+Center+8+Nguyễn+Bỉnh+Khiêm+Quận+1+TP+HCM',
    isMain:      true,
  },
];

/* ── Story timeline ──
   ⚠️ ALL PLACEHOLDER — replace with real couple story entries */
export const STORY = [
  {
    year:    '[ Năm ]',
    title:   'Lần đầu gặp nhau',
    content: '[ Kể câu chuyện lần đầu gặp nhau ở đây. ]',
    // ⚠️ PLACEHOLDER photo — replace with real memory photo
    photo: {
      src:     'https://images.unsplash.com/photo-1529519195486-b5190a6dc77e?w=800&q=85&fm=webp',
      alt:     'Khoảnh khắc đầu tiên — ảnh minh họa',
    },
  },
  {
    year:    '[ Năm ]',
    title:   'Khoảnh khắc đặc biệt',
    content: '[ Một kỷ niệm đáng nhớ trong hành trình. ]',
    photo: {
      src:     'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=85&fm=webp',
      alt:     'Khoảnh khắc đặc biệt — ảnh minh họa',
    },
  },
  {
    year:    '[ Năm ]',
    title:   'Chuyến đi cùng nhau',
    content: '[ Chuyến hành trình đáng nhớ cùng nhau. ]',
    photo: {
      src:     'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=85&fm=webp',
      alt:     'Chuyến đi — ảnh minh họa',
    },
  },
  {
    year:    '[ Năm ]',
    title:   'Quyết định quan trọng',
    content: '[ Khoảnh khắc cầu hôn / quyết định bước vào cuộc sống hôn nhân. ]',
    photo: {
      src:     'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85&fm=webp',
      alt:     'Quyết định — ảnh minh họa',
    },
  },
  {
    year:    '20.10.2026',
    title:   'Ngày chúng mình về chung một nhà',
    content: 'Gem Center, TP. Hồ Chí Minh.',
    photo:   null, // Final entry — no photo, use closing typography
  },
];

/* ── Gallery photos ──
   ⚠️ ALL PLACEHOLDER — replace with real couple editorial photos
   Recommended: 3:4 portrait or 4:3 landscape, editorial/cinematic style */
export const GALLERY = [
  {
    id: 1,
    src:      'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=88&fm=webp',
    fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=75',
    alt:      '[ Mô tả ảnh 1 ]',
    title:    '[ Tiêu đề 1 ]',
    category: 'romance',
    tall:     true,
  },
  {
    id: 2,
    src:      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&q=88&fm=webp',
    fallback: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&q=75',
    alt:      '[ Mô tả ảnh 2 ]',
    title:    '[ Tiêu đề 2 ]',
    category: 'traditional',
    tall:     false,
  },
  {
    id: 3,
    src:      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=88&fm=webp',
    fallback: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=75',
    alt:      '[ Mô tả ảnh 3 ]',
    title:    '[ Tiêu đề 3 ]',
    category: 'moments',
    tall:     false,
  },
  {
    id: 4,
    src:      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=88&fm=webp',
    fallback: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=75',
    alt:      '[ Mô tả ảnh 4 ]',
    title:    '[ Tiêu đề 4 ]',
    category: 'traditional',
    tall:     true,
  },
  {
    id: 5,
    src:      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=88&fm=webp',
    fallback: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=75',
    alt:      '[ Mô tả ảnh 5 ]',
    title:    '[ Tiêu đề 5 ]',
    category: 'moments',
    tall:     false,
  },
  {
    id: 6,
    src:      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=88&fm=webp',
    fallback: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=75',
    alt:      '[ Mô tả ảnh 6 ]',
    title:    '[ Tiêu đề 6 ]',
    category: 'moments',
    tall:     false,
  },
  {
    id: 7,
    src:      'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=900&q=88&fm=webp',
    fallback: 'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=900&q=75',
    alt:      '[ Mô tả ảnh 7 ]',
    title:    '[ Tiêu đề 7 ]',
    category: 'outdoor',
    tall:     true,
  },
  {
    id: 8,
    src:      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=88&fm=webp',
    fallback: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=75',
    alt:      '[ Mô tả ảnh 8 ]',
    title:    '[ Tiêu đề 8 ]',
    category: 'romance',
    tall:     false,
  },
];

/* ── Gifts / Bank accounts ──
   ⚠️ ALL PLACEHOLDER — replace with real bank account information */
export const BANK_ACCOUNTS = [
  {
    id:            'groom',
    role:          'Chú Rể',
    name:          'NGUYỄN ĐẠI NGHĨA',
    bank:          'Vietcombank',        // ⚠️ PLACEHOLDER
    bankShort:     'VCB',               // ⚠️ PLACEHOLDER
    accountNumber: '[ Số tài khoản ]',  // ⚠️ PLACEHOLDER
    branch:        '[ Chi nhánh ]',     // ⚠️ PLACEHOLDER
    // ⚠️ PLACEHOLDER QR — generate real QR from vietqr.io with actual account
    qrUrl:      'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PLACEHOLDER-GROOM',
    qrFallback: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PLACEHOLDER-GROOM',
  },
  {
    id:            'bride',
    role:          'Cô Dâu',
    name:          'LÊ THỊ NHUNG',
    bank:          'Techcombank',        // ⚠️ PLACEHOLDER
    bankShort:     'TCB',               // ⚠️ PLACEHOLDER
    accountNumber: '[ Số tài khoản ]',  // ⚠️ PLACEHOLDER
    branch:        '[ Chi nhánh ]',     // ⚠️ PLACEHOLDER
    // ⚠️ PLACEHOLDER QR
    qrUrl:      'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PLACEHOLDER-BRIDE',
    qrFallback: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PLACEHOLDER-BRIDE',
  },
];

/* ── Intro photo ──
   ⚠️ PLACEHOLDER — replace with real couple photo.
   Recommended: 3:2 landscape, editorial/cinematic, warm tones */
export const INTRO_PHOTO = {
  src:      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=88&fm=webp',
  fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
  alt:      'Đại Nghĩa & Thị Nhung — ảnh minh họa, thay thế bằng ảnh thật',
};
