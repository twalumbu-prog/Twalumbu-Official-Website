import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Youtube, ArrowUp } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { EditableText } from '../admin/InlineEditor';

const Footer: React.FC = () => {
  const { content } = useContent();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-redesign">
      <div className="footer-top-accent"></div>
      <div className="container footer-main-grid">
        {/* Brand Column */}
        <div className="footer-col-brand">
          <Link to="/" className="footer-logo-premium">
            <span className="logo-text">
              <EditableText contentKey="brand.accent" value={content.brand.accent} />{' '}
              <EditableText contentKey="brand.name" value={content.brand.name} />
            </span>
          </Link>
          <p className="footer-brand-desc">
            <EditableText
              contentKey="brand.description"
              value={content.brand.description}
              multiline
            />
          </p>
          <div className="premium-social-row">
            <a href="#" className="social-icon-btn"><Facebook size={20} /></a>
            <a href="#" className="social-icon-btn"><Instagram size={20} /></a>
            <a href="#" className="social-icon-btn"><Twitter size={20} /></a>
            <a href="#" className="social-icon-btn"><Youtube size={20} /></a>
          </div>
        </div>

        {/* Links Column */}
        <div className="footer-col-links">
          <h4 className="footer-col-title">Explore</h4>
          <ul className="footer-link-list">
            <li><a href="#offers">Our Programs</a></li>
            <li><a href="#why-us">About Us</a></li>
            <li><a href="#news">News & Events</a></li>
            <li><Link to="/enrol">Enrollment</Link></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="footer-col-contact">
          <h4 className="footer-col-title">Connect</h4>
          <div className="contact-info-list">
            <div className="contact-info-item">
              <MapPin size={18} className="contact-icon" />
              <span>
                <EditableText contentKey="contact.address" value={content.contact.address} />
              </span>
            </div>
            <div className="contact-info-item">
              <Phone size={18} className="contact-icon" />
              <span>
                <EditableText contentKey="contact.phone" value={content.contact.phone} />
              </span>
            </div>
            <div className="contact-info-item">
              <Mail size={18} className="contact-icon" />
              <span>
                <EditableText contentKey="contact.email" value={content.contact.email} />
              </span>
            </div>
          </div>
          <Link to="/admin/login" className="admin-access-btn">Staff Portal</Link>
        </div>

        {/* Back to Top */}
        <button className="back-to-top" onClick={scrollToTop}>
          <ArrowUp size={24} />
        </button>
      </div>

      <div className="footer-lower">
        <div className="container lower-content">
          <div className="copyright-area">
            &copy; {new Date().getFullYear()} {content.brand.accent} {content.brand.name}. All Rights Reserved.
          </div>
          <div className="credits-area">
            Crafted with excellence by <span>Master Fees</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-redesign {
          background: #422006;
          color: white;
          padding: 100px 0 0 0;
          position: relative;
          margin-top: 60px;
        }

        .footer-top-accent {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #F0AC00 0%, #9F691F 100%);
        }

        .footer-main-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr;
          gap: 80px;
          padding-bottom: 80px;
          position: relative;
        }

        .footer-logo-premium {
          display: block;
          margin-bottom: 24px;
          text-decoration: none;
        }

        .logo-text {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: white;
          letter-spacing: -0.5px;
        }

        .footer-brand-desc {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.6);
          max-width: 380px;
          margin-bottom: 32px;
        }

        .premium-social-row {
          display: flex;
          gap: 12px;
        }

        .social-icon-btn {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #F0AC00;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-icon-btn:hover {
          background: #F0AC00;
          color: #422006;
          transform: translateY(-5px);
          border-color: #F0AC00;
        }

        .footer-col-title {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: white;
          margin: 0 0 40px 0;
          position: relative;
        }

        .footer-col-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 30px;
          height: 2px;
          background: #F0AC00;
        }

        .footer-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-link-list li {
          margin-bottom: 16px;
        }

        .footer-link-list a {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .footer-link-list a:hover {
          color: #F0AC00;
          transform: translateX(8px);
        }

        .contact-info-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 40px;
        }

        .contact-info-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          color: rgba(255, 255, 255, 0.6);
          font-family: 'Inter', sans-serif;
          line-height: 1.4;
        }

        .contact-icon {
          color: #F0AC00;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .admin-access-btn {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.3);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .admin-access-btn:hover {
          color: white;
          text-decoration: underline;
        }

        .back-to-top {
          position: absolute;
          right: 0;
          top: -30px;
          width: 60px;
          height: 60px;
          background: #F0AC00;
          color: #422006;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0px 10px 30px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }

        .back-to-top:hover {
          transform: translateY(-10px);
          background: white;
        }

        .footer-lower {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 30px 0;
          background: rgba(0, 0, 0, 0.1);
        }

        .lower-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
        }

        .credits-area span {
          color: #F0AC00;
          font-weight: 600;
        }

        @media (max-width: 992px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr;
            gap: 60px;
          }
          .back-to-top {
            right: 24px;
          }
        }

        @media (max-width: 768px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .lower-content {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
