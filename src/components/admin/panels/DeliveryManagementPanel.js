'use client';

import React, { useState } from 'react';
import { useAdmin, addDeliveryZone, deleteDeliveryZone } from '@/app/context/AdminContext';
import { 
  FaTruckFast, 
  FaMapLocationDot, 
  FaCalendarDays, 
  FaChartPie, 
  FaUserGear,
  FaPlus,
  FaPencil,
  FaCheck,
  FaXmark,
  FaPhone,
  FaLocationDot,
  FaClock,
  FaCircleDot,
  FaTrashCan
} from 'react-icons/fa6';

export default function DeliveryManagementPanel({ 
  deliveryPersonnel: dbPersonnel = [],
  deliveryZones: dbZones = [],
  deliveryLocations: dbLocations = []
}) {
  const { dispatch } = useAdmin();
  const [activeTab, setActiveTab] = useState('zones');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newZone, setNewZone] = useState({
    name: '',
    charge: '',
    estimated_time: ''
  });
  const [loading, setLoading] = useState(false);

  const zones = dbZones.map(z => ({
    id: z.id,
    name: z.name,
    charge: z.charge,
    days: z.estimated_time,
    active: z.status === 'সক্রিয়'
  }));

  const handleAddZone = async (e) => {
    e.preventDefault();
    if (!newZone.name || !newZone.charge) {
      alert('দয়া করে নাম এবং চার্জ পূরণ করুন');
      return;
    }
    setLoading(true);
    const result = await addDeliveryZone(dispatch, newZone);
    setLoading(false);
    if (result.success) {
      setShowAddModal(false);
      setNewZone({ name: '', charge: '', estimated_time: '' });
    } else {
      alert('ভুল হয়েছে: ' + result.error.message);
    }
  };

  const handleDeleteZone = async (id) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই জোনটি মুছে ফেলতে চান?')) {
      const result = await deleteDeliveryZone(dispatch, id);
      if (!result.success) {
        alert('মুছে ফেলা যায়নি: ' + result.error.message);
      }
    }
  };

  const recentDeliveries = [];

  return (
    <div className="delivery-panel" suppressHydrationWarning>
      {showAddModal && (
        <div className="modal-overlay" suppressHydrationWarning>
          <div className="modal-content" suppressHydrationWarning>
            <div className="modal-header" suppressHydrationWarning>
              <h3>নতুন ডেলিভারি জোন যোগ করুন</h3>
              <button className="close-modal" onClick={() => setShowAddModal(false)}><FaXmark /></button>
            </div>
            <form onSubmit={handleAddZone} className="modal-form">
              <div className="form-body">
                <div className="form-group">
                  <label>জোনের নাম</label>
                  <input 
                    type="text" 
                    placeholder="যেমন: ঢাকার মধ্যে" 
                    value={newZone.name}
                    onChange={(e) => setNewZone({...newZone, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>ডেলিভারি চার্জ (৳)</label>
                  <input 
                    type="number" 
                    placeholder="80" 
                    value={newZone.charge}
                    onChange={(e) => setNewZone({...newZone, charge: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>আনুমানিক সময়</label>
                  <input 
                    type="text" 
                    placeholder="১-২ দিন" 
                    value={newZone.estimated_time}
                    onChange={(e) => setNewZone({...newZone, estimated_time: e.target.value})}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setShowAddModal(false)}>বাতিল</button>
                <button type="submit" className="save-btn" disabled={loading}>
                  {loading ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="panel-header">
        <div className="header-title">
          <h2>ডেলিভারি ব্যবস্থাপনা</h2>
          <p>শিপিং জোন, ডেলিভারি পারসন এবং ট্র্যাকিং নিয়ন্ত্রণ করুন</p>
        </div>
      </div>

      <div className="tab-navigation">
        <button className={activeTab === 'zones' ? 'active' : ''} onClick={() => setActiveTab('zones')}>
          <FaMapLocationDot /> শিপিং জোন
        </button>
        <button className={activeTab === 'tracking' ? 'active' : ''} onClick={() => setActiveTab('tracking')}>
          <FaTruckFast /> লাইভ ট্র্যাকিং
        </button>
        <button className={activeTab === 'personnel' ? 'active' : ''} onClick={() => setActiveTab('personnel')}>
          <FaUserGear /> ডেলিভারি টিম
        </button>
        <button className={activeTab === 'calendar' ? 'active' : ''} onClick={() => setActiveTab('calendar')}>
          <FaCalendarDays /> ডেলিভারি ক্যালেন্ডার
        </button>
        <button className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}>
          <FaChartPie /> রিপোর্ট
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'zones' && (
          <div className="zones-view">
            <div className="section-header">
              <h3>ডেলিভারি জোন ও চার্জ</h3>
              <button className="add-zone-btn" onClick={() => setShowAddModal(true)}><FaPlus /> নতুন জোন</button>
            </div>
            <div className="zones-table-wrapper">
              <table className="delivery-table">
                <thead>
                  <tr>
                    <th>জোনের নাম</th>
                    <th>ডেলিভারি চার্জ</th>
                    <th>আনুমানিক সময়</th>
                    <th>অবস্থা</th>
                    <th>অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {zones.map(zone => (
                    <tr key={zone.id}>
                      <td><strong>{zone.name}</strong></td>
                      <td>
                        <div className="inline-edit">
                          ৳{zone.charge} <FaPencil className="edit-icon" />
                        </div>
                      </td>
                      <td>{zone.days}</td>
                      <td>
                        <span className={`toggle-pill ${zone.active ? 'active' : ''}`}>
                          {zone.active ? 'সক্রিয়' : 'বন্ধ'}
                        </span>
                      </td>
                      <td>
                        <button className="icon-btn delete" onClick={() => handleDeleteZone(zone.id)}><FaTrashCan /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'tracking' && (
          <div className="tracking-view">
            <div className="stats-row">
              <div className="stat-card">
                <span className="label">চলমান ডেলিভারি</span>
                <span className="value">১২টি</span>
              </div>
              <div className="stat-card">
                <span className="label">আজ ডেলিভারি হয়েছে</span>
                <span className="value">৪৫টি</span>
              </div>
              <div className="stat-card">
                <span className="label">দেরি হয়েছে</span>
                <span className="value">৩টি</span>
              </div>
            </div>

            <div className="delivery-list">
              <h3>সাম্প্রতিক ডেলিভারি আপডেট</h3>
              {recentDeliveries.map(item => (
                <div key={item.id} className="delivery-item">
                  <div className="item-icon">
                    <FaTruckFast />
                  </div>
                  <div className="item-details">
                    <div className="item-top">
                      <span className="order-id">{item.id}</span>
                      <span className={`status-pill ${item.status.toLowerCase().replace(' ', '-')}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="item-info">
                      <span><FaLocationDot /> {item.zone}</span>
                      <span><FaUserGear /> {item.person}</span>
                      <span><FaClock /> {item.time}</span>
                    </div>
                  </div>
                  <button className="track-btn">ট্র্যাক</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'personnel' && (
          <div className="personnel-view">
            <div className="section-header">
              <h3>ডেলিভারি পার্সোনেল তালিকা</h3>
              <button className="add-btn"><FaPlus /> নতুন সদস্য যোগ করুন</button>
            </div>
            <div className="personnel-grid">
              {deliveryPersonnel.map(person => (
                <div key={person.id} className="person-card">
                  <div className="person-header">
                    <div className="avatar">
                      {person.name[0]}
                    </div>
                    <div className="name-info">
                      <h4>{person.name}</h4>
                      <span>ID: {person.id}</span>
                    </div>
                    <span className="on-time">{person.onTime} অন-টাইম</span>
                  </div>
                  <div className="person-body">
                    <div className="p-info"><FaPhone /> {person.phone}</div>
                    <div className="p-info"><FaTruckFast /> বাহন: {person.vehicle}</div>
                    <div className="p-stats">
                      <div className="p-stat">
                        <span className="s-label">সক্রিয়</span>
                        <span className="s-val">{person.activeTasks}</span>
                      </div>
                      <div className="p-stat">
                        <span className="s-label">সম্পন্ন</span>
                        <span className="s-val">{person.completed}</span>
                      </div>
                    </div>
                  </div>
                  <button className="assign-btn">অর্ডার এসাইন করুন</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="calendar-placeholder">
            <div className="calendar-header">
              <h3>মে ২০২৪</h3>
              <div className="calendar-legend">
                <span><FaCircleDot style={{color: '#4A7C59'}}/> On Time</span>
                <span><FaCircleDot style={{color: '#A0522D'}}/> Delayed</span>
                <span><FaCircleDot style={{color: '#E6D5B8'}}/> Delivered</span>
              </div>
            </div>
            <div className="mock-calendar">
              {[...Array(31)].map((_, i) => (
                <div key={i} className={`calendar-day ${i === 14 ? 'today' : ''}`}>
                  <span className="day-num">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="reports-view">
            <div className="reports-stats">
              <div className="report-card">
                <span className="label">সফল ডেলিভারি (এই মাস)</span>
                <span className="value">0</span>
                <span className="trend positive">0%</span>
              </div>
              <div className="report-card">
                <span className="label">গড় ডেলিভারি সময়</span>
                <span className="value">0 দিন</span>
                <span className="trend positive">0%</span>
              </div>
              <div className="report-card">
                <span className="label">রিটার্ন রেট</span>
                <span className="value">0%</span>
                <span className="trend neutral">0%</span>
              </div>
            </div>

            <div className="performance-ranking">
              <h3>টপ ডেলিভারি পারফর্মার</h3>
              <div className="ranking-list">
                {deliveryPersonnel.map((person, index) => (
                  <div key={person.id} className="rank-item">
                    <span className="rank">#{index + 1}</span>
                    <div className="rank-info">
                      <span className="name">{person.name}</span>
                      <span className="details">{person.completed}টি ডেলিভারি সম্পন্ন</span>
                    </div>
                    <div className="rank-score">
                      <span className="score">{person.onTime}</span>
                      <span className="score-label">অন-টাইম</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10001;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .modal-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: white;
          width: 100%;
          max-width: 420px;
          border-radius: 20px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          position: relative;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .modal-header {
          padding: 20px 30px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ffffff;
        }
        .modal-header h3 { 
          margin: 0; 
          font-size: 18px; 
          color: #1e293b; 
          font-family: 'Noto Sans Bengali', sans-serif;
          font-weight: 700;
        }
        .close-modal { 
          background: #f1f5f9; 
          border: none; 
          width: 32px; 
          height: 32px; 
          border-radius: 8px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: #64748b; 
          cursor: pointer; 
          transition: 0.2s;
        }
        .close-modal:hover { background: #fee2e2; color: #ef4444; }

        .modal-form { display: flex; flex-direction: column; }
        .form-body { padding: 30px; display: flex; flex-direction: column; gap: 20px; }
        
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label { 
          font-size: 13px; 
          font-weight: 600; 
          color: #64748b; 
        }
        .form-group input { 
          padding: 12px 16px; 
          border: 1px solid #e2e8f0; 
          border-radius: 10px; 
          font-size: 14px; 
          transition: all 0.2s ease;
          background: #f8fafc;
          width: 100%;
        }
        .form-group input:focus { 
          border-color: #7C4B2A; 
          background: white;
          outline: none; 
          box-shadow: 0 0 0 4px rgba(124, 75, 42, 0.1); 
        }

        .modal-footer { 
          padding: 20px 30px; 
          background: #f8fafc; 
          border-top: 1px solid #f1f5f9;
          display: flex; 
          justify-content: flex-end; 
          gap: 12px; 
        }
        .cancel-btn { 
          padding: 10px 20px; 
          border-radius: 8px; 
          border: 1px solid #e2e8f0; 
          background: white; 
          color: #64748b; 
          font-weight: 600; 
          cursor: pointer; 
          font-size: 14px;
        }
        .save-btn { 
          padding: 10px 25px; 
          border-radius: 8px; 
          border: none; 
          background: #7C4B2A; 
          color: white; 
          font-weight: 600; 
          cursor: pointer; 
          font-size: 14px;
          transition: 0.2s;
        }
        .save-btn:hover { background: #5a361e; }
        .save-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .reports-view { display: flex; flex-direction: column; gap: 30px; }
        .reports-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .report-card { background: white; padding: 25px; border-radius: 15px; border: 1px solid #eee; display: flex; flex-direction: column; gap: 8px; position: relative; }
        .report-card .label { font-size: 13px; color: #7f8c8d; font-weight: 600; }
        .report-card .value { font-size: 28px; font-weight: 800; color: #2c3e50; }
        .trend { position: absolute; top: 25px; right: 25px; font-size: 12px; font-weight: 700; padding: 4px 8px; border-radius: 6px; }
        .trend.positive { background: #e8f5e9; color: #2e7d32; }
        .trend.negative { background: #ffebee; color: #c62828; }

        .performance-ranking { background: white; border-radius: 15px; border: 1px solid #eee; padding: 25px; }
        .performance-ranking h3 { margin-bottom: 20px; color: #2c3e50; }
        .ranking-list { display: flex; flex-direction: column; gap: 10px; }
        .rank-item { display: flex; align-items: center; gap: 20px; padding: 15px; border-radius: 10px; background: #f8f9fa; transition: 0.2s; }
        .rank-item:hover { background: #f1f3f5; }
        .rank { font-size: 18px; font-weight: 800; color: #7C4B2A; min-width: 30px; }
        .rank-info { flex: 1; display: flex; flex-direction: column; }
        .rank-info .name { font-weight: 700; color: #2c3e50; }
        .rank-info .details { font-size: 12px; color: #7f8c8d; }
        .rank-score { text-align: right; }
        .score { display: block; font-size: 16px; font-weight: 800; color: #27ae60; }
        .score-label { font-size: 10px; color: #95a5a6; font-weight: 700; text-transform: uppercase; }
        .delivery-panel { padding: 20px; }
        .panel-header { margin-bottom: 30px; }
        .header-title h2 { font-size: 24px; color: #2c3e50; margin-bottom: 5px; font-family: 'Noto Sans Bengali', sans-serif; }
        .header-title p { color: #7f8c8d; font-size: 14px; }

        .tab-navigation {
          display: flex;
          gap: 10px;
          border-bottom: 2px solid #eee;
          margin-bottom: 30px;
          overflow-x: auto;
          padding-bottom: 2px;
        }

        .tab-navigation button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          border: none;
          background: none;
          color: #7f8c8d;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          border-bottom: 3px solid transparent;
          transition: 0.3s;
        }

        .tab-navigation button.active {
          color: #7C4B2A;
          border-bottom-color: #7C4B2A;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .add-zone-btn, .add-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #7C4B2A;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .delivery-table { width: 100%; border-collapse: collapse; }
        .delivery-table th { text-align: left; padding: 15px; background: #f8f9fa; color: #7f8c8d; font-size: 13px; }
        .delivery-table td { padding: 15px; border-bottom: 1px solid #eee; }

        .inline-edit { display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .edit-icon { font-size: 12px; color: #3498db; opacity: 0; transition: 0.2s; }
        .inline-edit:hover .edit-icon { opacity: 1; }

        .toggle-pill { padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; background: #f5f5f5; color: #616161; }
        .toggle-pill.active { background: #e8f5e9; color: #2e7d32; }

        .icon-btn { background: none; border: none; padding: 5px; cursor: pointer; font-size: 16px; color: #95a5a6; }
        .icon-btn.delete:hover { color: #e74c3c; }

        .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: #fff; padding: 20px; border-radius: 12px; border: 1px solid #eee; display: flex; flex-direction: column; gap: 5px; }
        .stat-card .label { font-size: 12px; color: #7f8c8d; }
        .stat-card .value { font-size: 24px; font-weight: 800; color: #7C4B2A; }

        .delivery-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 15px;
          background: white;
          border: 1px solid #eee;
          border-radius: 12px;
          margin-bottom: 12px;
        }

        .item-icon { width: 45px; height: 45px; background: #fff8f0; color: #7C4B2A; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
        .item-details { flex: 1; }
        .item-top { display: flex; gap: 15px; align-items: center; margin-bottom: 5px; }
        .order-id { font-weight: 700; color: #2c3e50; }
        .status-pill { font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 3px 8px; border-radius: 5px; }
        .status-pill.in-transit { background: #e3f2fd; color: #1565c0; }
        .status-pill.delivered { background: #e8f5e9; color: #2e7d32; }
        .status-pill.picked-up { background: #fff3e0; color: #e65100; }

        .item-info { display: flex; gap: 20px; font-size: 12px; color: #7f8c8d; }
        .item-info span { display: flex; align-items: center; gap: 5px; }

        .track-btn { padding: 8px 15px; border-radius: 6px; border: 1px solid #7C4B2A; color: #7C4B2A; background: transparent; font-weight: 600; cursor: pointer; font-size: 13px; }

        .personnel-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .person-card { background: white; border: 1px solid #eee; border-radius: 15px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        .person-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
        .avatar { width: 50px; height: 50px; background: #7C4B2A; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; }
        .name-info h4 { margin: 0; font-size: 16px; color: #2c3e50; }
        .name-info span { font-size: 11px; color: #95a5a6; }
        .on-time { margin-left: auto; font-size: 11px; color: #27ae60; font-weight: 700; }

        .person-body { margin-bottom: 20px; }
        .p-info { font-size: 13px; color: #2c3e50; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
        .p-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px; background: #f8f9fa; padding: 10px; border-radius: 8px; }
        .p-stat { display: flex; flex-direction: column; align-items: center; }
        .s-label { font-size: 10px; color: #7f8c8d; text-transform: uppercase; }
        .s-val { font-weight: 700; color: #2c3e50; }

        .assign-btn { width: 100%; padding: 10px; border-radius: 8px; border: none; background: #2c3e50; color: white; font-weight: 600; cursor: pointer; transition: 0.3s; }
        .assign-btn:hover { background: #1a252f; }

        .calendar-placeholder { background: white; border-radius: 15px; border: 1px solid #eee; padding: 25px; }
        .calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .calendar-legend { display: flex; gap: 15px; font-size: 11px; color: #7f8c8d; font-weight: 600; }
        .calendar-legend span { display: flex; align-items: center; gap: 5px; }
        .mock-calendar { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; }
        .calendar-day { min-height: 80px; border: 1px solid #f1f1f1; border-radius: 8px; padding: 10px; position: relative; }
        .calendar-day.today { border-color: #7C4B2A; background: #fff8f0; }
        .day-num { font-weight: 700; color: #bdc3c7; font-size: 14px; }
        .calendar-day.today .day-num { color: #7C4B2A; }
        .delivery-dot { width: 6px; height: 6px; border-radius: 50%; margin-top: 5px; }
        .delivery-dot.green { background: #4A7C59; }
        .delivery-dot.brown { background: #A0522D; }
      `}</style>
    </div>
  );
}
