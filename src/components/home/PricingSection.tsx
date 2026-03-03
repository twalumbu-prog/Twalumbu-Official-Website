import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Info, ChevronDown, FileText, X, CheckCircle2, ClipboardList, ArrowRight } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { EditableText, EditableImage } from '../admin/InlineEditor';

const PricingSection: React.FC = () => {
  const { content } = useContent();
  const schoolFees = content.pricing.schoolFees;
  const [showHowToPay, setShowHowToPay] = useState(false);
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<'requirements' | 'how-to-apply' | null>(null);

  const toggleCategory = (index: number) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <section className="pricing-refined-section" id="pricing">
      <div className="pricing-inner-container">
        {/* Minimal Header */}
        <motion.div
          className="pricing-header-v2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="premium-accent-tag">Investment in Excellence</span>
          <h2 className="premium-display-title">
            <EditableText
              contentKey="pricing.title"
              value={content.pricing.title}
            />
          </h2>
          <p className="premium-lead-text">
            <EditableText
              contentKey="pricing.subtitle"
              value={content.pricing.subtitle}
              multiline
            />
          </p>
        </motion.div>

        {/* Action Bar */}
        <div className="pricing-action-bar">
          <button
            className={`how-to-pay-trigger ${showHowToPay ? 'active' : ''}`}
            onClick={() => setShowHowToPay(!showHowToPay)}
          >
            <Info size={18} />
            <span>Payment Instructions</span>
            <ChevronDown size={18} className={showHowToPay ? 'rotate' : ''} />
          </button>

          <a
            href="https://app.master-fees.com/#details"
            target="_blank"
            rel="noopener noreferrer"
            className="direct-pay-button"
          >
            <CreditCard size={18} />
            <span>Pay Fees Online</span>
          </a>
        </div>

        <AnimatePresence>
          {showHowToPay && (
            <motion.div
              className="payment-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="drawer-grid">
                <div className="drawer-card">
                  <h4>Bank Transfer</h4>
                  <div className="data-row"><span>Bank</span><strong>Zanaco Bank</strong></div>
                  <div className="data-row"><span>Account</span><strong>Twalumbu Education</strong></div>
                  <div className="data-row"><span>No.</span><strong>1234567890</strong></div>
                </div>
                <div className="drawer-card">
                  <h4>Mobile Money</h4>
                  <div className="data-row"><span>Airtel</span><strong>*115#</strong></div>
                  <div className="data-row"><span>MTN</span><strong>*303#</strong></div>
                  <p className="ref-note">Use Student ID as Reference</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Refined Cards Grid */}
        <div className="refined-pricing-grid">
          {schoolFees.map((fee, index) => (
            <motion.div
              key={index}
              className="minimal-fee-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card-visual">
                <EditableImage
                  contentKey={`pricing.schoolFees.${index}.image`}
                  src={fee.image}
                  alt={fee.title}
                />
                <div className="card-price-overlay">
                  <div className="price-stack">
                    <span className="unit">ZMW</span>
                    <span className="val">
                      <EditableText contentKey={`pricing.schoolFees.${index}.price`} value={fee.price} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="card-info">
                <h3 className="card-stage-title">
                  <EditableText contentKey={`pricing.schoolFees.${index}.title`} value={fee.title} />
                </h3>
                <div className="card-features-list">
                  {fee.features.map((f, i) => (
                    <div key={i} className="feat-item">
                      <CheckCircle2 size={14} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <div className="card-footer-buttons">
                  <button className="primary-outlined-btn" onClick={() => setActiveModal('requirements')}>
                    Requirements
                  </button>
                  <button className="text-cta-btn" onClick={() => setActiveModal('how-to-apply')}>
                    Process <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Segmented Accordions */}
        <div className="extra-fees-wrapper">
          {content.pricing.categoryFees && content.pricing.categoryFees.map((cat, index) => (
            <div key={index} className="minimal-accordion">
              <button
                className={`accordion-trigger ${openCategory === index ? 'open' : ''}`}
                onClick={() => toggleCategory(index)}
              >
                <span>{cat.category}</span>
                <ChevronDown size={20} />
              </button>

              <AnimatePresence>
                {openCategory === index && (
                  <motion.div
                    className="accordion-content-area"
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                  >
                    <div className="table-responsive">
                      <table className="refined-table">
                        <tbody>
                          {cat.rows.map((row, rId) => (
                            <tr key={rId}>
                              <td className="row-desc">{row.desc}</td>
                              <td className="row-price">{row.price}</td>
                              <td className="row-policy"><span>{row.policy}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Modals - Reusing existing logic but refining style */}
      <AnimatePresence>
        {activeModal && (
          <div className="modal-root-refined">
            <motion.div className="modal-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} />
            <motion.div className="modal-box" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <button className="close-x" onClick={() => setActiveModal(null)}><X size={20} /></button>

              {activeModal === 'requirements' ? (
                <div className="modal-body-p">
                  <div className="modal-icon-badge"><ClipboardList size={28} /></div>
                  <h3>Student Requirements</h3>
                  <div className="req-grid-v2">
                    <div className="req-v2"><strong>One ream of paper</strong><span>Per year</span></div>
                    <div className="req-v2"><strong>Three rolls of tissue</strong><span>Per term</span></div>
                    <div className="req-v2"><strong>One hand wash/soap</strong><span>Per term</span></div>
                  </div>
                  <p className="note-p">Note: Book quantities depend on the grade level.</p>
                </div>
              ) : (
                <div className="modal-body-p">
                  <div className="modal-icon-badge"><FileText size={28} /></div>
                  <h3>Application Steps</h3>
                  <div className="steps-v2">
                    {[
                      { s: 'Assessment', d: 'Visit campus for a physical assessment.' },
                      { s: 'Apply Online', d: 'Use our website for basic documentation.' },
                      { s: 'Documentation', d: 'Upload IDs and recent results.' },
                      { s: 'Fee Payment', d: 'Enrollment fee of K100.' },
                    ].map((step, i) => (
                      <div key={i} className="step-v2">
                        <div className="n">{i + 1}</div>
                        <div className="c"><strong>{step.s}</strong><p>{step.d}</p></div>
                      </div>
                    ))}
                  </div>
                  <Link to="/enrol" className="apply-v2-btn" onClick={() => setActiveModal(null)}>Apply Now</Link>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .pricing-refined-section {
          padding: 120px 0;
          background: #fafaf9; /* stone-50 */
          color: #2A1409;
        }

        .pricing-inner-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .pricing-header-v2 {
          text-align: center;
          margin-bottom: 60px;
        }

        .premium-accent-tag {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #9F691F;
          font-weight: 800;
          margin-bottom: 12px;
          display: block;
        }

        .premium-display-title {
          font-size: 48px;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .premium-lead-text {
          font-size: 18px;
          color: #57534e;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .pricing-action-bar {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 40px;
        }

        .how-to-pay-trigger, .direct-pay-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }

        .how-to-pay-trigger {
          background: #fff;
          border: 1px solid #e7e5e4;
          color: #57534e;
        }

        .direct-pay-button {
          background: #2A1409;
          color: #F0AC00;
          text-decoration: none;
        }

        .payment-drawer {
          background: #fff;
          border-radius: 24px;
          margin-bottom: 40px;
          overflow: hidden;
          border: 1px solid #e7e5e4;
        }

        .drawer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 32px;
          gap: 32px;
        }

        .drawer-card h4 {
          margin-bottom: 16px;
          font-weight: 800;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .data-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #f5f5f4;
          font-size: 14px;
        }

        .refined-pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-bottom: 60px;
        }

        .minimal-fee-card {
          background: #fff;
          border-radius: 32px;
          overflow: hidden;
          border: 1px solid #e7e5e4;
          transition: 0.3s;
        }

        .minimal-fee-card:hover {
          border-color: #F0AC00;
          box-shadow: 0 20px 40px rgba(0,0,0,0.04);
        }

        .card-visual {
          height: 200px;
          position: relative;
        }

        .card-visual img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-price-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
          color: #fff;
        }

        .price-stack {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .unit { font-size: 12px; font-weight: 800; opacity: 0.9; }
        .val { font-size: 28px; font-weight: 800; }

        .card-info {
          padding: 24px;
        }

        .card-stage-title {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .card-features-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }

        .feat-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #57534e;
        }

        .card-footer-buttons {
          display: flex;
          gap: 12px;
        }

        .primary-outlined-btn {
          flex: 1;
          padding: 10px;
          border-radius: 12px;
          border: 1px solid #e7e5e4;
          background: #fff;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
        }

        .text-cta-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 800;
          font-size: 13px;
          color: #9F691F;
          cursor: pointer;
          background: none;
          border: none;
        }

        .extra-fees-wrapper {
          max-width: 800px;
          margin: 0 auto;
        }

        .minimal-accordion {
          margin-bottom: 12px;
          background: #fff;
          border: 1px solid #e7e5e4;
          border-radius: 16px;
          overflow: hidden;
        }

        .accordion-trigger {
          width: 100%;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;
          border: none;
          font-weight: 800;
          font-size: 15px;
          cursor: pointer;
        }

        .refined-table {
          width: 100%;
          border-collapse: collapse;
        }

        .refined-table td {
          padding: 12px 24px;
          border-top: 1px solid #f5f5f4;
          font-size: 14px;
        }

        .row-price { font-weight: 800; text-align: right; }
        .row-policy { text-align: right; }
        .row-policy span { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #9F691F; }

        .modal-root-refined {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .modal-bg { position: absolute; inset: 0; background: rgba(42, 20, 9, 0.4); backdrop-filter: blur(4px); }
        .modal-box {
          position: relative;
          background: #fff;
          width: 100%;
          max-width: 500px;
          border-radius: 32px;
          padding: 40px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.1);
        }

        .close-x { position: absolute; top: 24px; right: 24px; background: none; border: none; cursor: pointer; color: #a8a29e; }
        
        .modal-icon-badge {
          width: 64px;
          height: 64px;
          background: #fefce8;
          color: #ca8a04;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .req-grid-v2 { display: flex; flex-direction: column; gap: 16px; margin: 24px 0; }
        .req-v2 { display: flex; flex-direction: column; }
        .req-v2 strong { font-size: 15px; }
        .req-v2 span { font-size: 13px; color: #78716c; }

        .steps-v2 { display: flex; flex-direction: column; gap: 20px; margin: 24px 0; }
        .step-v2 { display: flex; gap: 16px; }
        .step-v2 .n { width: 32px; height: 32px; background: #2A1409; color: #F0AC00; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: 800; }
        .step-v2 .c strong { display: block; margin-bottom: 4px; }
        .step-v2 .c p { font-size: 13px; color: #78716c; }

        .apply-v2-btn { width: 100%; display: block; text-align: center; background: #2A1409; color: #F0AC00; padding: 16px; border-radius: 100px; font-weight: 800; text-decoration: none; margin-top: 24px; }

        @media (max-width: 1024px) {
          .refined-pricing-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 768px) {
          .refined-pricing-grid { grid-template-columns: 1fr; }
          .drawer-grid { grid-template-columns: 1fr; }
          .premium-display-title { font-size: 32px; }
        }
      `}</style>
    </section>
  );
};

export default PricingSection;
