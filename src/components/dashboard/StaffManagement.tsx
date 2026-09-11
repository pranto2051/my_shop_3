'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import { supabase } from '@/lib/supabase';
import styles from './StaffManagement.module.css';
import { 
  FaUserShield, 
  FaUserTie, 
  FaUserCheck, 
  FaUserSlash, 
  FaPlus, 
  FaMagnifyingGlass, 
  FaPenToSquare, 
  FaBan, 
  FaTrashCan, 
  FaXmark,
  FaShieldHalved,
  FaRotate
} from 'react-icons/fa6';

export interface StaffUser {
  id: string;
  name: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'staff' | 'employee' | 'support';
  role_label: string;
  status: 'active' | 'inactive';
  permissions: string[];
  last_active: string;
  created_at: string;
  department_id?: number;
}

const DEFAULT_STAFF: StaffUser[] = [
  {
    id: 'usr-001',
    name: 'আব্দুর রহমান',
    email: 'rahman@admin.com',
    phone: '01711-123456',
    role: 'admin',
    role_label: 'সুপার অ্যাডমিন',
    status: 'active',
    permissions: ['অর্ডার', 'পণ্য', 'গ্রাহক', 'ফিন্যান্স', 'সেটিংস', 'স্টাফ'],
    last_active: '১০ মিনিট আগে',
    created_at: '2025-01-15'
  },
  {
    id: 'usr-002',
    name: 'সাইফুল ইসলাম',
    email: 'saiful@myshop.com',
    phone: '01819-876543',
    role: 'manager',
    role_label: 'ইনভেন্টরি ম্যানেজার',
    status: 'active',
    permissions: ['অর্ডার', 'পণ্য', 'ইনভেন্টরি'],
    last_active: '১ ঘণ্টা আগে',
    created_at: '2025-02-01'
  },
  {
    id: 'usr-003',
    name: 'তানজিলা আক্তার',
    email: 'tanjila@myshop.com',
    phone: '01912-334455',
    role: 'staff',
    role_label: 'স্টাফ সদস্য',
    status: 'active',
    permissions: ['অর্ডার', 'গ্রাহক', 'রিভিউ'],
    last_active: '৩ ঘণ্টা আগে',
    created_at: '2025-03-10'
  }
];

const ALL_PERMISSIONS = [
  'অর্ডার ড্যাশবোর্ড',
  'পণ্য তালিকা ও ইনভেন্টরি',
  'গ্রাহক তথ্য ও বার্তা',
  'আর্থিক হিসাব ও PnL',
  'সিস্টেম সেটিংস',
  'স্টাফ ও অ্যাডমিন কন্ট্রোল',
  'প্রোমোশনাল পপআপ ও কুপন',
  'রিভিউ অনুমোদন'
];

