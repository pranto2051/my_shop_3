'use client';

import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import { supabase } from '@/lib/supabase';
import styles from './SettingsPanel.module.css';

export default function SettingsPanel() {
  const { state, dispatch } = useAdmin();
  const { settings } = state;

  const [adminData, setAdminData] = useState({
    id: null,
    first_name: '',
    last_name: '',
    mobile: '',
    email: '',
    password: '',
    photo_url: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAdmin = localStorage.getItem('adminInfo');
      if (storedAdmin) {
        setAdminData(JSON.parse(storedAdmin));
      }
    }
  }, []);

  const handleToggle = (key) => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { [key]: !settings[key] }
    });
  };

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!adminData.id) return;
    
    setIsUpdating(true);
    setUpdateMessage({ type: '', text: '' });

    try {
      const { data, error } = await supabase
        .from('admins')
        .update({
          first_name: adminData.first_name,
          last_name: adminData.last_name,
          mobile: adminData.mobile,
          email: adminData.email,
          password: adminData.password,
          photo_url: adminData.photo_url
        })
        .eq('id', adminData.id)
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('adminInfo', JSON.stringify(data[0]));
        }
        setUpdateMessage({ type: 'success', text: 'প্রোফাইল সফলভাবে আপডেট হয়েছে!' });
      }
    } catch (error) {
      console.error('Error updating admin profile:', error);
      setUpdateMessage({ type: 'error', text: 'প্রোফাইল আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।' });
    } finally {
      setIsUpdating(false);
    }
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

      <div className={styles.profileSection}>
        <div className={styles.settingsCard}>
          <div className={styles.cardHeader}>
            <i className="fas fa-user-shield"></i>
            <h3>অ্যাডমিন প্রোফাইল সেটিংস</h3>
          </div>
          
          <form onSubmit={handleUpdateProfile} className={styles.profileForm}>
            {updateMessage.text && (
              <div className={`${styles.messageBox} ${styles[updateMessage.type]}`}>
                {updateMessage.text}
              </div>
            )}
            
            <div className={styles.profileImagePreview}>
              <img 
                src={adminData.photo_url || 'https://via.placeholder.com/150'} 
                alt="Admin Profile" 
                className={styles.adminAvatar} 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
              />
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>নামের প্রথমাংশ (First Name)</label>
                <input 
                  type="text" 
                  name="first_name" 
                  value={adminData.first_name || ''} 
                  onChange={handleAdminChange} 
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label>নামের শেষাংশ (Last Name)</label>
                <input 
                  type="text" 
                  name="last_name" 
                  value={adminData.last_name || ''} 
                  onChange={handleAdminChange} 
                />
              </div>

              <div className={styles.formGroup}>
                <label>মোবাইল নাম্বার</label>
                <input 
                  type="text" 
                  name="mobile" 
                  value={adminData.mobile || ''} 
                  onChange={handleAdminChange} 
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label>ইমেইল এড্রেস</label>
                <input 
                  type="email" 
                  name="email" 
                  value={adminData.email || ''} 
                  onChange={handleAdminChange} 
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label>নতুন পাসওয়ার্ড</label>
                <input 
                  type="password" 
                  name="password" 
                  value={adminData.password || ''} 
                  onChange={handleAdminChange} 
                  required 
                  placeholder="পাসওয়ার্ড লিখুন..."
                />
              </div>

              <div className={styles.formGroup}>
                <label>প্রোফাইল ছবির লিংক (URL)</label>
                <input 
                  type="text" 
                  name="photo_url" 
                  value={adminData.photo_url || ''} 
                  onChange={handleAdminChange} 
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <button type="submit" className={styles.saveBtn} disabled={isUpdating || !adminData.id}>
              {isUpdating ? 'আপডেট হচ্ছে...' : 'সেভ করুন'} <i className="fas fa-save"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
