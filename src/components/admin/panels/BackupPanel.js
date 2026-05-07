'use client';

import React, { useState } from 'react';
import { 
  FaDatabase, 
  FaDownload, 
  FaCloudArrowUp,
  FaClockRotateLeft,
  FaCircleCheck,
  FaTriangleExclamation,
  FaTrashCan,
  FaFileArrowDown
} from 'react-icons/fa6';

export default function BackupPanel() {
  const [backups, setBackups] = useState([
    { id: 1, name: 'Daily_Backup_May06.sql', size: '১২.৫ MB', date: '2024-05-06 23:00', status: 'Success' },
    { id: 2, name: 'Full_System_Backup_May01.zip', size: '২৪৫.২ MB', date: '2024-05-01 02:00', status: 'Success' },
    { id: 3, name: 'Manual_Export_April25.csv', size: '১.৮ MB', date: '2024-04-25 15:30', status: 'Success' },
  ]);

  return (
    <div className="backup-panel">
      <div className="panel-header">
        <div className="header-title">
          <h2>Data & Backup</h2>
          <p>আপনার স্টোরের ডেটা নিরাপদ রাখুন এবং নিয়মিত ব্যাকআপ নিন</p>
        </div>
      </div>

      <div className="backup-overview">
        <div className="main-backup-card">
          <div className="card-top">
            <div className="db-status">
              <div className="pulse-dot"></div>
              <span>Database Connected</span>
            </div>
            <FaDatabase className="bg-icon" />
          </div>
          <div className="card-content">
            <h3>শেষ ব্যাকআপ নেওয়া হয়েছে</h3>
            <span className="last-time">১০ ঘণ্টা আগে (মে ০৬, ২০২৪)</span>
            <div className="backup-actions">
              <button className="primary-btn"><FaCloudArrowUp /> ব্যাকআপ তৈরি করুন</button>
              <button className="secondary-btn"><FaDownload /> এক্সপোর্ট SQL</button>
            </div>
          </div>
          <div className="card-footer">
            <div className="info">
              <span>অটো-ব্যাকআপ: <strong>সক্রিয় (প্রতিদিন রাত ১১টা)</strong></span>
            </div>
          </div>
        </div>

        <div className="storage-info">
          <div className="storage-header">
            <h3>স্টোরেজ ব্যবহার</h3>
            <span>৮৫% পূর্ণ</span>
          </div>
          <div className="progress-bar">
            <div className="fill" style={{width: '85%'}}></div>
          </div>
          <div className="storage-meta">
            <div className="m-item">
              <span className="dot images"></span>
              <span>ইমেজ (৪.২ GB)</span>
            </div>
            <div className="m-item">
              <span className="dot db"></span>
              <span>ডেটাবেস (১২৪ MB)</span>
            </div>
          </div>
          <div className="warning-box">
            <FaTriangleExclamation />
            <p>আপনার স্টোরেজ প্রায় পূর্ণ। কিছু পুরাতন ব্যাকআপ ফাইল ডিলিট করার পরামর্শ দেওয়া হচ্ছে।</p>
          </div>
        </div>
      </div>

      <div className="backup-history">
        <div className="section-header">
          <h3><FaClockRotateLeft /> ব্যাকআপ হিস্টোরি</h3>
        </div>
        <div className="history-table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>ফাইলের নাম</th>
                <th>সাইজ</th>
                <th>তারিখ ও সময়</th>
                <th>অবস্থা</th>
                <th>অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {backups.map(b => (
                <tr key={b.id}>
                  <td>
                    <div className="file-cell">
                      <FaFileArrowDown />
                      <span>{b.name}</span>
                    </div>
                  </td>
                  <td>{b.size}</td>
                  <td>{b.date}</td>
                  <td>
                    <span className="status-tag"><FaCircleCheck /> {b.status}</span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button title="Download"><FaDownload /></button>
                      <button className="delete" title="Delete"><FaTrashCan /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .backup-panel { padding: 20px; }
        .panel-header { margin-bottom: 30px; }
        .header-title h2 { font-size: 24px; color: #2c3e50; font-family: 'Noto Sans Bengali', sans-serif; }
        .header-title p { color: #7f8c8d; font-size: 14px; }

        .backup-overview { display: grid; grid-template-columns: 1fr 380px; gap: 30px; margin-bottom: 40px; }
        
        .main-backup-card { background: #2c3e50; color: white; border-radius: 20px; padding: 30px; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }
        .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .db-status { display: flex; align-items: center; gap: 10px; background: rgba(39, 174, 96, 0.2); color: #2ecc71; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; border: 1px solid rgba(39, 174, 96, 0.3); }
        .pulse-dot { width: 8px; height: 8px; background: #2ecc71; border-radius: 50%; box-shadow: 0 0 0 rgba(46, 204, 113, 0.4); animation: pulse 2s infinite; }
        .bg-icon { font-size: 80px; position: absolute; right: -10px; top: -10px; opacity: 0.1; transform: rotate(-15deg); }

        .card-content h3 { font-size: 18px; margin-bottom: 5px; opacity: 0.8; }
        .last-time { font-size: 24px; font-weight: 800; display: block; margin-bottom: 30px; }
        .backup-actions { display: flex; gap: 15px; }
        .primary-btn { background: #7C4B2A; color: white; border: none; padding: 12px 25px; border-radius: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; }
        .secondary-btn { background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); padding: 12px 25px; border-radius: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; }

        .card-footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 13px; opacity: 0.8; }

        .storage-info { background: white; border-radius: 20px; border: 1px solid #eee; padding: 30px; }
        .storage-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 15px; }
        .storage-header h3 { font-size: 16px; color: #2c3e50; }
        .storage-header span { font-size: 14px; font-weight: 800; color: #e74c3c; }
        .progress-bar { height: 10px; background: #f1f3f5; border-radius: 10px; overflow: hidden; margin-bottom: 20px; }
        .fill { height: 100%; background: linear-gradient(to right, #7C4B2A, #e74c3c); border-radius: 10px; }
        .storage-meta { display: flex; gap: 20px; margin-bottom: 25px; }
        .m-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #7f8c8d; font-weight: 600; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.images { background: #7C4B2A; }
        .dot.db { background: #3498db; }
        .warning-box { background: #fff5f5; border: 1px solid #feb2b2; padding: 15px; border-radius: 12px; display: flex; gap: 12px; color: #c53030; font-size: 12px; line-height: 1.5; }

        .history-table-wrapper { background: white; border-radius: 15px; border: 1px solid #eee; overflow: hidden; }
        .history-table { width: 100%; border-collapse: collapse; }
        .history-table th { text-align: left; padding: 15px; background: #f8f9fa; color: #7f8c8d; font-size: 13px; font-weight: 700; text-transform: uppercase; }
        .history-table td { padding: 15px; border-bottom: 1px solid #eee; font-size: 14px; color: #2c3e50; }
        
        .file-cell { display: flex; align-items: center; gap: 12px; font-weight: 600; color: #34495e; }
        .status-tag { color: #27ae60; font-weight: 700; display: flex; align-items: center; gap: 5px; font-size: 12px; }
        .action-btns { display: flex; gap: 10px; }
        .action-btns button { background: none; border: 1px solid #eee; padding: 6px 10px; border-radius: 6px; color: #7f8c8d; cursor: pointer; transition: 0.2s; }
        .action-btns button:hover { background: #f8f9fa; border-color: #3498db; color: #3498db; }
        .action-btns button.delete:hover { border-color: #e74c3c; color: #e74c3c; background: #fff5f5; }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(46, 204, 113, 0); }
          100% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0); }
        }
      `}</style>
    </div>
  );
}
