'use client';

import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import { supabase } from '@/lib/supabase';
import styles from './StageManagerPanel.module.css';
import { 
  FaPlus, FaGripVertical, FaPen, FaTrash, 
  FaFloppyDisk, FaXmark, FaCircleInfo 
} from 'react-icons/fa6';
import ConfirmModal from '../ConfirmModal';

export default function StageManagerPanel() {
  const { state, dispatch } = useAdmin();
  const { orderStages } = state;

  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    color: '#9E7455',
    description: '',
    icon: 'FaCircleInfo'
  });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    id: null
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = async () => {
    if (!formData.name) return;
    setIsSaving(true);

    const stageDataForDb = {
      name: formData.name,
      name_en: formData.nameEn,
      color: formData.color,
      description: formData.description,
      icon: formData.icon
    };

    try {
      if (editingId) {
        const stage = orderStages.find(s => s.id === editingId);
        const { error } = await supabase
          .from('order_stages')
          .update(stageDataForDb)
          .eq('id', editingId);
        
        if (error) throw error;

        dispatch({
          type: 'UPDATE_ORDER_STAGE_DEF',
          payload: { ...stage, ...formData }
        });
        setEditingId(null);
      } else {
        const newStage = {
          id: `stage_${Date.now()}`,
          ...formData,
          order: orderStages.length + 1,
          isDefault: false
        };

        const { error } = await supabase
          .from('order_stages')
          .insert({
            id: newStage.id,
            stage_order: newStage.order,
            is_default: newStage.isDefault,
            ...stageDataForDb
          });
        
        if (error) throw error;

        dispatch({ type: 'ADD_ORDER_STAGE', payload: newStage });
        setIsAdding(false);
      }
      setFormData({ name: '', nameEn: '', color: '#9E7455', description: '', icon: 'FaCircleInfo' });
    } catch (err) {
      console.error('Error saving stage:', err);
      alert('অর্ডার স্টেজ সংরক্ষণ করতে সমস্যা হয়েছে!');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (stage) => {
    setEditingId(stage.id);
    setFormData({
      name: stage.name,
      nameEn: stage.nameEn,
      color: stage.color,
      description: stage.description,
      icon: stage.icon
    });
  };

  const handleDelete = (id) => {
    setConfirmModal({
      isOpen: true,
      id: id
    });
  };

  const handleConfirmDelete = async () => {
    const id = confirmModal.id;
    try {
      const { error } = await supabase
        .from('order_stages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      dispatch({ type: 'DELETE_ORDER_STAGE', payload: id });
    } catch (err) {
      console.error('Error deleting stage:', err);
      if (err.code === '23503') {
        alert('এই স্টেজটি মুছে ফেলা যাবে না কারণ এটি বর্তমানে কোনো অর্ডারে ব্যবহার করা হচ্ছে।');
      } else {
        alert('অর্ডার স্টেজ মুছে ফেলতে সমস্যা হয়েছে!');
      }
    } finally {
      setConfirmModal({ isOpen: false, id: null });
    }
  };

  if (!mounted) return null;

  return (
    <div className={styles.container} suppressHydrationWarning>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>অর্ডার স্টেজ ব্যবস্থাপনা</h1>
          <p className={styles.subtitle}>অর্ডারের বিভিন্ন ধাপ নিয়ন্ত্রণ করুন</p>
        </div>
        {!isAdding && !editingId && (
          <button className={styles.addBtn} onClick={() => setIsAdding(true)}>
            <FaPlus /> নতুন স্টেজ যোগ করুন
          </button>
        )}
      </header>

      {(isAdding || editingId) && (
        <div className={styles.editorCard}>
          <div className={styles.editorHeader}>
            <div className={styles.editorIcon}>
              {editingId ? <FaPen /> : <FaPlus />}
            </div>
            <h3 className={styles.editorTitle}>
              {editingId ? 'স্টেজ সম্পাদনা করুন' : 'নতুন স্টেজ যোগ করুন'}
            </h3>
          </div>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>
                <span className={styles.labelIcon}><FaPen /></span>
                নাম (বাংলা) *
              </label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="যেমন: তৈরি হচ্ছে"
              />
            </div>
            <div className={styles.formGroup}>
              <label>
                <span className={styles.labelIcon}><FaCircleInfo /></span>
                নাম (English)
              </label>
              <input 
                type="text" 
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                placeholder="e.g. Processing"
              />
            </div>
            <div className={styles.formGroup}>
              <label>
                <span className={styles.labelIcon}><FaCircleInfo /></span>
                রঙ নির্বাচন করুন
              </label>
              <div className={styles.colorPickerWrapper}>
                <div 
                  className={styles.colorPreview} 
                  style={{ backgroundColor: formData.color }}
                  onClick={() => document.getElementById('colorInput').click()}
                />
                <input 
                  id="colorInput"
                  type="color" 
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className={styles.hiddenColorInput}
                />
                <span className={styles.colorValue}>{formData.color}</span>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>
                <span className={styles.labelIcon}><FaCircleInfo /></span>
                বিবরণ
              </label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="এই ধাপের ছোট বর্ণনা..."
                rows={2}
              />
            </div>
          </div>
          <div className={styles.editorActions}>
            <button className={styles.cancelBtn} onClick={() => {
              setIsAdding(false);
              setEditingId(null);
              setFormData({ name: '', nameEn: '', color: '#9E7455', description: '', icon: 'FaCircleInfo' });
            }} disabled={isSaving}>
              <FaXmark /> বাতিল
            </button>
            <button className={styles.saveBtn} onClick={handleSave} disabled={isSaving}>
              <FaFloppyDisk /> {isSaving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
            </button>
          </div>
        </div>
      )}

      <div className={styles.stageList}>
        {orderStages.map((stage, index) => (
          <div key={stage.id} className={styles.stageCard}>
            <div className={styles.dragHandle}><FaGripVertical /></div>
            <div className={styles.stageColor} style={{ backgroundColor: stage.color }} />
            <div className={styles.stageMain}>
              <div className={styles.stageNameRow}>
                <span className={styles.stageNameBn}>{stage.name}</span>
                <span className={styles.stageNameEn}>{stage.nameEn}</span>
                {stage.isDefault && <span className={styles.defaultBadge}>ডিফল্ট</span>}
              </div>
              <p className={styles.stageDesc}>{stage.description}</p>
            </div>
            <div className={styles.stageActions}>
              <button className={styles.iconBtn} onClick={() => handleEdit(stage)} title="সম্পাদনা">
                <FaPen />
              </button>
              <button className={`${styles.iconBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(stage.id)} title="মুছে ফেলুন">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        title="Delete Stage?"
        message="Are you sure you want to delete this stage? This will permanently delete it from the database."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmModal({ isOpen: false, id: null })}
      />
    </div>
  );
}
