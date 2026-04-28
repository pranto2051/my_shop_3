'use client';

import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaLayerGroup } from 'react-icons/fa';
import styles from './CategoriesPanel.module.css';

export default function CategoriesPanel({ categories, onUpdateCategories }) {
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    icon: 'couch',
    description: ''
  });

  const icons = [
    { value: 'chair', label: 'চেয়ার' },
    { value: 'table', label: 'টেবিল' },
    { value: 'door-open', label: 'দরজা' },
    { value: 'border-all', label: 'জানালা' },
    { value: 'couch', label: 'সোফা' },
    { value: 'bed', label: 'বেড' },
    { value: 'box', label: 'ওয়ার্ডরোব' },
    { value: 'book', label: 'শেলফ' }
  ];

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        nameEn: category.nameEn,
        icon: category.icon,
        description: category.description
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', nameEn: '', icon: 'couch', description: '' });
    }
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingCategory) {
      onUpdateCategories(categories.map(c =>
        c.id === editingCategory.id ? { ...c, ...formData } : c
      ));
    } else {
      const newCategory = {
        id: `cat_${String(categories.length + 1).padStart(3, '0')}`,
        ...formData,
        productCount: 0
      };
      onUpdateCategories([...categories, newCategory]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('আপনি কি নিশ্চিত যে এই ক্যাটাগরি মুছে ফেলতে চান?')) {
      onUpdateCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <div className="tab-pane active">
      <div className="section-header">
        <div className="title-group">
          <h2 className="section-title">ক্যাটাগরি ব্যবস্থাপনা</h2>
          <p className="section-subtitle">আপনার শোরুমের ক্যাটাগরি যোগ, এডিট ও পরিচালনা করুন</p>
        </div>
        <button className="add-new-btn" onClick={() => handleOpenModal()}>
          <FaPlus /> নতুন ক্যাটাগরি যোগ করুন
        </button>
      </div>

      <div className={styles.categoriesGrid}>
        {categories.map(category => (
          <div key={category.id} className={styles.categoryCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <i className={`fas fa-${category.icon}`}></i>
              </div>
              <div className={styles.cardActions}>
                <button className={styles.actionBtn} onClick={() => handleOpenModal(category)}>
                  <FaEdit />
                </button>
                <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(category.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.catName}>{category.name}</h3>
              <p className={styles.catNameEn}>{category.nameEn}</p>
              <p className={styles.catDesc}>{category.description}</p>
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
                  <FaLayerGroup />
                </div>
                <div>
                  <h2 className={styles.modalTitle}>
                    {editingCategory ? 'ক্যাটাগরি এডিট করুন' : 'নতুন ক্যাটাগরি যোগ করুন'}
                  </h2>
                  <p className={styles.modalSubtitle}>
                    {editingCategory ? 'বিদ্যমান ক্যাটাগরি পরিবর্তন করুন' : 'নতুন ক্যাটাগরি তৈরি করুন'}
                  </p>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>

            <div className={styles.modalBody}>
              <form onSubmit={handleSave}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>ক্যাটাগরি নাম (বাংলা)</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="যেমন: ড্রেসিং টেবিল"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Category Name (English)</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="e.g., Dressing Table"
                      value={formData.nameEn}
                      onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>আইকন নির্বাচন করুন</label>
                  <div className={styles.iconSelector}>
                    {icons.map(icon => (
                      <button
                        key={icon.value}
                        type="button"
                        className={`${styles.iconOption} ${formData.icon === icon.value ? styles.selected : ''}`}
                        onClick={() => setFormData({...formData, icon: icon.value})}
                      >
                        <i className={`fas fa-${icon.value}`}></i>
                        <span>{icon.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>বিবরণ</label>
                  <textarea
                    className={styles.formTextarea}
                    rows="3"
                    placeholder="ক্যাটাগরির বিবরণ লিখুন..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
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