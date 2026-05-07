'use client';

import React, { useState } from 'react';
import { 
  FaImages, 
  FaBullhorn, 
  FaCircleQuestion, 
  FaCommentDots, 
  FaFileLines, 
  FaWindowMaximize,
  FaPlus,
  FaPencil,
  FaTrash,
  FaCheck,
  FaXmark,
  FaGripLines,
  FaEye,
  FaCalendarDays,
  FaPalette
} from 'react-icons/fa6';

export default function ContentManagementPanel() {
  const [activeSection, setActiveSection] = useState('banners');

  const banners = [
    { id: 1, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80', title: 'বিলাসবহুল ড্রয়িং রুম সেট', subtitle: 'আপনার ঘরকে দিন রাজকীয় আভিজাত্য', active: true, order: 1 },
    { id: 2, image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80', title: 'আধুনিক বেডরুম কালেকশন', subtitle: 'আরামদায়ক ঘুম আর নান্দনিক ডিজাইন', active: true, order: 2 }
  ];

  const faqs = [
    { id: 1, question: 'অর্ডার করার কতদিন পর ডেলিভারি পাওয়া যাবে?', answer: 'ঢাকার মধ্যে ১-২ দিন এবং ঢাকার বাইরে ৩-৫ দিনের মধ্যে ডেলিভারি দেওয়া হয়।', category: 'Delivery', status: 'Published' },
    { id: 2, question: 'কিভাবে পেমেন্ট করতে পারি?', answer: 'আমরা ক্যাশ অন ডেলিভারি, বিকাশ এবং ব্যাংক পেমেন্ট গ্রহণ করি।', category: 'Payment', status: 'Published' }
  ];

  return (
    <div className="cms-panel">
      <div className="panel-header">
        <div className="header-title">
          <h2>কন্টেন্ট ব্যবস্থাপনা</h2>
          <p>ওয়েবসাইটের ব্যানার, ঘোষণা এবং অন্যান্য কন্টেন্ট নিয়ন্ত্রণ করুন</p>
        </div>
      </div>

      <div className="cms-tabs">
        <button className={activeSection === 'banners' ? 'active' : ''} onClick={() => setActiveSection('banners')}>
          <FaImages /> ব্যানার
        </button>
        <button className={activeSection === 'announcement' ? 'active' : ''} onClick={() => setActiveSection('announcement')}>
          <FaBullhorn /> ঘোষণা
        </button>
        <button className={activeSection === 'faq' ? 'active' : ''} onClick={() => setActiveSection('faq')}>
          <FaCircleQuestion /> FAQ
        </button>
        <button className={activeSection === 'testimonials' ? 'active' : ''} onClick={() => setActiveSection('testimonials')}>
          <FaCommentDots /> প্রশংসাপত্র
        </button>
        <button className={activeSection === 'pages' ? 'active' : ''} onClick={() => setActiveSection('pages')}>
          <FaFileLines /> পেজ সমূহ
        </button>
        <button className={activeSection === 'popups' ? 'active' : ''} onClick={() => setActiveSection('popups')}>
          <FaWindowMaximize /> পপআপ
        </button>
      </div>

      <div className="cms-content">
        {activeSection === 'banners' && (
          <div className="banners-view">
            <div className="section-header">
              <h3>হোমপেজ ব্যানার ম্যানেজার</h3>
              <button className="add-btn"><FaPlus /> নতুন ব্যানার</button>
            </div>
            <div className="banner-list">
              {banners.map(banner => (
                <div key={banner.id} className="banner-card">
                  <div className="drag-handle"><FaGripLines /></div>
                  <img src={banner.image} alt="" className="banner-thumb" />
                  <div className="banner-info">
                    <h4>{banner.title}</h4>
                    <p>{banner.subtitle}</p>
                    <div className="banner-meta">
                      <span className="order-tag">ক্রম: {banner.order}</span>
                      <span className="status-tag active">সক্রিয়</span>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button className="icon-btn"><FaPencil /></button>
                    <button className="icon-btn"><FaEye /></button>
                    <button className="icon-btn delete"><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'announcement' && (
          <div className="announcement-view">
            <div className="section-header">
              <h3>অ্যানাউন্সমেন্ট বার (Ticker)</h3>
              <div className="toggle-switch active"></div>
            </div>
            <div className="ticker-config">
              <div className="form-group">
                <label>মেসেজ সমূহ</label>
                <div className="ticker-messages">
                  <div className="t-msg">
                    <input type="text" defaultValue="নতুন ডিজাইনের সোফা সেটে ২০% ডিসকাউন্ট! অফারটি সীমিত সময়ের জন্য।" />
                    <button className="del-msg"><FaXmark /></button>
                  </div>
                  <button className="add-msg-btn"><FaPlus /> মেসেজ যোগ করুন</button>
                </div>
              </div>
              <div className="config-grid">
                <div className="form-group">
                  <label>ব্যাকগ্রাউন্ড কালার</label>
                  <div className="color-picker-mock">
                    <div className="color-circle" style={{background: '#7C4B2A'}}></div>
                    <span>#7C4B2A</span>
                    <FaPalette />
                  </div>
                </div>
                <div className="form-group">
                  <label>স্ক্রলিং স্পিড</label>
                  <select>
                    <option>ধীরে (Slow)</option>
                    <option selected>মাঝারি (Medium)</option>
                    <option>দ্রুত (Fast)</option>
                  </select>
                </div>
              </div>
              <button className="save-btn">আপডেট করুন</button>
            </div>
          </div>
        )}

        {activeSection === 'faq' && (
          <div className="faq-view">
            <div className="section-header">
              <h3>সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)</h3>
              <button className="add-btn"><FaPlus /> নতুন প্রশ্ন</button>
            </div>
            <div className="faq-table-wrapper">
              <table className="cms-table">
                <thead>
                  <tr>
                    <th>প্রশ্ন</th>
                    <th>ক্যাটাগরি</th>
                    <th>অবস্থা</th>
                    <th>অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {faqs.map(faq => (
                    <tr key={faq.id}>
                      <td><strong>{faq.question}</strong></td>
                      <td><span className="cat-tag">{faq.category}</span></td>
                      <td><span className="status-tag active">Published</span></td>
                      <td>
                        <div className="action-btns">
                          <button className="icon-btn"><FaPencil /></button>
                          <button className="icon-btn delete"><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'pages' && (
          <div className="pages-view">
            <div className="section-header">
              <h3>পেজ কন্টেন্ট এডিটর</h3>
            </div>
            <div className="pages-grid">
              {['About Us', 'Privacy Policy', 'Terms & Conditions', 'Return Policy'].map(page => (
                <div key={page} className="page-card">
                  <div className="page-icon"><FaFileLines /></div>
                  <div className="page-info">
                    <h4>{page}</h4>
                    <span className="last-edit">Last Edit: ২ দিন আগে</span>
                  </div>
                  <button className="edit-page-btn">এডিট করুন</button>
                </div>
              ))}
            </div>
            <div className="rich-editor-mock">
              <div className="editor-toolbar">
                <strong>B</strong> <em>I</em> <u>U</u> | 📋 🔗 📷
              </div>
              <div className="editor-content" contentEditable>
                আমাদের সম্পর্কে... এখানে আপনার দোকানের বর্ণনা লিখুন।
              </div>
              <div className="editor-footer">
                <button className="save-btn">সংরক্ষণ করুন</button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'popups' && (
          <div className="popups-view">
            <div className="section-header">
              <h3>প্রোমোশনাল পপআপ / মোডাল</h3>
              <button className="add-btn"><FaPlus /> নতুন পপআপ</button>
            </div>
            <div className="popup-card active">
              <div className="popup-preview-box">
                <img src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=400&q=80" alt="" />
                <div className="preview-overlay">
                  <h5>ঈদ স্পেশাল অফার!</h5>
                  <p>সকল ফার্নিচারে ১০% ছাড়</p>
                  <button>কেনাকাটা শুরু করুন</button>
                </div>
              </div>
              <div className="popup-settings">
                <div className="p-setting-item">
                  <label>ট্রিগার:</label>
                  <span>অন পেজ লোড (৫ সেকেন্ড পর)</span>
                </div>
                <div className="p-setting-item">
                  <label>সময়সীমা:</label>
                  <span>১০ মে - ২০ মে ২০২৪</span>
                </div>
                <div className="p-setting-item">
                  <label>অবস্থা:</label>
                  <span className="active-txt">সক্রিয়</span>
                </div>
                <div className="p-actions">
                  <button className="p-btn"><FaPencil /> এডিট</button>
                  <button className="p-btn del"><FaTrash /> ডিলিট</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .cms-panel { padding: 20px; }
        .panel-header { margin-bottom: 30px; }
        .header-title h2 { font-size: 24px; color: #2c3e50; font-family: 'Noto Sans Bengali', sans-serif; }
        .header-title p { color: #7f8c8d; font-size: 14px; }

        .cms-tabs {
          display: flex;
          gap: 10px;
          border-bottom: 2px solid #eee;
          margin-bottom: 30px;
          overflow-x: auto;
          padding-bottom: 2px;
        }

        .cms-tabs button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          border: none;
          background: none;
          color: #7f8c8d;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          border-bottom: 3px solid transparent;
          transition: 0.3s;
        }

        .cms-tabs button.active {
          color: #7C4B2A;
          border-bottom-color: #7C4B2A;
        }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .add-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #7C4B2A; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }

        .banner-card { display: flex; align-items: center; gap: 20px; padding: 15px; background: white; border: 1px solid #eee; border-radius: 12px; margin-bottom: 15px; }
        .drag-handle { color: #ccc; cursor: grab; }
        .banner-thumb { width: 120px; height: 70px; border-radius: 8px; object-fit: cover; }
        .banner-info { flex: 1; }
        .banner-info h4 { margin: 0 0 5px 0; color: #2c3e50; }
        .banner-info p { margin: 0; font-size: 13px; color: #7f8c8d; }
        .banner-meta { display: flex; gap: 15px; margin-top: 10px; }
        .order-tag { font-size: 11px; background: #f1f1f1; padding: 2px 8px; border-radius: 5px; }
        .status-tag.active { font-size: 11px; background: #e8f5e9; color: #2e7d32; padding: 2px 8px; border-radius: 5px; }

        .card-actions { display: flex; gap: 10px; }
        .icon-btn { background: none; border: 1px solid #eee; padding: 8px; border-radius: 8px; cursor: pointer; color: #7f8c8d; }
        .icon-btn:hover { background: #f8f9fa; color: #2c3e50; }
        .icon-btn.delete:hover { color: #e74c3c; border-color: #ffdce0; background: #fff5f6; }

        .ticker-config { background: #fff; border: 1px solid #eee; padding: 25px; border-radius: 15px; }
        .ticker-messages { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
        .t-msg { display: flex; gap: 10px; }
        .t-msg input { flex: 1; padding: 12px; border-radius: 8px; border: 1px solid #ddd; outline: none; }
        .del-msg { background: #fee2e2; color: #ef4444; border: none; width: 40px; height: 40px; border-radius: 8px; cursor: pointer; }
        .add-msg-btn { align-self: flex-start; background: none; border: 1px dashed #7C4B2A; color: #7C4B2A; padding: 8px 15px; border-radius: 8px; cursor: pointer; font-weight: 600; }

        .config-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }
        .color-picker-mock { display: flex; align-items: center; gap: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; }
        .color-circle { width: 20px; height: 20px; border-radius: 50%; }
        .save-btn { background: #2c3e50; color: white; border: none; padding: 12px 25px; border-radius: 8px; font-weight: 700; cursor: pointer; }

        .cms-table { width: 100%; border-collapse: collapse; }
        .cms-table th { text-align: left; padding: 15px; background: #f8f9fa; color: #7f8c8d; font-size: 13px; }
        .cms-table td { padding: 15px; border-bottom: 1px solid #eee; }
        .cat-tag { background: #e3f2fd; color: #1565c0; padding: 2px 8px; border-radius: 5px; font-size: 11px; }

        .pages-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px; }
        .page-card { background: #f8f9fa; border: 1px solid #eee; padding: 20px; border-radius: 12px; text-align: center; transition: 0.3s; }
        .page-card:hover { border-color: #7C4B2A; background: white; }
        .page-icon { font-size: 30px; color: #7C4B2A; margin-bottom: 15px; }
        .page-info h4 { margin: 0 0 5px 0; }
        .last-edit { font-size: 10px; color: #95a5a6; display: block; margin-bottom: 15px; }
        .edit-page-btn { width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #ddd; background: white; cursor: pointer; font-weight: 600; font-size: 13px; }

        .rich-editor-mock { background: white; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; }
        .editor-toolbar { padding: 12px; background: #f8f9fa; border-bottom: 1px solid #ddd; display: flex; gap: 15px; }
        .editor-content { padding: 25px; min-height: 200px; outline: none; line-height: 1.6; }
        .editor-footer { padding: 15px; border-top: 1px solid #eee; text-align: right; }

        .popup-card { display: flex; gap: 25px; background: white; border: 1px solid #eee; padding: 20px; border-radius: 15px; }
        .popup-preview-box { width: 300px; height: 200px; border-radius: 12px; overflow: hidden; position: relative; }
        .popup-preview-box img { width: 100%; height: 100%; object-fit: cover; }
        .preview-overlay { position: absolute; inset: 0; background: rgba(124, 75, 42, 0.8); color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px; }
        .preview-overlay h5 { margin: 0 0 5px 0; font-size: 18px; }
        .preview-overlay p { font-size: 13px; margin-bottom: 15px; }
        .preview-overlay button { padding: 8px 15px; border-radius: 20px; border: none; background: white; color: #7C4B2A; font-weight: 700; font-size: 11px; }

        .popup-settings { flex: 1; display: flex; flex-direction: column; gap: 15px; }
        .p-setting-item { display: flex; flex-direction: column; gap: 4px; }
        .p-setting-item label { font-size: 11px; color: #95a5a6; text-transform: uppercase; font-weight: 700; }
        .p-setting-item span { font-weight: 600; color: #2c3e50; }
        .active-txt { color: #27ae60; }
        .p-actions { margin-top: auto; display: flex; gap: 10px; }
        .p-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px; border-radius: 8px; border: 1px solid #ddd; background: white; cursor: pointer; font-weight: 600; font-size: 13px; }
        .p-btn.del { color: #e74c3c; border-color: #ffdce0; }
      `}</style>
    </div>
  );
}
