'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { FaXmark, FaGift } from 'react-icons/fa6';

export default function PromotionalPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchPopup();
  }, []);

  const fetchPopup = async () => {
    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('promotional_popups')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching popup:', error);
        return;
      }
      
      if (data && data.length > 0) {
        // Filter on client side to handle dates and status
        const activePopups = data.filter(popup => {
          if (!popup.is_active) return false;
          
          // If active, we show it. Dates are now optional or informative.
          // We only hide if the start_date is in the FUTURE.
          if (popup.start_date) {
            const startDate = new Date(popup.start_date);
            const nowObj = new Date();
            if (startDate > nowObj) return false; // Not started yet
          }
          
          return true; // Show it if active and started (or no start date)
        });

        if (activePopups.length > 0) {
          const popup = activePopups[0];
          setPopupData(popup);
          
          // Database থেকে কত সেকেন্ড পরে দেখাবে তা নেওয়া হচ্ছে
          const delay = popup.trigger_delay !== undefined && popup.trigger_delay !== null 
            ? parseInt(popup.trigger_delay) 
            : 5;
          
          console.log(`[Popup] Database delay: ${delay} seconds. Waiting to show "${popup.title}"...`);
          
          const timer = setTimeout(() => {
            console.log(`[Popup] Showing now!`);
            setIsVisible(true);
          }, delay * 1000);
          
          return () => clearTimeout(timer);
        }
      }
    } catch (err) {
      console.error('Catch error fetching popup:', err);
    }
  };

  const closePopup = () => {
    setIsVisible(false);
  };

  // Prevent hydration mismatch
  if (!isMounted) return null;
  if (!isVisible || !popupData) return null;

  return (
    <div className="promo-popup-overlay">
      <div className="promo-popup-card animate-popup-in">
        <button className="promo-close-btn" onClick={closePopup} aria-label="বন্ধ করুন">
          <FaXmark />
        </button>
        
        {popupData.image_url && (
          <div className="promo-image-container">
            <img src={popupData.image_url} alt={popupData.title} />
          </div>
        )}
        
        <div className="promo-content">
          <div className="promo-icon">
            <FaGift />
          </div>
          <h2 className="promo-title">{popupData.title}</h2>
          <p className="promo-description">{popupData.description}</p>
          
          <Link 
            href={popupData.button_link || '/'} 
            className="promo-action-btn"
            onClick={closePopup}
          >
            {popupData.button_text || 'কেনাকাটা শুরু করুন'}
          </Link>
        </div>
      </div>
      
      <style jsx>{`
        .promo-popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.4s ease;
        }

        .promo-popup-card {
          background: white;
          width: 100%;
          max-width: 450px;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .promo-close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: 0.3s;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .promo-close-btn:hover {
          background: white;
          transform: rotate(90deg);
          color: #e74c3c;
        }

        .promo-image-container {
          width: 100%;
          height: 240px;
          overflow: hidden;
        }

        .promo-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.5s;
        }

        .promo-content {
          padding: 40px 30px;
          text-align: center;
          background: linear-gradient(135deg, #ffffff 0%, #f9f6f2 100%);
        }

        .promo-icon {
          font-size: 32px;
          color: #7C4B2A;
          margin-bottom: 15px;
          animation: float 3s ease-in-out infinite;
        }

        .promo-title {
          font-family: 'Noto Sans Bengali', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .promo-description {
          font-family: 'Noto Sans Bengali', sans-serif;
          font-size: 16px;
          color: #5d6d7e;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .promo-action-btn {
          display: inline-block;
          background: linear-gradient(135deg, #7C4B2A 0%, #a67b5b 100%);
          color: white;
          padding: 14px 40px;
          border-radius: 50px;
          font-family: 'Noto Sans Bengali', sans-serif;
          font-weight: 700;
          text-decoration: none;
          transition: 0.3s;
          box-shadow: 0 10px 20px rgba(124, 75, 42, 0.3);
        }

        .promo-action-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 25px rgba(124, 75, 42, 0.4);
          filter: brightness(1.1);
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-popup-in {
          animation: popupIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes popupIn {
          0% { transform: scale(0.8) translateY(30px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }

        @media (max-width: 480px) {
          .promo-popup-card { border-radius: 20px; }
          .promo-title { font-size: 22px; }
          .promo-content { padding: 30px 20px; }
          .promo-image-container { height: 180px; }
        }
      `}</style>
    </div>
  );
}
