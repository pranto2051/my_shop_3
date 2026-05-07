'use client';

import React, { useState } from 'react';
import { 
  FaMoneyBillTrendUp, 
  FaScaleBalanced, 
  FaFileInvoiceDollar, 
  FaHandHoldingDollar,
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaCreditCard,
  FaLandmark,
  FaWallet,
  FaFileExport,
  FaCalendarCheck,
  FaChartPie
} from 'react-icons/fa6';

export default function FinancialManagementPanel({ transactions: dbTransactions = [], initialTab = 'overview' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const transactions = dbTransactions.length > 0 ? dbTransactions : [
    { id: 'TXN-1001', type: 'Income', category: 'Order Payment', amount: 45000, method: 'bKash', status: 'Verified', date: '2024-05-06' },
    { id: 'TXN-1002', type: 'Expense', category: 'Wood Purchase', amount: 15000, method: 'Bank', status: 'Completed', date: '2024-05-05' },
    { id: 'TXN-1003', type: 'Income', category: 'Order Advance', amount: 5000, method: 'Cash', status: 'Verified', date: '2024-05-04' },
    { id: 'TXN-1004', type: 'Expense', category: 'Electricity Bill', amount: 1200, method: 'Wallet', status: 'Completed', date: '2024-05-03' }
  ];

  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + Number(t.amount), 0);
  const netProfit = totalIncome - totalExpense;

  return (
    <div className="financial-panel">
      <div className="panel-header">
        <div className="header-title">
          <h2>আর্থিক ব্যবস্থাপনা</h2>
          <p>আপনার ব্যবসার আয়, ব্যয় এবং মুনাফা ট্র্যাক করুন</p>
        </div>
        <div className="header-actions">
          <button className="export-btn"><FaFileExport /> রিপোর্ট ডাউনলোড</button>
        </div>
      </div>

      <div className="financial-stats-grid">
        <div className="fin-stat-card income">
          <div className="stat-icon"><FaArrowTrendUp /></div>
          <div className="stat-details">
            <span className="label">মোট আয়</span>
            <span className="value">৳{totalIncome.toLocaleString('bn-BD')}</span>
            <span className="growth">+০%</span>
          </div>
        </div>
        <div className="fin-stat-card expense">
          <div className="stat-icon"><FaArrowTrendDown /></div>
          <div className="stat-details">
            <span className="label">মোট ব্যয়</span>
            <span className="value">৳{totalExpense.toLocaleString('bn-BD')}</span>
            <span className="growth">+০%</span>
          </div>
        </div>
        <div className="fin-stat-card profit">
          <div className="stat-icon"><FaScaleBalanced /></div>
          <div className="stat-details">
            <span className="label">নিট মুনাফা</span>
            <span className="value">৳{netProfit.toLocaleString('bn-BD')}</span>
            <span className="growth">+০%</span>
          </div>
        </div>
        <div className="fin-stat-card receivable">
          <div className="stat-icon"><FaHandHoldingDollar /></div>
          <div className="stat-details">
            <span className="label">বাকি পেমেন্ট</span>
            <span className="value">৳০</span>
          </div>
        </div>
      </div>

      <div className="fin-tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
          <FaChartPie /> ওভারভিউ
        </button>
        <button className={activeTab === 'transactions' ? 'active' : ''} onClick={() => setActiveTab('transactions')}>
          <FaFileInvoiceDollar /> লেনদেন তালিকা
        </button>
        <button className={activeTab === 'payments' ? 'active' : ''} onClick={() => setActiveTab('payments')}>
          <FaCreditCard /> পেমেন্ট মেথড
        </button>
        <button className={activeTab === 'pnl' ? 'active' : ''} onClick={() => setActiveTab('pnl')}>
          <FaScaleBalanced /> লাভ-ক্ষতি (P&L)
        </button>
      </div>

      <div className="fin-content">
        {activeTab === 'overview' && (
          <div className="overview-grid">
            <div className="chart-placeholder">
              <h4>আয় বনাম ব্যয় (গত ১৪ দিন)</h4>
              <div className="mock-bar-chart">
                {[40, 60, 35, 80, 55, 90, 45, 70, 85, 30, 50, 65, 75, 95].map((h, i) => (
                  <div key={i} className="bar-group">
                    <div className="bar income" style={{height: `${h}%`}}></div>
                    <div className="bar expense" style={{height: `${h * 0.4}%`}}></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="payment-split">
              <h4>পেমেন্ট মেথড ডিস্ট্রিবিউশন</h4>
              <div className="split-list">
                <div className="split-item">
                  <span className="m-icon bkash"><FaWallet /></span>
                  <span className="m-name">bKash</span>
                  <span className="m-val">৪৫%</span>
                </div>
                <div className="split-item">
                  <span className="m-icon bank"><FaLandmark /></span>
                  <span className="m-name">Bank Transfer</span>
                  <span className="m-val">৩০%</span>
                </div>
                <div className="split-item">
                  <span className="m-icon cash"><FaMoneyBillTrendUp /></span>
                  <span className="m-name">Cash</span>
                  <span className="m-val">২৫%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="transactions-view">
            <div className="table-header">
              <h3>সাম্প্রতিক লেনদেন সমূহ</h3>
              <div className="filter-group">
                <select><option>সকল লেনদেন</option><option>আয়</option><option>ব্যয়</option></select>
                <input type="date" />
              </div>
            </div>
            <table className="fin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ধরণ</th>
                  <th>খাত</th>
                  <th>পেমেন্ট মেথড</th>
                  <th>পরিমাণ</th>
                  <th>তারিখ</th>
                  <th>অবস্থা</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(txn => (
                  <tr key={txn.id}>
                    <td><strong>{txn.id}</strong></td>
                    <td>
                      <span className={`type-tag ${txn.type.toLowerCase()}`}>
                        {txn.type === 'Income' ? <FaArrowTrendUp /> : <FaArrowTrendDown />} {txn.type === 'Income' ? 'আয়' : 'ব্যয়'}
                      </span>
                    </td>
                    <td>{txn.category}</td>
                    <td>{txn.method}</td>
                    <td><strong className={txn.type === 'Income' ? 'txt-success' : 'txt-danger'}>
                      {txn.type === 'Income' ? '+' : '-'} ৳{txn.amount.toLocaleString('bn-BD')}
                    </strong></td>
                    <td>{txn.date}</td>
                    <td><span className="status-tag verified">{txn.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style jsx>{`
        .financial-panel { padding: 20px; }
        .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .header-title h2 { font-size: 24px; color: #2c3e50; font-family: 'Noto Sans Bengali', sans-serif; }
        .header-title p { color: #7f8c8d; font-size: 14px; }
        .export-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #f8f9fa; border: 1px solid #ddd; border-radius: 8px; font-weight: 600; cursor: pointer; }

        .financial-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .fin-stat-card { background: white; padding: 25px; border-radius: 15px; border: 1px solid #eee; display: flex; align-items: center; gap: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        .stat-icon { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
        
        .income .stat-icon { background: #e8f5e9; color: #2e7d32; }
        .expense .stat-icon { background: #ffebee; color: #c62828; }
        .profit .stat-icon { background: #e3f2fd; color: #1565c0; }
        .receivable .stat-icon { background: #fff3e0; color: #e65100; }

        .stat-details { display: flex; flex-direction: column; }
        .label { font-size: 12px; color: #7f8c8d; font-weight: 600; }
        .value { font-size: 22px; font-weight: 800; color: #2c3e50; margin: 4px 0; }
        .growth { font-size: 11px; font-weight: 700; }
        .income .growth { color: #27ae60; }
        .expense .growth { color: #e74c3c; }

        .fin-tabs { display: flex; gap: 10px; border-bottom: 2px solid #eee; margin-bottom: 30px; }
        .fin-tabs button { display: flex; align-items: center; gap: 10px; padding: 12px 20px; border: none; background: none; color: #7f8c8d; font-weight: 600; cursor: pointer; border-bottom: 3px solid transparent; transition: 0.3s; }
        .fin-tabs button.active { color: #7C4B2A; border-bottom-color: #7C4B2A; }

        .overview-grid { display: grid; grid-template-columns: 1fr 300px; gap: 20px; }
        .chart-placeholder { background: white; border: 1px solid #eee; border-radius: 15px; padding: 20px; }
        .mock-bar-chart { height: 200px; display: flex; align-items: flex-end; gap: 10px; padding-top: 20px; }
        .bar-group { flex: 1; display: flex; flex-direction: column; justify-content: flex-end; gap: 2px; }
        .bar { width: 100%; border-radius: 4px 4px 0 0; }
        .bar.income { background: #7C4B2A; }
        .bar.expense { background: #E6D5B8; }

        .payment-split { background: white; border: 1px solid #eee; border-radius: 15px; padding: 20px; }
        .split-list { display: flex; flex-direction: column; gap: 15px; margin-top: 20px; }
        .split-item { display: flex; align-items: center; gap: 12px; }
        .m-icon { width: 35px; height: 35px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .m-icon.bkash { background: #D81B60; color: white; }
        .m-icon.bank { background: #1565C0; color: white; }
        .m-icon.cash { background: #2E7D32; color: white; }
        .m-name { flex: 1; font-size: 14px; font-weight: 600; color: #2c3e50; }
        .m-val { font-weight: 700; color: #7f8c8d; }

        .transactions-view { background: white; border: 1px solid #eee; border-radius: 15px; padding: 20px; }
        .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .filter-group { display: flex; gap: 10px; }
        .filter-group select, .filter-group input { padding: 8px; border-radius: 6px; border: 1px solid #ddd; outline: none; }

        .fin-table { width: 100%; border-collapse: collapse; }
        .fin-table th { text-align: left; padding: 15px; background: #f8f9fa; color: #7f8c8d; font-size: 13px; }
        .fin-table td { padding: 15px; border-bottom: 1px solid #eee; font-size: 14px; }
        
        .type-tag { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; }
        .type-tag.income { background: #e8f5e9; color: #2e7d32; }
        .type-tag.expense { background: #ffebee; color: #c62828; }
        
        .status-tag { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        .status-tag.verified { background: #e3f2fd; color: #1565c0; }
        
        .txt-success { color: #2e7d32; }
        .txt-danger { color: #c62828; }
      `}</style>
    </div>
  );
}
