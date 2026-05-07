'use client';
import React, { useState, useEffect } from 'react';
import styles from './SectionEditor.module.css';
import { FaXmark, FaFloppyDisk, FaPlus, FaTrash, FaGripLines, FaEye, FaEyeSlash } from 'react-icons/fa6';
import { updatePageSection, updatePageBlock, createPageBlock, deletePageBlock } from '@/lib/pages/updatePageData';

const SectionEditor = ({ isOpen, onClose, section, onUpdate }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState(section?.title || '');
  const [blocks, setBlocks] = useState(section?.blocks || []);

  useEffect(() => {
    if (section) {
      setTitle(section.title || '');
      setBlocks(section.blocks || []);
    }
  }, [section]);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // Update section title
      await updatePageSection(section.id, { title });
      
      // Update each existing block
      for (const block of blocks) {
        if (block.id.startsWith('new-')) {
          // This is a new block, create it in DB
          const { id, ...blockData } = block;
          await createPageBlock({
            ...blockData,
            section_id: section.id,
            display_order: blocks.indexOf(block)
          });
        } else {
          // Existing block, update it
          await updatePageBlock(block.id, {
            content_bn: block.content_bn,
            title_bn: block.title_bn,
            description_bn: block.description_bn,
            icon: block.icon,
            is_visible: block.is_visible,
            display_order: blocks.indexOf(block)
          });
        }
      }

      onUpdate({ ...section, title, blocks });
      alert('বিভাগ সফলভাবে সংরক্ষিত হয়েছে!');
      onClose();
    } catch (error) {
      console.error('Error saving section:', error);
      alert('সংরক্ষণ করতে সমস্যা হয়েছে।');
    } finally {
      setIsSaving(false);
    }
  };

  const updateBlock = (id, field, value) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const addNewBlock = () => {
    const newBlock = {
      id: `new-${Date.now()}`,
      content_bn: '',
      title_bn: '',
      description_bn: '',
      icon: '📄',
      is_visible: true,
      display_order: blocks.length
    };
    setBlocks([...blocks, newBlock]);
  };

  const deleteBlock = async (id) => {
    if (id.startsWith('new-')) {
      setBlocks(blocks.filter(b => b.id !== id));
      return;
    }

    if (confirm('আপনি কি নিশ্চিত যে আপনি এই ব্লকটি ডিলিট করতে চান?')) {
      try {
        await deletePageBlock(id);
        setBlocks(blocks.filter(b => b.id !== id));
      } catch (error) {
        console.error('Error deleting block:', error);
        alert('ডিলিট করতে সমস্যা হয়েছে।');
      }
    }
  };

  const renderBlockEditor = (block) => {
    return (
      <div key={block.id} className={`${styles.blockItem} ${!block.is_visible ? styles.inactiveBlock : ''}`}>
        <div className={styles.blockHeader}>
          <span className={styles.blockHandle}><FaGripLines /></span>
          <div className={styles.blockActions}>
            <button 
              className={styles.blockActionBtn}
              onClick={() => updateBlock(block.id, 'is_visible', !block.is_visible)}
              title={block.is_visible ? "লুকান" : "দেখান"}
            >
              {block.is_visible ? <FaEye /> : <FaEyeSlash />}
            </button>
            <button 
              className={`${styles.blockActionBtn} ${styles.delete}`}
              onClick={() => deleteBlock(block.id)}
              title="ডিলিট করুন"
            >
              <FaTrash />
            </button>
          </div>
        </div>
        
        {section.content_type === 'text' ? (
          <textarea 
            value={block.content_bn || ''} 
            onChange={(e) => updateBlock(block.id, 'content_bn', e.target.value)}
            placeholder="প্যারাগ্রাফ লিখুন..."
            rows={5}
          />
        ) : (
          <>
            <div className={styles.blockRow}>
              <input 
                type="text" 
                value={block.icon || ''} 
                onChange={(e) => updateBlock(block.id, 'icon', e.target.value)}
                placeholder="Emoji"
                className={styles.iconInput}
              />
              <input 
                type="text" 
                value={block.title_bn || ''} 
                onChange={(e) => updateBlock(block.id, 'title_bn', e.target.value)}
                placeholder="শিরোনাম"
                className={styles.titleInput}
              />
            </div>
            <textarea 
              value={block.description_bn || ''} 
              onChange={(e) => updateBlock(block.id, 'description_bn', e.target.value)}
              placeholder="বিস্তারিত বিবরণ..."
              rows={2}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>বিভাগ এডিট করুন: {section.title}</h3>
          <button className={styles.closeBtn} onClick={onClose}><FaXmark /></button>
        </div>

        <div className={styles.content}>
          <div className={styles.formGroup}>
            <label>বিভাগ শিরোনাম</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.blocksSection}>
            <div className={styles.blocksHeader}>
              <label>কন্টেন্ট ব্লক সমূহ ({section.content_type})</label>
              <button className={styles.addBlockBtn} onClick={addNewBlock}>
                <FaPlus /> ব্লক যোগ করুন
              </button>
            </div>
            <div className={styles.blocksList}>
              {blocks.map(block => renderBlockEditor(block))}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>বাতিল</button>
          <button 
            className={styles.saveBtn} 
            onClick={handleSave}
            disabled={isSaving}
          >
            <FaFloppyDisk /> {isSaving ? 'সংরক্ষণ হচ্ছে...' : 'পরিবর্তন সেভ করুন'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionEditor;
