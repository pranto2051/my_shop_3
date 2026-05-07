'use client';

import React from 'react';
import styles from './DateFilter.module.css';
import { FaCalendarAlt, FaTimes } from 'react-icons/fa';

export default function DateFilter({ dateFilter, onFilterChange, onClear }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: '01', label: 'জানুয়ারি' },
    { value: '02', label: 'ফেব্রুয়ারি' },
    { value: '03', label: 'মার্চ' },
    { value: '04', label: 'এপ্রিল' },
    { value: '05', label: 'মে' },
    { value: '06', label: 'জুন' },
    { value: '07', label: 'জুলাই' },
    { value: '08', label: 'আগস্ট' },
    { value: '09', label: 'সেপ্টেম্বর' },
    { value: '10', label: 'অক্টোবর' },
    { value: '11', label: 'নভেম্বর' },
    { value: '12', label: 'ডিসেম্বর' }
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const handleChange = (field, value) => {
    onFilterChange({ ...dateFilter, [field]: value });
  };

  const hasFilter = dateFilter.day || dateFilter.month || dateFilter.year;

  return (
    <div className={styles.filterContainer}>
      <div className={styles.iconWrapper}>
        <FaCalendarAlt className={styles.calendarIcon} />
        <span className={styles.label}>ফিল্টার:</span>
      </div>
      
      <div className={styles.selectGroup}>
        <select 
          value={dateFilter.day || ''} 
          onChange={(e) => handleChange('day', e.target.value)}
          className={styles.select}
        >
          <option value="">দিন</option>
          {days.map(d => (
            <option key={d} value={d < 10 ? `0${d}` : d.toString()}>
              {d.toLocaleString('bn-BD')}
            </option>
          ))}
        </select>

        <select 
          value={dateFilter.month || ''} 
          onChange={(e) => handleChange('month', e.target.value)}
          className={styles.select}
        >
          <option value="">মাস</option>
          {months.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>

        <select 
          value={dateFilter.year || ''} 
          onChange={(e) => handleChange('year', e.target.value)}
          className={styles.select}
        >
          <option value="">বছর</option>
          {years.map(y => (
            <option key={y} value={y.toString()}>{y.toLocaleString('bn-BD', { useGrouping: false })}</option>
          ))}
        </select>
      </div>

      {hasFilter && (
        <button className={styles.clearBtn} onClick={onClear} title="ফিল্টার মুছুন">
          <FaTimes size={12} />
        </button>
      )}
    </div>
  );
}
