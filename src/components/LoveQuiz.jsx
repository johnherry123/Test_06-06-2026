import { useState } from 'react';
import { Sparkles, Heart, CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react';
import { COUPLE } from '../weddingData';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Đại Nghĩa và Trịnh Nhung đã lần đầu chạm ánh mắt nhau ở đâu?',
    options: [
      { id: 'a', text: 'Quán cà phê góc phố Sài Gòn vào một chiều thu', isCorrect: true },
      { id: 'b', text: 'Giảng đường đại học trong một buổi hội thảo', isCorrect: false },
      { id: 'c', text: 'Sân bay Tân Sơn Nhất khi chờ chuyến bay', isCorrect: false },
      { id: 'd', text: 'Buổi hòa nhạc acoustic ngoài trời', isCorrect: false },
    ],
    funFact: 'Hôm ấy chú rể đã giả vờ mượn sách để làm quen với cô dâu đấy!',
  },
  {
    id: 2,
    question: 'Màn cầu hôn trong mơ ‘She Said YES!’ đã diễn ra tại đâu?',
    options: [
      { id: 'a', text: 'Đỉnh đồi săn mây thơ mộng ở Đà Lạt', isCorrect: false },
      { id: 'b', text: 'Phố cổ Hội An lung linh đèn lồng', isCorrect: false },
      { id: 'c', text: 'Hoàng hôn rực rỡ bên bờ biển Phú Quốc', isCorrect: true },
      { id: 'd', text: 'Nhà hàng rooftop ngắm trọn vẹn Landmark 81', isCorrect: false },
    ],
    funFact: 'Chiếc nhẫn đã được chú rể khéo léo giấu trong một vỏ ốc xinh xắn suốt cả buổi chiều.',
  },
  {
    id: 3,
    question: 'Món ăn ruột mà chú rể Đại Nghĩa thường vào bếp nấu cho cô dâu?',
    options: [
      { id: 'a', text: 'Cơm tấm sườn bì chả góc phố', isCorrect: false },
      { id: 'b', text: 'Bò bít tết sốt tiêu đen & mì Ý pasta chuẩn vị', isCorrect: true },
      { id: 'c', text: 'Bún bò Huế cay nồng', isCorrect: false },
      { id: 'd', text: 'Cháo sườn nóng hổi ngày mưa', isCorrect: false },
    ],
    funFact: 'Cô dâu Nhung từng tiết lộ chính tài nghệ nấu bít tết đỉnh cao của anh đã cưa đổ trái tim cô!',
  },
];

