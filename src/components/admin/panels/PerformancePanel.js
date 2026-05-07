'use client';

import React from 'react';
import { 
  FaGaugeHigh, 
  FaServer, 
  FaBolt, 
  FaGlobe, 
  FaDatabase,
  FaArrowTrendUp,
  FaChartLine
} from 'react-icons/fa6';

export default function PerformancePanel() {
  return (
    <div className="performance-panel">
      <div className="panel-header">
        <div className="header-title">
          <h2>Performance Monitor</h2>
          <p>ওয়েবসাইট এবং সার্ভারের বর্তমান গতি ও অবস্থা পর্যবেক্ষণ করুন</p>
        </div>
      </div>

      <div className="performance-grid">
        <div className="perf-main-card">
          <div className="gauge-wrap">
            <div className="gauge-outer">
              <div className="gauge-inner">
                <span className="gauge-val">৯৮</span>
                <span className="gauge-label">Score</span>
              </div>
              <div className="gauge-needle" style={{transform: 'rotate(160deg)'}}></div>
            </div>
          </div>
          <div className="perf-summary">
            <h3>Excellent Performance</h3>
            <p>আপনার ওয়েবসাইট বর্তমানে অপ্টিমাইজড এবং দ্রুত কাজ করছে।</p>
          </div>
        </div>

        <div className="metrics-side-grid">
          <div className="metric-card">
            <div className="m-icon"><FaBolt /></div>
            <div className="m-info">
              <span className="m-label">Server Response</span>
              <span className="m-val">১২৪ ms</span>
            </div>
          </div>
          <div className="metric-card">
            <div className="m-icon"><FaGlobe /></div>
            <div className="m-info">
              <span className="m-label">Load Time (LCP)</span>
              <span className="m-val">১.২ s</span>
            </div>
          </div>
          <div className="metric-card">
            <div className="m-icon"><FaDatabase /></div>
            <div className="m-info">
              <span className="m-label">Query Time</span>
              <span className="m-val">৪৫ ms</span>
            </div>
          </div>
          <div className="metric-card">
            <div className="m-icon"><FaServer /></div>
            <div className="m-info">
              <span className="m-label">Uptime</span>
              <span className="m-val">৯৯.৯৯%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="realtime-activity">
        <div className="section-header">
          <h3><FaChartLine /> রিয়েল-টাইম ট্রাফিক</h3>
          <span className="live-pill">LIVE</span>
        </div>
        <div className="activity-chart-mock">
          {[30, 45, 25, 60, 40, 75, 50, 90, 65, 80, 55, 100, 70, 85, 45, 60, 40, 55, 30, 45].map((h, i) => (
            <div key={i} className="act-bar" style={{height: `${h}%`}}></div>
          ))}
        </div>
        <div className="activity-meta">
          <div className="meta-item">
            <span className="count">১২</span>
            <span className="label">সক্রিয় ইউজার</span>
          </div>
          <div className="meta-item">
            <span className="count">৪৫</span>
            <span className="label">পেজ ভিউ (১ মি.)</span>
          </div>
          <div className="meta-item">
            <span className="count"><FaArrowTrendUp /> ১৫%</span>
            <span className="label">গত ঘণ্টার তুলনায়</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .performance-panel { padding: 20px; }
        .panel-header { margin-bottom: 30px; }
        .header-title h2 { font-size: 24px; color: #2c3e50; font-family: 'Noto Sans Bengali', sans-serif; }
        .header-title p { color: #7f8c8d; font-size: 14px; }

        .performance-grid { display: grid; grid-template-columns: 1fr 350px; gap: 20px; margin-bottom: 30px; }
        .perf-main-card { background: white; border-radius: 20px; border: 1px solid #eee; padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
        
        .gauge-wrap { position: relative; margin-bottom: 30px; }
        .gauge-outer { width: 180px; height: 90px; background: #f1f3f5; border-radius: 100px 100px 0 0; position: relative; overflow: hidden; border: 10px solid #eee; border-bottom: none; }
        .gauge-outer::before { content: ''; position: absolute; inset: 0; background: conic-gradient(from 270deg, #e74c3c 0%, #f1c40f 40%, #27ae60 80%); }
        .gauge-inner { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 120px; height: 60px; background: white; border-radius: 80px 80px 0 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding-bottom: 5px; z-index: 2; }
        .gauge-val { font-size: 36px; font-weight: 800; color: #2c3e50; line-height: 1; }
        .gauge-label { font-size: 10px; color: #95a5a6; font-weight: 700; text-transform: uppercase; }
        .gauge-needle { position: absolute; bottom: 0; left: 50%; width: 4px; height: 80px; background: #2c3e50; transform-origin: bottom center; transition: 1s ease-in-out; border-radius: 4px; z-index: 3; }
        
        .perf-summary h3 { color: #27ae60; margin-bottom: 10px; font-size: 22px; }
        .perf-summary p { color: #7f8c8d; font-size: 14px; max-width: 280px; }

        .metrics-side-grid { display: grid; grid-template-columns: 1fr; gap: 15px; }
        .metric-card { background: white; padding: 20px; border-radius: 15px; border: 1px solid #eee; display: flex; align-items: center; gap: 15px; }
        .m-icon { width: 40px; height: 40px; border-radius: 10px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; font-size: 18px; color: #7C4B2A; }
        .m-info { display: flex; flex-direction: column; }
        .m-label { font-size: 11px; color: #95a5a6; font-weight: 700; text-transform: uppercase; }
        .m-val { font-size: 18px; font-weight: 700; color: #2c3e50; }

        .realtime-activity { background: #1a1a1a; padding: 25px; border-radius: 20px; color: white; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .section-header h3 { font-size: 16px; display: flex; align-items: center; gap: 10px; margin: 0; }
        .live-pill { background: #e74c3c; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 800; animation: pulse 1.5s infinite; }
        
        .activity-chart-mock { height: 80px; display: flex; align-items: flex-end; gap: 8px; margin-bottom: 25px; }
        .act-bar { flex: 1; background: #7C4B2A; border-radius: 2px 2px 0 0; opacity: 0.6; min-height: 5px; }
        .act-bar:last-child { background: #fff; opacity: 1; }

        .activity-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .meta-item { display: flex; flex-direction: column; }
        .meta-item .count { font-size: 20px; font-weight: 700; display: flex; align-items: center; gap: 5px; }
        .meta-item .label { font-size: 11px; color: #777; margin-top: 4px; }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
