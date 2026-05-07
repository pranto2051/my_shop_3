'use client';

import React from 'react';
import { FaTriangleExclamation, FaCircleCheck } from 'react-icons/fa6';
import styles from './ConfirmModal.module.css';

export default function ConfirmModal({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  type = 'confirm' 
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={`${styles.iconWrapper} ${styles[type]}`}>
          {type === 'success' ? <FaCircleCheck /> : <FaTriangleExclamation />}
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          {onCancel && (
            <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={onCancel}>
              {cancelText}
            </button>
          )}
          <button className={`${styles.btn} ${styles.confirmBtn} ${styles[type]}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
