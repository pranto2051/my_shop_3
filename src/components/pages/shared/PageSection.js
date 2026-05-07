'use client';

import React, { useState, useEffect } from 'react';
import styles from './PageSection.module.css';
import SectionText from './SectionText';
import SectionList from './SectionList';
import SectionTable from './SectionTable';
import SectionTimeline from './SectionTimeline';
import SectionHighlight from './SectionHighlight';
import SectionFAQ from './SectionFAQ';
import SectionContact from './SectionContact';
import AboutStory from '../about/AboutStory';
import { FaPencil, FaEye, FaEyeSlash, FaArrowUp, FaArrowDown } from 'react-icons/fa6';

const PageSection = ({ section }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAdmin(localStorage.getItem('adminLoggedIn') === 'true');
    }
  }, []);

  if (!section || (!section.is_visible && !isAdmin)) return null;

  const renderContent = () => {
    // Specific layouts based on section_key
    if (section.section_key === 'our_story') {
      return <AboutStory blocks={section.blocks} />;
    }

    switch (section.content_type) {
      case 'text':
        return <SectionText blocks={section.blocks} />;
      case 'list':
        return <SectionList blocks={section.blocks} />;
      case 'table':
        return <SectionTable blocks={section.blocks} />;
      case 'timeline':
        return <SectionTimeline blocks={section.blocks} />;
      case 'highlight':
        return <SectionHighlight blocks={section.blocks} />;
      case 'faq':
        return <SectionFAQ blocks={section.blocks} />;
      case 'contact':
        return <SectionContact />;
      default:
        return null;
    }
  };

  return (
    <section 
      className={`${styles.section} ${!section.is_visible ? styles.hidden : ''}`} 
      id={section.section_key}
    >
      <div className={styles.container}>
        {isAdmin && (
          <div className={styles.adminControls}>
            <button className={styles.adminBtn} title="এডিট"><FaPencil /></button>
            <button className={styles.adminBtn} title="উপরে"><FaArrowUp /></button>
            <button className={styles.adminBtn} title="নিচে"><FaArrowDown /></button>
            <button className={styles.adminBtn} title={section.is_visible ? "লুকান" : "দেখান"}>
              {section.is_visible ? <FaEye /> : <FaEyeSlash />}
            </button>
            <span className={styles.typeBadge}>{section.content_type}</span>
          </div>
        )}
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            {section.icon && <span className={styles.icon}>{section.icon}</span>}
            <h2 className={styles.title}>{section.title}</h2>
          </div>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.content}>
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default PageSection;
