'use client';

import React, { useState, useMemo } from 'react';
import { 
  FaImages, 
  FaPlus, 
  FaPen, 
  FaTrash, 
  FaExpand, 
  FaMagnifyingGlass, 
  FaXmark,
  FaLayerGroup,
  FaStar,
  FaImage
} from 'react-icons/fa6';
import { useAdmin } from '@/app/context/AdminContext';
import { supabase } from '@/lib/supabase';
import styles from './PhotoGallery.module.css';

const DEFAULT_SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
];

export default function PhotoGallery() {
  const { state, dispatch } = useAdmin();
  const { gallery = [] } = state;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category: 'লিভিং রুম'
  });

  const categories = [
    'all',
    'লিভিং রুম',
    'বেডরুম',
    'ডাইনিং',
    'কারুকার্য',
    'শোরুম'
  ];

  // Filtered gallery items
  const filteredGallery = useMemo(() => {
    return gallery.filter(item => {
      const matchesSearch = (item.title || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || (item.category || 'লিভিং রুম') === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [gallery, searchQuery, selectedCategory]);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        image: item.image || '',
        category: item.category || 'লিভিং রুম'
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        image: '',
        category: 'লিভিং রুম'
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.image) return;

    setIsSaving(true);

    try {
      if (editingItem) {
        const payload = {
          title: formData.title,
          image: formData.image,
          category: formData.category
        };

        const { error } = await supabase
          .from('gallery')
          .update(payload)
          .eq('id', editingItem.id);

        if (error) throw error;

        dispatch({
          type: 'UPDATE_GALLERY_ITEM',
          payload: { ...editingItem, ...payload }
        });

        dispatch({
          type: 'SHOW_TOAST',
          payload: { message: 'ফটো সফলভাবে আপডেট করা হয়েছে', type: 'success' }
        });
      } else {
        const newItem = {
          id: `gal-${Date.now()}`,
          title: formData.title,
          image: formData.image,
          category: formData.category,
          created_at: new Date().toISOString()
        };

        const { error } = await supabase
          .from('gallery')
          .insert(newItem);

        if (error) throw error;

        dispatch({
          type: 'ADD_GALLERY_ITEM',
          payload: newItem
        });

        dispatch({
          type: 'SHOW_TOAST',
          payload: { message: 'নতুন ফটো গ্যালারিতে যোগ করা হয়েছে', type: 'success' }
        });
      }
      setShowModal(false);
    } catch (err) {
      console.error('Error saving photo:', err);
      dispatch({
        type: 'SHOW_TOAST',
        payload: { message: 'সংরক্ষণ করতে সমস্যা হয়েছে', type: 'error' }
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই ফটোটি মুছে ফেলতে চান?')) return;

    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;

      dispatch({
        type: 'DELETE_GALLERY_ITEM',
        payload: id
      });

      dispatch({
        type: 'SHOW_TOAST',
        payload: { message: 'ফটো মুছে ফেলা হয়েছে', type: 'info' }
      });
    } catch (err) {
      console.error('Error deleting photo:', err);
      dispatch({
        type: 'SHOW_TOAST',
        payload: { message: 'মুছে ফেলতে ব্যর্থ হয়েছে', type: 'error' }
      });
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={styles.headerIcon}>
            <FaImages />
          </div>
          <div>
            <h1 className={styles.title}>
              ফটো গ্যালারি
              <span className={styles.countBadge}>{gallery.length}টি ফটো</span>
            </h1>
            <p className={styles.subtitle}>
              শোরুম ও পণ্যের ফটো গ্যালারি কাস্টমাইজ, ফিল্টার ও নিয়ন্ত্রণ করুন
            </p>
          </div>
        </div>

        <button className={styles.addBtn} onClick={() => handleOpenModal()}>
          <FaPlus /> নতুন ফটো যোগ করুন
        </button>
      </div>

      {/* Quick Stats Bar */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.total}`}>
            <FaImages />
          </div>
          <div>
            <div className={styles.statValue}>{gallery.length}</div>
            <div className={styles.statLabel}>মোট আপলোডকৃত ফটো</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.categories}`}>
            <FaLayerGroup />
          </div>
          <div>
            <div className={styles.statValue}>
              {new Set(gallery.map(g => g.category || 'লিভিং রুম')).size}
            </div>
            <div className={styles.statLabel}>সক্রিয় ক্যাটাগরি</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.featured}`}>
            <FaStar />
          </div>
          <div>
            <div className={styles.statValue}>{filteredGallery.length}</div>
            <div className={styles.statLabel}>প্রদর্শিত ফলাফল</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className={styles.controlsBar}>
        <div className={styles.searchBox}>
          <FaMagnifyingGlass className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="ফটো বা শিরোনাম দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.categoryFilter}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterChip} ${selectedCategory === cat ? styles.active : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'all' ? 'সব ফটো' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className={styles.photoGrid}>
        {filteredGallery.length > 0 ? (
          filteredGallery.map((item) => (
            <div key={item.id} className={styles.photoCard}>
              <div className={styles.imageWrapper}>
                <span className={styles.categoryTag}>
                  {item.category || 'লিভিং রুম'}
                </span>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.photoImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_SAMPLE_PHOTOS[0];
                  }}
                />
                <div className={styles.overlayActions}>
                  <button
                    className={styles.actionCircleBtn}
                    title="ফুল স্ক্রিন দেখুন"
                    onClick={() => setLightboxImage(item)}
                  >
                    <FaExpand />
                  </button>
                  <button
                    className={styles.actionCircleBtn}
                    title="সম্পাদনা করুন"
                    onClick={() => handleOpenModal(item)}
                  >
                    <FaPen />
                  </button>
                  <button
                    className={`${styles.actionCircleBtn} ${styles.delete}`}
                    title="মুছে ফেলুন"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.photoTitle}>{item.title}</h3>
                <div className={styles.photoFooter}>
                  <span className={styles.dateText}>আইডি: #{item.id?.slice(-6)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <FaImage className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>কোন ফটো পাওয়া যায়নি</h3>
            <p className={styles.emptySub}>
              আপনার সার্চ বা ক্যাটাগরি ফিল্টারে কোন ফটো মেলেনি। নতুন ফটো যোগ করতে ওপরের বোতাম চাপুন।
            </p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalHeaderTitle}>
                {editingItem ? 'ফটো সম্পাদন করুন' : 'নতুন ফটো গ্যালারিতে যোগ করুন'}
              </h2>
              <button className={styles.closeModalBtn} onClick={() => setShowModal(false)}>
                <FaXmark />
              </button>
            </div>

            <form onSubmit={handleSave} className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>শিরোনাম (Title)</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="যেমন: রয়্যাল সেগুন ডাইনিং সেট"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>ক্যাটাগরি</label>
                <select
                  className={styles.formInput}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="লিভিং রুম">লিভিং রুম</option>
                  <option value="বেডরুম">বেডরুম</option>
                  <option value="ডাইনিং">ডাইনিং</option>
                  <option value="কারুকার্য">কারুকার্য</option>
                  <option value="শোরুম">শোরুম</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>ছবির লিঙ্ক (Image URL)</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                />
              </div>

              {/* Live Preview Box & Quick Selectors */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>প্রিভিউ ও নমুনা নির্বাচন</label>
                <div className={styles.previewBox}>
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className={styles.previewImage}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = DEFAULT_SAMPLE_PHOTOS[0];
                      }}
                    />
                  ) : (
                    <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>ছবির ইউআরএল দিন</span>
                  )}
                </div>
                <div className={styles.samplePickers}>
                  {DEFAULT_SAMPLE_PHOTOS.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Sample ${idx}`}
                      className={styles.sampleThumb}
                      onClick={() => setFormData({ ...formData, image: url })}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowModal(false)}
                  disabled={isSaving}
                >
                  বাতিল
                </button>
                <button type="submit" className={styles.submitBtn} disabled={isSaving}>
                  {isSaving ? 'সংরক্ষণ হচ্ছে...' : editingItem ? 'আপডেট করুন' : 'যোগ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className={styles.lightboxOverlay} onClick={() => setLightboxImage(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightboxImage(null)}>
            <FaXmark />
          </button>
          <img
            src={lightboxImage.image}
            alt={lightboxImage.title}
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
          <div className={styles.lightboxTitle}>{lightboxImage.title}</div>
        </div>
      )}
    </div>
  );
}
