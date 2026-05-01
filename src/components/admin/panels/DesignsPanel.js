'use client';

import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaPalette } from 'react-icons/fa';
import styles from './CategoriesPanel.module.css';
import { useAdmin } from '@/app/context/AdminContext';

export default function DesignsPanel() {
  const { state, dispatch } = useAdmin();
  const { designs } = state;
  const [showModal, setShowModal] = useState(false);
  const [editingDesign, setEditingDesign] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    category: 'ক্লাসিক'
  });

  const handleOpenModal = (design = null) => {
    if (design) {
      setEditingDesign(design);
      setFormData({
        name: design.name,
        image: design.image,
        category: design.category
      });
    } else {
      setEditingDesign(null);
      setFormData({ name: '', image: '', category: 'ক্লাসিক' });
    }
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingDesign) {
      dispatch({
        type: 'UPDATE_DESIGN',
        payload: { ...editingDesign, ...formData }
      });
    } else {
      const newDesign = {
        id: `design-${Date.now()}`,
        ...formData
      };
      dispatch({
        type: 'ADD_DESIGN',
        payload: newDesign
      });
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('আপনি কি নিশ্চিত যে এই ডিজাইনটি মুছে ফেলতে চান?')) {
      dispatch({
        type: 'DELETE_DESIGN',
        payload: id
      });
    }
  };

  return (
    <div className="tab-pane active">
      <div className="section-header">
        <div className="title-group">
          <h2 className="section-title">ডিজাইন ব্যবস্থাপনা</h2>
          <p className="section-subtitle">আপনার শোরুমের ডিজাইনগুলো যোগ, এডিট ও পরিচালনা করুন</p>
        </div>
        <button className="add-new-btn" onClick={() => handleOpenModal()}>
          <FaPlus /> নতুন ডিজাইন যোগ করুন
        </button>
      </div>

      <div className={styles.categoriesGrid}>
        {designs.map(design => (
          <div key={design.id} className={styles.categoryCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox} style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={design.image} alt={design.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className={styles.cardActions}>
                <button className={styles.actionBtn} onClick={() => handleOpenModal(design)}>
                  <FaEdit />
                </button>
                <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(design.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.catName}>{design.name}</h3>
              <p className={styles.catNameEn}>{design.category}</p>
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
                  <FaPalette />
                </div>
                <div>
                  <h2 className={styles.modalTitle}>
                    {editingDesign ? 'ডিজাইন এডিট করুন' : 'নতুন ডিজাইন যোগ করুন'}
                  </h2>
                  <p className={styles.modalSubtitle}>
                    {editingDesign ? 'বিদ্যমান ডিজাইন পরিবর্তন করুন' : 'নতুন ডিজাইন তৈরি করুন'}
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
                  <label className={styles.formLabel}>ডিজাইন নাম</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="যেমন: ভিনটেজ উড কার্ভিং"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>ছবির ইউআরএল (Image URL)</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="/images/designs/design1.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>ক্যাটাগরি</label>
                  <select 
                    className={styles.formInput}
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="ক্লাসিক">ক্লাসিক</option>
                    <option value="মডার্ন">মডার্ন</option>
                    <option value="কারিগরী">কারিগরী</option>
                    <option value="প্রিমিয়াম">প্রিমিয়াম</option>
                  </select>
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
