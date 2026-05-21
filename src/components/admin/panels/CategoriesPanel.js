'use client';

import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaLayerGroup } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import styles from './CategoriesPanel.module.css';

export default function CategoriesPanel({ categories, onUpdateCategories }) {
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    icon: '',
    description: ''
  });

  const getNextCategoryId = () => {
    const ids = categories
      .map(category => category.id)
      .filter(id => typeof id === 'string' && id.startsWith('cat_'))
      .map(id => Number.parseInt(id.replace('cat_', ''), 10))
      .filter(Number.isFinite);

    if (ids.length === 0) {
      return 'cat_001';
    }

    return `cat_${String(Math.max(...ids) + 1).padStart(3, '0')}`;
  };

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
      setFormData({ name: '', nameEn: '', icon: '', description: '' });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const categoryPayload = {
      name: formData.name,
      name_en: formData.nameEn,
      icon: formData.icon,
      description: formData.description,
      product_count: editingCategory?.productCount || 0
    };

    setIsSaving(true);

    try {
      let updatedCategory;

      if (editingCategory) {
        const { data, error } = await supabase
          .from('categories')
          .update(categoryPayload)
          .eq('id', editingCategory.id)
          .select('id, name, nameEn:name_en, icon, description, productCount:product_count')
          .single();

        if (error) throw error;
        updatedCategory = data;
      } else {
        const { data, error } = await supabase
          .from('categories')
          .insert([{ id: getNextCategoryId(), ...categoryPayload }])
          .select('id, name, nameEn:name_en, icon, description, productCount:product_count')
          .single();

        if (error) throw error;
        updatedCategory = data;
      }

      if (editingCategory) {
        onUpdateCategories(categories.map(category => (
          category.id === editingCategory.id ? updatedCategory : category
        )));
      } else {
        onUpdateCategories([...categories, updatedCategory]);
      }

      setShowModal(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
      alert('ক্যাটাগরি সংরক্ষণ করতে সমস্যা হয়েছে!');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('আপনি কি নিশ্চিত যে এই ক্যাটাগরি মুছে ফেলতে চান?')) {
      try {
        const { error } = await supabase.from('categories').delete().eq('id', id);

        if (error) throw error;

        onUpdateCategories(categories.filter(category => category.id !== id));
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('ক্যাটাগরি মুছে ফেলতে সমস্যা হয়েছে!');
      }
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
                    <label className={styles.formLabel}>আইকন নাম</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="যেমন: couch, chair, table"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      required
                    />
                    <p className={styles.formHint}>ডাটাবেসে সংরক্ষিত Font Awesome icon name ব্যবহার করুন।</p>
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
                  <button type="submit" className={styles.submitBtn} disabled={isSaving}>
                    <FaPlus /> {isSaving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
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