export default function LoveQuiz() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId, optionId) => {
    if (showResults) return;
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);

    if (Object.keys(newAnswers).length === QUIZ_QUESTIONS.length) {
      setTimeout(() => setShowResults(true), 400);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      const selected = answers[q.id];
      const correctOption = q.options.find((o) => o.isCorrect);
      if (selected === correctOption?.id) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();

  return (
    <section
      id="quiz"
      aria-label="Mini Quiz trắc nghiệm vui về cô dâu chú rể"
      style={{
        backgroundColor: '#FAF7F2',
        background: 'linear-gradient(180deg, #F5EDE0 0%, #FAF7F2 50%, #F5EDE0 100%)',
        padding: 'clamp(60px, 9vw, 100px) clamp(16px, 4vw, 36px)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '820px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 48px)' }}>
          <div
            className="gsap-reveal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '999px',
              background: 'rgba(128, 29, 36, 0.08)',
              border: '1px solid rgba(197, 160, 89, 0.35)',
              color: '#801D24',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            <Sparkles size={13} color="#C5A059" />
            Mini Quiz Tình Yêu · Love Trivia
          </div>

          <h2
            className="gsap-reveal"
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: 'clamp(2.4rem, 6.5vw, 4.4rem)',
              color: '#801D24',
              lineHeight: 1.15,
              margin: '0 0 8px 0',
              fontWeight: 400,
              wordBreak: 'break-word',
            }}
          >
            Bạn Hiểu Đôi Uyên Ương Đến Đâu?
          </h2>

          <p
            className="gsap-reveal"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.05rem, 2.3vw, 1.3rem)',
              fontStyle: 'italic',
              color: '#584A42',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            “3 câu hỏi thú vị bật mí những bí mật ngọt ngào về hành trình 6 năm của Đại Nghĩa &amp; Trịnh Nhung!”
          </p>
        </div>

        {/* ── QUIZ QUESTIONS CONTAINER ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {QUIZ_QUESTIONS.map((q, qIndex) => {
            const selectedOptionId = answers[q.id];
            const isAnswered = Boolean(selectedOptionId);

            return (
              <div
                key={q.id}
                className="gsap-reveal"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1.5px solid rgba(197, 160, 89, 0.4)',
                  padding: 'clamp(20px, 4vw, 32px)',
                  boxShadow: '0 10px 30px -6px rgba(50, 30, 15, 0.08)',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#801D24',
                      color: '#FFF2D4',
                      fontFamily: "'Cinzel', serif",
                      fontSize: '0.80rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    0{qIndex + 1}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
                      fontWeight: 700,
                      color: '#1E1612',
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {q.question}
                  </h3>
                </div>

                {/* Options List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {q.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    let bg = '#FAF7F2';
                    let border = '1px solid rgba(197, 160, 89, 0.3)';
                    let textColor = '#42332A';

                    if (showResults) {
                      if (opt.isCorrect) {
                        bg = 'rgba(46, 125, 50, 0.10)';
                        border = '1.5px solid #2E7D32';
                        textColor = '#1B5E20';
                      } else if (isSelected && !opt.isCorrect) {
                        bg = 'rgba(198, 40, 40, 0.10)';
                        border = '1.5px solid #C62828';
                        textColor = '#B71C1C';
                      }
                    } else if (isSelected) {
                      bg = 'rgba(128, 29, 36, 0.10)';
                      border = '1.5px solid #801D24';
                      textColor = '#801D24';
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        disabled={showResults}
                        style={{
                          backgroundColor: bg,
                          border: border,
                          borderRadius: '12px',
                          padding: '12px 16px',
                          textAlign: 'left',
                          fontFamily: "'Be Vietnam Pro', sans-serif",
                          fontSize: 'clamp(0.80rem, 1.8vw, 0.88rem)',
                          color: textColor,
                          fontWeight: isSelected || (showResults && opt.isCorrect) ? 700 : 500,
                          cursor: showResults ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '10px',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span>{opt.text}</span>
                        {showResults && opt.isCorrect && <CheckCircle size={18} color="#2E7D32" />}
                        {showResults && isSelected && !opt.isCorrect && <XCircle size={18} color="#C62828" />}
                      </button>
                    );
                  })}
                </div>

                {/* Fun Fact Reveal */}
                {showResults && (
                  <div
                    style={{
                      marginTop: '14px',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(197, 160, 89, 0.12)',
                      borderLeft: '3px solid #C5A059',
                      fontSize: '0.78rem',
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      color: '#584A42',
                      lineHeight: 1.5,
                    }}
                  >
                    <strong style={{ color: '#801D24' }}>💡 Bật mí: </strong>
                    {q.funFact}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── RESULTS & BADGE CARD ── */}
        {showResults && (
          <div
            className="gsap-reveal"
            style={{
              marginTop: '32px',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '2px solid #C5A059',
              boxShadow: '0 20px 50px -10px rgba(50, 30, 15, 0.16)',
              padding: 'clamp(28px, 5vw, 44px)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(197, 160, 89, 0.2)',
                color: '#801D24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                border: '2px solid #C5A059',
              }}
            >
              <Award size={32} />
            </div>

            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '0.74rem',
                color: '#9A7836',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              Kết Quả Trắc Nghiệm: {score}/3 Câu Đúng
            </span>

            <h3
              style={{
                fontFamily: "'Alex Brush', cursive",
                fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)',
                color: '#801D24',
                margin: '8px 0 10px 0',
                fontWeight: 400,
              }}
            >
              {score === 3
                ? 'Danh Hiệu: Bạn Tri Kỷ Kim Cương 💎'
                : score === 2
                ? 'Danh Hiệu: Người Thân Thiết Ấm Áp 💖'
                : 'Danh Hiệu: Khách Quý Đáng Yêu 🌸'}
            </h3>

            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.1rem',
                fontStyle: 'italic',
                color: '#584A42',
                maxWidth: '480px',
                margin: '0 auto 20px',
                lineHeight: 1.6,
              }}
            >
              {score === 3
                ? 'Tuyệt vời! Bạn là người theo dõi và thấu hiểu từng bước đi trong tình yêu của Nghĩa & Nhung!'
                : 'Cảm ơn tình cảm chân thành của bạn. Hãy đến chung vui tại Gem Center để khám phá thêm nhiều điều bất ngờ nhé!'}
            </p>

            <button
              type="button"
              onClick={handleReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '999px',
                backgroundColor: '#801D24',
                color: '#FFF2D4',
                border: 'none',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: '0.80rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(128, 29, 36, 0.3)',
              }}
            >
              <RotateCcw size={14} />
              <span>Thử Thách Lại</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
