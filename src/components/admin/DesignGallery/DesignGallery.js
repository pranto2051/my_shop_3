'use client';

import React, { useState, useMemo } from 'react';
import { 
  FaPalette, 
  FaPlus, 
  FaPen, 
  FaTrash, 
  FaExpand, 
  FaMagnifyingGlass, 
  FaXmark,
  FaTree,
  FaMoneyBillWave,
  FaClock,
  FaStar,
  FaBoxArchive
} from 'react-icons/fa6';
import { useAdmin } from '@/app/context/AdminContext';
import { supabase } from '@/lib/supabase';
import styles from './DesignGallery.module.css';

const DEFAULT_SAMPLE_DESIGNS = [
  'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1540518614846-7ede433c5172?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
];

export default function DesignGallery() {
  const { state, dispatch } = useAdmin();
  const { designs = [] } = state;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingDesign, setEditingDesign] = useState(null);
  const [lightboxDesign, setLightboxDesign] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    category: 'ক্লাসিক',
    woodType: '',
    cost: '',
    duration: ''
  });

  const categories = [
    'all',
    'ক্লাসিক',
    'মডার্ন',
    'কারিগরী',
    'প্রিমিয়াম'
  ];

  // Filtered designs
  const filteredDesigns = useMemo(() => {
    return designs.filter(design => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        (design.name || '').toLowerCase().includes(searchLower) ||
        (design.woodType || '').toLowerCase().includes(searchLower) ||
        (design.cost || '').toLowerCase().includes(searchLower);
      const matchesCategory = selectedCategory === 'all' || (design.category || 'ক্লাসিক') === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [designs, searchQuery, selectedCategory]);

  const handleOpenModal = (design = null) => {
    if (design) {
      setEditingDesign(design);
      setFormData({
        name: design.name || '',
        image: design.image || '',
        category: design.category || 'ক্লাসিক',
        woodType: design.woodType || '',
        cost: design.cost || '',
        duration: design.duration || ''
      });
    } else {
      setEditingDesign(null);
      setFormData({
        name: '',
        image: '',
        category: 'ক্লাসিক',
        woodType: '',
        cost: '',
        duration: ''
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.image) return;

    setIsSaving(true);

    const designDataForDb = {
      name: formData.name,
      image: formData.image,
      category: formData.category,
      wood_type: formData.woodType,
      cost: formData.cost,
      duration: formData.duration
    };

    try {
      if (editingDesign) {
        const { error } = await supabase
          .from('designs')
          .update(designDataForDb)
          .eq('id', editingDesign.id);

        if (error) throw error;

        dispatch({
          type: 'UPDATE_DESIGN',
          payload: { ...editingDesign, ...formData }
        });

        dispatch({
          type: 'SHOW_TOAST',
          payload: { message: 'ডিজাইন সফলভাবে আপডেট করা হয়েছে', type: 'success' }
        });
      } else {
        const newDesign = {
          id: `design-${Date.now()}`,
          ...formData
        };

        const { error } = await supabase
          .from('designs')
          .insert({
            id: newDesign.id,
            ...designDataForDb
          });

        if (error) throw error;

        dispatch({
          type: 'ADD_DESIGN',
          payload: newDesign
        });

        dispatch({
          type: 'SHOW_TOAST',
          payload: { message: 'নতুন ডিজাইন যুক্ত করা হয়েছে', type: 'success' }
        });
      }
      setShowModal(false);
    } catch (err) {
      console.error('Error saving design:', err);
      dispatch({
        type: 'SHOW_TOAST',
        payload: { message: 'সংরক্ষণ করতে সমস্যা হয়েছে', type: 'error' }
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই ডিজাইনটি মুছে ফেলতে চান?')) return;

    try {
      const { error } = await supabase
        .from('designs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      dispatch({
        type: 'DELETE_DESIGN',
        payload: id
      });

      dispatch({
        type: 'SHOW_TOAST',
        payload: { message: 'ডিজাইন মুছে ফেলা হয়েছে', type: 'info' }
      });
    } catch (err) {
      console.error('Error deleting design:', err);
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
            <FaPalette />
          </div>
          <div>
            <h1 className={styles.title}>
              ডিজাইন গ্যালারি
              <span className={styles.countBadge}>{designs.length}টি ডিজাইন</span>
            </h1>
            <p className={styles.subtitle}>
              আপনার শোরুমের কাস্টম কাঠের নকশা, মূল্য ও তৈরির সময়সীমা সাজান ও কাস্টমাইজ করুন
            </p>
          </div>
        </div>

        <button className={styles.addBtn} onClick={() => handleOpenModal()}>
          <FaPlus /> নতুন ডিজাইন যোগ করুন
        </button>
      </div>

      {/* Quick Stats Bar */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.designs}`}>
            <FaPalette />
          </div>
          <div>
            <div className={styles.statValue}>{designs.length}</div>
            <div className={styles.statLabel}>মোট ক্যাটাগরি নকশা</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.wood}`}>
            <FaTree />
          </div>
          <div>
            <div className={styles.statValue}>
              {new Set(designs.map(d => d.woodType || 'সেগুন কাঠ')).size}
            </div>
            <div className={styles.statLabel}>কাঠের ধরণ প্রকারভেদ</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.avgCost}`}>
            <FaStar />
          </div>
          <div>
            <div className={styles.statValue}>{filteredDesigns.length}</div>
            <div className={styles.statLabel}>প্রদর্শিত ফলাফল</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className={styles.controlsBar}>
        <div className={styles.searchBox}>
          <FaMagnifyingGlass className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="ডিজাইন নাম, কাঠের ধরণ বা খরচ দিয়ে খুঁজুন..."
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
              {cat === 'all' ? 'সব ডিজাইন' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Design Grid */}
      <div className={styles.designGrid}>
        {filteredDesigns.length > 0 ? (
          filteredDesigns.map((design) => (
            <div key={design.id} className={styles.designCard}>
              <div className={styles.imageWrapper}>
                <span className={styles.categoryTag}>
                  {design.category || 'ক্লাসিক'}
                </span>
                <img
                  src={design.image}
                  alt={design.name}
                  className={styles.designImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_SAMPLE_DESIGNS[0];
                  }}
                />
                <div className={styles.overlayActions}>
                  <button
                    className={styles.actionCircleBtn}
                    title="বিস্তারিত দেখুন"
                    onClick={() => setLightboxDesign(design)}
                  >
                    <FaExpand />
                  </button>
                  <button
                    className={styles.actionCircleBtn}
                    title="সম্পাদনা করুন"
                    onClick={() => handleOpenModal(design)}
                  >
                    <FaPen />
                  </button>
                  <button
                    className={`${styles.actionCircleBtn} ${styles.delete}`}
                    title="মুছে ফেলুন"
                    onClick={() => handleDelete(design.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.designName}>{design.name}</h3>

                <div className={styles.specBadgeGroup}>
                  {design.woodType && (
                    <span className={`${styles.specBadge} ${styles.wood}`}>
                      <FaTree /> {design.woodType}
                    </span>
                  )}

                  {design.cost && (
                    <span className={`${styles.specBadge} ${styles.cost}`}>
                      <FaMoneyBillWave /> ৳{design.cost}
                    </span>
                  )}

                  {design.duration && (
                    <span className={`${styles.specBadge} ${styles.duration}`}>
                      <FaClock /> {design.duration}
                    </span>
                  )}
                </div>

                <div className={styles.cardFooter}>
                  <span>আইডি: #{design.id?.slice(-6)}</span>
                  <span>ক্যাটাগরি: {design.category || 'ক্লাসিক'}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <FaBoxArchive className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>কোন ডিজাইন পাওয়া যায়নি</h3>
            <p className={styles.emptySub}>
              আপনার ফিল্টার অনুযায়ী কোনো ডিজাইন ম্যাচ করেনি। নতুন কাস্টম ডিজাইন যোগ করতে ওপরের বোতাম ব্যবহার করুন।
            </p>
          </div>
        )}
      </div>

      {/* Add / Edit Design Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalHeaderTitle}>
                {editingDesign ? 'ডিজাইন সম্পাদন করুন' : 'নতুন ডিজাইন যোগ করুন'}
              </h2>
              <button className={styles.closeModalBtn} onClick={() => setShowModal(false)}>
                <FaXmark />
              </button>
            </div>

            <form onSubmit={handleSave} className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>ডিজাইন এর নাম</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="যেমন: ভিনটেজ উড কার্ভিং রয়্যাল বেড"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>ক্যাটাগরি</label>
                  <select
                    className={styles.formInput}
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="ক্লাসিক">ক্লাসিক</option>
                    <option value="মডার্ন">মডার্ন</option>
                    <option value="কারিগরী">কারিগরী</option>
                    <option value="প্রিমিয়াম">প্রিমিয়াম</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>কাঠের ধরন</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="যেমন: সেগুন কাঠ"
                    value={formData.woodType}
                    onChange={(e) => setFormData({ ...formData, woodType: e.target.value })}
                  />
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>আনুমানিক খরচ (টাকা)</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="যেমন: ৪৫,০০০"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>তৈরি করতে সময় লাগবে</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="যেমন: ১৫-২০ দিন"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>
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
                <label className={styles.formLabel}>প্রিভিউ ও নমুনা ডিজাইন</label>
                <div className={styles.previewBox}>
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Design Preview"
                      className={styles.previewImage}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = DEFAULT_SAMPLE_DESIGNS[0];
                      }}
                    />
                  ) : (
                    <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>ছবির ইউআরএল দিন</span>
                  )}
                </div>
                <div className={styles.samplePickers}>
                  {DEFAULT_SAMPLE_DESIGNS.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Sample design ${idx}`}
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
                  {isSaving ? 'সংরক্ষণ হচ্ছে...' : editingDesign ? 'আপডেট করুন' : 'যোগ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox / Details Modal */}
      {lightboxDesign && (
        <div className={styles.lightboxOverlay} onClick={() => setLightboxDesign(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightboxDesign(null)}>
            <FaXmark />
          </button>
          <img
            src={lightboxDesign.image}
            alt={lightboxDesign.name}
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
          <div className={styles.lightboxDetails} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxTitle}>{lightboxDesign.name}</div>
            <div className={styles.lightboxSub}>
              {lightboxDesign.woodType && <span>🪵 {lightboxDesign.woodType}</span>}
              {lightboxDesign.cost && <span>💰 ৳{lightboxDesign.cost}</span>}
              {lightboxDesign.duration && <span>⏱️ {lightboxDesign.duration}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