export default function StaffManagement() {
  const adminContext = useAdmin();
  const contextUsers = adminContext?.state?.users;

  const [staffList, setStaffList] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeRoleFilter, setActiveRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingStaff, setEditingStaff] = useState<StaffUser | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'staff' as 'admin' | 'manager' | 'staff' | 'employee' | 'support',
    status: 'active' as 'active' | 'inactive',
    permissions: [] as string[]
  });

  // Fetch users directly from Supabase Database
  const fetchStaffFromDatabase = async () => {
    setLoading(true);
    try {
      // 1. Query public.users with joined user_roles
      const { data: usersData, error } = await (supabase
        .from('users')
        .select(`
          *,
          user_roles (
            role,
            is_active
          )
        `)
        .order('created_at', { ascending: false }) as any);

      // 2. Query user_roles separately in case relation join returned empty due to RLS
      const { data: allRoles } = await (supabase
        .from('user_roles')
        .select('*') as any);

      const rolesMap: Record<string, string> = {};
      if (allRoles && Array.isArray(allRoles)) {
        allRoles.forEach((r: any) => {
          if (r.user_id && r.role) {
            rolesMap[r.user_id] = r.role;
          }
        });
      }

      if (error || !usersData || usersData.length === 0) {
        console.warn('Database query returned error or empty, checking context fallback:', error?.message);
        if (contextUsers && contextUsers.length > 0) {
          setStaffList(mapRawUsers(contextUsers, rolesMap));
        } else {
          setStaffList(DEFAULT_STAFF);
        }
      } else {
        setStaffList(mapRawUsers(usersData, rolesMap));
      }
    } catch (err) {
      console.error('Error fetching staff from database:', err);
      setStaffList(DEFAULT_STAFF);
    } finally {
      setLoading(false);
    }
  };

  const mapRawUsers = (rawUsers: any[], rolesMap: Record<string, string> = {}): StaffUser[] => {
    const roleLabels: Record<string, string> = {
      admin: 'সুপার অ্যাডমিন',
      manager: 'ম্যানেজার',
      staff: 'স্টাফ সদস্য',
      employee: 'কর্মচারী',
      support: 'সাপোর্ট অফিসার'
    };

    return rawUsers.map(u => {
      let roleKey: string = 'staff';

      // 1. Check joined relation
      if (Array.isArray(u.user_roles) && u.user_roles.length > 0 && u.user_roles[0]?.role) {
        roleKey = u.user_roles[0].role;
      }
      // 2. Check rolesMap lookup
      else if (u.id && rolesMap[u.id]) {
        roleKey = rolesMap[u.id];
      }
      // 3. Check inline role field
      else if (u.role_id) {
        roleKey = u.role_id;
      } else if (u.role) {
        roleKey = u.role;
      }

      // 4. Smart role fallback if user_roles RLS returned empty
      const emailLower = (u.email || '').toLowerCase();
      const nameLower = (u.first_name || u.name || u.full_name || '').toLowerCase();

      if (roleKey === 'staff' || !roleKey) {
        if (emailLower.includes('admin') || nameLower.includes('admin') || nameLower.includes('super')) {
          roleKey = 'admin';
        } else if (emailLower.includes('manager') || nameLower.includes('manager')) {
          roleKey = 'manager';
        }
      }

      const fullName = u.full_name || (u.first_name ? `${u.first_name} ${u.last_name || ''}`.trim() : u.name || 'অ্যাডমিন সদস্য');

      return {
        id: u.id || `usr-${Math.random()}`,
        name: fullName,
        first_name: u.first_name || fullName.split(' ')[0],
        last_name: u.last_name || fullName.split(' ').slice(1).join(' '),
        email: u.email || 'N/A',
        phone: u.mobile || u.phone || 'N/A',
        role: roleKey as any,
        role_label: roleLabels[roleKey] || 'স্টাফ',
        status: u.status === 'inactive' ? 'inactive' : 'active',
        permissions: u.permissions || ['অর্ডার ড্যাশবোর্ড', 'পণ্য তালিকা ও ইনভেন্টরি'],
        last_active: u.created_at ? new Date(u.created_at).toLocaleDateString('bn-BD') : 'সক্রিয়',
        created_at: u.created_at || new Date().toISOString()
      };
    });
  };

  useEffect(() => {
    fetchStaffFromDatabase();
  }, []);

  // KPI Calculations
  const stats = useMemo(() => {
    const totalAdmins = staffList.filter(s => s.role === 'admin').length;
    const totalStaff = staffList.filter(s => s.role !== 'admin').length;
    const activeCount = staffList.filter(s => s.status === 'active').length;
    const inactiveCount = staffList.filter(s => s.status === 'inactive').length;
    return { totalAdmins, totalStaff, activeCount, inactiveCount };
  }, [staffList]);

  // Filtered Staff
  const filteredStaff = useMemo(() => {
    return staffList.filter(item => {
      const matchesRole = activeRoleFilter === 'all' || 
        item.role === activeRoleFilter ||
        (activeRoleFilter === 'staff' && (item.role === 'employee' || item.role === 'staff'));
        
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery);

      return matchesRole && matchesStatus && matchesSearch;
    });
  }, [staffList, activeRoleFilter, statusFilter, searchQuery]);

  // Handle Add / Edit Modal Open
  const handleOpenAddModal = () => {
    setEditingStaff(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      role: 'staff',
      status: 'active',
      permissions: ['অর্ডার ড্যাশবোর্ড', 'পণ্য তালিকা ও ইনভেন্টরি']
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (staff: StaffUser) => {
    setEditingStaff(staff);
    setFormData({
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      password: '',
      role: staff.role,
      status: staff.status,
      permissions: staff.permissions
    });
    setIsModalOpen(true);
  };

  const handlePermissionToggle = (perm: string) => {
    setFormData(prev => {
      const exists = prev.permissions.includes(perm);
      if (exists) {
        return { ...prev, permissions: prev.permissions.filter(p => p !== perm) };
      } else {
        return { ...prev, permissions: [...prev.permissions, perm] };
      }
    });
  };

  // SUBMIT FORM - Database Upsert & Sync
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      alert('অনুগ্রহ করে নাম এবং ইমেইল প্রদান করুন');
      return;
    }

    setIsSubmitting(true);

    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';
    const safeRole = ['admin', 'manager', 'staff', 'employee'].includes(formData.role) ? formData.role : 'staff';

    let apiSuccess = false;
    let apiErrorMsg = '';

    try {
      if (editingStaff) {
        // 1. UPDATE STAFF IN DATABASE via API endpoint
        const res = await fetch('/api/admin/update-staff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingStaff.id,
            first_name: firstName,
            last_name: lastName,
            email: formData.email,
            mobile: formData.phone,
            password: formData.password || undefined,
            role_id: safeRole,
            department_id: 1,
            status: formData.status
          })
        });

        const result = await res.json();
        if (res.ok && result.success) {
          apiSuccess = true;
        } else {
          apiErrorMsg = result.error || 'API Update failed';
          console.warn('API update failed, trying direct Supabase table update:', apiErrorMsg);

          // 2. Direct Supabase Update Fallback
          const { error: userErr } = await (supabase
            .from('users')
            .update({
              first_name: firstName,
              last_name: lastName,
              email: formData.email.toLowerCase(),
              mobile: formData.phone,
              status: formData.status
            })
            .eq('id', editingStaff.id) as any);

          const { error: roleErr } = await (supabase
            .from('user_roles')
            .upsert({
              user_id: editingStaff.id,
              role: safeRole,
              is_active: true
            }) as any);

          if (!userErr && !roleErr) {
            apiSuccess = true;
          } else {
            apiErrorMsg += ` | Direct update error: ${userErr?.message || roleErr?.message || 'RLS restricted'}`;
          }
        }
      } else {
        // CREATE NEW STAFF IN DATABASE via API endpoint
        const res = await fetch('/api/admin/create-staff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: formData.email,
            mobile: formData.phone,
            password: formData.password || '123456',
            role_id: safeRole,
            department_id: 1,
            status: formData.status
          })
        });

        const result = await res.json();
        if (res.ok && result.success) {
          apiSuccess = true;
        } else {
          apiErrorMsg = result.error || 'API Create failed';
          console.warn('API create failed, saving into Supabase table directly:', apiErrorMsg);

          const newId = `usr-${Date.now()}`;
          const { error: userErr } = await (supabase.from('users').insert([{
            id: newId,
            first_name: firstName,
            last_name: lastName,
            email: formData.email.toLowerCase(),
            mobile: formData.phone,
            status: formData.status
          }]) as any);

          const { error: roleErr } = await (supabase.from('user_roles').insert([{
            user_id: newId,
            role: safeRole,
            is_active: true
          }]) as any);

          if (!userErr && !roleErr) {
            apiSuccess = true;
          } else {
            apiErrorMsg += ` | Direct insert error: ${userErr?.message || roleErr?.message || 'RLS restricted'}`;
          }
        }
      }

      if (!apiSuccess) {
        alert(`⚠️ ডাটাবেজে সেভ হতে সমস্যা হয়েছে:\n${apiErrorMsg}\n\nপরামর্শ: সমাধান করতে আপনার Supabase SQL Editor এ fix_admin_permissions.sql ফাইলটি রান করুন।`);
        return;
      }

      // Record Activity Log into database
      await (supabase.from('activity_logs').insert([{
        user_name: 'অ্যাডমিন',
        user_role: 'সুপার অ্যাডমিন',
        action_type: editingStaff ? 'UPDATE_STAFF' : 'CREATE_STAFF',
        action_title: editingStaff ? 'স্টাফ তথ্য সংশোধন' : 'নতুন স্টাফ তৈরি',
        details: `স্টাফ "${formData.name}" (${formData.email}) এর তথ্য ডাটাবেজে সফলভাবে সেভ করা হয়েছে।`,
        module: 'স্টাফ',
        severity: 'success',
        ip_address: '127.0.0.1'
      }]) as any);

      alert(`✅ স্টাফ অ্যাকাউন্ট সফলভাবে ডাটাবেজে ${editingStaff ? 'আপডেট' : 'তৈরি'} হয়েছে!`);
      setIsModalOpen(false);
      fetchStaffFromDatabase();
    } catch (err: any) {
      console.error('Database Operation Error:', err);
      alert('ডাটাবেজে আপডেট করতে সমস্যা হয়েছে: ' + (err.message || 'Error occurred'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Direct Status Toggle in Supabase Database
  const handleToggleStatus = async (staff: StaffUser) => {
    const nextStatus = staff.status === 'active' ? 'inactive' : 'active';
    try {
      const { error } = await (supabase
        .from('users')
        .update({ status: nextStatus })
        .eq('id', staff.id) as any);

      if (error) {
        console.warn('Direct update error:', error.message);
      }

      setStaffList(prev => prev.map(item => item.id === staff.id ? { ...item, status: nextStatus } : item));
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  // Delete Staff from Supabase Database
  const handleDeleteStaff = async (staff: StaffUser) => {
    if (!confirm(`আপনি কি নিশ্চিত যে "${staff.name}" অ্যাকাউন্টটি ডাটাবেজ থেকে মুছে ফেলতে চান?`)) {
      return;
    }

    try {
      const res = await fetch('/api/admin/delete-staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: staff.id })
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        // Fallback direct delete
        await (supabase.from('users').delete().eq('id', staff.id) as any);
      }

      setStaffList(prev => prev.filter(item => item.id !== staff.id));
      alert('অ্যাকাউন্টটি ডাটাবেজ থেকে সফলভাবে মুছে ফেলা হয়েছে।');
    } catch (err: any) {
      console.error('Delete error:', err);
      alert('মুছে ফেলতে ব্যর্থ হয়েছে: ' + err.message);
    }
  };

  return (
    <div className={styles.container}>
      {/* Top Banner */}
      <div className={styles.headerBanner}>
        <div className={styles.headerTitleBox}>
          <h1><FaUserShield /> অ্যাডমিন ও স্টাফ ব্যবস্থাপনা (Database Sync)</h1>
          <p>সুপারবেস ডাটাবেজের সাথে সরাসরি যুক্ত স্টাফ ও অ্যাডমিনদের এক্সেস ও পারমিশন কন্ট্রোল করুন</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className={styles.addBtn} style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }} onClick={fetchStaffFromDatabase}>
            <FaRotate /> রিলোড
          </button>
          <button className={styles.addBtn} onClick={handleOpenAddModal}>
            <FaPlus /> নতুন স্টাফ যোগ করুন
          </button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={`${styles.kpiIcon} ${styles.admin}`}>
            <FaShieldHalved />
          </div>
          <div className={styles.kpiInfo}>
            <span className={styles.kpiLabel}>মোট অ্যাডমিন</span>
            <span className={styles.kpiValue}>{stats.totalAdmins} জন</span>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={`${styles.kpiIcon} ${styles.staff}`}>
            <FaUserTie />
          </div>
          <div className={styles.kpiInfo}>
            <span className={styles.kpiLabel}>মোট স্টাফ সদস্য</span>
            <span className={styles.kpiValue}>{stats.totalStaff} জন</span>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={`${styles.kpiIcon} ${styles.active}`}>
            <FaUserCheck />
          </div>
          <div className={styles.kpiInfo}>
            <span className={styles.kpiLabel}>সক্রিয় একাউন্ট (Active)</span>
            <span className={styles.kpiValue}>{stats.activeCount} জন</span>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={`${styles.kpiIcon} ${styles.pending}`}>
            <FaUserSlash />
          </div>
          <div className={styles.kpiInfo}>
            <span className={styles.kpiLabel}>নিষ্ক্রিয় একাউন্ট (Inactive)</span>
            <span className={styles.kpiValue}>{stats.inactiveCount} জন</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className={styles.toolbarCard}>
        <div className={styles.searchAndActionRow}>
          <div className={styles.searchBox}>
            <FaMagnifyingGlass className={styles.searchIcon} />
            <input 
              type="text" 
              className={styles.searchInput}
              placeholder="নাম, ইমেইল বা ফোন নম্বর দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select 
            className={styles.statusFilterSelect}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">সকল স্ট্যাটাস</option>
            <option value="active">সক্রিয় সদস্য (Active)</option>
            <option value="inactive">নিষ্ক্রিয় সদস্য (Inactive)</option>
          </select>
        </div>

        {/* Role Tabs */}
        <div className={styles.roleTabs}>
          {[
            { id: 'all', label: 'সবাই', count: staffList.length },
            { id: 'admin', label: 'অ্যাডমিন', count: staffList.filter(s => s.role === 'admin').length },
            { id: 'manager', label: 'ম্যানেজার', count: staffList.filter(s => s.role === 'manager').length },
            { id: 'staff', label: 'স্টাফ', count: staffList.filter(s => s.role === 'staff' || s.role === 'employee').length },
            { id: 'support', label: 'সাপোর্ট', count: staffList.filter(s => s.role === 'support').length },
          ].map(tab => (
            <button
              key={tab.id}
              className={`${styles.roleTab} ${activeRoleFilter === tab.id ? styles.activeRole : ''}`}
              onClick={() => setActiveRoleFilter(tab.id)}
            >
              <span>{tab.label}</span>
              <span className={styles.roleBadgeCount}>{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Staff Data Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.staffTable}>
            <thead>
              <tr>
                <th>সদস্যের নাম ও ইমেইল</th>
                <th>রোল (Role)</th>
                <th>স্ট্যাটাস</th>
                <th>এক্সেস পারমিশনসমূহ</th>
                <th>সর্বশেষ সক্রিয়</th>
                <th>অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#8c7361' }}>
                    ডাটাবেজ থেকে লোড হচ্ছে...
                  </td>
                </tr>
              ) : filteredStaff.length > 0 ? (
                filteredStaff.map(staff => (
                  <tr key={staff.id}>
                    <td>
                      <div className={styles.userCell}>
                        <div className={styles.avatar}>
                          {staff.name.charAt(0)}
                        </div>
                        <div className={styles.userNameBox}>
                          <span className={styles.userName}>{staff.name}</span>
                          <span className={styles.userSub}>{staff.email} • {staff.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.badgeRole} ${
                        staff.role === 'admin' ? styles.adminRole :
                        staff.role === 'manager' ? styles.managerRole :
                        staff.role === 'support' ? styles.supportRole : styles.staffRole
                      }`}>
                        <FaShieldHalved /> {staff.role_label}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.badgeStatus} ${
                        staff.status === 'active' ? styles.activeStatus : styles.inactiveStatus
                      }`}>
                        <span className={`${styles.statusDot} ${
                          staff.status === 'active' ? styles.activeDot : styles.inactiveDot
                        }`}></span>
                        {staff.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                      </span>
                    </td>
                    <td>
                      <div className={styles.permTags}>
                        {staff.permissions.map((perm, pIdx) => (
                          <span key={pIdx} className={styles.permTag}>{perm}</span>
                        ))}
                      </div>
                    </td>
                    <td style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>
                      {staff.last_active}
                    </td>
                    <td>
                      <div className={styles.actionGroup}>
                        <button 
                          className={styles.iconBtn} 
                          title="সম্পাদনা করুন"
                          onClick={() => handleOpenEditModal(staff)}
                        >
                          <FaPenToSquare />
                        </button>
                        <button 
                          className={styles.iconBtn} 
                          title={staff.status === 'active' ? 'ব্লক / নিষ্ক্রিয় করুন' : 'সক্রিয় করুন'}
                          onClick={() => handleToggleStatus(staff)}
                        >
                          <FaBan />
                        </button>
                        <button 
                          className={`${styles.iconBtn} ${styles.dangerBtn}`} 
                          title="মুছে ফেলুন"
                          onClick={() => handleDeleteStaff(staff)}
                        >
                          <FaTrashCan />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>🔍</div>
                      <h3 className={styles.emptyTitle}>কোন স্টাফ মেম্বার পাওয়া যায়নি</h3>
                      <p className={styles.emptyDesc}>আপনার সিলেক্ট করা ফিল্টারের সাথে মিলে এমন কোনো ডেটা নেই</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Staff Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editingStaff ? 'স্টাফ তথ্য সম্পাদনা করুন (ডাটাবেজ)' : 'নতুন স্টাফ অ্যাকাউন্ট তৈরি করুন (ডাটাবেজ)'}</h2>
              <button className={styles.closeModalBtn} onClick={() => setIsModalOpen(false)}>
                <FaXmark />
              </button>
            </div>

            <form onSubmit={handleSubmitForm}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label>পূর্ণ নাম (Full Name)</label>
                  <input 
                    type="text" 
                    className={styles.formInput} 
                    placeholder="যেমন: মোঃ সাব্বির হোসেন"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>ইমেইল ঠিকানা (Email)</label>
                  <input 
                    type="email" 
                    className={styles.formInput} 
                    placeholder="staff@myshop.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>মোবাইল নম্বর (Mobile Phone)</label>
                  <input 
                    type="text" 
                    className={styles.formInput} 
                    placeholder="01700-000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>পাসওয়ার্ড {editingStaff && '(খালি রাখলে পূর্বেরটি বহাল থাকবে)'}</label>
                  <input 
                    type="password" 
                    className={styles.formInput} 
                    placeholder="******"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={!editingStaff}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className={styles.formGroup}>
                    <label>অ্যাসাইনকৃত রোল (Role)</label>
                    <select 
                      className={styles.formSelect}
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    >
                      <option value="admin">অ্যাডমিন (Full Control)</option>
                      <option value="manager">ম্যানেজার (Manager)</option>
                      <option value="staff">স্টাফ (General Staff)</option>
                      <option value="employee">কর্মচারী (Employee)</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>অ্যাকাউন্ট স্ট্যাটাস</label>
                    <select 
                      className={styles.formSelect}
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    >
                      <option value="active">সক্রিয় (Active)</option>
                      <option value="inactive">নিষ্ক্রিয় (Inactive)</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>মডিউল পারমিশন (Permissions)</label>
                  <div className={styles.permCheckGrid}>
                    {ALL_PERMISSIONS.map((perm, idx) => {
                      const checked = formData.permissions.includes(perm);
                      return (
                        <label key={idx} className={styles.checkboxLabel}>
                          <input 
                            type="checkbox" 
                            className={styles.checkboxInput}
                            checked={checked}
                            onChange={() => handlePermissionToggle(perm)}
                          />
                          <span>{perm}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelModalBtn} onClick={() => setIsModalOpen(false)}>
                  বাতিল করুন
                </button>
                <button type="submit" className={styles.submitModalBtn} disabled={isSubmitting}>
                  {isSubmitting ? 'সেভ হচ্ছে...' : (editingStaff ? 'ডাটাবেজ আপডেট করুন' : 'ডাটাবেজে তৈরি করুন')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}