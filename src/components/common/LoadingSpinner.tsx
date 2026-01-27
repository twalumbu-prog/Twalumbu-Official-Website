import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <style>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
          width: 100%;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(159, 105, 31, 0.1);
          border-radius: 50%;
          border-top-color: #9F691F;
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default LoadingSpinner;
