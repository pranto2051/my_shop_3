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
  FaPalette,
  FaFloppyDisk,
  FaArrowsRotate
} from 'react-icons/fa6';
import { useAdmin, addAnnouncement, updateAnnouncement, deleteAnnouncement } from '@/app/context/AdminContext';
import ConfirmModal from '../ConfirmModal';

export default function ContentManagementPanel() {
  const { state, dispatch } = useAdmin();
  const { announcements, pageConfigs } = state;
  const [activeSection, setActiveSection] = useState('announcement');
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [formData, setFormData] = useState({
    text: '',
    bg_color: '#000000',
    text_color: '#ffffff',
    link: '',
    is_active: true
  });

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
      </div>

      <div className="cms-content">

        {activeSection === 'announcement' && (
          <div className="announcement-view">
            <div className="section-header">
              <div className="header-info">
                <h3>অ্যানাউন্সমেন্ট বার (Ticker)</h3>
                <p>সবগুলো ঘোষণা এখানে থাকবে। আপনি যেকোনোটি সক্রিয় বা নিষ্ক্রিয় করতে পারেন।</p>
              </div>
              <button 
                className="add-btn"
                onClick={() => {
                  setEditingAnnouncement(null);
                  setFormData({ text: '', bg_color: '#000000', text_color: '#ffffff', link: '', is_active: true });
                  setShowAddModal(true);
                }}
              >
                <FaPlus /> নতুন ঘোষণা
              </button>
            </div>

            <div className="announcement-table-wrapper">
              <table className="cms-table">
                <thead>
                  <tr>
                    <th>আইডি (সংক্ষিপ্ত)</th>
                    <th>ঘোষণা (Text)</th>
                    <th>কালার স্কিম</th>
                    <th>অবস্থা</th>
                    <th>অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {announcements && announcements.length > 0 ? (
                    announcements.map(ann => (
                      <tr key={ann.id}>
                        <td><code className="id-tag">{ann.id.substring(0, 8)}...</code></td>
                        <td>
                          <div className="ann-content">
                            <span className="ann-text">{ann.text}</span>
                            {ann.link && <span className="ann-link-tag">Link: {ann.link}</span>}
                          </div>
                        </td>
                        <td>
                          <div className="scheme-preview">
                            <div className="color-dots">
                              <span className="dot" style={{ backgroundColor: ann.bg_color }} title="Background"></span>
                              <span className="dot" style={{ backgroundColor: ann.text_color, border: '1px solid #ddd' }} title="Text"></span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <button 
                            className={`status-toggle ${ann.is_active ? 'active' : ''}`}
                            onClick={async () => {
                              setLoading(true);
                              await updateAnnouncement(dispatch, { ...ann, is_active: !ann.is_active });
                              setLoading(false);
                            }}
                            disabled={loading}
                          >
                            {ann.is_active ? <><FaCheck /> সক্রিয়</> : <><FaXmark /> নিষ্ক্রিয়</>}
                          </button>
                        </td>
                        <td>
                          <div className="action-btns">
                            <button 
                              className="icon-btn"
                              onClick={() => {
                                setEditingAnnouncement(ann);
                                setFormData({
                                  text: ann.text,
                                  bg_color: ann.bg_color,
                                  text_color: ann.text_color,
                                  link: ann.link || '',
                                  is_active: ann.is_active
                                });
                                setShowAddModal(true);
                              }}
                            >
                              <FaPencil />
                            </button>
                            <button 
                              className="icon-btn delete"
                              onClick={() => {
                                setItemToDelete(ann.id);
                                setShowDeleteConfirm(true);
                              }}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="empty-row">কোনো অ্যানাউন্সমেন্ট পাওয়া যায়নি।</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Add/Edit Modal */}
            {showAddModal && (
              <div className="modal-overlay">
                <div className="cms-modal">
                  <div className="modal-header">
                    <h4>{editingAnnouncement ? 'ঘোষণা এডিট করুন' : 'নতুন ঘোষণা যোগ করুন'}</h4>
                    <button className="close-btn" onClick={() => setShowAddModal(false)}><FaXmark /></button>
                  </div>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    if (editingAnnouncement) {
                      await updateAnnouncement(dispatch, { ...editingAnnouncement, ...formData });
                    } else {
                      await addAnnouncement(dispatch, formData);
                    }
                    setLoading(false);
                    setShowAddModal(false);
                  }}>
                    <div className="modal-body">
                      <div className="form-group">
                        <label>অ্যানাউন্সমেন্ট টেক্সট *</label>
                        <textarea 
                          required
                          value={formData.text}
                          onChange={(e) => setFormData({...formData, text: e.target.value})}
                          placeholder="আপনার ঘোষণা এখানে লিখুন..."
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>ব্যাকগ্রাউন্ড কালার</label>
                          <div className="color-input">
                            <input type="color" value={formData.bg_color} onChange={(e) => setFormData({...formData, bg_color: e.target.value})} />
                            <span>{formData.bg_color}</span>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>টেক্সট কালার</label>
                          <div className="color-input">
                            <input type="color" value={formData.text_color} onChange={(e) => setFormData({...formData, text_color: e.target.value})} />
                            <span>{formData.text_color}</span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>লিংক (ঐচ্ছিক)</label>
                        <input 
                          type="url" 
                          value={formData.link}
                          onChange={(e) => setFormData({...formData, link: e.target.value})}
                          placeholder="https://example.com/promo"
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="cancel-btn" onClick={() => setShowAddModal(false)}>বাতিল</button>
                      <button type="submit" className="save-btn" disabled={loading}>
                        {loading ? <FaArrowsRotate className="spin" /> : <FaFloppyDisk />} {editingAnnouncement ? 'আপডেট করুন' : 'সেভ করুন'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <ConfirmModal 
              isOpen={showDeleteConfirm}
              onClose={() => setShowDeleteConfirm(false)}
              onConfirm={async () => {
                setLoading(true);
                await deleteAnnouncement(dispatch, itemToDelete);
                setLoading(false);
                setShowDeleteConfirm(false);
              }}
              title="অ্যানাউন্সমেন্ট ডিলিট করুন"
              message="আপনি কি নিশ্চিত যে আপনি এই ঘোষণাটি ডিলিট করতে চান? এটি স্থায়ীভাবে মুছে যাবে।"
            />
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
              {pageConfigs && pageConfigs.length > 0 ? (
                pageConfigs.map(config => (
                  <div key={config.slug} className="page-card">
                    <div className="page-icon">
                      <span style={{ fontSize: '32px' }}>{config.hero_icon || '📄'}</span>
                    </div>
                    <div className="page-info">
                      <h4>{config.title_bn}</h4>
                      <span className="last-edit">
                        আপডেট: {new Date(config.updated_at).toLocaleDateString('bn-BD')}
                      </span>
                    </div>
                    <button 
                      className="edit-page-btn"
                      onClick={() => window.open(`/${config.slug}`, '_blank')}
                    >
                      পেজ দেখুন
                    </button>
                    <button 
                      className="edit-page-btn secondary"
                      style={{ marginTop: '8px', backgroundColor: '#7C4B2A', color: 'white' }}
                      onClick={() => alert('এডিটর মোড শীঘ্রই আসছে। আপনি সরাসরি পেজে গিয়ে এডিট করতে পারবেন (যদি লগইন থাকেন)।')}
                    >
                      এডিট করুন
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-row">কোনো পেজ কনফিগ পাওয়া যায়নি।</div>
              )}
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

        /* Announcement Styles */
        .id-tag { font-size: 11px; color: #7f8c8d; background: #f1f1f1; padding: 2px 6px; border-radius: 4px; }
        .ann-content { display: flex; flex-direction: column; gap: 4px; }
        .ann-text { font-weight: 500; color: #2c3e50; }
        .ann-link-tag { font-size: 11px; color: #3498db; }
        .scheme-preview { display: flex; align-items: center; }
        .color-dots { display: flex; gap: 4px; }
        .dot { width: 16px; height: 16px; border-radius: 50%; display: inline-block; }
        
        .status-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          border: 1px solid #eee;
          background: #f8f9fa;
          color: #7f8c8d;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }
        .status-toggle.active {
          background: #e8f5e9;
          color: #2e7d32;
          border-color: #c8e6c9;
        }
        .empty-row { text-align: center; color: #95a5a6; padding: 40px !important; }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        .cms-modal {
          background: white;
          width: 90%;
          max-width: 500px;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .modal-header { padding: 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
        .modal-header h4 { margin: 0; font-size: 18px; color: #2c3e50; }
        .close-btn { background: none; border: none; font-size: 20px; color: #95a5a6; cursor: pointer; }
        .modal-body { padding: 20px; display: flex; flex-direction: column; gap: 15px; }
        .modal-body textarea { width: 100%; min-height: 100px; padding: 12px; border-radius: 8px; border: 1px solid #ddd; outline: none; font-family: inherit; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .color-input { display: flex; align-items: center; gap: 10px; padding: 8px; border: 1px solid #ddd; border-radius: 8px; }
        .color-input input[type="color"] { border: none; width: 30px; height: 30px; background: none; cursor: pointer; }
        .modal-footer { padding: 15px 20px; background: #f8f9fa; display: flex; justify-content: flex-end; gap: 10px; }
        .cancel-btn { padding: 10px 20px; background: white; border: 1px solid #ddd; border-radius: 8px; font-weight: 600; cursor: pointer; }
        
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
