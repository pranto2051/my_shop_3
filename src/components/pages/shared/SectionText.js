import React from 'react';
import styles from './SectionText.module.css';

const SectionText = ({ blocks }) => {
  if (!blocks) return null;

  return (
    <div className={styles.wrapper}>
      {blocks.map((block) => {
        if (block.block_type === 'paragraph') {
          return (
            <p key={block.id} className={styles.paragraph}>
              {block.content}
            </p>
          );
        }
        if (block.block_type === 'highlight_box') {
          return (
            <div key={block.id} className={styles.highlightBox}>
              {block.content}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default SectionText;
