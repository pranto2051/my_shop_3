'use client';

import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaHammer } from 'react-icons/fa';
import styles from './CategoriesPanel.module.css';
import { useAdmin } from '@/app/context/AdminContext';

export default function GalleryPanel() {
  const { state, dispatch } = useAdmin();
  const { gallery } = state;
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    image: ''
  });

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        image: item.image
      });
    } else {
      setEditingItem(null);
      setFormData({ title: '', image: '' });
    }
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingItem) {
      dispatch({
        type: 'UPDATE_GALLERY_ITEM',
        payload: { ...editingItem, ...formData }
      });
    } else {
      const newItem = {
        id: `gal-${Date.now()}`,
        ...formData
      };
      dispatch({
        type: 'ADD_GALLERY_ITEM',
        payload: newItem
      });
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('আপনি কি নিশ্চিত যে এই আইটেমটি মুছে ফেলতে চান?')) {
      dispatch({
        type: 'DELETE_GALLERY_ITEM',
        payload: id
      });
    }
  };

  return (
    <div className="tab-pane active">
      <div className="section-header">
        <div className="title-group">
          <h2 className="section-title">আমাদের কাজ (গ্যালারি) ব্যবস্থাপনা</h2>
          <p className="section-subtitle">আপনার তৈরি পণ্যের ছবিগুলো যোগ, এডিট ও পরিচালনা করুন</p>
        </div>
        <button className="add-new-btn" onClick={() => handleOpenModal()}>
          <FaPlus /> নতুন ছবি যোগ করুন
        </button>
      </div>

      <div className={styles.categoriesGrid}>
        {gallery.map(item => (
          <div key={item.id} className={styles.categoryCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox} style={{ width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className={styles.cardActions}>
                <button className={styles.actionBtn} onClick={() => handleOpenModal(item)}>
                  <FaEdit />
                </button>
                <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(item.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.catName}>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleGroup}>
                <div className={styles.modalIcon}>
                  <FaHammer />
                </div>
                <div>
                  <h2 className={styles.modalTitle}>
                    {editingItem ? 'ছবি এডিট করুন' : 'নতুন ছবি যোগ করুন'}
                  </h2>
                  <p className={styles.modalSubtitle}>
                    {editingItem ? 'বিদ্যমান ছবির তথ্য পরিবর্তন করুন' : 'গ্যালারিতে নতুন ছবি যোগ করুন'}
                  </p>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>

            <div className={styles.modalBody}>
              <form onSubmit={handleSave}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>শিরোনাম</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="যেমন: লাক্সারি লিভিং রুম সেট"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>ছবির ইউআরএল (Image URL)</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="/images/gallery/living-room.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    required
                  />
                </div>

                <div className={styles.formActions}>
                  <button type="button" className={styles.cancelBtn} onClick={() => setShowModal(false)}>
                    বাতিল
                  </button>
                  <button type="submit" className={styles.submitBtn}>
                    <FaPlus /> সংরক্ষণ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
