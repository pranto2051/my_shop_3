'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import styles from './StageManagerPanel.module.css';
import { 
  FaPlus, FaGripVertical, FaPen, FaTrash, 
  FaFloppyDisk, FaXmark, FaCircleInfo 
} from 'react-icons/fa6';

export default function StageManagerPanel() {
  const { state, dispatch } = useAdmin();
  const { orderStages } = state;

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    color: '#9E7455',
    description: '',
    icon: 'FaCircleInfo'
  });

  const handleSave = () => {
    if (!formData.name) return;

    if (editingId) {
      const stage = orderStages.find(s => s.id === editingId);
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
      dispatch({ type: 'ADD_ORDER_STAGE', payload: newStage });
      setIsAdding(false);
    }
    
    setFormData({ name: '', nameEn: '', color: '#9E7455', description: '', icon: 'FaCircleInfo' });
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
    if (confirm('আপনি কি নিশ্চিত যে এই স্টেজটি মুছে ফেলতে চান?')) {
      dispatch({ type: 'DELETE_ORDER_STAGE', payload: id });
    }
  };

  return (
    <div className={styles.container}>
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
          <h3 className={styles.editorTitle}>
            {editingId ? 'স্টেজ সম্পাদনা করুন' : 'নতুন স্টেজ যোগ করুন'}
          </h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>নাম (বাংলা) *</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="যেমন: তৈরি হচ্ছে"
              />
            </div>
            <div className={styles.formGroup}>
              <label>নাম (English)</label>
              <input 
                type="text" 
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                placeholder="e.g. Processing"
              />
            </div>
            <div className={styles.formGroup}>
              <label>রঙ</label>
              <div className={styles.colorPickerWrapper}>
                <input 
                  type="color" 
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
                <span className={styles.colorValue}>{formData.color}</span>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>বিবরণ</label>
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
            }}>
              <FaXmark /> বাতিল
            </button>
            <button className={styles.saveBtn} onClick={handleSave}>
              <FaFloppyDisk /> সংরক্ষণ করুন
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
              {!stage.isDefault && (
                <button className={`${styles.iconBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(stage.id)} title="মুছে ফেলুন">
                  <FaTrash />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
