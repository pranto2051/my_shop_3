import React from 'react';
import styles from './PageHero.module.css';

const PageHero = ({ config }) => {
  if (!config) return null;

  const {
    title_bn,
    subtitle,
    hero_icon,
    hero_bg_color,
    updated_at
  } = config;

  const formattedDate = new Date(updated_at).toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div 
      className={styles.hero} 
      style={{ '--hero-bg': hero_bg_color || '#5A3118' }}
    >
      <div className={styles.container}>
        <div className={styles.icon}>{hero_icon || '📄'}</div>
        <h1 className={styles.title}>{title_bn}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <div className={styles.breadcrumb}>
          হোম <span className={styles.separator}>→</span> {title_bn}
        </div>
      </div>
      <div className={styles.updatedBadge}>
        সর্বশেষ আপডেট: {formattedDate}
      </div>
    </div>
  );
};

export default PageHero;
