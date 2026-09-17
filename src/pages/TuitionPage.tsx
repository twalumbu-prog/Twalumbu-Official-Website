import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, CheckCircle, ArrowRight, GraduationCap, Target, Award, Smartphone, Zap } from 'lucide-react';
import SEO from '../components/common/SEO';
import logoImg from '../assets/images/logo.png';

const pillars = [
  {
    icon: <GraduationCap size={24} />,
    title: 'Expert Tutors',
    desc: 'Subject specialists selected on track record — not just any available teacher.',
  },
  {
    icon: <Target size={24} />,
    title: 'Structured Past-Paper Drilling',
    desc: 'Past papers, mock exams and a syllabus-mapped revision programme, so every session drills exactly what the ECZ exam will ask.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Project Genius — AI Coach',
    desc: 'Our AI-guided companion assesses each learner, builds an adaptive study plan, and keeps them moving between sessions with flashcards, daily to-dos and real-time feedback.',
  },
];

const whyPoints = [
  {
    icon: <Users size={22} />,
    title: 'Small Class Sizes',
    desc: 'Capped at 25 learners per class so every child gets the attention and remediation that a full school day can\'t provide.',
  },
  {
    icon: <BookOpen size={22} />,
    title: 'ECZ-Mapped Materials',
    desc: 'Every lesson is mapped to the ECZ syllabus for Grade 9 and Grade 12. No filler — only what the examiners will test.',
  },
  {
    icon: <Award size={22} />,
    title: 'Decades of Quality Education in Chongwe',
    desc: 'Backed by Twalumbu Education Centre\'s qualified, experienced teaching staff — the same proven standard families in Chongwe have trusted for years, now available after hours.',
  },
];

const packages = [
  { subjects: 1, label: '1 Subject', price: 'K700', tag: null },
  { subjects: 2, label: '2 Subjects', price: 'K1,295', tag: 'Popular' },
  { subjects: 3, label: '3 Subjects', price: 'K1,780', tag: null },
  { subjects: 4, label: '4 Subjects', price: 'K2,265', tag: 'Best Value' },
];

