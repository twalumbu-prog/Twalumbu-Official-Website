import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3, Layout, ClipboardList, LogOut, Save,
  Trash2, Plus, Type, Newspaper, Edit3,
  TrendingUp, MousePointer2, Smartphone, Info
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import Home from '../Home';
import AppLayout from '../../components/layout/Layout';

const AdminDashboard: React.FC = () => {
  const { content, setEditMode, saveContent, updateContent } = useContent();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'editor' | 'form' | 'news'>('overview');
  const [editingNews, setEditingNews] = useState<any>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) navigate('/admin/login');
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'editor') {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [activeTab, setEditMode]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar glass">
        <div className="sidebar-header">
          <div className="admin-avatar">A</div>
          <div>
            <h3>Principal Admin</h3>
            <p>Admin Access</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
            <Layout size={20} /> Dashboard Home
          </button>
          <button className={activeTab === 'analytics' ? 'active' : ''} onClick={() => setActiveTab('analytics')}>
            <BarChart3 size={20} /> Analytics
          </button>
          <button className={activeTab === 'editor' ? 'active' : ''} onClick={() => setActiveTab('editor')}>
            <MousePointer2 size={20} /> Content Editor
          </button>
          <button className={activeTab === 'form' ? 'active' : ''} onClick={() => setActiveTab('form')}>
            <ClipboardList size={20} /> Enrolment Form
          </button>
          <button className={activeTab === 'news' ? 'active' : ''} onClick={() => setActiveTab('news')}>
            <Newspaper size={20} /> News & Events
          </button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-topbar">
          <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          <div className="topbar-actions">
            <button className="btn-secondary glass"><Smartphone size={18} /> Preview Mobile</button>
            <button className="btn-primary" onClick={saveContent}><Save size={18} /> Publish Changes</button>
          </div>
        </header>

        <div className="admin-content-area">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                className="dashboard-overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="overview-cards">
                  <div className="overview-card" onClick={() => setActiveTab('analytics')}>
                    <div className="card-icon"><TrendingUp /></div>
                    <h3>Analytics</h3>
                    <p>Track visitor traffic, page views, and user engagement metrics.</p>
                  </div>
                  <div className="overview-card" onClick={() => setActiveTab('editor')}>
                    <div className="card-icon"><Type /></div>
                    <h3>Content Editor</h3>
                    <p>Live-edit text, swap images, and update school news/events.</p>
                  </div>
                  <div className="overview-card" onClick={() => setActiveTab('form')}>
                    <div className="card-icon"><ClipboardList /></div>
                    <h3>Form Builder</h3>
                    <p>Customize the enrollment application form fields and policies.</p>
                  </div>
                  <div className="overview-card" onClick={() => setActiveTab('news')}>
                    <div className="card-icon"><Newspaper /></div>
                    <h3>News Manager</h3>
                    <p>Create, update or remove school news articles and event updates.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div key="analytics" className="analytics-pane glass">
                <div className="stats-row">
                  <div className="stat-box">
                    <span>Active Visitors</span>
                    <h4>128</h4>
                    <span className="trend positive">+12% vs last week</span>
                  </div>
                  <div className="stat-box">
                    <span>Form Submissions</span>
                    <h4>42</h4>
                    <span className="trend positive">+5 today</span>
                  </div>
                  <div className="stat-box">
                    <span>Page Views</span>
                    <h4>12.4k</h4>
                    <span className="trend">Stable</span>
                  </div>
                </div>
                <div className="mock-chart-container">
                  <div className="chart-header">
                    <h3>Traffic Overview (Last 30 Days)</h3>
                    <select><option>Weekly</option><option>Monthly</option></select>
                  </div>
                  <div className="mock-chart">
                    {/* Simplified mock chart visualization */}
                    {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                      <div key={i} className="chart-bar-wrapper">
                        <div className="chart-bar" style={{ height: `${h}%` }}></div>
                        <span className="chart-label">W{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'editor' && (
              <motion.div key="editor" className="editor-window">
                <div className="editor-toolbar">
                  <div className="editor-info">
                    <Info size={18} />
                    <span><strong>Live Edit Mode:</strong> Click any text or image below to modify. Your changes are saved locally as you work.</span>
                  </div>
                  <div className="editor-save-reminder">
                    <span>Click "Publish Changes" to finalize.</span>
                  </div>
                </div>
                <div className="editor-live-preview">
                  <AppLayout forceShowNavFooter>
                    <Home />
                  </AppLayout>
                </div>
              </motion.div>
            )}

            {activeTab === 'form' && (
              <motion.div key="form" className="form-pane glass">
                <div className="form-editor-header">
                  <h3>Enrollment Form Structure</h3>
                  <button className="btn-secondary glass"><Plus size={16} /> Add New Field</button>
                </div>
                <div className="form-fields-list">
                  {[
                    { name: 'First Name', type: 'Text Input' },
                    { name: 'Last Name', type: 'Text Input' },
                    { name: 'Date of Birth', type: 'Date Picker' },
                    { name: 'Gender', type: 'Select Dropdown' },
                    { name: 'Grade Applied', type: 'Select Dropdown' },
                    { name: 'Medical Conditions', type: 'Radio (Yes/No)' },
                    { name: 'Parent First Name', type: 'Text Input' },
                    { name: 'Parent Phone 1', type: 'Phone Input' },
                    { name: 'Physical Address', type: 'Textarea' },
                    { name: 'Referral Source', type: 'Select Dropdown' }
                  ].map((field, i) => (
                    <div key={i} className="field-item">
                      <div className="field-drag-handle">⠿</div>
                      <span className="field-name">{field.name}</span>
                      <span className="field-type">{field.type}</span>
                      <div className="field-actions">
                        <button className="edit-btn"><Type size={16} /></button>
                        <button className="delete-btn"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'news' && (
              <motion.div key="news" className="news-management-pane glass">
                <div className="news-mgr-header">
                  <h3>Manage News & Events</h3>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setEditingNews({ id: Date.now(), title: '', summary: '', date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }), image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop' });
                      setIsNewsModalOpen(true);
                    }}
                  >
                    <Plus size={18} /> Add New Article
                  </button>
                </div>

                <div className="news-articles-list">
                  {content.news.articles.map((article: any, idx: number) => (
                    <div key={article.id} className="mgr-news-item">
                      <div className="mgr-news-img">
                        <img src={article.image} alt="" />
                      </div>
                      <div className="mgr-news-info">
                        <h4>{article.title}</h4>
                        <span className="mgr-news-date">{article.date}</span>
                        <p>{article.summary}</p>
                      </div>
                      <div className="mgr-news-actions">
                        <button
                          className="edit-btn"
                          onClick={() => {
                            setEditingNews({ ...article, index: idx });
                            setIsNewsModalOpen(true);
                          }}
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this article?')) {
                              const newArticles = content.news.articles.filter((a: any) => a.id !== article.id);
                              updateContent('news.articles', newArticles);
                            }
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {isNewsModalOpen && (
                  <div className="mgr-modal-overlay">
                    <div className="mgr-modal glass">
                      <h3>{editingNews?.index !== undefined ? 'Edit Article' : 'Create Article'}</h3>
                      <div className="mgr-form">
                        <div className="mgr-form-group">
                          <label>Title</label>
                          <input
                            type="text"
                            value={editingNews.title}
                            onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                          />
                        </div>
                        <div className="mgr-form-group">
                          <label>Date</label>
                          <input
                            type="text"
                            value={editingNews.date}
                            onChange={(e) => setEditingNews({ ...editingNews, date: e.target.value })}
                          />
                        </div>
                        <div className="mgr-form-group">
                          <label>Image URL (Unsplash)</label>
                          <input
                            type="text"
                            value={editingNews.image}
                            onChange={(e) => setEditingNews({ ...editingNews, image: e.target.value })}
                          />
                        </div>
                        <div className="mgr-form-group">
                          <label>Summary</label>
                          <textarea
                            rows={3}
                            value={editingNews.summary}
                            onChange={(e) => setEditingNews({ ...editingNews, summary: e.target.value })}
                          />
                        </div>
                        <div className="mgr-modal-actions">
                          <button
                            className="btn-primary"
                            onClick={() => {
                              const newArticles = [...content.news.articles];
                              if (editingNews.index !== undefined) {
                                const { index, ...rest } = editingNews;
                                newArticles[index] = rest;
                              } else {
                                newArticles.unshift(editingNews);
                              }
                              updateContent('news.articles', newArticles);
                              setIsNewsModalOpen(false);
                            }}
                          >
                            Save Article
                          </button>
                          <button className="btn-secondary glass" onClick={() => setIsNewsModalOpen(false)}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <style>{`
        .admin-dashboard {
          display: flex;
          min-height: 100vh;
          background: #f0f2f5;
          color: var(--primary);
        }

        .admin-sidebar {
          width: 280px;
          background: var(--primary);
          color: #fff;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          z-index: 100;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 50px;
          padding: 0 10px;
        }

        .admin-avatar {
          width: 50px;
          height: 50px;
          background: var(--secondary);
          color: var(--primary);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.5rem;
        }

        .sidebar-header h3 { color: #fff; font-size: 1.1rem; }
        .sidebar-header p { font-size: 0.8rem; opacity: 0.6; }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-grow: 1;
        }

        .sidebar-nav button {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          border-radius: 12px;
          background: transparent;
          color: rgba(255,255,255,0.7);
          font-weight: 600;
          text-align: left;
          transition: all 0.3s ease;
        }

        .sidebar-nav button.active {
          background: rgba(255,255,255,0.1);
          color: var(--secondary);
        }

        .sidebar-nav button:hover:not(.active) {
          background: rgba(255,255,255,0.05);
          color: #fff;
        }

        .logout-btn {
          margin-top: auto;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 14px 20px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 600;
        }

        .admin-main {
          margin-left: 280px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .admin-topbar {
          background: #fff;
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ddd;
        }

        .topbar-actions { display: flex; gap: 12px; }
        .topbar-actions button {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .admin-content-area {
          padding: 40px;
          overflow-y: auto;
          flex-grow: 1;
        }

        .editor-window {
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: 100%;
        }

        .editor-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 25px;
          background: var(--primary);
          color: var(--white);
          border-radius: 12px;
        }

        .editor-info {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.9rem;
        }

        .editor-save-reminder {
          font-size: 0.85rem;
          opacity: 0.8;
          font-weight: 600;
        }

        .editor-live-preview {
          overflow-x: hidden;
          overflow-y: auto;
          flex-grow: 1;
          height: calc(100vh - 200px);
          position: relative;
          background: #f8f9fa;
          border-radius: 12px;
          border: 1px solid #ddd;
        }

        .editor-live-preview > div {
          transform: scale(0.9);
          transform-origin: top center;
          width: 111.11%; /* Compensate for scale(0.9) to keep full width */
        }

        .overview-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .overview-card {
          background: #fff;
          padding: 40px 30px;
          border-radius: var(--radius-lg);
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid #eee;
        }

        .overview-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          border-color: var(--secondary);
        }

        .card-icon {
          width: 60px;
          height: 60px;
          background: rgba(var(--primary-hsl), 0.05);
          color: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 30px;
        }

        .stat-box {
          background: #fff;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid #eee;
        }

        .analytics-pane, .form-pane, .news-management-pane {
          padding: 40px;
          min-height: 100%;
        }

        .form-editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .form-fields-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .stat-box h4 { font-size: 2rem; margin: 10px 0; }
        .trend { font-size: 0.8rem; font-weight: 700; color: #666; }
        .trend.positive { color: #10b981; }

        .mock-chart {
          height: 300px;
          background: #fff;
          padding: 40px;
          border-radius: 16px;
          display: flex;
          align-items: flex-end;
          gap: 20px;
          justify-content: space-around;
        }

        .chart-bar-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-grow: 1;
        }

        .chart-bar {
          width: 100%;
          background: var(--primary);
          border-radius: 8px 8px 0 0;
          transition: height 1s ease-out;
        }

        .chart-label { margin-top: 10px; font-size: 0.8rem; font-weight: 700; opacity: 0.5; }

        .field-item {
          display: flex;
          align-items: center;
          gap: 20px;
          background: #fff;
          padding: 15px 25px;
          border-radius: 12px;
          margin-bottom: 12px;
          border: 1px solid #eee;
        }

        .field-drag-handle { color: #ccc; cursor: grab; font-size: 1.2rem; }
        .field-name { font-weight: 700; flex-grow: 1; }
        .field-type { font-size: 0.85rem; color: #666; background: #f0f2f5; padding: 4px 12px; border-radius: 20px; }
        .field-actions { display: flex; gap: 8px; }
        .field-actions button { padding: 8px; border-radius: 8px; background: #f8f9fa; color: #666; }
        .field-actions .delete-btn:hover { background: #fee2e2; color: #ef4444; }

        /* News Management Styles */
        .news-mgr-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .news-articles-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mgr-news-item {
          display: flex;
          align-items: center;
          gap: 20px;
          background: #fff;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #eee;
          transition: all 0.3s ease;
        }

        .mgr-news-item:hover {
          border-color: var(--secondary);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transform: translateX(5px);
        }

        .mgr-news-img {
          width: 80px;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .mgr-news-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .mgr-news-info {
          flex-grow: 1;
        }

        .mgr-news-info h4 { margin-bottom: 4px; }
        .mgr-news-date { font-size: 0.8rem; color: var(--secondary-dark); font-weight: 700; }
        .mgr-news-info p { font-size: 0.9rem; color: #666; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; margin-top: 4px; }

        .mgr-news-actions { display: flex; gap: 8px; }
        .mgr-news-actions button { padding: 8px; border-radius: 8px; background: #f8f9fa; color: #666; }
        .mgr-news-actions .delete-btn:hover { background: #fee2e2; color: #ef4444; }

        .mgr-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .mgr-modal {
          width: 500px;
          max-width: 90%;
          padding: 30px;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
        }

        .mgr-form { margin-top: 20px; }
        .mgr-form-group { margin-bottom: 20px; }
        .mgr-form-group label { display: block; font-weight: 700; margin-bottom: 8px; font-size: 0.9rem; }
        .mgr-form-group input, .mgr-form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #eee;
          background: #fdfdfd;
          border-radius: 8px;
        }

        .mgr-modal-actions { display: flex; gap: 12px; margin-top: 30px; }
        .mgr-modal-actions button { flex: 1; }

        @media (max-width: 1024px) {
          .overview-cards, .stats-row { grid-template-columns: 1fr; }
          .admin-sidebar { width: 80px; padding: 40px 10px; }
          .admin-sidebar h3, .admin-sidebar p, .sidebar-nav span, .sidebar-nav button { font-size: 0; padding: 15px; }
          .admin-main { margin-left: 80px; }
        }
      `}</style>
    </div>
  );
};

// Helper Icon

export default AdminDashboard;
