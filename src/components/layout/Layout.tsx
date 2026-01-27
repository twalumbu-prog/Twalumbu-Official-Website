import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  forceShowNavFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, forceShowNavFooter }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin') && !forceShowNavFooter;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-layout">
      {/* Background Micro-animations */}
      {!isAdminPage && (
        <div className="background-decor">
          <motion.div
            className="decor-blob blob-1"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="decor-blob blob-2"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -40, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="decor-blob blob-3"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 30, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      )}

      {!isAdminPage && <Navbar />}
      <main className="main-content">
        {children}
      </main>
      {!isAdminPage && <Footer />}

      <style>{`
        .app-layout {
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .background-decor {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          pointer-events: none;
          opacity: 0.3;
          filter: blur(80px); /* Slightly reduced blur for better performance */
        }

        .decor-blob {
          position: absolute;
          border-radius: 50%;
          will-change: transform; /* Hardware acceleration */
        }

        .blob-1 {
          width: 600px;
          height: 600px;
          background: rgba(var(--primary-hsl), 0.1);
          top: -200px;
          right: -200px;
        }

        .blob-2 {
          width: 500px;
          height: 500px;
          background: rgba(var(--secondary-hsl), 0.08);
          bottom: 10%;
          left: -100px;
        }

        .blob-3 {
          width: 400px;
          height: 400px;
          background: rgba(var(--accent-hsl), 0.05);
          top: 40%;
          right: 15%;
        }

        .main-content {
          padding-top: ${isAdminPage ? '0' : '80px'}; /* Space for Navbar only on frontend */
        }
      `}</style>
    </div>
  );
};

export default Layout;