const GoldUnderline = () => (
  <div style={{ marginTop: '-5px' }}>
    <svg width="120" height="8" viewBox="0 0 120 8" fill="none">
      <path d="M2 5.5C30 2 90 2 118 5.5" stroke="#F0AC00" strokeWidth="4" strokeLinecap="round" />
    </svg>
  </div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const TuitionPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Extra Lessons & Tuition | Twalumbu Education Centre"
        description="Expert Grade 9 & Grade 12 tuition in Chongwe District. Past-paper drilling, qualified tutors, and Project Genius AI coaching — because a pass is not enough."
        keywords="Grade 9 tuition Zambia, Grade 12 extra lessons Chongwe, GCE revision Zambia, ECZ tuition Lusaka, Twalumbu extra lessons, Project Genius Zambia"
      />

      {/* ── HERO ── */}
      <section className="tp-hero">
        <motion.div
          className="tp-hero-bg-svg"
          initial={{ opacity: 0.3 }}
          animate={{ x: [-5, 5, -5], y: [-2, 4, -2] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <svg width="100%" height="572" viewBox="0 0 1280 572" fill="none" preserveAspectRatio="none">
            <path d="M-13 200.416L89.0185 152.896C153.25 124.58 281.941 126.384 297.203 200.416C316.279 292.956 308.815 467.532 116.389 515.053C-37.5508 553.069 42.8649 375.492 116.389 294.957C167.537 238.933 312.962 111.277 485.481 48.8503C632.16 -4.22667 672.117 38.2542 675.188 78.4049C676.227 91.9904 670.143 104.806 662.923 116.361C633.847 162.902 585.191 237.972 560.129 266.445C524.464 306.962 492.946 365.988 583.352 375.492C655.678 383.096 740.225 348.257 779.836 308.726L932.538 164.901C1013.91 88.0505 1189.68 48.8503 1152.55 200.416C1109.95 374.295 918.423 412.635 995.574 515.053C1072.72 617.471 1243.85 457.528 1329 356.484" stroke="#9F691F" strokeOpacity="0.1" strokeWidth="48" />
          </svg>
        </motion.div>

        <div className="tp-hero-content">
          <motion.div
            className="tp-hero-star"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <path d="M27.955 0.0835148C29.5659 -0.30313 31.1853 0.689543 31.5722 2.30031C32.5525 6.3835 33.842 12.6594 35.0009 19.9722C39.1496 15.2058 43.5025 10.6999 47.8378 6.96242C49.0927 5.88068 50.9875 6.02105 52.0693 7.2759C53.1511 8.53081 53.0107 10.4255 51.7558 11.5073C46.5097 16.0299 41.193 21.7922 36.2587 27.772C44.9417 29.4822 53.8035 31.7553 61.3007 34.7085C62.8422 35.3158 63.6002 37.0577 62.9931 38.5991C62.3859 40.1406 60.643 40.8987 59.1015 40.2915C52.4745 37.6811 44.6527 35.6138 36.8486 34.0103C37.7958 43.1898 38.2384 52.8072 37.5371 61.2085C37.3992 62.8594 35.9487 64.0864 34.2978 63.9487C32.6469 63.8109 31.4199 62.3604 31.5576 60.7095C32.2257 52.7062 31.7939 43.4465 30.874 34.563C24.3384 43.1227 18.9309 51.3451 15.9765 56.2691C15.1239 57.6893 13.2808 58.1507 11.8603 57.2984C10.44 56.4459 9.97999 54.6027 10.832 53.1821C13.7145 48.378 18.9364 40.4016 25.3261 31.9468C16.1451 30.5246 7.90134 29.7415 2.83199 29.4556C1.17785 29.3622 -0.088441 27.9447 0.00484001 26.2905C0.0984313 24.6366 1.51586 23.3721 3.16988 23.4654C8.90829 23.789 18.7468 24.7361 29.5234 26.5445C29.632 26.4088 29.7415 26.2738 29.8505 26.1382C28.5662 16.8632 26.9312 8.66941 25.7382 3.7007C25.3519 2.08991 26.3443 0.470337 27.955 0.0835148Z" fill="#F0AC00" />
            </svg>
          </motion.div>

          <motion.img
            src={logoImg}
            alt="Twalumbu Education Centre"
            className="tp-hero-logo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          />

          <motion.div
            className="tp-hero-kicker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Extra Lessons SBU — featuring Project Genius
          </motion.div>

          <motion.h1
            className="tp-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Grade 9 & Grade 12
            <br />
            <span className="tp-gold">Expert Tuition</span>
          </motion.h1>

          <motion.p
            className="tp-hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            A pass is not enough. Our goal is <strong>exceptional, measurable results</strong> — combining Twalumbu's qualified teaching staff, structured past-paper drilling, and Project Genius AI coaching.
          </motion.p>

          <motion.div
            className="tp-hero-pills"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <span className="tp-hero-pill">📍 Chongwe District</span>
            <span className="tp-hero-pill">🇿🇲 Online Nationally</span>
            <span className="tp-hero-pill">Grade 9 &amp; Grade 12</span>
          </motion.div>

          <motion.div
            className="tp-hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            <Link to="/tuition/apply" className="tp-btn-filled">
              Register Now <ArrowRight size={17} />
            </Link>
            <a href="#tp-pricing" className="tp-btn-outline">
              See Fees
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="tp-section tp-grey">
        <div className="tp-container">
          <div className="tp-problem-layout">
            <motion.div
              className="tp-problem-text"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="tp-section-tag">Why This Matters</span>
              <h2 className="tp-section-title" style={{ textAlign: 'left' }}>
                Every year, thousands of Zambian learners sit their exams without the preparation they need.
              </h2>
              <GoldUnderline />
              <p className="tp-problem-desc">
                In 2025, over <strong>54,000 Grade 12 candidates</strong> received only a statement of results — not a full certificate. Combined with Grade 9 non-passes, roughly <strong>117,000 learners</strong> left that sitting without a full pass.
              </p>
              <p className="tp-problem-desc">
                This happens because class sizes leave no room for one-to-one remediation, good tutors are informally rationed to well-connected families, and learners have no structured way to know what to study next.
              </p>
              <p className="tp-problem-desc" style={{ fontWeight: 600, color: '#2A1409' }}>
                We built the Extra Lessons programme to change that — for Chongwe District families first, and nationally through Project Genius.
              </p>
            </motion.div>

            <motion.div
              className="tp-stats-stack"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="tp-stat-card">
                <span className="tp-stat-num">54,771</span>
                <span className="tp-stat-label">Grade 12 candidates — statement of results only (2025)</span>
              </div>
              <div className="tp-stat-card">
                <span className="tp-stat-num">≈4,565</span>
                <span className="tp-stat-label">Grade 9 candidates estimated in Chongwe District</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ── */}
      <section className="tp-section tp-white">
        <div className="tp-container">
          <motion.div
            className="tp-section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="tp-section-tag">Our Approach</span>
            <h2 className="tp-section-title">Three pillars. One goal: exceptional results.</h2>
            <GoldUnderline />
            <p className="tp-section-sub">We don't just provide contact hours. We provide a structured, technology-enabled pathway to outstanding academic results.</p>
          </motion.div>

          <div className="tp-pillars-grid">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                className="tp-pillar-card"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="tp-pillar-num">{`0${i + 1}`}</div>
                <div className="tp-card-icon">{p.icon}</div>
                <h3 className="tp-card-title">{p.title}</h3>
                <p className="tp-card-desc">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="tp-section tp-grey">
        <div className="tp-container">
          <motion.div
            className="tp-section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="tp-section-tag">Our Competitive Edge</span>
            <h2 className="tp-section-title">Why families choose us</h2>
            <GoldUnderline />
          </motion.div>

          <div className="tp-grid-4">
            {whyPoints.map((point, i) => (
              <motion.div
                key={i}
                className="tp-card"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="tp-card-icon">{point.icon}</div>
                <h3 className="tp-card-title">{point.title}</h3>
                <p className="tp-card-desc">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="tp-section tp-white" id="tp-pricing">
        <div className="tp-container">
          <motion.div
            className="tp-section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="tp-section-tag">Fees & Packages</span>
            <h2 className="tp-section-title">Transparent, all-in pricing</h2>
            <GoldUnderline />
            <p className="tp-section-sub">Every package is priced at fully-absorbed cost plus a flat 25% margin. The same fair markup whether you take one subject or four.</p>
          </motion.div>

          {/* In-person packages */}
          <motion.div
            className="tp-pricing-label"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="tp-pricing-type-badge">In-Person · Chongwe District · Per Term</span>
          </motion.div>

          <div className="tp-packages-grid">
            {packages.map((pkg, i) => (
              <motion.div
                key={i}
                className={`tp-package-card ${pkg.tag === 'Best Value' ? 'tp-package-featured' : ''}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                {pkg.tag && <div className="tp-package-tag">{pkg.tag}</div>}
                <div className="tp-package-subjects">{pkg.subjects} {pkg.subjects === 1 ? 'Subject' : 'Subjects'}</div>
                <div className="tp-package-price">{pkg.price}<span className="tp-price-period"> / term</span></div>
                <div className="tp-package-note">Grade 9 or Grade 12</div>
                <Link to="/tuition/apply" className={`tp-package-cta ${pkg.tag === 'Best Value' ? 'tp-package-cta-featured' : ''}`}>
                  Register <ArrowRight size={15} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Project Genius online */}
          <motion.div
            className="tp-genius-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="tp-genius-left">
              <div className="tp-genius-icon"><Smartphone size={28} /></div>
              <div>
                <div className="tp-genius-kicker">Online · Nationwide · Project Genius</div>
                <h3 className="tp-genius-title">Can't attend in person? Join online.</h3>
                <p className="tp-genius-desc">
                  Project Genius extends the same expert tuition nationally through live-streamed classes, an AI adaptive study plan, flashcards, daily to-dos, quizzes and real-time feedback — available to any Grade 9 or Grade 12 learner in Zambia with a smartphone.
                </p>
              </div>
            </div>
            <div className="tp-genius-right">
              <div className="tp-genius-price-block">
                <span className="tp-genius-price">~K250</span>
                <span className="tp-genius-price-period">per month</span>
                <span className="tp-genius-price-note">Live classes + full Genius App access</span>
              </div>
              <Link to="/tuition/apply" className="tp-btn-filled">
                Register Online <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          <motion.p
            className="tp-pricing-footnote"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Fees include all learning materials. A multi-subject discount is built into the package prices above — the more subjects, the lower the per-subject cost. TEC pupils receive preferential rates. Contact us for the current term dates.
          </motion.p>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="tp-cta-banner">
        <div className="tp-container">
          <motion.div
            className="tp-cta-inner"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="tp-section-tag" style={{ color: '#F0AC00' }}>Spaces Are Limited</span>
            <h2 className="tp-cta-title">Ready to give your child an exceptional result?</h2>
            <p className="tp-cta-sub">
              Register now to secure a spot in the next intake. We pre-sell before contracting teachers, so early registration directly shapes the programme.
            </p>
            <Link to="/tuition/apply" className="tp-btn-outline-light">
              Register for Extra Lessons <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        /* ─── Layout ─────────────────────── */
        .tp-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .tp-section { padding: 100px 0; }
        .tp-white   { background: #ffffff; }
        .tp-grey    { background: #f8f9fa; }

        /* ─── Hero ───────────────────────── */
        .tp-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          position: relative;
          overflow: hidden;
          padding: 120px 24px 80px;
        }

        .tp-hero-bg-svg {
          position: absolute;
          left: 0;
          width: 100%;
          top: 120px;
          pointer-events: none;
          opacity: 0.6;
          z-index: 1;
        }

        .tp-hero-content {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tp-hero-star {
          position: absolute;
          right: 30px;
          top: -30px;
          z-index: 11;
        }

        .tp-hero-logo {
          height: 64px;
          width: auto;
          margin-bottom: 24px;
        }

        .tp-hero-kicker {
          font-size: 0.78rem;
          font-weight: 700;
          color: #9F691F;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 16px;
        }

        .tp-hero-title {
          font-size: clamp(2.8rem, 7vw, 4.5rem);
          font-weight: 800;
          color: #1C1917;
          line-height: 1.1;
          margin-bottom: 24px;
          font-family: 'Instrument Sans', sans-serif;
        }

        .tp-gold { color: #9F691F; }

        .tp-hero-sub {
          font-size: 1.1rem;
          color: #57534e;
          margin-bottom: 24px;
          line-height: 1.7;
          max-width: 640px;
        }

        .tp-hero-pills {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 32px;
        }

        .tp-hero-pill {
          padding: 6px 14px;
          background: rgba(240,172,0,0.08);
          border: 1px solid rgba(240,172,0,0.25);
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #9F691F;
        }

        .tp-hero-ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* ─── Buttons ────────────────────── */
        .tp-btn-filled {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: #1C1917;
          color: white;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          font-family: 'Instrument Sans', sans-serif;
          transition: all 0.2s ease;
          border: 1px solid #1C1917;
        }

        .tp-btn-filled:hover {
          background: #2A1409;
          border-color: #2A1409;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(28,25,23,0.2);
          color: white;
        }

        .tp-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border: 1px solid #1C1917;
          background: white;
          color: #1C1917;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          font-family: 'Instrument Sans', sans-serif;
          transition: all 0.2s ease;
        }

        .tp-btn-outline:hover {
          background: #1C1917;
          color: white;
        }

        .tp-btn-outline-light {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          border: 1.5px solid white;
          background: transparent;
          color: white;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          font-family: 'Instrument Sans', sans-serif;
          transition: all 0.2s ease;
        }

        .tp-btn-outline-light:hover {
          background: white;
          color: #2A1409;
        }

        /* ─── Section header ─────────────── */
        .tp-section-header {
          text-align: center;
          margin-bottom: 56px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .tp-section-tag {
          color: #9F691F;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 13px;
        }

        .tp-section-title {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800;
          color: #422006;
          margin: 0;
          font-family: 'Instrument Sans', sans-serif;
          line-height: 1.2;
        }

        .tp-section-sub {
          color: #57534e;
          font-size: 1rem;
          max-width: 600px;
          line-height: 1.7;
          margin-top: 8px;
        }

        /* ─── Problem section ────────────── */
        .tp-problem-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        .tp-problem-text {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .tp-problem-text .tp-section-title {
          text-align: left;
          font-size: clamp(1.5rem, 3vw, 2rem);
          margin-bottom: 8px;
        }

        .tp-problem-desc {
          color: #57534e;
          font-size: 0.97rem;
          line-height: 1.75;
          margin-top: 12px;
        }

        .tp-stats-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .tp-stat-card {
          background: white;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 14px;
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }

        .tp-stat-num {
          font-size: 2rem;
          font-weight: 800;
          color: #2A1409;
          font-family: 'Instrument Sans', sans-serif;
          line-height: 1;
        }

        .tp-stat-label {
          font-size: 0.85rem;
          color: #57534e;
          line-height: 1.4;
        }

        /* ─── Pillars ────────────────────── */
        .tp-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .tp-pillar-card {
          background: #f8f9fa;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 16px;
          padding: 36px 28px;
          position: relative;
          transition: all 0.2s ease;
        }

        .tp-pillar-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          transform: translateY(-3px);
        }

        .tp-pillar-num {
          font-size: 3rem;
          font-weight: 800;
          color: rgba(240,172,0,0.15);
          font-family: 'Instrument Sans', sans-serif;
          line-height: 1;
          margin-bottom: 16px;
        }

        /* ─── Feature cards ──────────────── */
        .tp-grid-4 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 24px;
        }

        .tp-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 16px;
          padding: 32px 28px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          transition: all 0.2s ease;
        }

        .tp-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.09);
          transform: translateY(-3px);
        }

        .tp-card-icon {
          width: 48px;
          height: 48px;
          background: rgba(240,172,0,0.1);
          color: #9F691F;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          border: 1px solid rgba(240,172,0,0.2);
        }

        .tp-card-title {
          font-size: 1rem;
          font-weight: 700;
          color: #2A1409;
          margin-bottom: 10px;
          font-family: 'Instrument Sans', sans-serif;
        }

        .tp-card-desc {
          font-size: 0.9rem;
          color: #57534e;
          line-height: 1.65;
        }

        /* ─── Pricing ────────────────────── */
        .tp-pricing-label {
          text-align: center;
          margin-bottom: 28px;
        }

        .tp-pricing-type-badge {
          display: inline-block;
          padding: 6px 18px;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #57534e;
          background: #f8f9fa;
        }

        .tp-packages-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        .tp-package-card {
          background: #f8f9fa;
          border: 1.5px solid rgba(0,0,0,0.07);
          border-radius: 16px;
          padding: 28px 20px;
          text-align: center;
          position: relative;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .tp-package-card:hover {
          border-color: #9F691F;
          box-shadow: 0 8px 28px rgba(0,0,0,0.08);
        }

        .tp-package-featured {
          background: #2A1409;
          border-color: #2A1409;
          box-shadow: 0 8px 0 0 rgba(0,0,0,0.4);
          outline: 2px solid #1C1917;
          outline-offset: -2px;
        }

        .tp-package-featured .tp-package-subjects,
        .tp-package-featured .tp-package-price,
        .tp-package-featured .tp-package-note {
          color: white !important;
        }

        .tp-package-featured .tp-price-period { color: rgba(255,255,255,0.7) !important; }

        .tp-package-tag {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #F0AC00;
          color: #2A1409;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 3px 12px;
          border-radius: 100px;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .tp-package-subjects {
          font-size: 0.85rem;
          font-weight: 700;
          color: #9F691F;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .tp-package-price {
          font-size: 1.9rem;
          font-weight: 800;
          color: #2A1409;
          font-family: 'Instrument Sans', sans-serif;
          line-height: 1;
        }

        .tp-price-period {
          font-size: 0.85rem;
          font-weight: 500;
          color: #57534e;
        }

        .tp-package-note {
          font-size: 0.78rem;
          color: #57534e;
          margin-bottom: 4px;
        }

        .tp-package-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 16px;
          border: 1px solid #1C1917;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #1C1917;
          text-decoration: none;
          transition: all 0.2s ease;
          margin-top: 4px;
          width: 100%;
          justify-content: center;
        }

        .tp-package-cta:hover {
          background: #1C1917;
          color: white;
        }

        .tp-package-cta-featured {
          background: #F0AC00;
          border-color: #F0AC00;
          color: #2A1409;
        }

        .tp-package-cta-featured:hover {
          background: #e09e00;
          border-color: #e09e00;
          color: #2A1409;
        }

        /* Project Genius card */
        .tp-genius-card {
          background: #f8f9fa;
          border: 1.5px solid rgba(0,0,0,0.07);
          border-radius: 16px;
          padding: 36px;
          display: flex;
          align-items: center;
          gap: 40px;
          margin-bottom: 32px;
        }

        .tp-genius-left {
          flex: 1;
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }

        .tp-genius-icon {
          width: 52px;
          height: 52px;
          background: rgba(240,172,0,0.1);
          color: #9F691F;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(240,172,0,0.2);
        }

        .tp-genius-kicker {
          font-size: 0.75rem;
          font-weight: 700;
          color: #9F691F;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 6px;
        }

        .tp-genius-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #2A1409;
          margin-bottom: 10px;
          font-family: 'Instrument Sans', sans-serif;
        }

        .tp-genius-desc {
          font-size: 0.9rem;
          color: #57534e;
          line-height: 1.65;
        }

        .tp-genius-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
          min-width: 180px;
        }

        .tp-genius-price-block {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .tp-genius-price {
          font-size: 2rem;
          font-weight: 800;
          color: #2A1409;
          font-family: 'Instrument Sans', sans-serif;
          line-height: 1;
        }

        .tp-genius-price-period {
          font-size: 0.85rem;
          color: #57534e;
        }

        .tp-genius-price-note {
          font-size: 0.78rem;
          color: #9F691F;
          font-weight: 600;
          text-align: center;
          max-width: 160px;
        }

        .tp-pricing-footnote {
          font-size: 0.85rem;
          color: #57534e;
          text-align: center;
          max-width: 680px;
          margin: 0 auto;
          line-height: 1.65;
          padding-top: 8px;
          border-top: 1px solid rgba(0,0,0,0.07);
        }

        /* ─── Roadmap ────────────────────── */
        .tp-roadmap {
          display: flex;
          flex-direction: column;
          gap: 0;
          max-width: 900px;
          margin: 0 auto;
        }

        .tp-roadmap-row {
          display: flex;
          align-items: stretch;
          gap: 0;
          border-top: 1px solid rgba(0,0,0,0.08);
          padding: 28px 0;
        }

        .tp-roadmap-row:last-child {
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .tp-roadmap-year {
          min-width: 120px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-right: 32px;
          flex-shrink: 0;
        }

        .tp-roadmap-yr-text {
          font-size: 1.1rem;
          font-weight: 800;
          color: #2A1409;
          font-family: 'Instrument Sans', sans-serif;
        }

        .tp-roadmap-lbl {
          font-size: 0.75rem;
          font-weight: 700;
          color: #9F691F;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .tp-roadmap-body {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          padding-left: 32px;
          border-left: 2px solid #F0AC00;
        }

        .tp-roadmap-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .tp-roadmap-col-head {
          font-size: 0.78rem;
          font-weight: 700;
          color: #9F691F;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        .tp-roadmap-col p {
          font-size: 0.9rem;
          color: #57534e;
          line-height: 1.6;
          margin: 0;
        }

        /* ─── CTA Banner ─────────────────── */
        .tp-cta-banner {
          background: #9F691F;
          padding: 100px 0;
        }

        .tp-cta-inner {
          text-align: center;
          max-width: 640px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .tp-cta-title {
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 800;
          color: #ffffff;
          font-family: 'Instrument Sans', sans-serif;
          margin: 0;
          line-height: 1.15;
        }

        .tp-cta-sub {
          color: rgba(255,255,255,0.8);
          font-size: 1rem;
          line-height: 1.65;
          margin-bottom: 8px;
          max-width: 520px;
        }

        /* ─── Mobile ─────────────────────── */
        @media (max-width: 1024px) {
          .tp-pillars-grid { grid-template-columns: 1fr 1fr; }
          .tp-packages-grid { grid-template-columns: 1fr 1fr; }
          .tp-genius-card { flex-direction: column; }
          .tp-genius-right { width: 100%; flex-direction: row; justify-content: space-between; align-items: center; }
        }

        @media (max-width: 768px) {
          .tp-hero { padding: 100px 16px 60px; }
          .tp-section { padding: 64px 0; }
          .tp-hero-star { display: none; }
          .tp-hero-ctas { flex-direction: column; align-items: center; }
          .tp-problem-layout { grid-template-columns: 1fr; gap: 40px; }
          .tp-pillars-grid { grid-template-columns: 1fr; }
          .tp-packages-grid { grid-template-columns: 1fr 1fr; }
          .tp-roadmap-body { grid-template-columns: 1fr; }
          .tp-genius-right { flex-direction: column; align-items: flex-start; }
        }

        @media (max-width: 480px) {
          .tp-packages-grid { grid-template-columns: 1fr; }
          .tp-genius-card { padding: 24px; }
        }
      `}</style>
    </>
  );
};

export default TuitionPage;
