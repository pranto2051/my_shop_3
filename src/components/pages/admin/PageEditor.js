'use client';
import React, { useState, useEffect } from 'react';
import styles from './PageEditor.module.css';
import { FaXmark, FaFloppyDisk, FaChevronRight, FaEye, FaEyeSlash, FaTrash, FaPlus, FaPencil } from 'react-icons/fa6';
import { updatePageConfig, updatePageSection } from '@/lib/pages/updatePageData';
import SectionEditor from './SectionEditor';

const PageEditor = ({ isOpen, onClose, slug, config, sections: initialSections, highlights }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [sections, setSections] = useState(initialSections || []);
  const [isSaving, setIsSaving] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  
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
    if (initialSections) {
      setSections(initialSections);
    }
  }, [config, initialSections]);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updatePageConfig(slug, formData);
      alert('পেজ তথ্য সফলভাবে সংরক্ষিত হয়েছে!');
      window.location.reload(); // Refresh to show changes
    } catch (error) {
      console.error('Error saving page config:', error);
      alert('সংরক্ষণ করতে সমস্যা হয়েছে।');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSectionVisibility = async (sectionId, currentVisibility) => {
    try {
      const newVisibility = !currentVisibility;
      await updatePageSection(sectionId, { is_visible: newVisibility });
      
      setSections(sections.map(s => 
        s.id === sectionId ? { ...s, is_visible: newVisibility } : s
      ));
    } catch (error) {
      console.error('Error toggling visibility:', error);
      alert('অবস্থা পরিবর্তন করতে সমস্যা হয়েছে।');
    }
  };

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.active : ''}`} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.closeBtn} onClick={onClose}><FaXmark /></button>
            <h2 className={styles.title}>পেজ এডিটর: {config?.title_bn}</h2>
          </div>
          <button 
            className={styles.saveBtn} 
            onClick={handleSave}
            disabled={isSaving}
          >
            <FaFloppyDisk /> {isSaving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
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
                <div key={section.id} className={`${styles.sectionItem} ${!section.is_visible ? styles.inactive : ''}`}>
                  <div className={styles.sectionInfo}>
                    <span className={styles.sectionIcon}>{section.icon}</span>
                    <div className={styles.sectionTextContent}>
                      <span className={styles.sectionTitle}>{section.title}</span>
                      <span className={styles.sectionTypeBadge}>{section.content_type}</span>
                    </div>
                  </div>
                  <div className={styles.sectionActions}>
                    <button 
                      className={styles.editBtn}
                      onClick={() => setEditingSection(section)}
                      title="বিভাগ এডিট করুন"
                    >
                      <FaPencil />
                    </button>
                    <button 
                      className={styles.visibilityBtn}
                      onClick={() => toggleSectionVisibility(section.id, section.is_visible)}
                      title={section.is_visible ? "নিষ্ক্রিয় করুন" : "সক্রিয় করুন"}
                    >
                      {section.is_visible ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </div>
              ))}
              <button className={styles.addSectionBtn}>
                <FaPlus /> নতুন বিভাগ যোগ করুন
              </button>
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

      {editingSection && (
        <SectionEditor 
          isOpen={!!editingSection}
          onClose={() => setEditingSection(null)}
          section={editingSection}
          onUpdate={(updatedSection) => {
            setSections(sections.map(s => s.id === updatedSection.id ? updatedSection : s));
          }}
        />
      )}
    </div>
  );
};

export default PageEditor;
