import React from 'react';
import styles from './SectionTimeline.module.css';

const SectionTimeline = ({ blocks }) => {
  if (!blocks) return null;

  return (
    <div className={styles.timeline}>
      {blocks.map((block, index) => (
        <div key={block.id} className={styles.item}>
          <div className={styles.numberWrapper}>
            <div className={styles.number}>{index + 1}</div>
            {index < blocks.length - 1 && <div className={styles.line}></div>}
          </div>
          <div className={styles.content}>
            <div className={styles.header}>
              <span className={styles.icon}>{block.col_1}</span>
              <h3 className={styles.title}>{block.col_2}</h3>
            </div>
            <p className={styles.description}>{block.col_3}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionTimeline;
