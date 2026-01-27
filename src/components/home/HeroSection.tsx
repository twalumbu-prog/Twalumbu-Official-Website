import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { EditableText } from '../admin/InlineEditor';
import hero1 from '../../assets/images/hero-1.png';

const HeroSection: React.FC = () => {
  const { content } = useContent();
  const heroContent = content.hero.slides[0];
  const titleText = heroContent.title;
  const subtitleText = heroContent.subtitle;


  return (
    <section className="hero-container">
      {/* Background Wavy SVG */}
      <motion.div
        className="bg-svg-wrapper"
        initial={{ opacity: 0.3 }}
        animate={{
          x: [-5, 5, -5],
          y: [-2, 4, -2],
        }}
        transition={{
          duration: 30, // Slower/subtler animation
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg width="100%" height="572" viewBox="0 0 1280 572" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M-13 200.416L89.0185 152.896C153.25 124.58 281.941 126.384 297.203 200.416C316.279 292.956 308.815 467.532 116.389 515.053C-37.5508 553.069 42.8649 375.492 116.389 294.957C167.537 238.933 312.962 111.277 485.481 48.8503C632.16 -4.22667 672.117 38.2542 675.188 78.4049C676.227 91.9904 670.143 104.806 662.923 116.361C633.847 162.902 585.191 237.972 560.129 266.445C524.464 306.962 492.946 365.988 583.352 375.492C655.678 383.096 740.225 348.257 779.836 308.726L932.538 164.901C1013.91 88.0505 1189.68 48.8503 1152.55 200.416C1109.95 374.295 918.423 412.635 995.574 515.053C1072.72 617.471 1243.85 457.528 1329 356.484" stroke="#9F691F" strokeOpacity="0.1" strokeWidth="48" />
        </svg>
      </motion.div>

      {/* Main Content (Title) */}
      <div className="hero-text-content">
        {/* Star SVG Decor inside text container */}
        <motion.div
          className="hero-star-wrapper"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.955 0.0835148C29.5659 -0.30313 31.1853 0.689543 31.5722 2.30031C32.5525 6.3835 33.842 12.6594 35.0009 19.9722C39.1496 15.2058 43.5025 10.6999 47.8378 6.96242C49.0927 5.88068 50.9875 6.02105 52.0693 7.2759C53.1511 8.53081 53.0107 10.4255 51.7558 11.5073C46.5097 16.0299 41.193 21.7922 36.2587 27.772C44.9417 29.4822 53.8035 31.7553 61.3007 34.7085C62.8422 35.3158 63.6002 37.0577 62.9931 38.5991C62.3859 40.1406 60.643 40.8987 59.1015 40.2915C52.4745 37.6811 44.6527 35.6138 36.8486 34.0103C37.7958 43.1898 38.2384 52.8072 37.5371 61.2085C37.3992 62.8594 35.9487 64.0864 34.2978 63.9487C32.6469 63.8109 31.4199 62.3604 31.5576 60.7095C32.2257 52.7062 31.7939 43.4465 30.874 34.563C24.3384 43.1227 18.9309 51.3451 15.9765 56.2691C15.1239 57.6893 13.2808 58.1507 11.8603 57.2984C10.44 56.4459 9.97999 54.6027 10.832 53.1821C13.7145 48.378 18.9364 40.4016 25.3261 31.9468C16.1451 30.5246 7.90134 29.7415 2.83199 29.4556C1.17785 29.3622 -0.088441 27.9447 0.00484001 26.2905C0.0984313 24.6366 1.51586 23.3721 3.16988 23.4654C8.90829 23.789 18.7468 24.7361 29.5234 26.5445C29.632 26.4088 29.7415 26.2738 29.8505 26.1382C28.5662 16.8632 26.9312 8.66941 25.7382 3.7007C25.3519 2.08991 26.3443 0.470337 27.955 0.0835148Z" fill="#F0AC00" />
          </svg>
        </motion.div>

        {useContent().editMode ? (
          <div className="editable-hero-titles">
            <h1 className="hero-title">
              <EditableText contentKey="hero.slides.0.title" value={titleText} />
            </h1>
            <h1 className="hero-title subtitle">
              <EditableText contentKey="hero.slides.0.subtitle" value={subtitleText} />
            </h1>
          </div>
        ) : (
          <>
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
              {titleText}
            </motion.h1>
            <motion.h1
              className="hero-title subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
            >
              {subtitleText}
            </motion.h1>
          </>
        )}
        <motion.div
          className="hero-cta-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <Link to="/contact" className="hero-cta-button">
            Contact Us
          </Link>
        </motion.div>
      </div>

      {/* Image Container */}
      <motion.div
        className="hero-image-wrapper"
        initial={{ opacity: 0, scale: 0.9, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 2.5, duration: 1.2, ease: "easeOut" }}
      >
        <div className="image-outer-frame">
          <img
            className="hero-main-img"
            src={hero1}
            alt="Hero"
            width="1033"
            height="450"
            fetchPriority="high"
            loading="eager"
          />
        </div>
      </motion.div>

      <style>{`
        .hero-container {
          width: 100%;
          min-height: 1000px;
          position: relative;
          background: white;
          margin: 0;
          overflow: hidden;
          padding-top: 104px; /* Reduced by 36px as requested */
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .bg-svg-wrapper {
          position: absolute;
          left: 0;
          width: 100%;
          top: 120px;
          pointer-events: none;
          opacity: 0.6;
          z-index: 1;
        }

        .hero-text-content {
          width: 900px;
          height: auto;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          z-index: 10;
        }

        .hero-star-wrapper {
          position: absolute;
          right: 30px;
          top: -30px;
          z-index: 11;
        }

        .hero-title {
          align-self: stretch;
          color: #1C1917; /* stone-900 */
          font-size: 72px;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 0px;
        }

        .hero-title.subtitle {
          font-weight: 800;
        }

        .hero-cta-wrapper {
          margin-top: 24px;
          display: inline-flex;
        }

        .hero-cta-button {
          padding: 12px 24px;
          border-radius: 12px;
          border: 1px solid #1C1917;
          background: white;
          color: #1C1917;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .hero-cta-button:hover {
          background: #1C1917;
          color: white;
        }

        .hero-image-wrapper {
          width: 100%;
          max-width: 1033px;
          aspect-ratio: 16 / 9;
          margin-top: 52px;
          margin-bottom: 60px;
          background: #9F691F;
          border-radius: 20px;
          box-shadow: 0px 8px 0px 0px rgba(42, 20, 9, 0.85);
          outline: 2px solid #1C1917;
          outline-offset: -2px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 18px; /* Increased from 10px to make frame thicker */
          z-index: 5;
          position: relative;
        }

        .image-outer-frame {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          outline: 1px solid #1C1917;
          outline-offset: -1px;
          display: flex;
          overflow: hidden;
        }

        .hero-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
        }

        @media (max-width: 1280px) {
          .hero-container {
            width: 100vw;
            padding-top: 100px;
          }
          .hero-image-wrapper {
            width: 90%;
            height: auto;
          }
          .hero-text-content {
            width: 90%;
          }
          .hero-title {
            font-size: 56px;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 40px;
          }
          .hero-container {
            padding-bottom: 60px;
          }
          .hero-image-wrapper {
            margin-top: 40px;
            aspect-ratio: 1 / 1;
            width: 95%;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
