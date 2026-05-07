'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import { supabase } from '@/lib/supabase';
import ConfirmModal from '../ConfirmModal';
import { 
  FaStore, 
  FaCamera, 
  FaLocationDot, 
  FaPhone, 
  FaEnvelope, 
  FaWhatsapp,
  FaClock,
  FaGlobe,
  FaFloppyDisk,
  FaArrowRotateRight,
  FaCircleInfo
} from 'react-icons/fa6';

export default function StoreProfilePanel() {
  const { state, dispatch } = useAdmin();
  const { shopInfo } = state;
  const [formData, setFormData] = useState(shopInfo || {
    name: 'M.A Furniture',
    tagline: '',
    website: '',
    contactLabel: 'যোগাযোগ করুন',
    showroomAddress: { label: 'শোরুমের ঠিকানা', address: 'মিরপুর ১০, ঢাকা' },
    callNumbers: { label: 'ফোন করুন', numbers: ['01700112233'] },
    whatsapp: { label: 'হোয়াটসঅ্যাপ', number: '01700112233' },
    email: { label: 'ইমেইল', address: 'info@mafurniture.com' },
    openingHours: { label: 'খোলা থাকার সময়', schedule: ['শনি - বৃহস্পতি: সকাল ১০টা - রাত ৮টা'] }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'confirm'
  });

  const handleChange = (e, field, subfield = null, index = null) => {
    const value = e.target.value;
    setFormData(prev => {
      if (index !== null && subfield) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [subfield]: prev[field][subfield].map((item, i) => i === index ? value : item)
          }
        };
      } else if (subfield) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [subfield]: value
          }
        };
      } else {
        return {
          ...prev,
          [field]: value
        };
      }
    });
  };

  const handleSaveClick = () => {
    setConfirmModal({
      isOpen: true,
      title: 'প্রোফাইল আপডেট নিশ্চিত করুন',
      message: 'আপনি কি নিশ্চিত যে আপনি দোকানের তথ্য পরিবর্তন করতে চান?',
      type: 'confirm'
    });
  };

  const handleConfirmSave = async () => {
    setConfirmModal({ ...confirmModal, isOpen: false });
    setIsSaving(true);

    const dbData = {
      name: formData.name,
      showroom_address: formData.showroomAddress.address,
      call_numbers: formData.callNumbers.numbers,
      whatsapp_number: formData.whatsapp.number,
      email_address: formData.email.address,
      opening_hours_schedule: formData.openingHours.schedule,
    };

    try {
      const { error } = await supabase
        .from('shop_info')
        .update(dbData)
        .eq('id', shopInfo?.id || 1);

      if (error) throw error;

      dispatch({ type: 'UPDATE_SHOP_INFO', payload: formData });
      setConfirmModal({
        isOpen: true,
        title: 'সফল!',
        message: 'দোকানের তথ্য সফলভাবে আপডেট হয়েছে!',
        type: 'success'
      });
    } catch (err) {
      console.error('Error updating shop info:', err);
      setConfirmModal({
        isOpen: true,
        title: 'ত্রুটি!',
        message: 'তথ্য আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।',
        type: 'confirm'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="store-profile-panel">
      <div className="panel-header">
        <div className="header-title">
          <h2>Store Profile</h2>
          <p>আপনার দোকানের পাবলিক তথ্য এবং যোগাযোগের বিবরণ আপডেট করুন</p>
        </div>
        <div className="header-actions">
          <button className="reset-btn" onClick={() => setFormData(shopInfo)} disabled={isSaving}><FaArrowRotateRight /> বাতিল</button>
          <button className="save-btn" onClick={handleSaveClick} disabled={isSaving}><FaFloppyDisk /> {isSaving ? 'সেভ হচ্ছে...' : 'পরিবর্তন সেভ করুন'}</button>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-sidebar">
          <div className="store-card">
            <div className="logo-upload">
              <div className="logo-placeholder">
                <FaStore />
              </div>
              <button className="cam-btn"><FaCamera /></button>
            </div>
            <h3>{formData.name}</h3>
            <span className="store-type">Premium Furniture Store</span>
            <div className="store-badges">
              <span className="badge">Verified</span>
              <span className="badge">Active</span>
            </div>
          </div>
          
          <div className="quick-preview">
            <h4>ওয়েবসাইট প্রিভিউ</h4>
            <div className="preview-card">
              <p><strong>{formData.name}</strong></p>
              <p className="p-addr"><FaLocationDot /> {formData.showroomAddress.address}</p>
              <p className="p-phone"><FaPhone /> {formData.callNumbers.numbers[0]}</p>
            </div>
          </div>
        </div>

        <div className="profile-form-main">
          <div className="form-section">
            <div className="section-title">
              <FaCircleInfo className="i" /> 
              <h3>সাধারণ তথ্য</h3>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>দোকানের নাম</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => handleChange(e, 'name')} 
                />
              </div>
              <div className="form-group">
                <label>ট্যাগলাইন (ঐচ্ছিক)</label>
                <input 
                  type="text" 
                  placeholder="সেরা মানের ফার্নিচার..." 
                  value={formData.tagline || ''}
                  onChange={(e) => handleChange(e, 'tagline')}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-title">
              <FaLocationDot className="i" /> 
              <h3>ঠিকানা ও অবস্থান</h3>
            </div>
            <div className="form-group full">
              <label>শোরুমের ঠিকানা</label>
              <textarea 
                rows="3" 
                value={formData.showroomAddress.address}
                onChange={(e) => handleChange(e, 'showroomAddress', 'address')}
              ></textarea>
            </div>
          </div>

          <div className="form-section">
            <div className="section-title">
              <FaPhone className="i" /> 
              <h3>যোগাযোগের মাধ্যম</h3>
            </div>
            <div className="form-grid-2">
              <div className="form-group">
                <label>প্রাইমারি ফোন নম্বর</label>
                <div className="input-with-icon">
                  <FaPhone />
                  <input 
                    type="text" 
                    value={formData.callNumbers.numbers[0]} 
                    onChange={(e) => handleChange(e, 'callNumbers', 'numbers', 0)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>হোয়াটসঅ্যাপ নম্বর</label>
                <div className="input-with-icon">
                  <FaWhatsapp />
                  <input 
                    type="text" 
                    value={formData.whatsapp.number} 
                    onChange={(e) => handleChange(e, 'whatsapp', 'number')}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>ইমেইল অ্যাড্রেস</label>
                <div className="input-with-icon">
                  <FaEnvelope />
                  <input 
                    type="email" 
                    value={formData.email.address} 
                    onChange={(e) => handleChange(e, 'email', 'address')}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>ওয়েবসাইট লিঙ্ক</label>
                <div className="input-with-icon">
                  <FaGlobe />
                  <input 
                    type="text" 
                    placeholder="https://..." 
                    value={formData.website || ''}
                    onChange={(e) => handleChange(e, 'website')}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-title">
              <FaClock className="i" /> 
              <h3>অফিস সময়</h3>
            </div>
            <div className="form-group full">
              <label>সময়সূচী (বাংলায়)</label>
              <input 
                type="text" 
                value={formData.openingHours.schedule[0]} 
                onChange={(e) => handleChange(e, 'openingHours', 'schedule', 0)}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
        confirmText={confirmModal.type === 'success' ? 'ঠিক আছে' : 'হ্যাঁ, সেভ করুন'}
        cancelText="বাতিল"
        onConfirm={confirmModal.type === 'success' ? () => setConfirmModal({ ...confirmModal, isOpen: false }) : handleConfirmSave}
        onCancel={confirmModal.type === 'success' ? null : () => setConfirmModal({ ...confirmModal, isOpen: false })}
      />

      <style jsx>{`
        .store-profile-panel { padding: 20px; }
        .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .header-title h2 { font-size: 24px; color: #2c3e50; font-family: 'Noto Sans Bengali', sans-serif; }
        .header-title p { color: #7f8c8d; font-size: 14px; }
        .header-actions { display: flex; gap: 10px; }
        .save-btn { background: #7C4B2A; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .reset-btn { background: white; color: #7f8c8d; border: 1px solid #ddd; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }

        .profile-grid { display: grid; grid-template-columns: 300px 1fr; gap: 30px; }
        
        .store-card { background: white; border: 1px solid #eee; border-radius: 20px; padding: 30px; text-align: center; margin-bottom: 25px; }
        .logo-upload { position: relative; width: 100px; height: 100px; margin: 0 auto 20px; }
        .logo-placeholder { width: 100%; height: 100%; background: #f8f9fa; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; color: #7C4B2A; border: 2px dashed #ddd; }
        .cam-btn { position: absolute; bottom: 0; right: 0; width: 32px; height: 32px; background: #7C4B2A; color: white; border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .store-card h3 { font-size: 18px; color: #2c3e50; margin-bottom: 5px; }
        .store-type { font-size: 12px; color: #95a5a6; display: block; margin-bottom: 15px; }
        .store-badges { display: flex; justify-content: center; gap: 8px; }
        .badge { font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; background: #e8f5e9; color: #2e7d32; }

        .quick-preview { background: #f8f9fa; border-radius: 15px; padding: 20px; }
        .quick-preview h4 { font-size: 13px; color: #7f8c8d; margin-bottom: 15px; text-transform: uppercase; }
        .preview-card { background: white; padding: 15px; border-radius: 10px; border: 1px solid #eee; font-size: 13px; }
        .preview-card p { margin-bottom: 8px; color: #2c3e50; }
        .preview-card .p-addr, .preview-card .p-phone { font-size: 11px; color: #7f8c8d; display: flex; align-items: center; gap: 6px; }

        .profile-form-main { background: white; border-radius: 20px; border: 1px solid #eee; padding: 40px; }
        .form-section { margin-bottom: 40px; }
        .section-title { display: flex; align-items: center; gap: 12px; margin-bottom: 25px; padding-bottom: 10px; border-bottom: 1px solid #f8f9fa; }
        .section-title .i { font-size: 18px; color: #7C4B2A; }
        .section-title h3 { font-size: 16px; color: #2c3e50; margin: 0; }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
        .form-group.full { grid-column: span 2; }
        .form-group label { font-size: 13px; font-weight: 700; color: #34495e; }
        .form-group input, .form-group textarea { padding: 12px 15px; border: 1px solid #eee; border-radius: 10px; font-size: 14px; background: #fafafa; transition: 0.3s; }
        .form-group input:focus, .form-group textarea:focus { border-color: #7C4B2A; background: white; outline: none; }
        
        .input-with-icon { position: relative; }
        .input-with-icon :global(svg) { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #bdc3c7; font-size: 14px; }
        .input-with-icon input { padding-left: 45px; width: 100%; }
      `}</style>
    </div>
  );
}
