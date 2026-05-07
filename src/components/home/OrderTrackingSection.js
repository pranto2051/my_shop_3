'use client';

import React from 'react';
import Link from 'next/link';
import styles from './OrderTrackingSection.module.css';
import { FaTruckFast, FaMagnifyingGlass, FaArrowRight } from 'react-icons/fa6';

export default function OrderTrackingSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.iconBox}>
            <FaTruckFast className={styles.mainIcon} />
          </div>
          <div className={styles.textBox}>
            <h2 className={styles.title}>আপনার ফার্নিচার কোথায় আছে?</h2>
            <p className={styles.description}>
              অর্ডার করার পর আপনার ফার্নিচার এখন কোন অবস্থায় আছে তা সহজেই ট্র্যাক করুন। 
              সরাসরি আমাদের ওয়ার্কশপ থেকে আপনার বাড়ি পর্যন্ত আপডেট পান।
            </p>
            <div className={styles.features}>
              <div className={styles.feature}>
                <FaMagnifyingGlass className={styles.featureIcon} />
                <span>মোবাইল নাম্বার দিয়ে ট্র্যাক করুন</span>
              </div>
              <div className={styles.feature}>
                <div className={styles.dot} />
                <span>রিয়েল-টাইম স্ট্যাটাস আপডেট</span>
              </div>
            </div>
          </div>
          <div className={styles.actionBox}>
            <Link href="/order-tracking" className={styles.trackLink}>
              অর্ডার ট্র্যাক করুন <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
