'use client';
import React, { useState, useEffect } from 'react';
import styles from './TableOfContents.module.css';
import { FaListUl, FaChevronDown } from 'react-icons/fa6';

const TableOfContents = ({ sections }) => {
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.section_key);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  if (!sections || sections.length === 0) return null;

  return (
    <div className={styles.tocWrapper}>
      <div className={styles.mobileHeader} onClick={() => setIsOpen(!isOpen)}>
        <FaListUl />
        <span>সূচিপত্র</span>
        <FaChevronDown className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`} />
      </div>

      <div className={`${styles.tocContent} ${isOpen ? styles.showMobile : ''}`}>
        <h3 className={styles.title}>
          <FaListUl /> সূচিপত্র
        </h3>
        <ul className={styles.list}>
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.section_key)}
                className={`${styles.link} ${activeId === section.section_key ? styles.active : ''}`}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TableOfContents;
