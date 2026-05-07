'use client';
import React, { useState, useEffect } from 'react';
import styles from './PageEditor.module.css';
import { FaXmark, FaFloppyDisk, FaChevronRight } from 'react-icons/fa6';

const PageEditor = ({ isOpen, onClose, slug, config, sections, highlights }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [formData, setFormData] = useState({
    title_bn: '',
    subtitle: '',
    hero_icon: '',
    hero_bg_color: '',
    meta_title: '',
    meta_description: '',
    is_published: true
  });

  useEffect(() => {
    if (config) {
      setFormData({
        title_bn: config.title_bn || '',
        subtitle: config.subtitle || '',
        hero_icon: config.hero_icon || '',
        hero_bg_color: config.hero_bg_color || '',
        meta_title: config.meta_title || '',
        meta_description: config.meta_description || '',
        is_published: config.is_published ?? true
      });
    }
  }, [config]);

  if (!isOpen) return null;

  const handleSave = async () => {
    alert('সংরক্ষণ করার ফিচারটি শীঘ্রই আসছে।');
    // Here we will call updatePageConfig and other update functions
  };

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.active : ''}`} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.closeBtn} onClick={onClose}><FaXmark /></button>
            <h2 className={styles.title}>পেজ এডিটর: {config?.title_bn}</h2>
          </div>
          <button className={styles.saveBtn} onClick={handleSave}>
            <FaFloppyDisk /> সংরক্ষণ করুন
          </button>
        </div>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'info' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('info')}
          >
            পেজ তথ্য
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'sections' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('sections')}
          >
            বিভাগগুলো
          </button>
          {slug === 'about-us' && (
            <button 
              className={`${styles.tab} ${activeTab === 'highlights' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('highlights')}
            >
              হাইলাইট
            </button>
          )}
        </div>

        <div className={styles.content}>
          {activeTab === 'info' && (
            <div className={styles.form}>
              <div className={styles.formGroup}>
                <label>পেজ শিরোনাম (বাংলা)</label>
                <input 
                  type="text" 
                  value={formData.title_bn} 
                  onChange={(e) => setFormData({...formData, title_bn: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>সাবটাইটেল</label>
                <textarea 
                  value={formData.subtitle} 
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>হিরো আইকন (Emoji)</label>
                  <input 
                    type="text" 
                    value={formData.hero_icon} 
                    onChange={(e) => setFormData({...formData, hero_icon: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>হিরো ব্যাকগ্রাউন্ড কালার</label>
                  <input 
                    type="color" 
                    value={formData.hero_bg_color} 
                    onChange={(e) => setFormData({...formData, hero_bg_color: e.target.value})}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>এসইও মেটা টাইটেল</label>
                <input 
                  type="text" 
                  value={formData.meta_title} 
                  onChange={(e) => setFormData({...formData, meta_title: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>এসইও মেটা ডেসক্রিপশন</label>
                <textarea 
                  value={formData.meta_description} 
                  onChange={(e) => setFormData({...formData, meta_description: e.target.value})}
                />
              </div>
              <div className={styles.formGroupCheck}>
                <input 
                  type="checkbox" 
                  id="is_published"
                  checked={formData.is_published} 
                  onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
                />
                <label htmlFor="is_published">সাইটে প্রকাশ করুন</label>
              </div>
            </div>
          )}

          {activeTab === 'sections' && (
            <div className={styles.sectionsList}>
              {sections?.map((section) => (
                <div key={section.id} className={styles.sectionItem}>
                  <div className={styles.sectionInfo}>
                    <span className={styles.sectionIcon}>{section.icon}</span>
                    <span className={styles.sectionTitle}>{section.title}</span>
                    <span className={styles.sectionType}>{section.content_type}</span>
                  </div>
                  <button className={styles.editSectionBtn}>
                    এডিট <FaChevronRight />
                  </button>
                </div>
              ))}
              <button className={styles.addSectionBtn}>+ নতুন বিভাগ যোগ করুন</button>
            </div>
          )}

          {activeTab === 'highlights' && (
            <div className={styles.highlightsList}>
              {highlights?.map((highlight) => (
                <div key={highlight.id} className={styles.highlightItem}>
                  <span className={styles.highlightIcon}>{highlight.icon}</span>
                  <div className={styles.highlightInfo}>
                    <span className={styles.highlightValue}>{highlight.number_value}</span>
                    <span className={styles.highlightLabel}>{highlight.label_text}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageEditor;
