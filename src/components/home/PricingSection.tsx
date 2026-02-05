import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Info, ChevronDown, FileText, X, CheckCircle2, ClipboardList } from 'lucide-react';
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
    <section className="pricing-premium-section" id="pricing">
      <div className="container pricing-container">
        {/* Premium Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="section-tag-gold">Investment in Future</span>
          <h2 className="section-title-dark">
            <EditableText
              contentKey="pricing.title"
              value={content.pricing.title}
            />
          </h2>
          <div className="header-underline-gold">
            <svg width="120" height="8" viewBox="0 0 120 8" fill="none">
              <path d="M2 5.5C30 2 90 2 118 5.5" stroke="#F0AC00" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
          <p className="section-subtitle">
            <EditableText
              contentKey="pricing.subtitle"
              value={content.pricing.subtitle}
              multiline
            />
          </p>
        </motion.div>

        {/* Unified Content Wrapper */}
        <div className="pricing-content-wrapper">
          {/* Payment Notification Bar */}
          <motion.div
            className="payment-notif-wrapper"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="payment-actions-container">
              <button
                className={`payment-notif-bar ${showHowToPay ? 'active' : ''}`}
                onClick={() => setShowHowToPay(!showHowToPay)}
              >
                <div className="notif-content">
                  <div className="icon-circle">
                    <Info size={20} />
                  </div>
                  <span className="notif-text">How to pay school fees? Click for instructions</span>
                </div>
                <div className={`chevron-wrapper ${showHowToPay ? 'rotate' : ''}`}>
                  <ChevronDown size={20} />
                </div>
              </button>

              <a
                href="https://app.master-fees.com/#details"
                target="_blank"
                rel="noopener noreferrer"
                className="pay-fees-now-btn"
              >
                <CreditCard size={20} />
                <span>Pay Fees Now</span>
              </a>
            </div>

            <AnimatePresence>
              {showHowToPay && (
                <motion.div
                  className="payment-instructions"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="instructions-content">
                    <div className="instruction-card">
                      <div className="inst-icon bank"><CreditCard size={24} /></div>
                      <div className="inst-details">
                        <h4>Bank Deposit</h4>
                        <p><strong>Bank:</strong> Zanaco Bank</p>
                        <p><strong>Account Name:</strong> Twalumbu Education</p>
                        <p><strong>Account No:</strong> 1234567890</p>
                      </div>
                    </div>
                    <div className="instruction-card">
                      <div className="inst-icon mobile"><CreditCard size={24} /></div>
                      <div className="inst-details">
                        <h4>Mobile Money</h4>
                        <p><strong>Airtel Money:</strong> *115#</p>
                        <p><strong>MTN Mobile Money:</strong> *303#</p>
                        <p className="note">(Use Student ID as Reference)</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* School Fees Cards */}
          <div className="fees-grid">
            {schoolFees.map((fee, index) => (
              <motion.div
                key={index}
                className="fee-premium-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <div className="card-image-header">
                  <EditableImage
                    contentKey={`pricing.schoolFees.${index}.image`}
                    src={fee.image}
                    alt={fee.title}
                    className="card-bg-image"
                  />
                  <div className="card-overlay-gradient"></div>
                  <div className="price-badge-floating">
                    <span className="currency">ZMW</span>
                    <span className="amount">
                      <EditableText
                        contentKey={`pricing.schoolFees.${index}.price`}
                        value={fee.price}
                      />
                    </span>
                    <span className="period">
                      <EditableText
                        contentKey={`pricing.schoolFees.${index}.period`}
                        value={fee.period}
                      />
                    </span>
                  </div>
                </div>

                <div className="card-body">
                  <h3 className="card-title">
                    <EditableText
                      contentKey={`pricing.schoolFees.${index}.title`}
                      value={fee.title}
                    />
                  </h3>

                  <div className="card-actions">
                    <button
                      className="requirements-btn"
                      onClick={() => setActiveModal('requirements')}
                    >
                      <span>View Requirements</span>
                      <FileText size={18} />
                    </button>
                    <button
                      className="apply-btn-link"
                      onClick={() => setActiveModal('how-to-apply')}
                    >
                      How to Apply?
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Fees Accordion */}
          <div className="other-fees-section">
            <div className="accordions-wrapper">
              {content.pricing.categoryFees && content.pricing.categoryFees.map((cat, index) => (
                <motion.div
                  key={index}
                  className="accordion-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (index * 0.1) }}
                >
                  <button
                    className={`accordion-header ${openCategory === index ? 'active' : ''}`}
                    onClick={() => toggleCategory(index)}
                  >
                    <span className="accordion-title">{cat.category}</span>
                    <div className={`accordion-icon ${openCategory === index ? 'rotate' : ''}`}>
                      <ChevronDown size={20} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {openCategory === index && (
                      <motion.div
                        className="accordion-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="accordion-inner">
                          <div className="fees-table-wrapper">
                            <table className="fees-table">
                              <thead>
                                <tr>
                                  <th>Description</th>
                                  <th>Amount</th>
                                  <th>Policy</th>
                                </tr>
                              </thead>
                              <tbody>
                                {cat.rows.map((row, rId) => (
                                  <tr key={rId}>
                                    <td className="desc-cell">
                                      <EditableText
                                        contentKey={`pricing.categoryFees.${index}.rows.${rId}.desc`}
                                        value={row.desc}
                                      />
                                    </td>
                                    <td className="price-cell">
                                      <EditableText
                                        contentKey={`pricing.categoryFees.${index}.rows.${rId}.price`}
                                        value={row.price}
                                      />
                                    </td>
                                    <td>
                                      <span className="policy-pill">
                                        <EditableText
                                          contentKey={`pricing.categoryFees.${index}.rows.${rId}.policy`}
                                          value={row.policy}
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="policy-note">
                            <strong>Note: </strong>
                            <EditableText
                              contentKey={`pricing.categoryFees.${index}.policies`}
                              value={cat.policies}
                              multiline
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Overlays */}
      <AnimatePresence>
        {activeModal && (
          <div className="modal-root">
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
            />
            <motion.div
              className="modal-container"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button
                className="modal-close-btn"
                onClick={() => setActiveModal(null)}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {activeModal === 'requirements' ? (
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="modal-icon-wrapper gold">
                      <ClipboardList size={32} />
                    </div>
                    <h2 className="modal-title">Student Requirements</h2>
                    <p className="modal-subtitle">Items needed for each term/year</p>
                  </div>

                  <div className="requirements-list">
                    <div className="requirement-item">
                      <div className="item-check"><CheckCircle2 size={20} /></div>
                      <div className="item-text">
                        <strong>One ream of paper</strong>
                        <span>Per year</span>
                      </div>
                    </div>
                    <div className="requirement-item">
                      <div className="item-check"><CheckCircle2 size={20} /></div>
                      <div className="item-text">
                        <strong>Three rolls of tissue</strong>
                        <span>Per term</span>
                      </div>
                    </div>
                    <div className="requirement-item">
                      <div className="item-check"><CheckCircle2 size={20} /></div>
                      <div className="item-text">
                        <strong>One hand wash or soap</strong>
                        <span>Per term</span>
                      </div>
                    </div>
                  </div>

                  <div className="books-note">
                    <div className="note-icon">
                      <Info size={20} />
                    </div>
                    <p>
                      <strong>Side note:</strong> The child needs books, but the quantity of the books will depend on the grade they are in.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="modal-icon-wrapper brown">
                      <FileText size={32} />
                    </div>
                    <h2 className="modal-title">Application Instructions</h2>
                    <p className="modal-subtitle">Simple steps to join our family</p>
                  </div>

                  <div className="steps-container">
                    <div className="step-item">
                      <div className="step-number">1</div>
                      <div className="step-text">
                        <strong>Assessment</strong>
                        <p>Bring your child for a physical assessment at our campus.</p>
                      </div>
                    </div>
                    <div className="step-item">
                      <div className="step-number">2</div>
                      <div className="step-text">
                        <strong>Online Application</strong>
                        <p>After assessment, click "Apply Now" on our website and fill in basic info.</p>
                      </div>
                    </div>
                    <div className="step-item">
                      <div className="step-number">3</div>
                      <div className="step-text">
                        <strong>Documentation</strong>
                        <p>Upload a picture of your child and their assessment results for our records.</p>
                      </div>
                    </div>
                    <div className="step-item">
                      <div className="step-number">4</div>
                      <div className="step-text">
                        <strong>Fee Payment</strong>
                        <p>Make a payment of <strong>K100</strong> as the enrollment fee.</p>
                      </div>
                    </div>
                    <div className="step-item">
                      <div className="step-number">5</div>
                      <div className="step-text">
                        <strong>Review & Feedback</strong>
                        <p>Application is sent to both emails. Feedback is provided within 1-2 days.</p>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <Link
                      to="/enrol"
                      className="modal-primary-btn"
                      onClick={() => setActiveModal(null)}
                    >
                      Open Application Form
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .pricing-premium-section {
          padding: 120px 0;
          background: #FDFAFA;
          position: relative;
        }

        .pricing-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Header Styles */
        .section-header {
          text-align: center;
          margin-bottom: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .section-tag-gold {
          color: #9F691F;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 14px;
          margin-bottom: 12px;
        }

        .section-title-dark {
          font-size: 48px;
          color: #422006;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 800;
          margin: 0;
          line-height: 1.1;
        }

        .header-underline-gold {
          margin-top: -5px;
          margin-bottom: 24px;
        }

        .section-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          color: #6B7280;
          max-width: 600px;
          line-height: 1.6;
        }

        /* Wrapper */
        .pricing-content-wrapper {
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
        }

        /* Payment Notification */
        .payment-notif-wrapper {
          margin: 0 auto 32px auto;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(66, 32, 6, 0.05);
          overflow: hidden;
          border: 1px solid #F1F1F1;
          width: 100%;
        }

        .payment-actions-container {
          display: flex;
          align-items: stretch;
          width: 100%;
          background: white;
        }

        .pay-fees-now-btn {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #422006;
          color: #F0AC00;
          padding: 20px 30px;
          text-decoration: none;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 700;
          font-size: 16px;
          transition: all 0.2s;
          border-left: 1px solid rgba(240, 172, 0, 0.1);
        }

        .pay-fees-now-btn:hover {
          background: #5d2e0a;
          color: white;
        }

        .payment-notif-bar {
          flex: 1;
          padding: 20px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }

        .payment-notif-bar:hover {
          background: #FFFCF5;
        }

        .payment-notif-bar.active {
          background: #FFFCF5;
          border-bottom: 1px solid #F1F1F1;
        }

        .notif-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(240, 172, 0, 0.1);
          color: #F0AC00;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notif-text {
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 600;
          font-size: 18px;
          color: #422006;
        }

        .chevron-wrapper {
          color: #9F691F;
          transition: transform 0.3s ease;
        }

        .chevron-wrapper.rotate {
          transform: rotate(180deg);
        }

        .instructions-content {
          padding: 30px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          background: #FFFCF5;
        }

        .instruction-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid rgba(240, 172, 0, 0.15);
          display: flex;
          gap: 16px;
        }

        .inst-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #422006;
          color: #F0AC00;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .inst-details h4 {
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 700;
          color: #422006;
          margin-bottom: 8px;
          font-size: 16px;
        }

        .inst-details p {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #4B5563;
          line-height: 1.5;
          margin-bottom: 4px;
        }

        .inst-details .note {
          font-size: 12px;
          color: #9F691F;
          margin-top: 8px;
          font-style: italic;
        }


        /* Fee Cards */
        .fees-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 32px; /* Set to match accordion item margin */
          width: 100%;
        }

        .fee-premium-card {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid #E5E7EB;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }

        .fee-premium-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 40px -5px rgba(66, 32, 6, 0.1);
          border-color: #F0AC00;
        }

        .card-image-header {
          position: relative;
          height: 220px;
          width: 100%;
        }

        .card-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(66, 32, 6, 0.8), transparent);
        }

        .price-badge-floating {
          position: absolute;
          bottom: -20px;
          left: 24px;
          background: #F0AC00;
          color: #422006;
          padding: 12px 20px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(240, 172, 0, 0.3);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 120px;
        }

        .price-badge-floating .currency {
          font-size: 12px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          opacity: 0.9;
        }

        .price-badge-floating .amount {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 28px;
          font-weight: 800;
          line-height: 1;
          margin: 2px 0;
        }

        .price-badge-floating .period {
          font-size: 13px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          opacity: 0.8;
        }

        .card-body {
          padding: 40px 24px 32px 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .card-title {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #422006;
          margin-bottom: 24px;
          text-align: center;
        }

        .card-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: auto;
        }

        .apply-btn-link {
          text-align: center;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #6B7280;
          text-decoration: none;
          transition: color 0.2s;
          padding: 8px;
        }

        .apply-btn-link:hover {
          color: #422006;
          text-decoration: underline;
        }

        .requirements-btn {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: 2px solid #E5E7EB;
          background: transparent;
          color: #422006;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 700;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .requirements-btn:hover {
          border-color: #422006;
          background: #422006;
          color: white;
        }

        /* Other Fees */
        .other-fees-section {
          width: 100%;
        }

        .accordion-item {
          margin-bottom: 32px; /* Set to match grid margin for consistent vertical flow */
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          background: white;
          overflow: hidden;
        }

        .accordion-item:last-child {
          margin-bottom: 0;
        }

        .accordion-header {
          width: 100%;
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }

        .accordion-header:hover {
          background: #F9FAFB;
        }

        .accordion-header.active {
          background: #FFFCF5;
        }

        .accordion-title {
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 700;
          font-size: 18px;
          color: #422006;
        }

        .accordion-icon {
          color: #9F691F;
          transition: transform 0.3s;
        }

        .accordion-icon.rotate {
          transform: rotate(180deg);
        }

        .accordion-body {
          background: white;
          border-top: 1px solid #E5E7EB;
        }

        .accordion-inner {
          padding: 24px;
        }

        .fees-table-wrapper {
          overflow-x: auto;
          margin-bottom: 20px;
        }

        .fees-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }

        .fees-table th {
          text-align: left;
          padding: 12px 16px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #6B7280;
          border-bottom: 2px solid #E5E7EB;
        }

        .fees-table td {
          padding: 16px;
          border-bottom: 1px solid #F3F4F6;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 500;
          color: #1F2937;
        }

        .fees-table tr:last-child td {
          border-bottom: none;
        }

        .desc-cell {
          color: #422006;
          font-weight: 600 !important;
        }

        .price-cell {
          color: #F0AC00;
          font-weight: 700 !important;
        }

        .policy-pill {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          background: #F3F4F6;
          color: #6B7280;
          font-size: 12px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
        }

        .policy-note {
          background: #FFFCF5;
          padding: 16px;
          border-radius: 8px;
          border-left: 4px solid #F0AC00;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #4B5563;
          line-height: 1.5;
        }

        .policy-note strong {
          color: #422006;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .fees-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .section-title-dark {
            font-size: 36px;
          }
          
          .instructions-content {
            grid-template-columns: 1fr;
          }

          .payment-notif-bar {
            padding: 16px;
          }

          .notif-text {
            font-size: 15px;
          }

          .fees-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .payment-actions-container {
            flex-direction: column-reverse;
          }

          .pay-fees-now-btn {
            border-left: none;
            border-bottom: 1px solid rgba(240, 172, 0, 0.1);
            justify-content: center;
            width: 100%;
          }

          .fee-premium-card {
            margin-bottom: 10px;
          }
        }

        /* Modal Styles */
        .modal-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(66, 32, 6, 0.4);
          backdrop-filter: blur(8px);
        }

        .modal-container {
          position: relative;
          background: white;
          width: 100%;
          max-width: 540px;
          border-radius: 32px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .modal-close-btn {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #F9FAFB;
          border: none;
          color: #4B5563;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 10;
        }

        .modal-close-btn:hover {
          background: #EEF2F6;
          color: #422006;
          transform: rotate(90deg);
        }

        .modal-content {
          padding: 48px;
        }

        .modal-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .modal-icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px auto;
        }

        .modal-icon-wrapper.gold {
          background: rgba(240, 172, 0, 0.1);
          color: #F0AC00;
        }

        .modal-icon-wrapper.brown {
          background: rgba(66, 32, 6, 0.1);
          color: #422006;
        }

        .modal-title {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #422006;
          margin-bottom: 8px;
        }

        .modal-subtitle {
          color: #6B7280;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
        }

        /* Requirements List */
        .requirements-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }

        .requirement-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: #F9FAFB;
          border-radius: 20px;
          border: 1px solid #F1F1F1;
          transition: all 0.2s;
        }

        .requirement-item:hover {
          background: white;
          border-color: #F0AC00;
          transform: translateX(8px);
          box-shadow: 0 4px 12px rgba(240, 172, 0, 0.1);
        }

        .item-check {
          color: #F0AC00;
          margin-top: 2px;
        }

        .item-text {
          display: flex;
          flex-direction: column;
        }

        .item-text strong {
          color: #422006;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 18px;
          font-weight: 700;
        }

        .item-text span {
          color: #6B7280;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
        }

        .books-note {
          display: flex;
          gap: 12px;
          padding: 20px;
          background: #FFFCF5;
          border-radius: 16px;
          border: 1px dashed #F0AC00;
        }

        .note-icon {
          color: #F0AC00;
          flex-shrink: 0;
        }

        .books-note p {
          font-size: 14px;
          color: #4B5563;
          line-height: 1.6;
          margin: 0;
        }

        /* Steps Style */
        .steps-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 40px;
        }

        .step-item {
          display: flex;
          gap: 20px;
          position: relative;
        }

        .step-item:not(:last-child):after {
          content: '';
          position: absolute;
          left: 18px;
          top: 44px;
          bottom: -20px;
          width: 2px;
          background: #E5E7EB;
          opacity: 0.5;
        }

        .step-number {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #422006;
          color: #F0AC00;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 800;
          font-size: 16px;
          flex-shrink: 0;
          z-index: 1;
        }

        .step-text strong {
          display: block;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #422006;
          margin-bottom: 4px;
        }

        .step-text p {
          color: #6B7280;
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
        }

        .modal-footer {
          margin-top: 8px;
        }

        .modal-primary-btn {
          width: 100%;
          display: block;
          text-align: center;
          background: #422006;
          color: white;
          padding: 18px;
          border-radius: 16px;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 700;
          font-size: 16px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .modal-primary-btn:hover {
          background: #5d2e0a;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(66, 32, 6, 0.2);
        }

        /* Mobile specific modal adjustments */
        @media (max-width: 640px) {
          .modal-content {
            padding: 32px 24px;
          }
          .modal-title {
            font-size: 26px;
          }
          .modal-container {
            border-radius: 24px;
          }
          .requirement-item {
            padding: 16px;
          }
          .item-text strong {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default PricingSection;
