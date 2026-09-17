import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, ChevronRight, ChevronLeft, User, Phone, LayoutGrid, ShieldCheck, MapPin, Smartphone,
  Calculator, BookOpen, Microscope, Globe, Monitor, Church, Landmark, Map, Clock, ChefHat,
  Palette, Briefcase, Sprout, Zap, FlaskConical, Leaf, Receipt, ShoppingBag,
} from 'lucide-react';
import SEO from '../components/common/SEO';

const EMAILJS_PUBLIC_KEY    = import.meta.env.VITE_EMAILJS_PUBLIC_KEY    as string;
const EMAILJS_SERVICE_ID    = import.meta.env.VITE_EMAILJS_SERVICE_ID    as string;
const EMAILJS_TMPL_INBOUND  = import.meta.env.VITE_EMAILJS_TEMPLATE_INBOUND  as string;
const EMAILJS_TMPL_CONFIRM  = import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRM  as string;

const steps = [
  { id: 1, title: "Learner's Details", icon: <User size={20} /> },
  { id: 2, title: 'Contact Info', icon: <Phone size={20} /> },
  { id: 3, title: 'Programme', icon: <LayoutGrid size={20} /> },
  { id: 4, title: 'Declaration', icon: <ShieldCheck size={20} /> },
];

const lowerSecondarySubjects = [
  'Mathematics', 'English Language', 'Integrated Science', 'Social Studies',
  'Computer Studies', 'Religious Education', 'Civic Education', 'Geography',
  'History', 'Home Economics', 'Creative & Technology Studies', 'Business Studies', 'Agricultural Science',
];

const upperSecondarySubjects = [
  'Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology',
  'Geography', 'History', 'Civic Education', 'Accounts', 'Commerce',
  'Computer Studies', 'Business Studies', 'Religious Education',
  'Agriculture', 'Integrated Science',
];

const gradeOptions = ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

const getSubjectsForGrade = (grade: string) =>
  ['Grade 11', 'Grade 12'].includes(grade) ? upperSecondarySubjects : lowerSecondarySubjects;

const subjectIconMap: Record<string, React.ReactNode> = {
  'Mathematics': <Calculator size={18} />,
  'English Language': <BookOpen size={18} />,
  'Integrated Science': <Microscope size={18} />,
  'Social Studies': <Globe size={18} />,
  'Computer Studies': <Monitor size={18} />,
  'Religious Education': <Church size={18} />,
  'Civic Education': <Landmark size={18} />,
  'Geography': <Map size={18} />,
  'History': <Clock size={18} />,
  'Home Economics': <ChefHat size={18} />,
  'Creative & Technology Studies': <Palette size={18} />,
  'Business Studies': <Briefcase size={18} />,
  'Agricultural Science': <Sprout size={18} />,
  'Agriculture': <Sprout size={18} />,
  'Physics': <Zap size={18} />,
  'Chemistry': <FlaskConical size={18} />,
  'Biology': <Leaf size={18} />,
  'Accounts': <Receipt size={18} />,
  'Commerce': <ShoppingBag size={18} />,
};

const programmes = [
  {
    id: 'inperson',
    icon: <MapPin size={22} />,
    title: 'In-Person Extra Lessons',
    location: 'Chongwe District',
    desc: 'Face-to-face tuition delivered by qualified, subject-specialist tutors in small class groups.',
    bullets: ['Small class sizes (max 25)', 'Structured past-paper drilling', 'ECZ syllabus-mapped lessons', 'All materials included'],
  },
  {
    id: 'genius',
    icon: <Smartphone size={22} />,
    title: 'Project Genius — Online',
    location: 'Available Nationwide',
    desc: 'Live-streamed classes and an AI-guided companion app accessible from any smartphone in Zambia.',
    bullets: ['Live-streamed tuition', 'AI adaptive study plan', 'Daily to-dos, quizzes & flashcards', 'Flexible schedule'],
  },
];

const TuitionApplyPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    otherNames: '',
    grade: '',
    age: '',
    gender: '',
    currentSchool: '',
    ecz: '',
    email: '',
    phone: '',
    whatsapp: '',
    selectedProgramme: '',
    subjects: [] as string[],
    startTerm: '',
    additionalNotes: '',
    referral: '',
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectProgramme = (id: string) => {
    setFormData(prev => ({ ...prev, selectedProgramme: prev.selectedProgramme === id ? '' : id }));
  };

  const toggleSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const getProgrammeLabel = (id: string) => programmes.find(p => p.id === id)?.title ?? id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const applicantName = [formData.firstName, formData.otherNames, formData.lastName].filter(Boolean).join(' ');
    const programmeLabel = formData.selectedProgramme ? getProgrammeLabel(formData.selectedProgramme) : 'Not selected';
    const subjectsList = formData.subjects.join(', ') || 'None selected';

    const sharedParams = {
      applicant_name: applicantName,
      grade:          formData.grade,
      age:            formData.age,
      gender:         formData.gender,
      current_school: formData.currentSchool || 'Not provided',
      ecz_status:     formData.ecz,
      email:          formData.email,
      phone:          formData.phone,
      whatsapp:       formData.whatsapp || formData.phone,
      programme:      programmeLabel,
      subjects:       subjectsList,
      start_term:     formData.startTerm,
      referral:       formData.referral || 'Not specified',
      notes:          formData.additionalNotes || 'None',
    };

    try {
      // Send application to TEC inbox
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TMPL_INBOUND,
        { ...sharedParams, to_email: 'twalumbuaccsdept@gmail.com' },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );

      // Send confirmation copy to the applicant
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TMPL_CONFIRM,
        { ...sharedParams, to_email: formData.email },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Something went wrong sending your application. Please email us directly at twalumbuaccsdept@gmail.com.');
      setIsSubmitting(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const subjectList = formData.grade ? getSubjectsForGrade(formData.grade) : lowerSecondarySubjects;

  return (
    <>
      <SEO
        title="Apply – Extra Lessons | Twalumbu Education Centre"
        description="Register for Grade 8–12 extra lessons at Twalumbu Education Centre, Chongwe District. In-person tuition and Project Genius online programme available."
        keywords="apply tuition Zambia, Twalumbu extra lessons application, Grade 9 registration Chongwe, Grade 12 tuition Zambia, Project Genius application"
      />

      <div className="tuition-apply-page">
        <div className="container">
          <div className="tuition-apply-header">
            <span className="tuition-apply-badge">Extra Lessons — featuring Project Genius</span>
            <h1>Extra Lessons Registration</h1>
            <p>Register for <strong>Grade 8–12 extra tuition</strong> at Twalumbu Education Centre. Available in-person in Chongwe District, or online nationwide through Project Genius. We'll confirm your spot within 24–48 hours.</p>
          </div>

          <div className="enrol-container glass">
            {/* Steps */}
            <div className="enrol-steps">
              {steps.map(step => (
                <div
                  key={step.id}
                  className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
                  onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                >
                  <div className="step-icon">
                    {currentStep > step.id ? <Check size={18} /> : step.icon}
                  </div>
                  <span className="step-title">{step.title}</span>
                </div>
              ))}
            </div>

            <form className="enrol-form" onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    className="success-view"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="success-lottie">✓</div>
                    <h2>Application Sent!</h2>
                    <p>
                      Your application for <strong>{formData.firstName} {formData.lastName}</strong> has been submitted.
                      Your email client has opened with the pre-filled application — please send it if it hasn't been sent automatically.
                      We'll be in touch within 24–48 hours.
                    </p>
                    <button className="btn-primary" onClick={() => window.location.href = '/tuition'} style={{ marginTop: '24px' }}>
                      Back to Tuition Centre
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={currentStep}
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    {/* ── STEP 1: Learner ── */}
                    {currentStep === 1 && (
                      <div className="step-content">
                        <h3>Section 1 – Learner's Details</h3>
                        <div className="form-grid-3">
                          <div className="form-group">
                            <label>First Name *</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleInput} required />
                          </div>
                          <div className="form-group">
                            <label>Last Name *</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleInput} required />
                          </div>
                          <div className="form-group">
                            <label>Other Name(s)</label>
                            <input type="text" name="otherNames" value={formData.otherNames} onChange={handleInput} />
                          </div>
                        </div>
                        <div className="form-grid-3">
                          <div className="form-group">
                            <label>Grade *</label>
                            <select name="grade" value={formData.grade} onChange={handleInput} required>
                              <option value="">Select Grade</option>
                              {gradeOptions.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Age *</label>
                            <input type="number" name="age" min="12" max="30" value={formData.age} onChange={handleInput} required />
                          </div>
                          <div className="form-group">
                            <label>Gender *</label>
                            <select name="gender" value={formData.gender} onChange={handleInput} required>
                              <option value="">Select</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Current / Previous School</label>
                          <input type="text" name="currentSchool" placeholder="Name of the learner's current or most recent school" value={formData.currentSchool} onChange={handleInput} />
                        </div>
                        <div className="form-group">
                          <label>Exam / Enrolment Status *</label>
                          <select name="ecz" value={formData.ecz} onChange={handleInput} required>
                            <option value="">Select</option>
                            <option value="Currently enrolled — first sitting">Currently enrolled in Grade 9 or 12 (first sitting)</option>
                            <option value="GCE resitter">GCE resitter — did not achieve a full pass and am resitting</option>
                            <option value="Already passed — improving grades">Already passed but want to improve specific subject grades</option>
                            <option value="Not in an exam class — preparing ahead">Not currently in an exam class / preparing for a future exam class</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* ── STEP 2: Contact Info ── */}
                    {currentStep === 2 && (
                      <div className="step-content">
                        <h3>Section 2 – Contact Information</h3>
                        <p style={{ color: '#57534e', fontSize: '0.92rem', marginBottom: '28px', lineHeight: 1.6 }}>
                          This is how we'll reach you to confirm your place. Students may enter their own contact details.
                        </p>
                        <div className="form-group">
                          <label>Email Address *</label>
                          <input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleInput} required />
                        </div>
                        <div className="form-grid">
                          <div className="form-group">
                            <label>Phone Number *</label>
                            <input type="tel" name="phone" placeholder="+260 9XX XXX XXX" value={formData.phone} onChange={handleInput} required />
                          </div>
                          <div className="form-group">
                            <label>WhatsApp Number <small>(if different from phone)</small></label>
                            <input type="tel" name="whatsapp" placeholder="Leave blank if same as above" value={formData.whatsapp} onChange={handleInput} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── STEP 3: Programme selector ── */}
                    {currentStep === 3 && (
                      <div className="step-content">
                        <h3>Section 3 – Your Programme</h3>

                        {/* Mode of delivery */}
                        <div className="prog-mode-header">
                          <span className="prog-subjects-label">Choose Mode of Lesson Delivery</span>
                          <span className="prog-mode-note">Select one — in-person classes include Project Genius access</span>
                        </div>
                        <div className="prog-cards">
                          {programmes.map(prog => {
                            const selected = formData.selectedProgramme === prog.id;
                            return (
                              <div
                                key={prog.id}
                                className={`prog-card ${selected ? 'prog-card--selected' : ''}`}
                                onClick={() => selectProgramme(prog.id)}
                              >
                                <div className="prog-card-top">
                                  <div className="prog-card-icon">{prog.icon}</div>
                                  <div className={`prog-radio ${selected ? 'prog-radio--checked' : ''}`}>
                                    {selected && <div className="prog-radio-dot" />}
                                  </div>
                                </div>
                                <div className="prog-card-location">{prog.location}</div>
                                <h4 className="prog-card-title">{prog.title}</h4>
                                <p className="prog-card-desc">{prog.desc}</p>
                              </div>
                            );
                          })}
                        </div>

                        {/* Subject picker */}
                        <div className="prog-subjects-section">
                          <div className="prog-subjects-header">
                            <span className="prog-subjects-label">Select Subjects</span>
                            {formData.subjects.length > 0 && (
                              <span className="prog-subjects-count">{formData.subjects.length} selected</span>
                            )}
                          </div>
                          <div className="subj-cards">
                            {subjectList.map(sub => {
                              const active = formData.subjects.includes(sub);
                              return (
                                <div
                                  key={sub}
                                  className={`subj-card ${active ? 'subj-card--selected' : ''}`}
                                  onClick={() => toggleSubject(sub)}
                                >
                                  <div className="subj-card-top">
                                    <div className="subj-card-icon">{subjectIconMap[sub] ?? <BookOpen size={18} />}</div>
                                    <div className={`subj-check ${active ? 'subj-check--checked' : ''}`}>
                                      {active && <Check size={11} />}
                                    </div>
                                  </div>
                                  <span className="subj-card-name">{sub}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Term + referral */}
                        <div className="form-grid" style={{ marginTop: '32px' }}>
                          <div className="form-group">
                            <label>Preferred Start Term *</label>
                            <select name="startTerm" value={formData.startTerm} onChange={handleInput} required>
                              <option value="">Select term</option>
                              <option value="Term 3 2026">Term 3 – 2026 (current)</option>
                              <option value="Term 1 2027">Term 1 – 2027</option>
                              <option value="Term 2 2027">Term 2 – 2027</option>
                              <option value="Term 3 2027">Term 3 – 2027</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>How did you hear about us?</label>
                            <select name="referral" value={formData.referral} onChange={handleInput}>
                              <option value="">Select</option>
                              <option value="Social Media">Social Media</option>
                              <option value="Friend / Relative">Friend / Relative</option>
                              <option value="Already a TEC Pupil">Already a TEC pupil</option>
                              <option value="Google Search">Google Search</option>
                              <option value="Flyer / Poster">Flyer / Poster</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Additional Notes / Special Requirements</label>
                          <textarea name="additionalNotes" rows={3} placeholder="Any extra information you'd like us to know…" value={formData.additionalNotes} onChange={handleInput} />
                        </div>
                      </div>
                    )}

                    {/* ── STEP 4: Declaration ── */}
                    {currentStep === 4 && (
                      <div className="step-content">
                        <h3>Section 4 – Declaration</h3>
                        <div className="declaration-box">
                          <p>I hereby confirm that all information provided in this application is true, complete, and accurate to the best of my knowledge. I understand that submitting this form is an expression of interest and does not guarantee immediate enrolment into the Twalumbu Extra Lessons programme.</p>
                          <p>I consent for Twalumbu Education Centre to contact me via the details provided above to discuss my tuition needs and confirm availability.</p>
                        </div>
                        {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
                        <div className="form-group checkbox-group">
                          <label>
                            <input type="checkbox" required /> I agree to the declaration above and consent to being contacted.
                          </label>
                        </div>
                      </div>
                    )}

                    <div className="enrol-footer">
                      {currentStep > 1 && (
                        <button type="button" className="btn-secondary glass" onClick={prevStep}>
                          <ChevronLeft size={18} /> Back
                        </button>
                      )}
                      {currentStep < steps.length ? (
                        <button type="button" className="btn-primary" onClick={nextStep} style={{ marginLeft: 'auto' }}>
                          Next Step <ChevronRight size={18} />
                        </button>
                      ) : (
                        <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ marginLeft: 'auto' }}>
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
        .tuition-apply-page {
          padding: 80px 0;
          min-height: 100vh;
          background: var(--background);
        }

        .tuition-apply-header {
          text-align: center;
          margin-bottom: 60px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .tuition-apply-badge {
          display: inline-block;
          color: #9F691F;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .tuition-apply-header h1 {
          font-size: 3rem;
          margin-bottom: 16px;
          color: #422006;
          font-family: 'Instrument Sans', sans-serif;
        }

        .tuition-apply-header p { color: #57534e; line-height: 1.65; }

        /* ── Enrol container ── */
        .enrol-container {
          max-width: 900px;
          margin: 0 auto;
          background: #fff;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(var(--primary-hsl), 0.1);
          border: 1px solid rgba(0,0,0,0.05);
        }

        .enrol-steps {
          display: flex;
          background: #f8f9fa;
          padding: 30px;
          border-bottom: 1px solid #eee;
          justify-content: space-between;
        }

        .step-item {
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .step-item.active { opacity: 1; color: #2A1409; }
        .step-item.completed { opacity: 1; color: #9F691F; cursor: pointer; }

        .step-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .step-item.active .step-icon { border-color: #1C1917; background: #1C1917; color: #fff; }
        .step-item.completed .step-icon { border-color: #F0AC00; background: #F0AC00; color: #2A1409; }

        .step-title { font-weight: 700; font-size: 0.9rem; }

        .enrol-form { padding: 40px; min-height: 500px; }

        .step-content h3 {
          margin-bottom: 30px;
          color: #422006;
          font-size: 1.5rem;
          border-left: 4px solid #F0AC00;
          padding-left: 15px;
          font-family: 'Instrument Sans', sans-serif;
        }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .form-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        .form-group { margin-bottom: 24px; }

        .form-group label {
          display: block;
          font-weight: 700;
          font-size: 0.85rem;
          margin-bottom: 8px;
          color: var(--text);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #ddd;
          border-radius: var(--radius-sm);
          font-family: inherit;
          font-size: 0.95rem;
        }

        /* ── Programme cards ── */
        .prog-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 36px;
        }

        .prog-card {
          border: 1.5px solid #e5e5e5;
          border-radius: 16px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: #fafafa;
          position: relative;
          user-select: none;
        }

        .prog-card:hover {
          border-color: #9F691F;
          background: #fff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
        }

        .prog-card--selected {
          border-color: #1C1917;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(28,25,23,0.06), 0 4px 20px rgba(0,0,0,0.08);
        }

        .prog-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .prog-card-icon {
          width: 44px;
          height: 44px;
          background: rgba(240,172,0,0.1);
          color: #9F691F;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(240,172,0,0.2);
        }

        .prog-card--selected .prog-card-icon {
          background: #1C1917;
          color: #F0AC00;
          border-color: #1C1917;
        }

        .prog-mode-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 14px;
          gap: 12px;
          flex-wrap: wrap;
        }

        .prog-mode-note {
          font-size: 0.78rem;
          color: #9F691F;
          font-weight: 500;
        }

        .prog-radio {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
          background: white;
        }

        .prog-radio--checked {
          border-color: #1C1917;
          background: #1C1917;
        }

        .prog-radio-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: white;
        }

        .prog-card-location {
          font-size: 0.72rem;
          font-weight: 700;
          color: #9F691F;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 6px;
        }

        .prog-card-title {
          font-size: 1rem;
          font-weight: 700;
          color: #1C1917;
          margin-bottom: 8px;
          font-family: 'Instrument Sans', sans-serif;
        }

        .prog-card-desc {
          font-size: 0.85rem;
          color: #57534e;
          line-height: 1.55;
          margin-bottom: 16px;
        }

        /* ── Subject section header ── */
        .prog-subjects-section {
          margin-bottom: 8px;
        }

        .prog-subjects-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .prog-subjects-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #1C1917;
        }

        .prog-subjects-count {
          font-size: 0.78rem;
          font-weight: 700;
          color: #9F691F;
          background: rgba(240,172,0,0.1);
          padding: 3px 10px;
          border-radius: 100px;
        }

        /* ── Subject cards ── */
        .subj-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 36px;
        }

        .subj-card {
          border: 1.5px solid #e5e5e5;
          border-radius: 14px;
          padding: 14px 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: #fafafa;
          user-select: none;
        }

        .subj-card:hover {
          border-color: #9F691F;
          background: #fff;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }

        .subj-card--selected {
          border-color: #1C1917;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(28,25,23,0.06);
        }

        .subj-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .subj-card-icon {
          width: 36px;
          height: 36px;
          background: rgba(240,172,0,0.1);
          color: #9F691F;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(240,172,0,0.2);
          flex-shrink: 0;
        }

        .subj-card--selected .subj-card-icon {
          background: #1C1917;
          color: #F0AC00;
          border-color: #1C1917;
        }

        .subj-check {
          width: 18px;
          height: 18px;
          border-radius: 5px;
          border: 2px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
          background: white;
        }

        .subj-check--checked {
          border-color: #1C1917;
          background: #1C1917;
          color: white;
        }

        .subj-card-name {
          font-size: 0.82rem;
          font-weight: 600;
          color: #1C1917;
          display: block;
          line-height: 1.3;
        }

        /* ── Declaration ── */
        .declaration-box {
          background: #f8f9fa;
          padding: 24px;
          border-radius: var(--radius-md);
          margin-bottom: 24px;
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .declaration-box p { margin-bottom: 12px; }

        .enrol-footer {
          display: flex;
          margin-top: 40px;
          padding-top: 30px;
          border-top: 1px solid #eee;
        }

        .enrol-footer button { display: flex; align-items: center; gap: 10px; }

        .checkbox-group label {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-weight: 500;
          cursor: pointer;
        }

        /* ── Success ── */
        .success-view { text-align: center; padding: 60px 20px; }

        .success-lottie {
          width: 100px;
          height: 100px;
          background: #e6f7ef;
          color: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          margin: 0 auto 30px;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .enrol-steps { flex-direction: column; gap: 15px; }
          .form-grid, .form-grid-3 { grid-template-columns: 1fr; }
          .tuition-apply-header h1 { font-size: 2rem; }
          .prog-cards { grid-template-columns: 1fr; }
          .subj-cards { grid-template-columns: repeat(2, 1fr); }
          .enrol-form { padding: 24px 20px; }
        }
      `}</style>
    </>
  );
};

export default TuitionApplyPage;
