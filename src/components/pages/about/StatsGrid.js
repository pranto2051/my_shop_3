import React from 'react';
import styles from './StatsGrid.module.css';

const StatsGrid = ({ highlights }) => {
  if (!highlights || highlights.length === 0) return null;

  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {highlights.map((stat) => (
            <div key={stat.id} className={styles.statCard}>
              <div className={styles.icon}>{stat.icon}</div>
              <div className={styles.number}>{stat.number_value}</div>
              <div className={styles.label}>{stat.label_text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsGrid;
