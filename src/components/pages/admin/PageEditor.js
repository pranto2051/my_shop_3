'use client';
import React, { useState, useEffect } from 'react';
import styles from './PageEditor.module.css';
import { FaXmark, FaFloppyDisk, FaChevronRight, FaEye, FaEyeSlash, FaTrash, FaPlus, FaPencil, FaArrowUp, FaArrowDown } from 'react-icons/fa6';
import { updatePageConfig, updatePageSection, reorderSections, createPageSection, deletePageSection, updatePageHighlight } from '@/lib/pages/updatePageData';
import SectionEditor from './SectionEditor';

const PageEditor = ({ isOpen, onClose, slug, config, sections: initialSections, highlights: initialHighlights }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [sections, setSections] = useState(initialSections || []);
  const [highlights, setHighlights] = useState(initialHighlights || []);
  const [isSaving, setIsSaving] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [showAddSectionForm, setShowAddSectionForm] = useState(false);
  const [newSectionData, setNewSectionData] = useState({
    title: '',
    icon: '📄',
    content_type: 'text'
  });
  
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
    if (initialHighlights) {
      setHighlights(initialHighlights);
    }
  }, [config, initialSections, initialHighlights]);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updatePageConfig(slug, formData);
      
      // Update highlights if about-us
      if (slug === 'about-us') {
        for (const h of highlights) {
          await updatePageHighlight(h.id, {
            icon: h.icon,
            number_value: h.number_value,
            label_text: h.label_text,
            bg_color: h.bg_color
          });
        }
      }

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

  const moveSection = async (index, direction) => {
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    
    setSections(newSections);
    
    try {
      await reorderSections(newSections.map(s => s.id));
    } catch (error) {
      console.error('Error reordering sections:', error);
      alert('অর্ডার পরিবর্তন করতে সমস্যা হয়েছে।');
    }
  };

  const handleAddSection = async () => {
    if (!newSectionData.title) {
      alert('বিভাগ শিরোনাম লিখুন');
      return;
    }

    try {
      const slug_key = newSectionData.title.toLowerCase().replace(/\s+/g, '_');
      const section = await createPageSection({
        ...newSectionData,
        page_slug: slug,
        section_key: `${slug_key}_${Date.now()}`,
        display_order: sections.length,
        is_visible: true
      });

      setSections([...sections, { ...section, blocks: [] }]);
      setShowAddSectionForm(false);
      setNewSectionData({ title: '', icon: '📄', content_type: 'text' });
    } catch (error) {
      console.error('Error creating section:', error);
      alert('বিভাগ তৈরি করতে সমস্যা হয়েছে।');
    }
  };

  const handleDeleteSection = async (id) => {
    if (confirm('আপনি কি নিশ্চিত যে আপনি এই বিভাগটি ডিলিট করতে চান? এর ভিতরের সকল কন্টেন্ট মুছে যাবে।')) {
      try {
        await deletePageSection(id);
        setSections(sections.filter(s => s.id !== id));
      } catch (error) {
        console.error('Error deleting section:', error);
        alert('বিভাগ ডিলিট করতে সমস্যা হয়েছে।');
      }
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
              {sections?.map((section, index) => (
                <div key={section.id} className={`${styles.sectionItem} ${!section.is_visible ? styles.inactive : ''}`}>
                  <div className={styles.sectionInfo}>
                    <div className={styles.reorderBtns}>
                      <button 
                        onClick={() => moveSection(index, 'up')}
                        disabled={index === 0}
                        title="উপরে নিন"
                      >
                        <FaArrowUp />
                      </button>
                      <button 
                        onClick={() => moveSection(index, 'down')}
                        disabled={index === sections.length - 1}
                        title="নিচে নিন"
                      >
                        <FaArrowDown />
                      </button>
                    </div>
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
                    <button 
                      className={`${styles.visibilityBtn} ${styles.deleteSectionBtn}`}
                      onClick={() => handleDeleteSection(section.id)}
                      title="বিভাগ মুছুন"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}

              {showAddSectionForm ? (
                <div className={styles.addSectionForm}>
                  <div className={styles.formRow}>
                    <input 
                      type="text" 
                      placeholder="বিভাগ শিরোনাম"
                      value={newSectionData.title}
                      onChange={(e) => setNewSectionData({...newSectionData, title: e.target.value})}
                    />
                    <input 
                      type="text" 
                      placeholder="Icon"
                      value={newSectionData.icon}
                      onChange={(e) => setNewSectionData({...newSectionData, icon: e.target.value})}
                      style={{ width: '60px' }}
                    />
                  </div>
                  <select 
                    value={newSectionData.content_type}
                    onChange={(e) => setNewSectionData({...newSectionData, content_type: e.target.value})}
                  >
                    <option value="text">Text (Paragraphs)</option>
                    <option value="list">List (Icon + Title + Desc)</option>
                    <option value="table">Table</option>
                    <option value="timeline">Timeline</option>
                    <option value="highlight">Highlights</option>
                    <option value="faq">FAQ</option>
                  </select>
                  <div className={styles.addSectionActions}>
                    <button onClick={() => setShowAddSectionForm(false)}>বাতিল</button>
                    <button className={styles.confirmAddBtn} onClick={handleAddSection}>তৈরি করুন</button>
                  </div>
                </div>
              ) : (
                <button className={styles.addSectionBtn} onClick={() => setShowAddSectionForm(true)}>
                  <FaPlus /> নতুন বিভাগ যোগ করুন
                </button>
              )}
            </div>
          )}

          {activeTab === 'highlights' && (
            <div className={styles.highlightsList}>
              {highlights?.map((highlight, index) => (
                <div key={highlight.id} className={styles.highlightEditCard}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>আইকন</label>
                      <input 
                        type="text" 
                        value={highlight.icon} 
                        onChange={(e) => {
                          const newHighlights = [...highlights];
                          newHighlights[index].icon = e.target.value;
                          setHighlights(newHighlights);
                        }}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>ভ্যালু (উদা: ২০+)</label>
                      <input 
                        type="text" 
                        value={highlight.number_value} 
                        onChange={(e) => {
                          const newHighlights = [...highlights];
                          newHighlights[index].number_value = e.target.value;
                          setHighlights(newHighlights);
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label>লেবেল (উদা: বছরের অভিজ্ঞতা)</label>
                    <input 
                      type="text" 
                      value={highlight.label_text} 
                      onChange={(e) => {
                        const newHighlights = [...highlights];
                        newHighlights[index].label_text = e.target.value;
                        setHighlights(newHighlights);
                      }}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>ব্যাকগ্রাউন্ড কালার</label>
                    <input 
                      type="color" 
                      value={highlight.bg_color} 
                      onChange={(e) => {
                        const newHighlights = [...highlights];
                        newHighlights[index].bg_color = e.target.value;
                        setHighlights(newHighlights);
                      }}
                    />
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
