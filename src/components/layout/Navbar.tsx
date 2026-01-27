import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import logoImg from '../../assets/images/logo.png';
import '../../styles/global.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling DOWN
        setIsVisible(false);
      } else {
        // Scrolling UP
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#offers' },
    { name: 'Why Us', path: '/#why-us' },
    { name: 'Fees', path: '/#pricing' },
    { name: 'Contact Us', path: '/#contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${!isVisible ? 'hidden' : ''}`}>
      <div className="new-nav-container">
        {/* Logo Section */}
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <img src={logoImg} alt="Twalumbu Education Centre" className="brand-logo" />
          </Link>
        </div>

        {/* Desktop Links Section */}
        <div className="nav-links-section desktop-only">
          {navLinks.map((link) => {
            const isActive = link.path === '/'
              ? (!window.location.hash || window.location.hash === '#home')
              : window.location.hash === link.path.replace('/', '');

            return (
              <a
                key={link.name}
                href={link.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Apply Section */}
        <div className="apply-section desktop-only">
          <button
            className="apply-btn-new"
            onClick={() => navigate('/enrol')}
          >
            Apply Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-toggle mobile-only"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="mobile-menu glass">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button
            className="btn-primary"
            style={{ width: '100%', marginTop: '10px', justifyContent: 'center' }}
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/enrol');
            }}
          >
            <span>Apply Now</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: white;
          transition: transform 0.3s ease-in-out, background 0.3s ease, box-shadow 0.3s ease;
        }

        .navbar.hidden {
          transform: translateY(-100%);
        }

        .navbar.scrolled {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .new-nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 8px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }

        .logo-section {
          flex: 1;
          display: flex;
          align-items: center;
          padding-left: 24px;
        }

        .logo-link {
          text-decoration: none;
        }

        .brand-logo {
          height: 60px;
          width: auto;
          display: block;
        }

        .nav-links-section {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 24px 0 10px;
        }

        .nav-item {
          padding: 10px;
          color: black;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 14px;
          font-weight: 300;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          border-bottom: 3px solid transparent;
        }

        .nav-item.active {
          font-weight: 500;
          border-bottom: 3px solid #F0AC00;
        }

        .nav-item:hover {
          color: #F0AC00;
        }

        .apply-section {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          padding-right: 24px;
        }

        .apply-btn-new {
          padding: 10px 24px;
          border-radius: 12px;
          border: 1px solid black;
          background: transparent;
          color: #2E1609;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .apply-btn-new:hover {
          background: #000;
          color: #fff;
        }

        .mobile-toggle {
          background: none;
          color: #000;
          display: none;
        }

        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 24px;
          gap: 20px;
          background: white;
          border-top: 1px solid #eee;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        @media (max-width: 992px) {
          .desktop-only { display: none; }
          .mobile-toggle { display: block; }
          .new-nav-container { padding: 8px 16px; height: 70px; }
          .logo-section { padding-left: 0; }
        }
      `}</style>

    </nav>
  );
};

export default Navbar;
