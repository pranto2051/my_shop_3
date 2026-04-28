'use client';

import { useState, useEffect } from 'react';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [showWebsite, setShowWebsite] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 80);

    const websiteTimer = setTimeout(() => {
      setShowWebsite(true);
    }, 500);

    const completeTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800);
    }, 4200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(websiteTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`${styles.loadingContainer} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.animationWrapper}>
        <svg viewBox="0 0 800 500" className={styles.workshopScene}>
          <defs>
            <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4A574"/>
              <stop offset="50%" stopColor="#C4956A"/>
              <stop offset="100%" stopColor="#B8855A"/>
            </linearGradient>
            <linearGradient id="floorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E8DCC8"/>
              <stop offset="100%" stopColor="#D4C4A8"/>
            </linearGradient>
            <linearGradient id="wallGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5F0E6"/>
              <stop offset="100%" stopColor="#EBE4D6"/>
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.2"/>
            </filter>
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="8"/>
              <feOffset dx="0" dy="4" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <rect x="0" y="0" width="800" height="350" fill="url(#wallGradient)"/>
          <rect x="0" y="350" width="800" height="150" fill="url(#floorGradient)"/>

          <line x1="0" y1="350" x2="800" y2="350" stroke="#C4B59D" strokeWidth="3"/>

          <g className={styles.windowLight}>
            <ellipse cx="400" cy="100" rx="200" ry="150" fill="#FFF9E8" opacity="0.4"/>
          </g>

          <g className={styles.toolRack}>
            <rect x="50" y="150" width="8" height="120" fill="#8B7355" rx="2"/>
            <rect x="48" y="145" width="12" height="10" fill="#9B8465" rx="2"/>
            <g className={styles.hammer}>
              <rect x="42" y="165" width="25" height="8" fill="#6B5344" rx="2"/>
              <rect x="52" y="158" width="6" height="22" fill="#8B7355" rx="1"/>
            </g>
            <g className={styles.saw}>
              <path d="M38 200 L70 200 L68 205 L40 205 Z" fill="#A0A0A0"/>
              <rect x="55" y="195" width="20" height="5" fill="#8B7355" rx="1"/>
            </g>
          </g>

          <g className={styles.woodPile}>
            <rect x="650" y="280" width="100" height="15" fill="url(#woodGradient)" rx="3"/>
            <rect x="655" y="262" width="90" height="15" fill="url(#woodGradient)" rx="3"/>
            <rect x="660" y="244" width="80" height="15" fill="url(#woodGradient)" rx="3"/>
            <rect x="665" y="226" width="70" height="15" fill="url(#woodGradient)" rx="3"/>
          </g>

          <g className={styles.workbench} filter="url(#shadow)">
            <rect x="280" y="320" width="240" height="20" fill="#A08060" rx="3"/>
            <rect x="290" y="340" width="15" height="80" fill="#8B7355"/>
            <rect x="495" y="340" width="15" height="80" fill="#8B7355"/>
          </g>

          <g className={styles.bedFrame} filter="url(#softShadow)">
            <rect x="320" y="260" width="160" height="12" fill="#C4956A" rx="2"/>
            <rect x="320" y="250" width="10" height="60" fill="#B8855A" rx="2"/>
            <rect x="470" y="250" width="10" height="60" fill="#B8855A" rx="2"/>
            <rect x="320" y="272" width="160" height="8" fill="#D4A574"/>
            <rect x="325" y="280" width="150" height="35" fill="#C4956A" rx="2"/>
          </g>

          <g className={styles.builder} filter="url(#shadow)">
            <g className={styles.builderBody}>
              <ellipse cx="420" cy="295" rx="28" ry="35" fill="#5D4E37"/>
              <circle cx="420" cy="245" r="22" fill="#E8C8A8"/>
              <ellipse cx="420" cy="240" rx="18" ry="10" fill="#4A3C2A"/>
              <circle cx="413" cy="248" r="2" fill="#2A2015"/>
              <circle cx="427" cy="248" r="2" fill="#2A2015"/>
              <path d="M415 255 Q420 258 425 255" stroke="#C4A080" strokeWidth="2" fill="none"/>
              <rect x="445" y="265" width="35" height="8" fill="#5D4E37" rx="3" className={styles.builderArm}/>
              <rect x="395" y="270" width="25" height="8" fill="#5D4E37" rx="3"/>
              <rect x="400" y="325" width="18" height="45" fill="#4A3C2A" rx="4"/>
              <rect x="422" y="325" width="18" height="45" fill="#4A3C2A" rx="4"/>
              <rect x="398" y="365" width="20" height="10" fill="#3A2E1A" rx="2"/>
              <rect x="420" y="365" width="20" height="10" fill="#3A2E1A" rx="2"/>
            </g>
            <g className={styles.builderHammer}>
              <rect x="475" y="240" width="8" height="35" fill="#8B7355" rx="2"/>
              <rect x="468" y="232" width="22" height="12" fill="#5D4E37" rx="3"/>
            </g>
            <g className={styles.builderLeg}></g>
          </g>

          <g className={styles.assistant} filter="url(#shadow)">
            <g className={styles.assistantBody}>
              <ellipse cx="580" cy="305" rx="24" ry="30" fill="#6B5B4D"/>
              <circle cx="580" cy="265" r="20" fill="#E8C8A8"/>
              <ellipse cx="580" cy="260" rx="16" ry="8" fill="#3A2E1A"/>
              <circle cx="574" cy="268" r="2" fill="#2A2015"/>
              <circle cx="586" cy="268" r="2" fill="#2A2015"/>
              <path d="M575 275 Q580 278 585 275" stroke="#C4A080" strokeWidth="2" fill="none"/>
              <rect x="555" y="280" width="25" height="7" fill="#6B5B4D" rx="3" className={styles.assistantArmBack}/>
              <rect x="600" y="280" width="25" height="7" fill="#6B5B4D" rx="3" className={styles.assistantArmFront}/>
              <rect x="558" y="330" width="16" height="40" fill="#5A4A3D" rx="4"/>
              <rect x="578" y="330" width="16" height="40" fill="#5A4A3D" rx="4"/>
              <rect x="556" y="365" width="18" height="8" fill="#4A3A2D" rx="2"/>
              <rect x="576" y="365" width="18" height="8" fill="#4A3A2D" rx="2"/>
            </g>
            <g className={styles.assistantLegBack}></g>
            <g className={styles.assistantLegFront}></g>
          </g>

          <g className={styles.woodPlank} filter="url(#shadow)">
            <rect x="600" y="285" width="80" height="12" fill="url(#woodGradient)" rx="2"/>
          </g>

          <g className={styles.speedLines}>
            <line x1="620" y1="290" x2="650" y2="290" stroke="#D4C4A8" strokeWidth="2" opacity="0.6"/>
            <line x1="625" y1="300" x2="660" y2="300" stroke="#D4C4A8" strokeWidth="2" opacity="0.5"/>
            <line x1="618" y1="310" x2="655" y2="310" stroke="#D4C4A8" strokeWidth="2" opacity="0.6"/>
          </g>

          <g className={styles.particles}>
            <circle cx="350" cy="280" r="2" fill="#D4A574" className={styles.particle1}/>
            <circle cx="380" cy="275" r="1.5" fill="#C4956A" className={styles.particle2}/>
            <circle cx="420" cy="285" r="2" fill="#B8855A" className={styles.particle3}/>
            <circle cx="400" cy="290" r="1.5" fill="#D4A574" className={styles.particle4}/>
          </g>
        </svg>

        {showWebsite && (
          <div className={styles.websitePreview}>
            <div className={styles.previewHeader}>
              <div className={styles.previewDots}>
                <span></span><span></span><span></span>
              </div>
            </div>
            <div className={styles.previewContent}>
              <div className={styles.previewSkeleton}></div>
              <div className={styles.previewLines}>
                <div className={styles.previewLine}></div>
                <div className={styles.previewLine}></div>
                <div className={styles.previewLineShort}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.loadingText}>
        <span className={styles.textMain}>Crafting your comfort...</span>
        <span className={styles.textSub}>Building your perfect furniture...</span>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <span className={styles.progressText}>{Math.min(Math.round(progress), 100)}%</span>
      </div>

      <div className={styles.loadingDots}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}