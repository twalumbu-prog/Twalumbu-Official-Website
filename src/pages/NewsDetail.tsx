import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Share2, Printer } from 'lucide-react';

// This would normally come from an API or shared state/context
const allNews = [
  {
    id: 1,
    title: "Twalumbu Wins National Debate Championship",
    content: `
      Our senior debate team emerged victorious in the Inter-School National Debate Championship held last weekend. The competition, which brought together 32 schools from across the country, saw our students demonstrating exceptional critical thinking, public speaking, and research skills.

      The team, led by Grade 11 student Chisomo Mwanza, argued persuasively on topics ranging from economic policy to environmental sustainability. "It was a challenging but rewarding experience," said Chisomo. "We spent weeks preparing, and it's incredible to see that hard work pay off."

      Principal Mutale expressed immense pride in the team's achievement, noting that this victory reflects the school's commitment to nurturing intellectual curiosity and effective communication. The team will now move on to represent the region at the upcoming international invitational in Southern Africa.
    `,
    date: "May 15, 2024",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop",
    author: "Dept. of Humanities"
  },
  // ... other news items (simplified for now)
];

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the news item or use a mock if not found
  const news = allNews.find(n => n.id === Number(id)) || allNews[0];

  return (
    <motion.div
      className="news-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="detail-hero">
        <img src={news.image} alt={news.title} className="hero-img" />
        <div className="hero-overlay">
          <div className="container">
            <button className="back-btn glass" onClick={() => navigate(-1)}>
              <ArrowLeft size={18} />
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <article className="article-container container">
        <header className="article-header">
          <div className="article-meta">
            <div className="meta-item">
              <Calendar size={16} />
              <span>{news.date}</span>
            </div>
            <div className="meta-item">
              <span className="author-tag">By {news.author}</span>
            </div>
          </div>
          <h1>{news.title}</h1>
          <div className="article-tools">
            <button className="tool-btn"><Share2 size={18} /> Share</button>
            <button className="tool-btn"><Printer size={18} /> Print</button>
          </div>
        </header>

        <section className="article-content">
          {news.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph.trim()}</p>
          ))}
        </section>

        <footer className="article-footer">
          <button className="btn-secondary glass" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            Back to All News
          </button>
        </footer>
      </article>

      <style>{`
        .news-detail-page {
          background: #fff;
          padding-bottom: 80px;
        }

        .detail-hero {
          position: relative;
          height: 60vh;
          min-height: 400px;
          width: 100%;
          overflow: hidden;
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          padding: 40px 0;
          background: linear-gradient(rgba(0,0,0,0.5), transparent);
          z-index: 5;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border-radius: var(--radius-full);
          color: #fff;
          font-weight: 600;
          font-size: 0.9rem;
          background: rgba(var(--primary-hsl), 0.3);
          border: 1px solid rgba(255,255,255,0.2);
        }

        .back-btn:hover {
          background: var(--primary);
          border-color: var(--primary);
          transform: translateX(-5px);
        }

        .article-container {
          max-width: 950px;
          margin: -100px auto 0;
          position: relative;
          z-index: 10;
          background: #fff;
          padding: 80px;
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
          box-shadow: 0 -20px 40px rgba(0,0,0,0.1);
        }

        .article-header {
          margin-bottom: 40px;
          border-bottom: 1px solid #eee;
          padding-bottom: 30px;
        }

        .article-meta {
          display: flex;
          gap: 24px;
          margin-bottom: 20px;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 600;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .author-tag {
          color: var(--secondary-dark);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .article-header h1 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin-bottom: 24px;
          line-height: 1.2;
          color: var(--primary);
        }

        .article-tools {
          display: flex;
          gap: 16px;
        }

        .tool-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f8f9fa;
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .tool-btn:hover {
          background: #eee;
          color: var(--primary);
        }

        .article-content p {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--text);
          margin-bottom: 24px;
        }

        .article-footer {
          margin-top: 60px;
          padding-top: 40px;
          border-top: 1px solid #eee;
        }

        @media (max-width: 768px) {
          .article-container {
            padding: 30px 20px;
            margin-top: -50px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default NewsDetail;
