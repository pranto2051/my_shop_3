'use client';

import { useState, useEffect } from 'react';
import styles from './PremiumLoading.module.css';

export default function PremiumLoading({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);
  const brandName = "মা ফার্নিচার";
  const letters = brandName.split("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800);
    }, 4500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`${styles.container} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <div className={styles.textContainer}>
            {letters.map((char, index) => (
              <span 
                key={index} 
                className={styles.letter} 
                style={{ animationDelay: `${index * 0.15}s` }}
                data-text={char}
              >
                {char}
              </span>
            ))}
          </div>
          <div className={styles.shine}></div>
        </div>
        
        <div className={styles.tagline}>
          আপনার আরামের জন্য তৈরি হচ্ছে...
        </div>

        <div className={styles.dustContainer}>
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className={styles.dust} 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className={styles.progressLine}></div>
    </div>
  );
}
