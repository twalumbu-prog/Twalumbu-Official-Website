import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Briefcase, FileText, ShieldCheck, Check, ChevronRight, ChevronLeft, Upload, X, Paperclip, Plus } from 'lucide-react';
import SEO from '../components/common/SEO';

interface AttachedFile {
  file: File;
  id: string;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const steps = [
  { id: 1, title: 'Personal Details', icon: <User size={20} /> },
  { id: 2, title: 'Your Application', icon: <FileText size={20} /> },
  { id: 3, title: 'Declaration', icon: <ShieldCheck size={20} /> },
];

const stepVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const CareersApplyPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prefilledRole = (location.state as { role?: string })?.role ?? '';

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [qualFiles, setQualFiles] = useState<AttachedFile[]>([]);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const qualInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    position: prefilledRole,
    experience: '',
    cover_letter: '',
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCvFile(file);
    e.target.value = '';
  };

  const handleQualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const newEntries: AttachedFile[] = files.map(f => ({ file: f, id: `${f.name}-${Date.now()}-${Math.random()}` }));
    setQualFiles(prev => [...prev, ...newEntries]);
    e.target.value = '';
  };

  const removeQual = (id: string) => setQualFiles(prev => prev.filter(q => q.id !== id));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const cv = cvFile
        ? { filename: cvFile.name, content: await fileToBase64(cvFile) }
        : null;

      const qualifications = await Promise.all(
        qualFiles.map(async ({ file }) => ({
          filename: file.name,
          content: await fileToBase64(file),
        }))
      );

      const res = await fetch('/api/send-job-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, cv, qualifications }),
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
        title="Apply — Careers | Twalumbu Education Centre"
        description="Apply to join the Twalumbu Education Centre team."
        keywords="apply TEC jobs Zambia, Twalumbu careers application"
      />

      <div className="cap-page">
        <div className="container">

          <div className="cap-header">
            <span className="cap-badge">Careers at TEC</span>
            <h1>{prefilledRole ? `Apply — ${prefilledRole}` : 'Join Our Team'}</h1>
            <p>Fill in the form below and we'll be in touch if your profile is a strong match.</p>
          </div>

          <div className="cap-container glass">

            {/* Steps */}
            <div className="cap-steps">
              {steps.map(step => (
                <div
                  key={step.id}
                  className={`cap-step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
                  onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                >
                  <div className="cap-step-icon">
                    {currentStep > step.id ? <Check size={18} /> : step.icon}
                  </div>
                  <span className="cap-step-title">{step.title}</span>
                </div>
              ))}
            </div>

            <form className="cap-form" onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    className="cap-success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="cap-success-icon">✓</div>
                    <h2>Application Sent!</h2>
                    <p>Thank you for applying to Twalumbu Education Centre. We'll review your application and reach out if your profile is a strong match.</p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
                      <button type="button" className="cap-btn-primary" onClick={() => navigate('/careers')}>
                        Back to Careers
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={currentStep}
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                  >

                    {/* ── Step 1: Personal Details ── */}
                    {currentStep === 1 && (
                      <div className="cap-step-content">
                        <h3>Section 1 – Personal Details</h3>
                        <div className="cap-grid">
                          <div className="cap-field">
                            <label><User size={13} /> Full Name *</label>
                            <input type="text" name="full_name" value={form.full_name} onChange={handleInput} required placeholder="Your full name" />
                          </div>
                          <div className="cap-field">
                            <label><Mail size={13} /> Email Address *</label>
                            <input type="email" name="email" value={form.email} onChange={handleInput} required placeholder="your@email.com" />
                          </div>
                        </div>
                        <div className="cap-field">
                          <label><Phone size={13} /> Phone / WhatsApp *</label>
                          <input type="tel" name="phone" value={form.phone} onChange={handleInput} required placeholder="+260 9XX XXX XXX" />
                        </div>
                        <div className="cap-field">
                          <label><Briefcase size={13} /> Position Applying For *</label>
                          <input type="text" name="position" value={form.position} onChange={handleInput} required placeholder="e.g. Mathematics Tutor, or leave as General Application" />
                        </div>
                      </div>
                    )}

                    {/* ── Step 2: Application ── */}
                    {currentStep === 2 && (
                      <div className="cap-step-content">
                        <h3>Section 2 – Your Application</h3>
                        <div className="cap-field">
                          <label><FileText size={13} /> Relevant Experience *</label>
                          <textarea name="experience" value={form.experience} onChange={handleInput} required rows={5} placeholder="Describe your teaching or relevant professional experience — subjects, grade levels, years of experience, qualifications…" />
                        </div>
                        <div className="cap-field">
                          <label><FileText size={13} /> Why do you want to join Twalumbu? *</label>
                          <textarea name="cover_letter" value={form.cover_letter} onChange={handleInput} required rows={5} placeholder="Tell us what draws you to TEC and what you would bring to the role…" />
                        </div>

                        {/* CV Upload */}
                        <div className="cap-field">
                          <label><Paperclip size={13} /> Curriculum Vitae (CV)</label>
                          <input ref={cvInputRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={handleCvChange} />
                          {cvFile ? (
                            <div className="cap-file-item">
                              <Paperclip size={14} />
                              <span className="cap-file-name">{cvFile.name}</span>
                              <span className="cap-file-size">({(cvFile.size / 1024).toFixed(0)} KB)</span>
                              <button type="button" className="cap-file-remove" onClick={() => setCvFile(null)}><X size={14} /></button>
                            </div>
                          ) : (
                            <button type="button" className="cap-upload-btn" onClick={() => cvInputRef.current?.click()}>
                              <Upload size={15} /> Upload CV
                            </button>
                          )}
                          <span className="cap-file-hint">PDF, DOC or DOCX — max 10 MB</span>
                        </div>

                        {/* Qualifications Upload */}
                        <div className="cap-field">
                          <label><Paperclip size={13} /> Qualification Documents</label>
                          <input ref={qualInputRef} type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" multiple style={{ display: 'none' }} onChange={handleQualChange} />
                          {qualFiles.length > 0 && (
                            <div className="cap-file-list">
                              {qualFiles.map(({ file, id }) => (
                                <div key={id} className="cap-file-item">
                                  <Paperclip size={14} />
                                  <span className="cap-file-name">{file.name}</span>
                                  <span className="cap-file-size">({(file.size / 1024).toFixed(0)} KB)</span>
                                  <button type="button" className="cap-file-remove" onClick={() => removeQual(id)}><X size={14} /></button>
                                </div>
                              ))}
                            </div>
                          )}
                          <button type="button" className="cap-upload-btn" onClick={() => qualInputRef.current?.click()}>
                            <Plus size={15} /> {qualFiles.length === 0 ? 'Upload Qualification Document' : 'Add Another Qualification'}
                          </button>
                          <span className="cap-file-hint">PDF, DOC, DOCX or image — max 10 MB each</span>
                        </div>
                      </div>
                    )}

                    {/* ── Step 3: Declaration ── */}
                    {currentStep === 3 && (
                      <div className="cap-step-content">
                        <h3>Section 3 – Declaration</h3>
                        <div className="cap-declaration">
                          <p>I confirm that all information provided in this application is true and accurate to the best of my knowledge. I understand that submitting this form does not guarantee an interview or employment.</p>
                          <p>I consent for Twalumbu Education Centre to contact me via the details provided to discuss my application.</p>
                        </div>
                        {error && <p className="cap-error">{error}</p>}
                        <div className="cap-field cap-checkbox-field">
                          <label>
                            <input type="checkbox" required />
                            I agree to the declaration above and consent to being contacted.
                          </label>
                        </div>
                      </div>
                    )}

                    <div className="cap-footer">
                      {currentStep > 1 && (
                        <button type="button" className="cap-btn-secondary" onClick={prevStep}>
                          <ChevronLeft size={18} /> Back
                        </button>
                      )}
                      {currentStep < steps.length ? (
                        <button type="button" className="cap-btn-primary" onClick={nextStep} style={{ marginLeft: 'auto' }}>
                          Next Step <ChevronRight size={18} />
                        </button>
                      ) : (
                        <button type="submit" className="cap-btn-primary" disabled={isSubmitting} style={{ marginLeft: 'auto' }}>
                          {isSubmitting ? 'Submitting…' : 'Submit Application'}
                          <ShieldCheck size={18} />
                        </button>
                      )}
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .cap-page {
          padding: 80px 0 100px;
          min-height: 100vh;
          background: var(--background);
        }

        .cap-header {
          text-align: center;
          max-width: 620px;
          margin: 0 auto 48px;
        }

        .cap-badge {
          display: inline-block;
          color: #9F691F;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .cap-header h1 {
          font-size: 2.6rem;
          color: #422006;
          font-family: 'Instrument Sans', sans-serif;
          margin-bottom: 12px;
        }

        .cap-header p { color: #57534e; line-height: 1.6; }

        .cap-container {
          max-width: 780px;
          margin: 0 auto;
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 70px rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.05);
        }

        /* Steps */
        .cap-steps {
          display: flex;
          background: #f8f9fa;
          padding: 28px 32px;
          border-bottom: 1px solid #eee;
          justify-content: space-between;
        }

        .cap-step-item {
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0.45;
          transition: opacity 0.3s;
        }

        .cap-step-item.active, .cap-step-item.completed { opacity: 1; }
        .cap-step-item.completed { color: #9F691F; cursor: pointer; }

        .cap-step-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s;
        }

        .cap-step-item.active .cap-step-icon { border-color: #1C1917; background: #1C1917; color: #fff; }
        .cap-step-item.completed .cap-step-icon { border-color: #F0AC00; background: #F0AC00; color: #2A1409; }

        .cap-step-title { font-weight: 700; font-size: 0.88rem; }

        /* Form */
        .cap-form { padding: 40px; min-height: 420px; }

        .cap-step-content h3 {
          font-size: 1.4rem;
          color: #422006;
          font-family: 'Instrument Sans', sans-serif;
          border-left: 4px solid #F0AC00;
          padding-left: 14px;
          margin-bottom: 28px;
        }

        .cap-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .cap-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 20px;
        }

        .cap-grid .cap-field { margin-bottom: 0; }

        .cap-field label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.84rem;
          font-weight: 700;
          color: #1C1917;
        }

        .cap-field input,
        .cap-field textarea {
          padding: 12px 16px;
          border: 1.5px solid #e5e5e5;
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.92rem;
          color: #1C1917;
          transition: border-color 0.2s;
          resize: vertical;
        }

        .cap-field input:focus,
        .cap-field textarea:focus {
          outline: none;
          border-color: #1C1917;
        }

        .cap-declaration {
          background: #f8f9fa;
          padding: 20px 24px;
          border-radius: 12px;
          margin-bottom: 20px;
          font-size: 0.92rem;
          color: #57534e;
          line-height: 1.6;
        }

        .cap-declaration p { margin-bottom: 10px; }
        .cap-declaration p:last-child { margin-bottom: 0; }

        .cap-checkbox-field label {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-weight: 500;
          cursor: pointer;
          font-size: 0.92rem;
          color: #1C1917;
        }

        .cap-error {
          color: #dc2626;
          font-size: 0.88rem;
          margin-bottom: 12px;
        }

        .cap-footer {
          display: flex;
          margin-top: 36px;
          padding-top: 24px;
          border-top: 1px solid #eee;
        }

        .cap-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
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

        .cap-btn-primary:hover { background: #2A1409; }
        .cap-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        .cap-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: transparent;
          color: #57534e;
          border: 1.5px solid #ddd;
          border-radius: 12px;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cap-btn-secondary:hover { border-color: #1C1917; color: #1C1917; }

        /* Success */
        .cap-success {
          text-align: center;
          padding: 60px 20px;
        }

        .cap-success-icon {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: #e6f7ef;
          color: #10b981;
          font-size: 2.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }

        .cap-success h2 {
          font-size: 1.8rem;
          color: #422006;
          font-family: 'Instrument Sans', sans-serif;
          margin-bottom: 12px;
        }

        .cap-success p {
          color: #57534e;
          max-width: 460px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Upload */
        .cap-upload-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 20px;
          background: #f8f9fa;
          color: #422006;
          border: 1.5px dashed #c9b99a;
          border-radius: 10px;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          justify-content: center;
        }

        .cap-upload-btn:hover {
          background: #f0ebe3;
          border-color: #9F691F;
          color: #9F691F;
        }

        .cap-file-hint {
          font-size: 0.76rem;
          color: #a8a29e;
          margin-top: 4px;
        }

        .cap-file-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 10px;
        }

        .cap-file-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: #f0ebe3;
          border: 1px solid #ddd4c4;
          border-radius: 10px;
          margin-bottom: 8px;
          color: #422006;
        }

        .cap-file-name {
          flex: 1;
          font-size: 0.88rem;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .cap-file-size {
          font-size: 0.78rem;
          color: #a8a29e;
          flex-shrink: 0;
        }

        .cap-file-remove {
          background: none;
          border: none;
          cursor: pointer;
          color: #9a3412;
          padding: 2px;
          display: flex;
          align-items: center;
          border-radius: 4px;
          flex-shrink: 0;
          transition: background 0.15s;
        }

        .cap-file-remove:hover { background: rgba(154,52,18,0.1); }

        @media (max-width: 768px) {
          .cap-header h1 { font-size: 1.9rem; }
          .cap-steps { flex-direction: column; gap: 14px; padding: 20px; }
          .cap-form { padding: 24px 20px; }
          .cap-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
};

export default CareersApplyPage;
