import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { EditableText } from '../admin/InlineEditor';

const MarketingSummary: React.FC = () => {
  const { content } = useContent();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Education':
        return (
          <div className="stat-icon-wrapper">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <svg x="8.07" y="6.25" width="63" height="49" viewBox="0 0 63 49" fill="none">
                  <path d="M25.3359 3.66018L6.52344 15.9414C0.492188 19.8789 0.492188 28.6914 6.52344 32.6289L25.3359 44.9102C28.7109 47.1289 34.2734 47.1289 37.6484 44.9102L56.3672 32.6289C62.3672 28.6914 62.3672 19.9102 56.3672 15.9727L37.6484 3.69143C34.2734 1.44143 28.7109 1.44143 25.3359 3.66018Z" stroke="#DAA756" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg x="17.56" y="40.88" width="44" height="32" viewBox="0 0 44 32" fill="none">
                  <path d="M2.03125 2L2 16.6563C2 20.625 5.0625 24.875 8.8125 26.125L18.7812 29.4375C20.5 30 23.3437 30 25.0937 29.4375L35.0625 26.125C38.8125 24.875 41.875 20.625 41.875 16.6563V2.15625" stroke="#DAA756" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg x="66.88" y="28.13" width="4" height="23" viewBox="0 0 4 23" fill="none">
                  <path d="M2 20.75V2" stroke="#DAA756" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </g>
            </svg>
          </div>
        );
      case 'Programs':
        return (
          <div className="stat-icon-wrapper">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <svg x="13.31" y="15.63" width="53" height="58" viewBox="0 0 53 58" fill="none">
                  <path d="M2 20.8047V36.3359C2 42.0234 2 42.0234 7.375 45.6484L22.1562 54.1797C24.375 55.4609 28 55.4609 30.2187 54.1797L45 45.6484C50.375 42.0234 50.375 42.0234 50.375 36.3359V20.8047C50.375 15.1172 50.375 15.1172 45 11.4922L30.2187 2.96094C28 1.67969 24.375 1.67969 22.1562 2.96094L7.375 11.4922C2 15.1172 2 15.1172 2 20.8047Z" stroke="#DAA756" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg x="20.31" y="6.25" width="39" height="22" viewBox="0 0 39 22" fill="none">
                  <path d="M36.375 19.5938V11.375C36.375 5.125 33.25 2 27 2H11.375C5.125 2 2 5.125 2 11.375V19.375" stroke="#DAA756" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg x="27.24" y="33.08" width="25" height="24" viewBox="0 0 25 24" fill="none">
                  <path d="M14.23 3.26563L16.0113 6.04688C16.2925 6.48438 16.9175 6.92188 17.3863 7.04688L20.5738 7.85938C22.5425 8.35938 23.0738 10.0469 21.7925 11.6094L19.6988 14.1406C19.3863 14.5469 19.1363 15.2656 19.1675 15.7656L19.355 19.0469C19.48 21.0781 18.0425 22.1094 16.1675 21.3594L13.105 20.1406C12.6363 19.9531 11.855 19.9531 11.3863 20.1406L8.32378 21.3594C6.44878 22.1094 5.01128 21.0469 5.13628 19.0469L5.32378 15.7656C5.35503 15.2656 5.10503 14.5156 4.79253 14.1406L2.69878 11.6094C1.41753 10.0469 1.94878 8.35938 3.91753 7.85938L7.10503 7.04688C7.60503 6.92188 8.23003 6.45313 8.48003 6.04688L10.2613 3.26563C11.3863 1.57813 13.1363 1.57813 14.23 3.26563Z" stroke="#DAA756" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </g>
            </svg>
          </div>
        );
      case 'Ratio':
        return (
          <div className="stat-icon-wrapper">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <svg x="7.03" y="18.75" width="65" height="54" viewBox="0 0 65 54" fill="none">
                  <path d="M19.9713 52H44.9713C57.5338 52 59.7838 46.9688 60.44 40.8438L62.7838 15.8438C63.6275 8.21875 61.44 2 48.0963 2H16.8463C3.50251 2 1.31501 8.21875 2.15876 15.8438L4.50251 40.8438C5.15876 46.9688 7.40876 52 19.9713 52Z" stroke="#DAA756" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg x="25" y="6.25" width="29" height="17" viewBox="0 0 29 17" fill="none">
                  <path d="M2 14.5V12C2 6.46875 2 2 12 2H17C27 2 27 6.46875 27 12V14.5" stroke="#DAA756" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg x="31.25" y="37.50" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path d="M14.5 5.125V8.25C14.5 8.28125 14.5 8.28125 14.5 8.3125C14.5 11.7188 14.4688 14.5 8.25 14.5C2.0625 14.5 2 11.75 2 8.34375V5.125C2 2 2 2 5.125 2H11.375C14.5 2 14.5 2 14.5 5.125Z" stroke="#DAA756" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg x="43.75" y="34.38" width="28" height="14" viewBox="0 0 28 14" fill="none">
                  <path d="M25.9062 2.00012C18.6875 7.25012 10.4375 10.3751 2 11.4376" stroke="#DAA756" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg x="8.19" y="35.22" width="28" height="13" viewBox="0 0 28 13" fill="none">
                  <path d="M2 2.00024C9.03125 6.81274 16.9688 9.71899 25.0625 10.6252" stroke="#DAA756" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </g>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="marketing-summary" id="offers">
      {/* Decorative wavy background */}
      <div className="wavy-bg">
        <svg width="1280" height="408" viewBox="0 0 1280 408" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-41 194.735L59.4221 147.94C122.648 120.056 249.326 121.833 264.349 194.735C283.127 285.863 275.779 457.773 86.3646 504.568C-65.1666 542.004 13.9907 367.138 86.3646 287.833C136.712 232.664 279.861 106.957 449.68 45.4832C619.5 -15.9909 672.096 71.6691 635.012 94.7412C573.5 133.012 517.338 207.307 493.5 242.512C461.84 289.268 457.028 357.779 546.02 367.138C617.214 374.625 700.438 340.319 739.43 301.391L818 222.512L858 187.512L910.5 148.012C990.595 72.3352 1142.86 45.4832 1106.31 194.735C1064.38 365.959 875.848 403.714 951.791 504.568C1027.73 605.422 1196.18 447.921 1280 348.42" stroke="white" strokeOpacity="0.04" strokeWidth="48" />
        </svg>
      </div>

      <div className="container stats-container">
        {/* Section header */}
        <motion.div
          className="stats-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="header-line-1">The right start Changes</h2>
          <h2 className="header-line-2">Everything!</h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          className="stats-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
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
          {content.marketing.highlights.map((item, index) => (
            <motion.div
              key={index}
              className="stat-item"
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
            >
              {getIcon(item.icon)}
              <div className="stat-content">
                <div className="stat-number">
                  <EditableText
                    contentKey={`marketing.highlights.${index}.title`}
                    value={item.title}
                  />
                </div>
                <div className="stat-label">
                  <EditableText
                    contentKey={`marketing.highlights.${index}.description`}
                    value={item.description}
                    multiline
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .marketing-summary {
          width: 100%;
          margin: 0;
          padding: 36px 0 80px;
          position: relative;
          background: #422006;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          overflow: hidden;
        }

        .wavy-bg {
          position: absolute;
          left: -41px;
          top: 115px;
          pointer-events: none;
          opacity: 1;
          z-index: 0;
        }

        .stats-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1280px;
          padding: 0 40px;
        }

        .stats-header {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .header-line-1,
        .header-line-2 {
          align-self: stretch;
          text-align: left;
          font-size: 36px;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 700;
          line-height: 1.1;
          margin: 0;
        }

        .header-line-1 {
          color: white;
        }

        .header-line-2 {
          color: #FED7AA;
        }

        .stats-grid {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 0;
        }

        .stat-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          gap: 24px;
        }

        .stat-icon-wrapper {
          width: 80px;
          height: 80px;
          position: relative;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          gap: 4px;
        }

        .stat-number {
          align-self: stretch;
          text-align: center;
          color: white;
          font-size: 60px;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          line-height: 1.2;
        }

        .stat-label {
          width: 176px;
          text-align: center;
          color: white;
          font-size: 20px;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          line-height: 1.4;
        }

        @media (max-width: 1280px) {
          .marketing-summary {
            padding: 36px 48px 80px;
          }
        }

        @media (max-width: 768px) {
          .marketing-summary {
            padding: 36px 24px 60px;
          }

          .stats-grid {
            flex-direction: column;
            gap: 48px;
          }

          .header-line-1,
          .header-line-2 {
            font-size: 28px;
            line-height: 1.3;
          }

          .stat-number {
            font-size: 48px;
          }

          .stat-label {
            font-size: 18px;
            width: auto;
            max-width: 200px;
          }
        }
      `}</style>
    </section>
  );
};

export default MarketingSummary;
