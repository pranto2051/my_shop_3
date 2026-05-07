'use client';

import React from 'react';
import { 
  FaCircleQuestion, 
  FaBook, 
  FaVideo, 
  FaWhatsapp, 
  FaEnvelope,
  FaArrowRight,
  FaFileLines
} from 'react-icons/fa6';

export default function HelpPanel() {
  return (
    <div className="help-panel">
      <div className="panel-header">
        <div className="header-title">
          <h2>Help Center</h2>
          <p>আপনার অ্যাডমিন প্যানেল ব্যবহারে যেকোনো সহায়তার জন্য এখানে দেখুন</p>
        </div>
      </div>

      <div className="help-grid">
        <div className="help-main-content">
          <div className="search-section">
            <h3>কিভাবে সাহায্য করতে পারি?</h3>
            <div className="search-box">
              <input type="text" placeholder="ডকুমেন্টেশন খুঁজুন (যেমন: অর্ডার ট্র্যাকিং)..." />
              <button>সার্চ</button>
            </div>
          </div>

          <div className="quick-topics">
            <h3>জনপ্রিয় টিউটোরিয়াল</h3>
            <div className="topic-grid">
              <div className="topic-card">
                <FaFileLines className="t-icon" />
                <h4>অর্ডার প্রসেসিং গাইড</h4>
                <p>কিভাবে একটি অর্ডার শুরু থেকে ডেলিভারি পর্যন্ত নিয়ে যাবেন।</p>
                <FaArrowRight className="t-arrow" />
              </div>
              <div className="topic-card">
                <FaBook className="t-icon" />
                <h4>ইমভেন্টরি ব্যবস্থাপনা</h4>
                <p>পণ্যের স্টক আপডেট এবং লো-স্টক অ্যালার্ট কনফিগার করা।</p>
                <FaArrowRight className="t-arrow" />
              </div>
              <div className="topic-card">
                <FaVideo className="t-icon" />
                <h4>ভিডিও টিউটোরিয়াল</h4>
                <p>অ্যাডমিন প্যানেলের সকল ফিচার ভিডিওর মাধ্যমে দেখে নিন।</p>
                <FaArrowRight className="t-arrow" />
              </div>
              <div className="topic-card">
                <FaCircleQuestion className="t-icon" />
                <h4>প্রায়শই জিজ্ঞাসিত প্রশ্ন</h4>
                <p>সাধারণ সমস্যাগুলোর তাৎক্ষণিক সমাধান এখানে পাবেন।</p>
                <FaArrowRight className="t-arrow" />
              </div>
            </div>
          </div>
        </div>

        <div className="support-sidebar">
          <div className="support-card contact">
            <h3>সরাসরি যোগাযোগ</h3>
            <p>আমাদের সাপোর্ট টিম আপনার সেবায় নিয়োজিত।</p>
            <div className="contact-links">
              <a href="https://wa.me/8801700112233" target="_blank" rel="noreferrer" className="contact-link whatsapp">
                <FaWhatsapp /> হোয়াটসঅ্যাপ সাপোর্ট
              </a>
              <a href="mailto:support@mafurniture.com" className="contact-link email">
                <FaEnvelope /> ইমেইল পাঠান
              </a>
            </div>
          </div>
          <div className="support-card system-info">
            <h3>সিস্টেম ইনফো</h3>
            <div className="info-list">
              <div className="info-item">
                <span>ভার্সন:</span>
                <strong>v2.4.0 (Premium)</strong>
              </div>
              <div className="info-item">
                <span>লাইসেন্স:</span>
                <strong>সক্রিয় (Lifetime)</strong>
              </div>
              <div className="info-item">
                <span>সার্ভার স্ট্যাটাস:</span>
                <span className="status-ok">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .help-panel { padding: 20px; }
        .panel-header { margin-bottom: 30px; }
        .header-title h2 { font-size: 24px; color: #2c3e50; font-family: 'Noto Sans Bengali', sans-serif; }
        .header-title p { color: #7f8c8d; font-size: 14px; }

        .help-grid { display: grid; grid-template-columns: 1fr 320px; gap: 30px; }
        
        .search-section { background: #7C4B2A; padding: 40px; border-radius: 20px; color: white; margin-bottom: 40px; text-align: center; }
        .search-section h3 { margin-bottom: 20px; font-size: 22px; }
        .search-box { display: flex; max-width: 500px; margin: 0 auto; background: white; padding: 5px; border-radius: 12px; }
        .search-box input { flex: 1; border: none; padding: 12px 20px; outline: none; border-radius: 8px; font-size: 14px; }
        .search-box button { background: #2c3e50; color: white; border: none; padding: 0 25px; border-radius: 8px; font-weight: 700; cursor: pointer; }

        .quick-topics h3 { margin-bottom: 20px; color: #2c3e50; }
        .topic-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .topic-card { background: white; border: 1px solid #eee; border-radius: 15px; padding: 25px; position: relative; cursor: pointer; transition: 0.3s; }
        .topic-card:hover { border-color: #7C4B2A; box-shadow: 0 10px 20px rgba(124, 75, 42, 0.05); transform: translateY(-5px); }
        .t-icon { font-size: 30px; color: #7C4B2A; margin-bottom: 15px; }
        .topic-card h4 { margin: 0 0 10px 0; font-size: 16px; color: #2c3e50; }
        .topic-card p { margin: 0; font-size: 13px; color: #7f8c8d; line-height: 1.5; padding-right: 20px; }
        .t-arrow { position: absolute; bottom: 25px; right: 25px; color: #7C4B2A; opacity: 0; transition: 0.3s; }
        .topic-card:hover .t-arrow { opacity: 1; right: 20px; }

        .support-sidebar { display: flex; flex-direction: column; gap: 20px; }
        .support-card { background: white; border: 1px solid #eee; border-radius: 20px; padding: 25px; }
        .support-card h3 { font-size: 18px; margin-bottom: 15px; color: #2c3e50; }
        .support-card p { font-size: 13px; color: #7f8c8d; margin-bottom: 20px; }
        
        .contact-links { display: flex; flex-direction: column; gap: 10px; }
        .contact-link { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 12px; border-radius: 10px; font-weight: 700; font-size: 14px; text-decoration: none; transition: 0.3s; }
        .whatsapp { background: #25D366; color: white; }
        .email { background: #f8f9fa; color: #2c3e50; border: 1px solid #ddd; }
        .contact-link:hover { opacity: 0.9; transform: scale(1.02); }

        .info-list { display: flex; flex-direction: column; gap: 12px; }
        .info-item { display: flex; justify-content: space-between; font-size: 13px; }
        .info-item span { color: #7f8c8d; }
        .info-item strong { color: #2c3e50; }
        .status-ok { color: #27ae60; font-weight: 800; }
      `}</style>
    </div>
  );
}
