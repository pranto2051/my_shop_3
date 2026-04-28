'use client';

import React from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import styles from './TrackingTimeline.module.css';
import { FaCircleCheck, FaCircleDot, FaCircle } from 'react-icons/fa6';

export default function TrackingTimeline({ order }) {
  const { state } = useAdmin();
  const { orderStages } = state;
  
  const currentStageIndex = order.currentStageIndex;

  return (
    <div className={styles.timeline}>
      {orderStages.map((stage, index) => {
        const isCompleted = index < currentStageIndex;
        const isCurrent = index === currentStageIndex;
        const isPending = index > currentStageIndex;
        
        // Find history for this stage
        const historyItem = order.stageHistory.find(h => h.stageId === stage.id);
        
        return (
          <div key={stage.id} className={`${styles.timelineItem} ${isCompleted ? styles.completed : ''} ${isCurrent ? styles.active : ''}`}>
            <div className={styles.iconWrapper}>
              {isCompleted ? <FaCircleCheck className={styles.iconCompleted} /> : 
               isCurrent ? <FaCircleDot className={styles.iconActive} /> : 
               <FaCircle className={styles.iconPending} />}
              {index < orderStages.length - 1 && <div className={styles.connector} />}
            </div>
            
            <div className={styles.content}>
              <div className={styles.header}>
                <h4 className={styles.stageName}>{stage.name}</h4>
                {historyItem && (
                  <span className={styles.timestamp}>
                    {new Date(historyItem.timestamp).toLocaleDateString('bn-BD')}
                  </span>
                )}
              </div>
              
              {isCurrent && (
                <div className={styles.currentIndicator}>বর্তমানে এই ধাপে আছে</div>
              )}
              
              {historyItem && historyItem.adminNote && (
                <p className={styles.note}>{historyItem.adminNote}</p>
              )}
              
              {isPending && (
                <p className={styles.pendingDesc}>{stage.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
