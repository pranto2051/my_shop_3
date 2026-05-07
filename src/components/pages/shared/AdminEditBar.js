'use client';
import React, { useEffect, useState } from 'react';
import styles from './AdminEditBar.module.css';
import { FaPencil, FaGear, FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa6';
import PageEditor from '../admin/PageEditor';

const AdminEditBar = ({ slug, config, sections, highlights }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAdmin(localStorage.getItem('adminLoggedIn') === 'true');
    }
  }, []);

  if (!isAdmin) return null;

  return (
    <>
      <div className={styles.adminBar}>
        <div className={styles.container}>
          <div className={styles.left}>
            <span className={styles.badge}>অ্যাডমিন</span>
            <span className={styles.status}>✏️ এডিট মোড সক্রিয়</span>
          </div>
          <div className={styles.right}>
            <button className={styles.btn} onClick={() => setIsEditorOpen(true)}>
              <FaGear /> পেজ সেটিংস
            </button>
            <button className={styles.btnPrimary} onClick={() => setIsEditorOpen(true)}>
              <FaPencil /> পেজ এডিট করুন
            </button>
            <div className={styles.divider}></div>
            <div className={styles.publishStatus}>
              {config?.is_published ? (
                <span className={styles.published}><FaCheck /> সাইটে প্রকাশিত</span>
              ) : (
                <span className={styles.draft}><FaEyeSlash /> ড্রাফট</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <PageEditor 
        isOpen={isEditorOpen} 
        onClose={() => setIsEditorOpen(false)} 
        slug={slug}
        config={config}
        sections={sections}
        highlights={highlights}
      />
    </>
  );
};

export default AdminEditBar;
