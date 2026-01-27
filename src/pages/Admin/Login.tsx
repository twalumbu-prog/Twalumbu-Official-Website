import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldCheck } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock authentication
    setTimeout(() => {
      if (email === 'admin@twalumbu.edu.zm' && password === 'admin123') {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. Access restricted to school personnel.');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="admin-login-page">
      <div className="container">
        <motion.div
          className="login-card glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="login-header">
            <div className="logo-circ">
              <ShieldCheck size={32} />
            </div>
            <h2>School Admin Portal</h2>
            <p>Enter your credentials to manage school content and analytics.</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            {error && <div className="error-alert">{error}</div>}

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@twalumbu.edu.zm"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Login to Dashboard'}
            </button>
          </form>

          <div className="login-footer">
            <p>Forgot password? Contact IT support.</p>
            <button className="back-home" onClick={() => navigate('/')}>Back to School Website</button>
          </div>
        </motion.div>
      </div>

      <style>{`
        .admin-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
        }

        .login-card {
          max-width: 450px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.95);
          padding: 60px 40px;
          border-radius: var(--radius-lg);
          box-shadow: 0 50px 100px rgba(0,0,0,0.3);
        }

        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .logo-circ {
          width: 70px;
          height: 70px;
          background: var(--primary);
          color: var(--secondary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }

        .login-header h2 {
          color: var(--primary);
          margin-bottom: 12px;
        }

        .login-header p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .error-alert {
          background: #fee2e2;
          color: #dc2626;
          padding: 12px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          margin-bottom: 24px;
          font-weight: 600;
          text-align: center;
        }

        .input-with-icon {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .input-with-icon input {
          width: 100%;
          padding: 14px 14px 14px 45px !important;
        }

        .login-form button[type="submit"] {
          margin-top: 24px;
        }

        .login-footer {
          margin-top: 30px;
          text-align: center;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .back-home {
          background: none;
          color: var(--primary);
          font-weight: 700;
          margin-top: 15px;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
