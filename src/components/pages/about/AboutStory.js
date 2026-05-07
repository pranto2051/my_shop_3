import React from 'react';
import styles from './AboutStory.module.css';

const AboutStory = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.decorativeNumber}>২০+</div>
        <div className={styles.label}>আমাদের যাত্রা</div>
      </div>
      <div className={styles.right}>
        <h3 className={styles.title}>দুই দশকের বিশ্বস্ততা</h3>
        <div className={styles.underline}></div>
        <div className={styles.textWrapper}>
          {blocks.map((block) => (
            <p key={block.id} className={styles.paragraph}>
              {block.content}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutStory;
