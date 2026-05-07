'use client';
import React, { useState } from 'react';
import styles from './SectionFAQ.module.css';

const SectionFAQ = ({ blocks }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!blocks) return null;

  return (
    <div className={styles.accordion}>
      {blocks.map((block, index) => (
        <div 
          key={block.id} 
          className={`${styles.item} ${activeIndex === index ? styles.active : ''}`}
        >
          <button 
            className={styles.question}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <span>{block.col_1}</span>
            <span className={styles.arrow}>↓</span>
          </button>
          <div className={styles.answer}>
            <div className={styles.answerContent}>
              {block.col_2}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionFAQ;
