import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, ChevronUp, Send, Check, User, Mail, Phone, FileText } from 'lucide-react';
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
  const [expandedId, setExpandedId]     = useState<string | null>(null);
  const [applyingFor, setApplyingFor]   = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess]       = useState(false);
  const [error, setError]               = useState('');

  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', position: '',
    experience: '', cover_letter: '',
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const openApply = (title: string) => {
    setApplyingFor(title);
    setForm(prev => ({ ...prev, position: title }));
    setIsSuccess(false);
    setError('');
    setTimeout(() => document.getElementById('careers-apply')?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/send-job-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Server error');
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please email us directly at twalumbuaccsdept@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
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
        <section className="careers-openings">
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
                            className="btn-primary opening-apply-btn"
                            onClick={() => openApply(job.title)}
                          >
                            Apply for this role <Send size={15} />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Application Form ── */}
        <section className="careers-apply-section" id="careers-apply">
          <div className="container">
            <div className="careers-apply-box glass">
              {isSuccess ? (
                <motion.div className="careers-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="careers-success-icon">✓</div>
                  <h3>Application Received</h3>
                  <p>Thank you for applying. We'll review your application and be in touch if your profile is a strong match.</p>
                  <button type="button" className="btn-primary" style={{ marginTop: '20px' }} onClick={() => { setIsSuccess(false); setApplyingFor(''); setForm({ full_name: '', email: '', phone: '', position: '', experience: '', cover_letter: '' }); }}>
                    Submit Another
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="careers-apply-header">
                    <h2>{applyingFor ? `Apply — ${applyingFor}` : 'Apply to Join TEC'}</h2>
                    <p>Don't see a role that fits? Submit a general application and we'll keep you in mind when a suitable position opens.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="careers-form">
                    <div className="cform-grid">
                      <div className="cform-group">
                        <label><User size={13} /> Full Name *</label>
                        <input type="text" name="full_name" value={form.full_name} onChange={handleInput} required placeholder="Your full name" />
                      </div>
                      <div className="cform-group">
                        <label><Mail size={13} /> Email Address *</label>
                        <input type="email" name="email" value={form.email} onChange={handleInput} required placeholder="your@email.com" />
                      </div>
                    </div>
                    <div className="cform-grid">
                      <div className="cform-group">
                        <label><Phone size={13} /> Phone / WhatsApp *</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleInput} required placeholder="+260 9XX XXX XXX" />
                      </div>
                      <div className="cform-group">
                        <label><Briefcase size={13} /> Position Applying For *</label>
                        <input type="text" name="position" value={form.position} onChange={handleInput} required placeholder="e.g. Mathematics Tutor" />
                      </div>
                    </div>
                    <div className="cform-group">
                      <label><FileText size={13} /> Relevant Experience *</label>
                      <textarea name="experience" value={form.experience} onChange={handleInput} required rows={4} placeholder="Briefly describe your teaching or relevant professional experience, including subjects and grade levels if applicable…" />
                    </div>
                    <div className="cform-group">
                      <label><FileText size={13} /> Why do you want to join Twalumbu? *</label>
                      <textarea name="cover_letter" value={form.cover_letter} onChange={handleInput} required rows={4} placeholder="Tell us why you'd like to be part of the TEC team and what you'd bring to the role…" />
                    </div>
                    {error && <p className="cform-error">{error}</p>}
                    <button type="submit" className="btn-primary cform-submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending…' : 'Submit Application'}
                      {!isSubmitting && <Send size={16} />}
                    </button>
                  </form>
                </>
              )}
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
        }

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
          padding: 0 0 80px;
        }

        .careers-section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
          color: #422006;
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
        }

        .opening-card {
          background: #fff;
          border: 1.5px solid #e5e5e5;
          border-radius: 16px;
          overflow: hidden;
          transition: border-color 0.2s;
        }

        .opening-card--open {
          border-color: #1C1917;
        }

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

        .opening-chevron {
          color: #9F691F;
          flex-shrink: 0;
        }

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
        }

        /* ── Application form ── */
        .careers-apply-section {
          padding: 0 0 100px;
        }

        .careers-apply-box {
          max-width: 860px;
          background: #fff;
          border-radius: 20px;
          padding: 48px;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 20px 60px rgba(0,0,0,0.07);
        }

        .careers-apply-header {
          margin-bottom: 36px;
        }

        .careers-apply-header h2 {
          font-size: 1.7rem;
          color: #422006;
          font-family: 'Instrument Sans', sans-serif;
          margin-bottom: 8px;
        }

        .careers-apply-header p {
          font-size: 0.9rem;
          color: #57534e;
        }

        .careers-form { display: flex; flex-direction: column; gap: 0; }

        .cform-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .cform-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 20px;
        }

        .cform-grid .cform-group {
          margin-bottom: 0;
        }

        .cform-group label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.84rem;
          font-weight: 700;
          color: #1C1917;
        }

        .cform-group input,
        .cform-group textarea {
          padding: 12px 16px;
          border: 1.5px solid #e5e5e5;
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.92rem;
          color: #1C1917;
          transition: border-color 0.2s;
          resize: vertical;
        }

        .cform-group input:focus,
        .cform-group textarea:focus {
          outline: none;
          border-color: #1C1917;
        }

        .cform-error {
          color: #dc2626;
          font-size: 0.88rem;
          margin-bottom: 12px;
        }

        .cform-submit {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }

        /* ── Success ── */
        .careers-success {
          text-align: center;
          padding: 40px 20px;
        }

        .careers-success-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #e6f7ef;
          color: #10b981;
          font-size: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }

        .careers-success h3 {
          font-size: 1.5rem;
          color: #422006;
          font-family: 'Instrument Sans', sans-serif;
          margin-bottom: 10px;
        }

        .careers-success p {
          color: #57534e;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .careers-hero h1 { font-size: 2rem; }
          .careers-values-grid { grid-template-columns: 1fr; }
          .cform-grid { grid-template-columns: 1fr; }
          .careers-apply-box { padding: 28px 20px; }
        }
      `}</style>
    </>
  );
};

export default CareersPage;
