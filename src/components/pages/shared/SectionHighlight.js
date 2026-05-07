import React from 'react';
import styles from './SectionHighlight.module.css';

const SectionHighlight = ({ blocks }) => {
  if (!blocks) return null;

  return (
    <div className={styles.grid}>
      {blocks.map((block) => (
        <div 
          key={block.id} 
          className={styles.card}
          style={{ '--accent': block.accent_color || '#D4882A' }}
        >
          <div className={styles.icon}>{block.col_1}</div>
          <div className={styles.value}>{block.col_2}</div>
          <div className={styles.label}>{block.col_3}</div>
        </div>
      ))}
    </div>
  );
};

export default SectionHighlight;
