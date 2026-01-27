import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Info, ChevronDown, FileText } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { EditableText, EditableImage } from '../admin/InlineEditor';

const PricingSection: React.FC = () => {
  const { content } = useContent();
  const schoolFees = content.pricing.schoolFees;
  const [showHowToPay, setShowHowToPay] = useState(false);
  const [openCategory, setOpenCategory] = useState<number | null>(null);

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

                  <button className="requirements-btn">
                    <span>View Requirements</span>
                    <FileText size={18} />
                  </button>
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

        .payment-notif-bar {
          width: 100%;
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

          .fee-premium-card {
            margin-bottom: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default PricingSection;
