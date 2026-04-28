'use client';

import React from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import styles from './SettingsPanel.module.css';

export default function SettingsPanel() {
  const { state, dispatch } = useAdmin();
  const { settings } = state;

  const handleToggle = (key) => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { [key]: !settings[key] }
    });
  };

  return (
    <div className={styles.settingsContainer}>
      <header className={styles.header}>
        <h2>অ্যাডভান্স সেটিংস</h2>
        <p>ড্যাশবোর্ডের এডভান্স কন্ট্রোল এবং দৃশ্যমানতা সেটিংস পরিচালনা করুন</p>
      </header>

      <div className={styles.settingsGrid}>
        <div className={styles.settingsCard}>
          <div className={styles.cardHeader}>
            <i className="fas fa-eye"></i>
            <h3>দৃশ্যমানতা সেটিংস</h3>
          </div>
          
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <h4>হেডার দেখান</h4>
              <p>অ্যাডমিন প্যানেলে মেইন ওয়েবসাইটের হেডার দেখান</p>
            </div>
            <label className={styles.switch}>
              <input 
                type="checkbox" 
                checked={settings?.showAdminHeader || false}
                onChange={() => handleToggle('showAdminHeader')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <h4>ফুটার দেখান</h4>
              <p>অ্যাডমিন প্যানেলে মেইন ওয়েবসাইটের ফুটার দেখান</p>
            </div>
            <label className={styles.switch}>
              <input 
                type="checkbox" 
                checked={settings?.showAdminFooter || false}
                onChange={() => handleToggle('showAdminFooter')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <div className={styles.settingsCard}>
          <div className={styles.cardHeader}>
            <i className="fas fa-sliders"></i>
            <h3>ড্যাশবোর্ড কন্ট্রোল</h3>
          </div>
          <p style={{ fontSize: '14px', color: '#8c7355', textAlign: 'center', padding: '20px 0' }}>
            আরো অপশন শীঘ্রই আসছে...
          </p>
        </div>
      </div>
    </div>
  );
}
