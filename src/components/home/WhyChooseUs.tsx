import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { EditableText, EditableImage } from '../admin/InlineEditor';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    };
  },
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0
    };
  }
};

const WhyChooseUs: React.FC = () => {
  const { content } = useContent();
  const features = content.whyUs.features;
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = Math.abs(page % features.length);
  const navigate = useNavigate();

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const downloadBrochure = (path: string) => {
    console.log(`Downloading brochure from: ${path}`);
    alert("Starting brochure download... (This would be a real PDF download in production)");
  };

  return (
    <section className="why-us-redesign-wrapper" id="why-us">
      {/* Centered Section Header on White Background */}
      <div className="container">
        <motion.div
          className="why-us-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="section-tag-gold">Why Our School</span>
          <h2 className="section-title-dark">
            Perfect for your child
          </h2>
          <div className="header-underline-gold">
            <svg width="120" height="8" viewBox="0 0 120 8" fill="none">
              <path d="M2 5.5C30 2 90 2 118 5.5" stroke="#F0AC00" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Brown Carousel Section */}
      <motion.div
        className="why-us-carousel-box"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        {/* Decorative background SVG */}
        <div className="wavy-bg-wrapper">
          <svg width="1280" height="400" viewBox="0 0 1280 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-40 194.735L60.4221 147.94C123.648 120.056 250.326 121.833 265.349 194.735C284.127 285.862 276.779 457.773 87.3646 504.568C-65.1666 542.004 14.9907 367.138 87.3646 287.833C137.712 232.664 280.861 106.957 450.68 45.4831C620.5 -15.991 673.096 71.6691 636.012 94.7411C574.5 133.012 518.338 207.307 494.5 242.512C462.84 289.268 458.028 357.779 547.02 367.138C618.214 374.625 701.438 340.319 740.43 301.391L819 222.512L859 187.512L911.5 148.012C991.595 72.3351 1143.86 45.4831 1107.31 194.735C1065.38 365.959 876.848 403.714 952.791 504.568C1028.73 605.422 1197.18 447.921 1281 348.42" stroke="white" strokeOpacity="0.05" strokeWidth="48" />
          </svg>
        </div>

        <div className="container why-us-container">
          <div className="why-us-grid">
            {/* Left Column: Animated Content + Fixed Nav */}
            <div className="why-us-content-side">
              <div className="carousel-text-area">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(_, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);

                      if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                      } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                      }
                    }}
                    className="slide-text-content"
                  >
                    <div className="slide-header-vertical">
                      <div className="slide-icon-container">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M27.8066 9.19922C37.3375 -0.331619 50.9556 -1.60493 58.2266 5.66602C65.4958 12.9353 64.1924 26.5519 54.6934 36.085C49.5222 41.2561 42.1634 44.1957 37.1875 44.2588C34.6614 44.2908 31.2704 44.0744 27.9355 44.5312C24.5493 44.9952 21.0478 46.1632 18.1592 49.0518L4.73242 62.4775L1.41406 59.1592L14.8408 45.7334C17.7294 42.8448 18.8974 39.3433 19.3613 35.957C19.8182 32.6222 19.6008 29.2312 19.6328 26.7051C19.6958 21.6966 22.6349 14.3709 27.8066 9.19922ZM54.6328 8.68945C51.7866 6.05835 47.7173 5.23321 43.5566 5.8877C39.2543 6.56457 34.7483 8.82984 31.0928 12.4854C27.4368 16.1414 25.1719 20.6559 24.4951 24.9619C23.8198 29.2596 24.7196 33.4598 27.5596 36.2998L27.5615 36.3018C30.4168 39.1385 34.6143 40.0388 38.9092 39.3633C43.2117 38.6865 47.7184 36.4222 51.374 32.7666C55.0301 29.1105 57.295 24.5952 57.9717 20.2891C58.6469 15.9916 57.747 11.792 54.9072 8.95215L54.9053 8.9502L54.6328 8.68945Z" stroke="#F8C23A" strokeWidth="2" />
                          <path d="M13.333 1C16.4804 1 19.6558 2.20367 22.0596 4.60742V4.60645C26.8714 9.45117 26.8672 17.252 22.0596 22.0596C19.6558 24.4633 16.4804 25.667 13.333 25.667C10.2841 25.6669 7.20945 24.5371 4.83496 22.2812L4.60742 22.0596C-0.204213 17.2148 -0.200115 9.41496 4.60742 4.60742C7.01109 2.20375 10.1858 1.00008 13.333 1ZM13.333 5.66699C11.3046 5.66708 9.34897 6.46939 7.92578 7.89258C4.93543 10.883 4.9356 15.7497 7.92578 18.7402V18.7393C9.35116 20.1984 11.3073 20.9999 13.333 21C15.3615 21 17.317 20.1967 18.7402 18.7734C21.7277 15.7859 21.7306 10.9268 18.749 7.93555H18.75C17.3238 6.47083 15.3629 5.66699 13.333 5.66699Z" stroke="#F8C23A" strokeWidth="2" />
                        </svg>
                      </div>
                      <h3 className="slide-heading">
                        <EditableText contentKey={`whyUs.features.${imageIndex}.title`} value={features[imageIndex].title} />
                      </h3>
                    </div>
                    <p className="slide-description">
                      <EditableText contentKey={`whyUs.features.${imageIndex}.description`} value={features[imageIndex].description} multiline />
                    </p>

                    {/* CTA Buttons - animated within slide content */}
                    <div className="slide-cta-buttons">
                      <button className="btn-apply-now" onClick={() => navigate('/enrol')}>
                        Apply Now <ArrowRight size={18} />
                      </button>
                      <button className="btn-download-brochure" onClick={() => downloadBrochure(features[imageIndex].brochure)}>
                        Download Brochure <Download size={18} />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Dots - Swipe Indicator */}
              <div className="carousel-nav-container">
                <div className="carousel-nav-wrapper">
                  <button className="nav-circle-btn" onClick={() => paginate(-1)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button className="nav-circle-btn" onClick={() => paginate(1)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <div className="carousel-dots">
                  {features.map((_, idx) => (
                    <div
                      key={idx}
                      className={`dot ${idx === imageIndex ? 'active' : ''}`}
                      onClick={() => {
                        const diff = idx - imageIndex;
                        if (diff !== 0) paginate(diff);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Animated Image */}
            <div className="why-us-image-side">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="image-outer-wrapper"
                >
                  <div className="image-premium-frame">
                    <div className="image-inner-container">
                      <EditableImage
                        contentKey={`whyUs.features.${imageIndex}.image`}
                        src={features[imageIndex].image}
                        alt={features[imageIndex].title}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .why-us-redesign-wrapper {
          width: 100%;
          background: white;
          padding: 80px 0;
          overflow: hidden;
        }

        .why-us-header {
          text-align: center;
          margin-bottom: 32px;
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
        }

        .header-underline-gold {
          margin-top: -5px;
        }

        .why-us-carousel-box {
          background: #422006;
          padding: 100px 0;
          position: relative;
          overflow: hidden;
        }

        .why-us-container {
          position: relative;
          z-index: 10;
          max-width: 1280px;
          margin: 0 auto;
        }

        .why-us-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .why-us-content-side {
          display: flex;
          flex-direction: column;
          gap: 32px;
          min-height: 480px;
          position: relative;
        }

        .carousel-text-area {
          position: relative;
        }

        .slide-text-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .slide-header-vertical {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 8px;
        }

        .slide-icon-container {
          flex-shrink: 0;
        }

        .slide-heading {
          color: white;
          font-size: 32px;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 700;
          line-height: 1.2;
          margin: 0;
        }

        .slide-description {
          color: white;
          font-size: 18px;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          line-height: 1.5;
          max-width: 480px;
          margin: 0 0 24px 0;
        }

        .slide-cta-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-apply-now {
          padding: 14px 28px;
          background: #F0AC00;
          color: #1C1917;
          border: none;
          border-radius: 12px;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-apply-now:hover {
          background: #D99B00;
          transform: translateY(-2px);
        }

        .btn-download-brochure {
          padding: 14px 28px;
          background: transparent;
          color: white;
          border: 1px solid white;
          border-radius: 12px;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-download-brochure:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .carousel-nav-wrapper {
          display: flex;
          gap: 16px;
        }

        .nav-circle-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 2px solid white;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .nav-circle-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .why-us-image-side {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 480px;
        }

        .image-outer-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .image-premium-frame {
          width: 520px;
          height: 480px;
          background: #9F691F;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0px 16px 0px 0px rgba(55, 31, 6, 1);
          outline: 1px solid #1C1917;
          outline-offset: -1px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .image-inner-container {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          outline: 1px solid #1C1917;
          outline-offset: -1px;
          overflow: hidden;
        }

        .image-inner-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }

        .wavy-bg-wrapper {
          position: absolute;
          left: -40px;
          top: 246px;
          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 1024px) {
          .why-us-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .why-us-content-side {
            min-height: auto;
          }
          .why-us-image-side {
            min-height: auto;
            order: -1;
          }
          .image-premium-frame {
            width: 100%;
            height: auto;
            aspect-ratio: 520/480;
          }
        }

        @media (max-width: 600px) {
          .why-us-carousel-box {
            padding: 60px 0;
          }
          .section-title-dark {
            font-size: 32px;
          }
          .slide-header-vertical {
            flex-direction: row;
            align-items: center;
            gap: 16px;
            margin-bottom: 16px;
          }
          .slide-icon-container svg {
            width: 48px;
            height: 48px;
          }
          .slide-heading {
            font-size: 24px;
          }
          .carousel-nav-wrapper {
            display: none;
          }
          .carousel-dots {
            justify-content: center;
            width: 100%;
            margin-top: 20px;
          }
          .slide-text-content {
            touch-action: pan-y;
            user-select: none;
          }
        }

        .carousel-nav-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: 32px;
        }

        .carousel-dots {
          display: flex;
          gap: 12px;
          justify-content: flex-start;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: #F0AC00;
          transform: scale(1.3);
          box-shadow: 0 0 10px rgba(240, 172, 0, 0.4);
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
