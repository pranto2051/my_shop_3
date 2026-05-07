'use client';
import React from 'react';
import styles from './SectionContact.module.css';
import { useAdmin } from '@/app/context/AdminContext';
import { FaLocationDot, FaPhone, FaWhatsapp, FaEnvelope, FaClock } from 'react-icons/fa6';

const SectionContact = () => {
  const { state } = useAdmin();
  const { shopInfo } = state;

  if (!shopInfo) return null;

  const contactItems = [
    {
      icon: <FaLocationDot />,
      label: 'ঠিকানা',
      value: shopInfo.showroomAddress?.address,
      color: '#7C4B2A'
    },
    {
      icon: <FaPhone />,
      label: 'ফোন',
      value: shopInfo.callNumbers?.numbers?.[0],
      color: '#D4882A',
      link: `tel:${shopInfo.callNumbers?.numbers?.[0]?.replace(/-/g, '')}`
    },
    {
      icon: <FaWhatsapp />,
      label: 'WhatsApp',
      value: shopInfo.whatsapp?.number,
      color: '#4A7C59',
      link: `https://wa.me/88${shopInfo.whatsapp?.number?.replace(/-/g, '')}`
    },
    {
      icon: <FaEnvelope />,
      label: 'ইমেইল',
      value: shopInfo.email?.address,
      color: '#B5541E',
      link: `mailto:${shopInfo.email?.address}`
    },
    {
      icon: <FaClock />,
      label: 'সময়সূচী',
      value: shopInfo.openingHours?.schedule?.[0],
      color: '#6B3D22'
    }
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoSide}>
        <div className={styles.grid}>
          {contactItems.map((item, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.icon} style={{ color: item.color }}>
                {item.icon}
              </div>
              <div className={styles.content}>
                <span className={styles.label}>{item.label}</span>
                {item.link ? (
                  <a href={item.link} className={styles.link} target="_blank" rel="noopener noreferrer">
                    {item.value}
                  </a>
                ) : (
                  <span className={styles.value}>{item.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.cta}>
          <a 
            href={`https://wa.me/88${shopInfo.whatsapp?.number?.replace(/-/g, '')}`} 
            className={styles.whatsappBtn}
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaWhatsapp /> সরাসরি WhatsApp এ মেসেজ দিন
          </a>
        </div>
      </div>
      <div className={styles.mapSide}>
        <div className={styles.mapCard}>
          <div className={styles.mapPlaceholder}>
            <FaLocationDot className={styles.mapIcon} />
            <p>ম্যাপ লোড হচ্ছে...</p>
            <span className={styles.addressText}>{shopInfo.showroomAddress?.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionContact;
