import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { EditableText } from '../admin/InlineEditor';

const ContactSection: React.FC = () => {
  const { content } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="contact-redesign-section" id="contact">
      <div className="container contact-container">
        <motion.div
          className="contact-card-wrapper"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {/* Left Info Panel - Dark Premium */}
          <motion.div
            className="contact-info-panel"
            variants={{
              hidden: { opacity: 0, x: -50 },
              show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
          >
            <span className="info-tag">Get In Touch</span>
            <h2 className="info-title">
              <EditableText
                contentKey="contact.title"
                value={content.contact.title}
              />
            </h2>
            <p className="info-subtitle">
              <EditableText
                contentKey="contact.subtitle"
                value={content.contact.subtitle}
                multiline
              />
            </p>

            <div className="info-listing">
              <div className="listing-item">
                <div className="listing-icon-box"><Phone size={22} /></div>
                <div className="listing-text">
                  <label>Phone Number</label>
                  <span>
                    <EditableText
                      contentKey="contact.phone"
                      value={content.contact.phone}
                    />
                  </span>
                </div>
              </div>
              <div className="listing-item">
                <div className="listing-icon-box"><Mail size={22} /></div>
                <div className="listing-text">
                  <label>Email Address</label>
                  <span>
                    <EditableText
                      contentKey="contact.email"
                      value={content.contact.email}
                    />
                  </span>
                </div>
              </div>
              <div className="listing-item">
                <div className="listing-icon-box"><MapPin size={22} /></div>
                <div className="listing-text">
                  <label>School Location</label>
                  <span>
                    <EditableText
                      contentKey="contact.address"
                      value={content.contact.address}
                    />
                  </span>
                </div>
              </div>
              <div className="listing-item">
                <div className="listing-icon-box"><Clock size={22} /></div>
                <div className="listing-text">
                  <label>Office Hours</label>
                  <span>Mon - Fri: 08:00 - 17:00</span>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="info-decoration">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="100" fill="#F0AC00" fillOpacity="0.05" />
                <circle cx="100" cy="100" r="70" fill="#F0AC00" fillOpacity="0.05" />
              </svg>
            </div>
          </motion.div>

          {/* Right Form Panel - Light & Clean */}
          <motion.div
            className="contact-form-panel"
            variants={{
              hidden: { opacity: 0, x: 50 },
              show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
          >
            {submitted ? (
              <motion.div
                className="contact-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="success-check-icon">✓</div>
                <h3>Message Received!</h3>
                <p>We've received your inquiry and will get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form className="premium-contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-grid-row">
                  <div className="form-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Inquiry topic"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Your Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell us what you need..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="contact-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending inquiry...' : 'Submit Inquiry'}
                  {!isSubmitting && <Send size={20} />}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .contact-redesign-section {
          padding: 120px 0;
          background: white;
          position: relative;
        }

        .contact-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .contact-card-wrapper {
          display: grid;
          grid-template-columns: 480px 1fr;
          background: white;
          border-radius: 40px;
          overflow: hidden;
          box-shadow: 0px 40px 100px rgba(66, 32, 6, 0.08);
          min-height: 700px;
        }

        .contact-info-panel {
          background: #422006;
          padding: 60px;
          color: white;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .info-tag {
          color: #F0AC00;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 14px;
          margin-bottom: 20px;
          display: block;
        }

        .info-title {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 40px;
          font-weight: 800;
          margin-bottom: 24px;
          line-height: 1.1;
          color: white;
        }

        .info-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 50px;
          line-height: 1.5;
        }

        .info-listing {
          display: flex;
          flex-direction: column;
          gap: 32px;
          position: relative;
          z-index: 2;
        }

        .listing-item {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .listing-icon-box {
          width: 52px;
          height: 52px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #F0AC00;
          flex-shrink: 0;
          border: 1px solid rgba(240, 172, 0, 0.1);
        }

        .listing-text label {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 4px;
        }

        .listing-text span {
          display: block;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: white;
        }

        .info-decoration {
          position: absolute;
          right: -50px;
          bottom: -50px;
          z-index: 1;
        }

        .contact-form-panel {
          padding: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: white;
        }

        .premium-contact-form {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .form-grid-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form-field label {
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: #422006;
        }

        .form-field input, .form-field textarea {
          padding: 18px 24px;
          border-radius: 16px;
          border: 2px solid #F1F1F1;
          background: #FDFAFA;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          transition: all 0.3s ease;
          color: #422006;
        }

        .form-field input:focus, .form-field textarea:focus {
          outline: none;
          border-color: #F0AC00;
          background: white;
          box-shadow: 0px 4px 20px rgba(240, 172, 0, 0.08);
        }

        .contact-submit-btn {
          margin-top: 10px;
          background: #422006;
          color: white;
          padding: 20px;
          border-radius: 16px;
          border: none;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 700;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .contact-submit-btn:hover {
          background: #5D2E08;
          transform: translateY(-2px);
          box-shadow: 0px 10px 30px rgba(66, 32, 6, 0.2);
        }

        .contact-success {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .success-check-icon {
          width: 80px;
          height: 80px;
          background: #F0AC00;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          margin-bottom: 10px;
        }

        .contact-success h3 {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #422006;
          margin: 0;
        }

        .contact-success p {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          color: #6B7280;
          max-width: 400px;
        }

        @media (max-width: 1100px) {
          .contact-card-wrapper {
            grid-template-columns: 1fr;
            border-radius: 32px;
          }
          .contact-info-panel {
            padding: 50px 40px;
          }
          .contact-form-panel {
            padding: 50px 40px;
          }
        }

        @media (max-width: 600px) {
          .form-grid-row {
            grid-template-columns: 1fr;
          }
          .info-title {
            font-size: 32px;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
