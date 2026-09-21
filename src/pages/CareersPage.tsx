import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Briefcase, ChevronDown, ChevronUp, ArrowRight, Check } from 'lucide-react';
import SEO from '../components/common/SEO';

const openings = [
  {
    id: 'tutor-math-science',
    title: 'Mathematics & Science Tutor',
    type: 'Part-Time',
    location: 'Chongwe District (In-Person)',
    summary: 'Deliver structured extra lessons in Mathematics, Physics, Chemistry and/or Biology to Grade 8–12 learners. ECZ syllabus-mapped sessions in small class groups.',
    requirements: [
      'Degree or diploma in a relevant STEM field',
      'Strong knowledge of the Zambia ECZ syllabus',
      'Proven experience tutoring or teaching at secondary level',
      'Patient, organised, and committed to learner outcomes',
    ],
  },
  {
    id: 'tutor-humanities',
    title: 'Humanities & Languages Tutor',
    type: 'Part-Time',
    location: 'Chongwe District (In-Person)',
    summary: 'Deliver extra lessons in English Language, History, Geography, Civic Education and/or Social Studies to Grade 8–12 learners.',
    requirements: [
      'Degree or diploma in Education, Arts or Social Sciences',
      'Familiarity with ECZ examination requirements',
      'Excellent written and spoken English',
      'Reliable, punctual and learner-centred approach',
    ],
  },
  {
    id: 'admin-coordinator',
    title: 'Programme Coordinator',
    type: 'Full-Time',
    location: 'Chongwe District',
    summary: 'Manage day-to-day operations of the Extra Lessons SBU — scheduling, learner records, tutor liaison and communication with families.',
    requirements: [
      'Diploma or degree in Business Administration or Education Management',
      'Strong organisational and communication skills',
      'Proficient with computers and basic office software',
      'Prior experience in a school or training environment is an advantage',
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CareersPage: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleApply = (title: string) => {
    navigate('/careers/apply', { state: { role: title } });
  };

  return (
    <>
      <SEO
        title="Careers | Twalumbu Education Centre"
        description="Join the Twalumbu Education Centre team. We are looking for dedicated tutors and staff who are passionate about transforming education in Chongwe District."
        keywords="TEC jobs Zambia, teaching jobs Chongwe, tutor vacancy Zambia, Twalumbu Education Centre careers"
      />

      <div className="careers-page">

        {/* ── Hero ── */}
        <section className="careers-hero">
          <div className="container">
            <motion.div className="careers-hero-inner" variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.6 }}>
              <span className="careers-badge">Careers at TEC</span>
              <h1>Join Our Team</h1>
              <p>We are building something meaningful in Chongwe — quality education that changes outcomes for young people. If you share that belief and have the skill to match, we want to hear from you.</p>
              <div className="careers-hero-ctas">
                <button
                  className="careers-cta-primary"
                  onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Current Openings <ArrowRight size={17} />
                </button>
                <button
                  className="careers-cta-secondary"
                  onClick={() => handleApply('')}
                >
                  Send a General Application
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── What we look for ── */}
        <section className="careers-values">
          <div className="container">
            <div className="careers-values-grid">
              {[
                { title: 'Subject Mastery', desc: 'You know your subject deeply and can explain it clearly to learners at different levels.' },
                { title: 'Learner-Centred', desc: 'You measure success by learner progress, not by how much content you covered.' },
                { title: 'Reliable', desc: 'You show up prepared, on time, every time — learners and families are counting on you.' },
                { title: 'Growth-Minded', desc: 'You welcome feedback, learn continuously, and want to be part of something that grows.' },
              ].map(v => (
                <div key={v.title} className="careers-value-card">
                  <Check size={18} className="careers-value-icon" />
                  <div>
                    <h4>{v.title}</h4>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Current Openings ── */}
        <section className="careers-openings" id="openings">
          <div className="container">
            <div className="careers-section-header">
              <Briefcase size={20} />
              <h2>Current Openings</h2>
            </div>
            <div className="openings-list">
              {openings.map(job => {
                const expanded = expandedId === job.id;
                return (
                  <div key={job.id} className={`opening-card ${expanded ? 'opening-card--open' : ''}`}>
                    <button
                      className="opening-header"
                      onClick={() => setExpandedId(expanded ? null : job.id)}
                      type="button"
                    >
                      <div className="opening-meta">
                        <h3 className="opening-title">{job.title}</h3>
                        <div className="opening-tags">
                          <span className="opening-tag">{job.type}</span>
                          <span className="opening-tag opening-tag--loc">{job.location}</span>
                        </div>
                      </div>
                      <div className="opening-chevron">
                        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          className="opening-body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <p className="opening-summary">{job.summary}</p>
                          <p className="opening-req-label">What we're looking for:</p>
                          <ul className="opening-req-list">
                            {job.requirements.map(r => <li key={r}>{r}</li>)}
                          </ul>
                          <button
                            type="button"
                            className="opening-apply-btn"
                            onClick={() => handleApply(job.title)}
                          >
                            Apply for this role <ArrowRight size={15} />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="openings-general-cta">
              <p>Don't see a role that fits? We still want to hear from you.</p>
              <button className="careers-cta-primary" onClick={() => handleApply('')}>
                Send a General Application <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </section>

      </div>

      <style>{`
        .careers-page {
          padding-top: 80px;
          min-height: 100vh;
          background: var(--background);
        }

        /* ── Hero ── */
        .careers-hero {
          padding: 80px 0 60px;
          text-align: center;
        }

        .careers-hero-inner {
          max-width: 680px;
          margin: 0 auto;
        }

        .careers-badge {
          display: inline-block;
          color: #9F691F;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .careers-hero h1 {
          font-size: 3rem;
          color: #422006;
          font-family: 'Instrument Sans', sans-serif;
          margin-bottom: 16px;
        }

        .careers-hero p {
          color: #57534e;
          font-size: 1.05rem;
          line-height: 1.65;
          margin-bottom: 36px;
        }

        .careers-hero-ctas {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .careers-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: #1C1917;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .careers-cta-primary:hover { background: #2A1409; }

        .careers-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: transparent;
          color: #1C1917;
          border: 1.5px solid #1C1917;
          border-radius: 12px;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .careers-cta-secondary:hover { background: #1C1917; color: #fff; }

        /* ── Values ── */
        .careers-values {
          padding: 0 0 60px;
        }

        .careers-values-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          max-width: 860px;
          margin: 0 auto;
        }

        .careers-value-card {
          display: flex;
          gap: 14px;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 14px;
          padding: 20px;
        }

        .careers-value-icon {
          color: #F0AC00;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .careers-value-card h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1C1917;
          margin-bottom: 4px;
          font-family: 'Instrument Sans', sans-serif;
        }

        .careers-value-card p {
          font-size: 0.88rem;
          color: #57534e;
          line-height: 1.55;
          margin: 0;
        }

        /* ── Openings ── */
        .careers-openings {
          padding: 0 0 100px;
        }

        .careers-section-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 28px;
          color: #422006;
          text-align: center;
        }

        .careers-section-header h2 {
          font-size: 1.6rem;
          font-family: 'Instrument Sans', sans-serif;
          margin: 0;
        }

        .openings-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 860px;
          margin: 0 auto;
        }

        .opening-card {
          background: #fff;
          border: 1.5px solid #e5e5e5;
          border-radius: 16px;
          overflow: hidden;
          transition: border-color 0.2s;
        }

        .opening-card--open { border-color: #1C1917; }

        .opening-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 24px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 16px;
        }

        .opening-meta { flex: 1; }

        .opening-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #1C1917;
          margin-bottom: 8px;
          font-family: 'Instrument Sans', sans-serif;
        }

        .opening-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .opening-tag {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 100px;
          background: rgba(240,172,0,0.1);
          color: #9F691F;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .opening-tag--loc {
          background: #f4f4f4;
          color: #57534e;
        }

        .opening-chevron { color: #9F691F; flex-shrink: 0; }

        .opening-body {
          padding: 0 24px 24px;
          overflow: hidden;
        }

        .opening-summary {
          font-size: 0.92rem;
          color: #57534e;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .opening-req-label {
          font-size: 0.82rem;
          font-weight: 700;
          color: #1C1917;
          margin-bottom: 8px;
        }

        .opening-req-list {
          padding-left: 20px;
          margin-bottom: 20px;
        }

        .opening-req-list li {
          font-size: 0.88rem;
          color: #57534e;
          margin-bottom: 6px;
          line-height: 1.5;
        }

        .opening-apply-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #1C1917;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .opening-apply-btn:hover { background: #2A1409; }

        .openings-general-cta {
          max-width: 860px;
          margin: 40px auto 0;
          text-align: center;
          padding: 36px;
          background: #f8f5f0;
          border-radius: 16px;
          border: 1px solid #ede8e0;
        }

        .openings-general-cta p {
          color: #57534e;
          margin-bottom: 20px;
          font-size: 0.95rem;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .careers-hero h1 { font-size: 2rem; }
          .careers-values-grid { grid-template-columns: 1fr; }
          .careers-hero-ctas { flex-direction: column; align-items: center; }
        }
      `}</style>
    </>
  );
};

export default CareersPage;
