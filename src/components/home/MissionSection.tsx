import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { EditableText } from '../admin/InlineEditor';

const MissionSection: React.FC = () => {
  const { content } = useContent();
  return (
    <section className="mission-section">
      <div className="container mission-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mission-content"
        >
          {/* Header styling matched to ServicesSection */}
          <div className="mission-header">
            <span className="section-tag-gold">
              <EditableText
                contentKey="mission.subtitle"
                value={content.mission.subtitle}
              />
            </span>
            <h2 className="section-title-dark">What we believe in</h2>
            <div className="header-underline-gold">
              <svg width="120" height="8" viewBox="0 0 120 8" fill="none">
                <path d="M2 5.5C30 2 90 2 118 5.5" stroke="#F0AC00" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="quote-wrapper">
            <div className="quote-container">
              <span className="quote-mark left">"</span>
              <div className="quote-statement-box">
                <EditableText
                  contentKey="mission.statement"
                  value={content.mission.statement}
                  multiline
                />
              </div>
              <span className="quote-mark right">"</span>
            </div>
            <div className="quote-author">
              ~ <EditableText
                contentKey="mission.author"
                value={content.mission.author || "Nelson Mandela"}
              />
            </div>
          </div>

          <div className="motto-badge">
            <span className="motto-label">School Motto</span>
            <span className="motto-divider"></span>
            <span className="motto-value">
              <EditableText
                contentKey="mission.motto"
                value={content.mission.motto}
              />
            </span>
          </div>
        </motion.div>
      </div>

      <style>{`
        .mission-section {
          padding: 120px 0;
          background: white;
          position: relative;
          overflow: hidden;
        }

        .mission-container {
          max-width: 1232px;
          margin: 0 auto;
        }

        .mission-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 48px; /* Reduced from 64px */
        }

        .mission-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: -12px; /* Pull the quote closer */
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
        }

        .header-underline-gold {
          margin-top: -5px;
        }

        .quote-wrapper {
          width: 100%;
          max-width: 1000px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .quote-container {
          position: relative;
          width: 100%;
          padding: 0 40px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .quote-mark {
          color: #F0AC00;
          font-size: 80px; /* Reduced from 120px */
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 800;
          line-height: 1;
          position: absolute;
          opacity: 0.3;
          user-select: none;
        }

        .quote-mark.left {
          left: -10px;
          top: -20px; /* Adjusted since font is smaller */
        }

        .quote-mark.right {
          right: -10px;
          bottom: -50px; /* Adjusted since font is smaller */
        }

        .quote-statement-box {
          color: #2A1409;
          font-size: 42px;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 700;
          line-height: 1.2;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .quote-author {
          color: #422006;
          font-size: 20px;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          opacity: 0.8;
        }

        .motto-badge {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 12px 32px;
          background: rgba(240, 172, 0, 0.05);
          border-radius: 99px;
          border: 1px solid rgba(240, 172, 0, 0.2);
          backdrop-filter: blur(4px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }

        .motto-label {
          color: #9F691F;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .motto-divider {
          width: 1px;
          height: 20px;
          background: rgba(240, 172, 0, 0.3);
        }

        .motto-value {
          font-weight: 700;
          color: #422006;
          font-size: 16px;
          font-family: 'Instrument Sans', sans-serif;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .mission-section { padding: 80px 0; }
          .section-title-dark { font-size: 32px; }
          .quote-statement-box { font-size: 28px; }
          .quote-mark { font-size: 80px; }
          .quote-container { padding: 0 20px; }
          .motto-badge { padding: 10px 24px; flex-wrap: wrap; justify-content: center; }
        }
      `}</style>
    </section>
  );
};

export default MissionSection;
