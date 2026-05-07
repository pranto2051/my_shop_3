'use client';

import React, { useState } from 'react';
import { 
  FaPlus, 
  FaPencil, 
  FaTrash, 
  FaCheck, 
  FaXmark, 
  FaGift, 
  FaCalendarDays, 
  FaClock, 
  FaEye, 
  FaCircleInfo,
  FaFloppyDisk,
  FaArrowsRotate,
  FaWindowMaximize
} from 'react-icons/fa6';
import { 
  useAdmin, 
  addPromotionalPopup, 
  updatePromotionalPopup, 
  deletePromotionalPopup 
} from '@/app/context/AdminContext';
import ConfirmModal from '../ConfirmModal';
import styles from './PromotionalPopupPanel.module.css';

export default function PromotionalPopupPanel() {
  const { state, dispatch } = useAdmin();
  const promotionalPopups = state.promotionalPopups || [];
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPopup, setEditingPopup] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    button_text: 'কেনাকাটা শুরু করুন',
    button_link: '/',
    image_url: '',
    trigger_type: 'page_load',
    trigger_delay: 5,
    start_date: '',
    end_date: '',
    is_active: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('দয়া করে শিরোনাম এবং ডেসক্রিপশন লিখুন');
      return;
    }

    setLoading(true);
    console.log('Submitting popup data:', formData);
    
    try {
      const payload = {
        ...formData,
        trigger_delay: parseInt(formData.trigger_delay) || 5
      };

      let result;
      if (editingPopup) {
        result = await updatePromotionalPopup(dispatch, { ...editingPopup, ...payload });
      } else {
        result = await addPromotionalPopup(dispatch, payload);
      }

      if (result.success) {
        console.log('Save successful!');
        setShowAddModal(false);
        setEditingPopup(null);
      } else {
        console.error('Save failed:', result.error);
        alert('সেভ করতে সমস্যা হয়েছে: ' + (result.error?.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      alert('একটি ভুল হয়েছে। দয়া করে আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    console.log('Opening Add Modal...');
    setEditingPopup(null);
    
    // Set dates in a way that datetime-local always accepts (local time)
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now - offset).toISOString().slice(0, 16);
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000 - offset).toISOString().slice(0, 16);

    setFormData({
      title: '',
      description: '',
      button_text: 'কেনাকাটা শুরু করুন',
      button_link: '/',
      image_url: '',
      trigger_type: 'page_load',
      trigger_delay: 5,
      start_date: localISOTime,
      end_date: nextWeek,
      is_active: true
    });
    setShowAddModal(true);
  };

  const openEditModal = (popup) => {
    setEditingPopup(popup);
    setFormData({
      title: popup.title,
      description: popup.description,
      button_text: popup.button_text,
      button_link: popup.button_link,
      image_url: popup.image_url || '',
      trigger_type: popup.trigger_type,
      trigger_delay: popup.trigger_delay,
      start_date: popup.start_date ? new Date(popup.start_date).toISOString().slice(0, 16) : '',
      end_date: popup.end_date ? new Date(popup.end_date).toISOString().slice(0, 16) : '',
      is_active: popup.is_active
    });
    setShowAddModal(true);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePromotionalPopup(dispatch, itemToDelete);
      setShowDeleteConfirm(false);
    } catch (err) {
      console.error('Error deleting popup:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h2>প্রোমোশনাল পপআপ ব্যবস্থাপনা</h2>
          <p>ওয়েবসাইটে ডিসকাউন্ট অফার বা ঘোষণা প্রদর্শনের জন্য পপআপ নিয়ন্ত্রণ করুন</p>
        </div>
        <button className={styles.addBtn} onClick={openAddModal}>
          <FaPlus /> নতুন পপআপ যোগ করুন
        </button>
      </div>

      <div className={styles.grid}>
        {promotionalPopups && promotionalPopups.length > 0 ? (
          promotionalPopups.map(popup => (
            <div key={popup.id} className={`${styles.card} ${popup.is_active ? styles.activeCard : styles.inactiveCard}`}>
              <div className={styles.cardPreview}>
                {popup.image_url ? (
                  <img src={popup.image_url} alt={popup.title} />
                ) : (
                  <div className={styles.noImage}><FaGift /></div>
                )}
                <div className={styles.previewOverlay}>
                  <h5>{popup.title}</h5>
                  <p>প্রিভিউ দেখার জন্য ফ্রন্টএন্ড চেক করুন</p>
                </div>
              </div>
              
              <div className={styles.cardContent}>
                <div className={styles.cardTitleRow}>
                  <h4>{popup.title}</h4>
                  <span className={`${styles.statusBadge} ${popup.is_active ? styles.statusActive : styles.statusInactive}`}>
                    {popup.is_active ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                  </span>
                </div>
                
                <p className={styles.cardDesc}>{popup.description}</p>
                
                <div className={styles.metaGrid}>
                  <div className={styles.metaItem}>
                    <FaClock /> <span>{popup.trigger_delay} সে. পর</span>
                  </div>
                  <div className={styles.metaItem}>
                    <FaCalendarDays /> <span>{popup.start_date ? new Date(popup.start_date).toLocaleDateString('bn-BD') : 'N/A'} - {popup.end_date ? new Date(popup.end_date).toLocaleDateString('bn-BD') : 'N/A'}</span>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <button className={styles.editBtn} onClick={() => openEditModal(popup)}>
                    <FaPencil /> এডিট
                  </button>
                  <button className={styles.deleteBtn} onClick={() => {
                    setItemToDelete(popup.id);
                    setShowDeleteConfirm(true);
                  }}>
                    <FaTrash /> ডিলিট
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}><FaWindowMaximize /></div>
            <h3>কোনো পপআপ পাওয়া যায়নি</h3>
            <p>নতুন একটি প্রোমোশনাল পপআপ যোগ করে আপনার অফার প্রচার শুরু করুন</p>
            <button onClick={openAddModal} className={styles.addBtn} style={{margin: '0 auto'}}>নতুন পপআপ তৈরি করুন</button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderTitle}>
                <div className={styles.modalIcon}><FaGift /></div>
                <div>
                  <h3>{editingPopup ? 'পপআপ আপডেট করুন' : 'নতুন পপআপ তৈরি করুন'}</h3>
                  <span>আপনার স্পেশাল অফারটি সুন্দরভাবে সাজান</span>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setShowAddModal(false)}><FaXmark /></button>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.modalBody}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>টাইটেল (Title) *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      placeholder="যেমন: ঈদ স্পেশাল অফার!"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>অ্যাকশন বাটন টেক্সট</label>
                    <input 
                      type="text" 
                      value={formData.button_text}
                      onChange={e => setFormData({...formData, button_text: e.target.value})}
                      placeholder="যেমন: কেনাকাটা শুরু করুন"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>সংক্ষিপ্ত বর্ণনা (Description) *</label>
                  <textarea 
                    required 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="অফার সম্পর্কে কিছু লিখুন..."
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>ইমেজ ইউআরএল (URL)</label>
                    <input 
                      type="text" 
                      value={formData.image_url}
                      onChange={e => setFormData({...formData, image_url: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>বাটন লিংক (URL)</label>
                    <input 
                      type="text" 
                      value={formData.button_link}
                      onChange={e => setFormData({...formData, button_link: e.target.value})}
                      placeholder="/shop বা যেকোনো লিঙ্ক"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>শুরুর তারিখ ও সময় *</label>
                    <input 
                      type="datetime-local" 
                      required 
                      value={formData.start_date}
                      onChange={e => setFormData({...formData, start_date: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>শেষ তারিখ ও সময় *</label>
                    <input 
                      type="datetime-local" 
                      required 
                      value={formData.end_date}
                      onChange={e => setFormData({...formData, end_date: e.target.value})}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>ট্রিগার টাইপ</label>
                    <select value={formData.trigger_type} onChange={e => setFormData({...formData, trigger_type: e.target.value})}>
                      <option value="page_load">অন পেজ লোড</option>
                      <option value="exit_intent">এগজিট ইনটেন্ট</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>ট্রিগার ডিলে (সেকেন্ড)</label>
                    <input 
                      type="number" 
                      min="0"
                      value={formData.trigger_delay}
                      onChange={e => setFormData({...formData, trigger_delay: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>

                <div className={styles.toggleRow}>
                  <label className={styles.toggle}>
                    <input 
                      type="checkbox" 
                      checked={formData.is_active}
                      onChange={e => setFormData({...formData, is_active: e.target.checked})}
                    />
                    <span className={styles.slider}></span>
                    <span className={styles.toggleLabel}>পপআপটি সরাসরি সক্রিয় করুন</span>
                  </label>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.modalCancel} onClick={() => setShowAddModal(false)}>বাতিল</button>
                <button type="submit" className={styles.modalSubmit} disabled={loading}>
                  {loading ? <FaArrowsRotate className={styles.spin} /> : <FaFloppyDisk />} 
                  {editingPopup ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal 
        isOpen={showDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="পপআপ ডিলিট করুন"
        message="আপনি কি নিশ্চিত যে আপনি এই প্রোমোশনাল পপআপটি ডিলিট করতে চান? এটি স্থায়ীভাবে মুছে যাবে।"
      />
    </div>
  );
}
