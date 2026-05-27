'use client';

import React, { useEffect, useState } from 'react';
import { useAdmin } from '@/app/context/AdminContext';

export default function AnnouncementTicker() {
  const { state } = useAdmin();
  const { announcements } = state;
  const [activeAnnouncements, setActiveAnnouncements] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (announcements) {
      const active = announcements.filter(ann => ann.is_active);
      setActiveAnnouncements(active);
    }
  }, [announcements]);

  if (!isMounted || activeAnnouncements.length === 0) return null;

  return (
    <div className="announcement-ticker" suppressHydrationWarning>
      <div className="ticker-wrapper" suppressHydrationWarning>
        <div className="ticker-content" suppressHydrationWarning>
          {activeAnnouncements.map((ann, idx) => (
            <div 
              key={ann.id} 
              className="ticker-item"
              style={{ backgroundColor: ann.bg_color, color: ann.text_color }}
              suppressHydrationWarning
            >
              {ann.link ? (
                <a href={ann.link} target="_blank" rel="noopener noreferrer">
                  {ann.text}
                </a>
              ) : (
                <span>{ann.text}</span>
              )}
            </div>
          ))}
          {/* Duplicate for infinite loop effect if needed, 
              but for now let's just use CSS marquee */}
        </div>
      </div>

      <style jsx>{`
        .announcement-ticker {
          width: 100%;
          overflow: hidden;
          position: relative;
          z-index: 1001;
        }
        .ticker-wrapper {
          display: flex;
          width: 100%;
          overflow: hidden;
        }
        .ticker-content {
          display: flex;
          white-space: nowrap;
          animation: ticker 30s linear infinite;
        }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          padding: 8px 50px;
          font-size: 14px;
          font-weight: 600;
          min-width: 100vw;
          justify-content: center;
        }
        .ticker-item a {
          color: inherit;
          text-decoration: none;
        }
        .ticker-item a:hover {
          text-decoration: underline;
        }

        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${activeAnnouncements.length * 100}%); }
        }

        @media (max-width: 768px) {
          .ticker-item {
            font-size: 12px;
            padding: 6px 20px;
          }
        }
      `}</style>
    </div>
  );
}
