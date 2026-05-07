'use client';

import { useState, useEffect } from 'react';
import styles from './PremiumLoading.module.css';

export default function PremiumLoading({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [dustParticles, setDustParticles] = useState([]);
  const brandName = "মা - ফার্নিচার";
  
  // Hardcoded segments for "মা - ফার্নিচার" to ensure server/client stability
  const letters = ["মা", " ", "-", " ", "ফা", "র্নি", "চা", "র"];

  useEffect(() => {
    // Generate dust particles only on the client to avoid hydration mismatch
    const particles = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`
    }));
    setDustParticles(particles);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800);
    }, 4500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`${styles.container} ${fadeOut ? styles.fadeOut : ''}`} suppressHydrationWarning>
      <div className={styles.content} suppressHydrationWarning>
        <div className={styles.logoWrapper} suppressHydrationWarning>
          <div className={styles.textContainer} suppressHydrationWarning>
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
          <div className={styles.shine} suppressHydrationWarning></div>
        </div>
        
        <div className={styles.tagline} suppressHydrationWarning>
          আপনার আরামের জন্য তৈরি হচ্ছে...
        </div>

        <div className={styles.dustContainer} suppressHydrationWarning>
          {dustParticles.map((particleStyle, i) => (
            <div 
              key={i} 
              className={styles.dust} 
              style={particleStyle}
              suppressHydrationWarning
            ></div>
          ))}
        </div>
      </div>
      
      <div className={styles.progressLine} suppressHydrationWarning></div>
    </div>
  );
}
