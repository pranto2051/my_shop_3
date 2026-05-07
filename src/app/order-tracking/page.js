'use client';

import React from 'react';
import OrderTracker from '@/components/tracking/OrderTracker';
import styles from './TrackingPage.module.css';
import { FaArrowLeft } from 'react-icons/fa6';
import Link from 'next/link';

export default function OrderTrackingPage() {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.backBtn}>
            <FaArrowLeft /> ফিরে যান
          </Link>
          <div className={styles.brand}>
            <h1 className={styles.brandName}>মা ফার্নিচার</h1>
            <p className={styles.tagline}>অর্ডার ট্র্যাকিং সিস্টেম</p>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <OrderTracker />
      </main>

      <footer className={styles.footer}>
        <p>© ২০২৪ মা ফার্নিচার - সকল স্বত্ব সংরক্ষিত</p>
      </footer>
    </div>
  );
}
