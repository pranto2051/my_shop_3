import React from 'react';
import styles from './SectionList.module.css';

const SectionList = ({ blocks }) => {
  if (!blocks) return null;

  return (
    <div className={styles.grid}>
      {blocks.map((block) => (
        <div 
          key={block.id} 
          className={`${styles.card} ${block.is_positive === true ? styles.positive : block.is_positive === false ? styles.negative : ''}`}
        >
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>{block.col_1}</span>
          </div>
          <div className={styles.content}>
            <h3 className={styles.label}>{block.col_2}</h3>
            <p className={styles.description}>{block.col_3}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionList;
