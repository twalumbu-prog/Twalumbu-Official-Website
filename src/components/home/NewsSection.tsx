import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { EditableText, EditableImage } from '../admin/InlineEditor';

const ITEMS_PER_PAGE = 3;

const NewsSection: React.FC = () => {
  const { content } = useContent();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const totalPages = Math.ceil(content.news.articles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleNews = content.news.articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="news-redesign-section" id="news">
      <div className="container news-container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="section-tag-gold uppercase tracking-widest font-bold text-sm">Updates & Insights</span>
          <h2 className="section-title">Latest School News</h2>
          <div className="title-underline">
            <svg width="120" height="8" viewBox="0 0 120 8" fill="none">
              <path d="M2 5.5C30 2 90 2 118 5.5" stroke="#F0AC00" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </motion.div>

        {/* News Grid */}
        <motion.div
          className="news-items-wrapper"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className="news-grid-motion-wrapper"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {visibleNews.map((article, index) => {
                const globalIndex = startIndex + index;
                return (
                  <motion.div
                    key={article.id}
                    className="news-card-premium"
                    variants={{
                      hidden: { opacity: 0, scale: 0.95, y: 20 },
                      show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest('.editable-text-container') || (e.target as HTMLElement).closest('.image-edit-overlay')) return;
                      navigate(`/news/${article.id}`);
                    }}
                  >
                    <div className="news-image-wrapper">
                      <div className="image-frame">
                        <EditableImage
                          contentKey={`news.articles.${globalIndex}.image`}
                          src={article.image}
                          alt={article.title}
                        />
                      </div>
                      <div className="date-badge">
                        <Calendar size={14} />
                        <span>
                          <EditableText
                            contentKey={`news.articles.${globalIndex}.date`}
                            value={article.date}
                          />
                        </span>
                      </div>
                    </div>
                    <div className="news-content-area">
                      <h3 className="news-title-text">
                        <EditableText
                          contentKey={`news.articles.${globalIndex}.title`}
                          value={article.title}
                        />
                      </h3>
                      <p className="news-summary-text">
                        <EditableText
                          contentKey={`news.articles.${globalIndex}.summary`}
                          value={article.summary}
                          multiline
                        />
                      </p>
                      <button className="read-more-btn">
                        Read Story <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-wrapper">
            <button
              className="pagination-nav-btn"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={24} />
            </button>
            <div className="page-dots">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`page-dot ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => goToPage(i + 1)}
                />
              ))}
            </div>
            <button
              className="pagination-nav-btn"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .news-redesign-section {
          padding: 120px 0;
          background: #FDFAFA;
          position: relative;
          overflow: hidden;
        }

        .news-container {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
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

        .section-title {
          font-size: 48px;
          color: #422006;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 800;
          margin: 0;
        }

        .title-underline {
          margin-top: -5px;
        }

        .news-items-wrapper {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .news-grid-motion-wrapper {
          display: grid;
          grid-template-columns: inherit;
          gap: inherit;
          width: 100%;
          grid-column: 1 / -1;
        }

        .news-card-premium {
          background: white;
          border-radius: 24px;
          padding: 12px;
          box-shadow: 0px 10px 40px rgba(66, 32, 6, 0.05);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          border: 1px solid #F1F1F1;
          height: 100%;
        }

        .news-card-premium:hover {
          transform: translateY(-12px);
          box-shadow: 0px 20px 60px rgba(66, 32, 6, 0.12);
          border-color: #F0AC00;
        }

        .news-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          margin-bottom: 24px;
        }

        .image-frame {
          width: 100%;
          height: 100%;
          border-radius: 16px;
          overflow: hidden;
          background: #F1F1F1;
        }

        .image-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .news-card-premium:hover .image-frame img {
          transform: scale(1.08);
        }

        .date-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: white;
          padding: 8px 16px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #422006;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .news-content-area {
          padding: 0 12px 12px 12px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .news-title-text {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #422006;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .news-summary-text {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          color: #6B7280;
          line-height: 1.6;
          margin-bottom: 24px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .read-more-btn {
          margin-top: auto;
          background: transparent;
          border: none;
          color: #F0AC00;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 700;
          font-size: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 0;
          transition: all 0.2s ease;
        }

        .read-more-btn:hover {
          gap: 12px;
          color: #422006;
        }

        .pagination-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          margin-top: 60px;
        }

        .pagination-nav-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1px solid #E5E7EB;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #422006;
        }

        .pagination-nav-btn:hover:not(:disabled) {
          border-color: #F0AC00;
          color: #F0AC00;
          transform: scale(1.05);
        }

        .pagination-nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .page-dots {
          display: flex;
          gap: 12px;
        }

        .page-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #E5E7EB;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .page-dot.active {
          background: #F0AC00;
          width: 24px;
          border-radius: 10px;
        }

        @media (max-width: 1100px) {
          .news-items-wrapper {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .news-items-wrapper {
            grid-template-columns: 1fr;
          }
          .section-title {
            font-size: 36px;
          }
        }
      `}</style>
    </section>
  );
};

export default NewsSection;
