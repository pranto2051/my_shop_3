'use client';

import React from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import { 
  FaBell, 
  FaCircleCheck, 
  FaTriangleExclamation, 
  FaCircleInfo,
  FaCheckDouble,
  FaTrashCan,
  FaXmark
} from 'react-icons/fa6';

export default function NotificationsPanel() {
  const { state } = useAdmin();
  const { notifications } = state;

  return (
    <div className="notifications-panel">
      <div className="panel-header">
        <div className="header-title">
          <h2>Notifications</h2>
          <p>সিস্টেম অ্যালার্ট এবং সাম্প্রতিক কার্যক্রমের বিজ্ঞপ্তি</p>
        </div>
        <div className="header-actions">
          <button className="mark-all-btn"><FaCheckDouble /> সব পড়া হয়েছে</button>
          <button className="clear-btn"><FaTrashCan /> সব মুছুন</button>
        </div>
      </div>

      <div className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map(notif => (
            <div key={notif.id} className={`notification-card ${notif.is_read ? 'read' : 'unread'} ${notif.type.toLowerCase()}`}>
              <div className="notif-icon">
                {notif.type === 'Success' && <FaCircleCheck />}
                {notif.type === 'Warning' && <FaTriangleExclamation />}
                {notif.type === 'Alert' && <FaTriangleExclamation />}
                {notif.type === 'Info' && <FaCircleInfo />}
              </div>
              <div className="notif-content">
                <div className="notif-top">
                  <h4>{notif.title}</h4>
                  <span className="notif-time">
                    {new Date(notif.created_at).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p>{notif.message}</p>
              </div>
              <div className="notif-actions">
                {!notif.is_read && <button className="mark-read"><FaCheckDouble /></button>}
                <button className="remove-notif"><FaXmark /></button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-notifications">
            <div className="empty-icon"><FaBell /></div>
            <h3>কোন নতুন বিজ্ঞপ্তি নেই</h3>
            <p>আপনার সব কার্যক্রম আপ-টু-ডেট আছে</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .notifications-panel { padding: 20px; max-width: 800px; margin: 0 auto; }
        .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .header-title h2 { font-size: 24px; color: #2c3e50; font-family: 'Noto Sans Bengali', sans-serif; }
        .header-title p { color: #7f8c8d; font-size: 14px; }
        .header-actions { display: flex; gap: 10px; }
        .header-actions button { display: flex; align-items: center; gap: 8px; padding: 8px 15px; border-radius: 8px; border: 1px solid #ddd; background: white; font-weight: 600; cursor: pointer; font-size: 13px; }
        .clear-btn:hover { color: #c62828; border-color: #ffcdd2; background: #ffebee; }

        .notifications-list { display: flex; flex-direction: column; gap: 15px; }
        .notification-card { background: white; border: 1px solid #eee; border-radius: 12px; padding: 15px; display: flex; gap: 15px; position: relative; transition: 0.3s; }
        .notification-card.unread { border-left: 4px solid #7C4B2A; background: #fffdf9; }
        .notification-card.read { opacity: 0.7; }
        
        .notif-icon { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .success .notif-icon { background: #e8f5e9; color: #2e7d32; }
        .warning .notif-icon { background: #fff3e0; color: #e65100; }
        .alert .notif-icon { background: #ffebee; color: #c62828; }
        .info .notif-icon { background: #e3f2fd; color: #1565c0; }

        .notif-content { flex: 1; }
        .notif-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
        .notif-top h4 { margin: 0; font-size: 15px; color: #2c3e50; font-weight: 700; }
        .notif-time { font-size: 11px; color: #95a5a6; }
        .notif-content p { margin: 0; font-size: 13px; color: #7f8c8d; line-height: 1.5; }

        .notif-actions { display: flex; flex-direction: column; gap: 5px; opacity: 0; transition: 0.2s; }
        .notification-card:hover .notif-actions { opacity: 1; }
        .notif-actions button { background: none; border: none; padding: 5px; cursor: pointer; color: #adb5bd; }
        .notif-actions button:hover { color: #2c3e50; }

        .empty-notifications { text-align: center; padding: 100px 20px; color: #adb5bd; }
        .empty-icon { font-size: 60px; margin-bottom: 20px; opacity: 0.2; }
        .empty-notifications h3 { color: #7f8c8d; margin-bottom: 10px; }
      `}</style>
    </div>
  );
}
