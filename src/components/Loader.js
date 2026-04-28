'use client';

import { useState, useEffect } from 'react';

export default function Loader({ storeName }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(hideTimer);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`loader-wrapper ${isFadingOut ? 'fade-out' : ''}`} id="pageLoader">
      <div className="loader-content">
        <div className="wood-grain-circle">
          <div className="inner-grain"></div>
          <div className="inner-grain"></div>
          <div className="inner-grain"></div>
        </div>
        <div className="loader-text">
          <span className="brand-name">{storeName}</span>
          <span className="loading-status">কারুশিল্প তৈরি হচ্ছে...</span>
        </div>
      </div>

      <style jsx>{`
        .loader-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #FDF6E8; /* Parchment */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          transition: opacity 0.5s ease, visibility 0.5s ease;
        }

        .loader-wrapper.fade-out {
          opacity: 0;
          visibility: hidden;
        }

        .loader-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .wood-grain-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #7C4B2A; /* Walnut */
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(124, 75, 42, 0.2);
          animation: rotate 3s linear infinite;
        }

        .inner-grain {
          position: absolute;
          width: 150%;
          height: 150%;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 45%;
          top: -25%;
          left: -25%;
        }

        .inner-grain:nth-child(1) { animation: morph 4s ease-in-out infinite; }
        .inner-grain:nth-child(2) { animation: morph 6s ease-in-out infinite reverse; border-color: rgba(0,0,0,0.1); }
        .inner-grain:nth-child(3) { animation: morph 5s ease-in-out infinite; opacity: 0.5; }

        .loader-text {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .brand-name {
          font-family: 'Noto Sans Bengali', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #7C4B2A;
          letter-spacing: 1px;
        }

        .loading-status {
          font-size: 14px;
          color: #8B4E38;
          opacity: 0.8;
          font-style: italic;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes morph {
          0%, 100% { border-radius: 45%; transform: scale(1); }
          50% { border-radius: 30% 60% 70% 40%; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
