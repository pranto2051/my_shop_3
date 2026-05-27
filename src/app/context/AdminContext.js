'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { fetchAllData } from '@/lib/dataFetcher';
import { supabase } from '@/lib/supabase';

const AdminContext = createContext();

const initialState = {
  orders: [],
  orderStages: [],
  editingOrder: null,
  orderFilter: 'all',
  orderSearch: '',
  products: [],
  categories: [],
  designs: [],
  gallery: [],
  shopInfo: null,
  customers: [],
  transactions: [],
  notifications: [],
  deliveryPersonnel: [],
  reviews: [],
  deliveryZones: [],
  deliveryLocations: [],
  tasks: [],
  announcements: [],
  promotionalPopups: [],
  pageConfigs: [],
  users: [],
  departments: [],
  orderDateFilter: {
    day: '',
    month: '',
    year: ''
  },
  settings: {
    showAdminHeader: false,
    showAdminFooter: false,
  },
  toast: {
    show: false,
    message: '',
    type: 'success'
  }
};

function adminReducer(state, action) {
  switch (action.type) {
    case 'SET_ALL_DATA':
      return {
        ...state,
        orders: action.payload.orders || [],
        orderStages: action.payload.orderStages || [],
        products: action.payload.products || [],
        categories: action.payload.categories || [],
        designs: action.payload.designs || [],
        gallery: action.payload.gallery || [],
        shopInfo: action.payload.shopInfo || null,
        customers: action.payload.customers || [],
        transactions: action.payload.transactions || [],
        notifications: action.payload.notifications || [],
        deliveryPersonnel: action.payload.deliveryPersonnel || [],
        reviews: action.payload.reviews || [],
        deliveryZones: action.payload.deliveryZones || [],
        deliveryLocations: action.payload.deliveryLocations || [],
        tasks: action.payload.tasks || [],
        announcements: action.payload.announcements || [],
        promotionalPopups: action.payload.promotionalPopups || [],
        pageConfigs: action.payload.pageConfigs || [],
        users: action.payload.users || [],
        departments: action.payload.departments || [],
      };

    case 'UPDATE_SETTINGS':
      const newSettings = { ...state.settings, ...action.payload };
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_settings', JSON.stringify(newSettings));
      }
      return {
        ...state,
        settings: newSettings,
      };
    case 'SET_INITIAL_DATA':
      return {
        ...state,
        products: action.payload.products,
        categories: action.payload.categories,
      };

    case 'CREATE_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };

    case 'UPDATE_ORDER_STAGE':
      return {
        ...state,
        orders: state.orders.map(order => 
          order.id === action.payload.orderId 
            ? { 
                ...order, 
                currentStageId: action.payload.stageId,
                currentStageIndex: action.payload.stageIndex,
                updatedAt: new Date().toISOString()
              } 
            : order
        ),
      };

    case 'ADD_STAGE_HISTORY':
      return {
        ...state,
        orders: state.orders.map(order => 
          order.id === action.payload.orderId 
            ? { 
                ...order, 
                stageHistory: [...order.stageHistory, action.payload.historyItem],
                updatedAt: new Date().toISOString()
              } 
            : order
        ),
      };

    case 'UPDATE_ORDER_INFO':
      return {
        ...state,
        orders: state.orders.map(order => 
          order.id === action.payload.orderId 
            ? { ...order, ...action.payload.updatedInfo, updatedAt: new Date().toISOString() } 
            : order
        ),
      };

    case 'ADD_PAYMENT_HISTORY':
      return {
        ...state,
        orders: state.orders.map(order => 
          order.id === action.payload.orderId 
            ? { 
                ...order, 
                advancePaid: (order.advancePaid || 0) + action.payload.amount,
                remainingAmount: Math.max(0, order.totalPrice - ((order.advancePaid || 0) + action.payload.amount)),
                paymentHistory: [
                  ...(order.paymentHistory || []),
                  {
                    id: Date.now().toString(),
                    amount: action.payload.amount,
                    date: new Date().toISOString(),
                    note: action.payload.note || 'পেমেন্ট সংগ্রহ করা হয়েছে'
                  }
                ],
                updatedAt: new Date().toISOString()
              } 
            : order
        ),
      };

    case 'CANCEL_ORDER':
      return {
        ...state,
        orders: state.orders.map(order => 
          order.id === action.payload.orderId 
            ? { 
                ...order, 
                status: 'cancelled', 
                currentStageId: 'stage_010', // Assuming stage_010 is Cancelled
                updatedAt: new Date().toISOString() 
              } 
            : order
        ),
      };

    case 'DELETE_ORDER':
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload),
      };

    case 'ADD_ORDER_STAGE':
      return {
        ...state,
        orderStages: [...state.orderStages, action.payload].sort((a, b) => a.order - b.order),
      };

    case 'UPDATE_ORDER_STAGE_DEF':
      return {
        ...state,
        orderStages: state.orderStages.map(stage => 
          stage.id === action.payload.id ? action.payload : stage
        ).sort((a, b) => a.order - b.order),
      };

    case 'DELETE_ORDER_STAGE':
      return {
        ...state,
        orderStages: state.orderStages.filter(stage => stage.id !== action.payload),
      };

    case 'REORDER_STAGES':
      return {
        ...state,
        orderStages: action.payload,
      };

    case 'SET_EDITING_ORDER':
      return {
        ...state,
        editingOrder: action.payload,
      };

    case 'SET_ORDER_FILTER':
      return {
        ...state,
        orderFilter: action.payload,
      };

    case 'SET_ORDER_SEARCH':
      return {
        ...state,
        orderSearch: action.payload,
      };

    case 'SET_ORDER_DATE_FILTER':
      return {
        ...state,
        orderDateFilter: action.payload,
      };

    // Designs actions
    case 'ADD_DESIGN':
      return {
        ...state,
        designs: [action.payload, ...state.designs],
      };
    case 'UPDATE_DESIGN':
      return {
        ...state,
        designs: state.designs.map(d => d.id === action.payload.id ? action.payload : d),
      };
    case 'DELETE_DESIGN':
      return {
        ...state,
        designs: state.designs.filter(d => d.id !== action.payload),
      };

    // Gallery actions
    case 'ADD_GALLERY_ITEM':
      return {
        ...state,
        gallery: [action.payload, ...state.gallery],
      };
    case 'UPDATE_GALLERY_ITEM':
      return {
        ...state,
        gallery: state.gallery.map(g => g.id === action.payload.id ? action.payload : g),
      };
    case 'DELETE_GALLERY_ITEM':
      return {
        ...state,
        gallery: state.gallery.filter(g => g.id !== action.payload),
      };

    case 'ADD_DELIVERY_ZONE':
      return {
        ...state,
        deliveryZones: [action.payload, ...state.deliveryZones],
      };
    case 'DELETE_DELIVERY_ZONE':
      return {
        ...state,
        deliveryZones: state.deliveryZones.filter(z => z.id !== action.payload),
      };

    case 'UPDATE_SHOP_INFO':
      return {
        ...state,
        shopInfo: action.payload,
      };

    // Task actions
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload].sort((a, b) => new Date(a.date) - new Date(b.date)),
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload),
      };

    // Announcement actions
    case 'ADD_ANNOUNCEMENT':
      return {
        ...state,
        announcements: [action.payload, ...state.announcements],
      };
    case 'UPDATE_ANNOUNCEMENT':
      return {
        ...state,
        announcements: state.announcements.map(a => a.id === action.payload.id ? action.payload : a),
      };
    case 'DELETE_ANNOUNCEMENT':
      return {
        ...state,
        announcements: state.announcements.filter(a => a.id !== action.payload),
      };

    case 'ADD_PROMOTIONAL_POPUP':
      return {
        ...state,
        promotionalPopups: [action.payload, ...state.promotionalPopups],
      };
    case 'UPDATE_PROMOTIONAL_POPUP':
      return {
        ...state,
        promotionalPopups: state.promotionalPopups.map(p => p.id === action.payload.id ? action.payload : p),
      };
    case 'DELETE_PROMOTIONAL_POPUP':
      return {
        ...state,
        promotionalPopups: state.promotionalPopups.filter(p => p.id !== action.payload),
      };

    case 'ADD_USER':
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(u => u.id === action.payload.id ? action.payload : u),
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(u => u.id !== action.payload),
      };

    case 'SHOW_TOAST':
      return {
        ...state,
        toast: {
          show: true,
          message: action.payload.message,
          type: action.payload.type || 'success'
        }
      };

    case 'HIDE_TOAST':
      return {
        ...state,
        toast: {
          ...state.toast,
          show: false
        }
      };

    default:
      return state;
  }
}

// ... (other helper functions)

export const addDeliveryZone = async (dispatch, zoneData) => {
  const { data, error } = await supabase
    .from('delivery_zones')
    .insert([{
      name: zoneData.name,
      charge: zoneData.charge,
      estimated_time: zoneData.estimated_time,
      status: 'সক্রিয়'
    }])
    .select();

  if (!error && data) {
    dispatch({ type: 'ADD_DELIVERY_ZONE', payload: data[0] });
    return { success: true, data: data[0] };
  }
  return { success: false, error };
};

export const deleteDeliveryZone = async (dispatch, zoneId) => {
  const { error } = await supabase
    .from('delivery_zones')
    .delete()
    .eq('id', zoneId);

  if (!error) {
    dispatch({ type: 'DELETE_DELIVERY_ZONE', payload: zoneId });
    return { success: true };
  }
  return { success: false, error };
};

export const addTask = async (dispatch, taskData) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{
      title: taskData.title,
      task_date: taskData.date,
      task_time: taskData.time,
      task_type: taskData.type,
      is_completed: false
    }])
    .select();

  if (!error && data) {
    const newTask = {
      id: data[0].id,
      title: data[0].title,
      date: data[0].task_date,
      time: data[0].task_time,
      type: data[0].task_type,
      completed: data[0].is_completed
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
    return { success: true, data: newTask };
  }
  return { success: false, error };
};

export const updateTask = async (dispatch, task) => {
  const { error } = await supabase
    .from('tasks')
    .update({
      title: task.title,
      task_date: task.date,
      task_time: task.time,
      task_type: task.type,
      is_completed: task.completed
    })
    .eq('id', task.id);

  if (!error) {
    dispatch({ type: 'UPDATE_TASK', payload: task });
    return { success: true };
  }
  return { success: false, error };
};

export const deleteTask = async (dispatch, taskId) => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId);

  if (!error) {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
    return { success: true };
  }
  return { success: false, error };
};

export const addAnnouncement = async (dispatch, announcementData) => {
  const { data, error } = await supabase
    .from('announcements')
    .insert([{
      text: announcementData.text,
      bg_color: announcementData.bg_color,
      text_color: announcementData.text_color,
      link: announcementData.link,
      is_active: announcementData.is_active ?? true
    }])
    .select();

  if (!error && data) {
    dispatch({ type: 'ADD_ANNOUNCEMENT', payload: data[0] });
    return { success: true, data: data[0] };
  }
  return { success: false, error };
};

export const updateAnnouncement = async (dispatch, announcement) => {
  const { error } = await supabase
    .from('announcements')
    .update({
      text: announcement.text,
      bg_color: announcement.bg_color,
      text_color: announcement.text_color,
      link: announcement.link,
      is_active: announcement.is_active
    })
    .eq('id', announcement.id);

  if (!error) {
    dispatch({ type: 'UPDATE_ANNOUNCEMENT', payload: announcement });
    return { success: true };
  }
  return { success: false, error };
};

export const deleteAnnouncement = async (dispatch, announcementId) => {
  const { error } = await supabase
    .from('announcements')
    .delete()
    .eq('id', announcementId);

  if (!error) {
    dispatch({ type: 'DELETE_ANNOUNCEMENT', payload: announcementId });
    return { success: true };
  }
  return { success: false, error };
};

export const addPromotionalPopup = async (dispatch, popupData) => {
  const { data, error } = await supabase
    .from('promotional_popups')
    .insert([{
      title: popupData.title,
      description: popupData.description,
      button_text: popupData.button_text,
      button_link: popupData.button_link,
      image_url: popupData.image_url,
      trigger_type: popupData.trigger_type || 'page_load',
      trigger_delay: popupData.trigger_delay || 5,
      start_date: popupData.start_date,
      end_date: popupData.end_date,
      is_active: popupData.is_active ?? true
    }])
    .select();

  if (!error && data) {
    dispatch({ type: 'ADD_PROMOTIONAL_POPUP', payload: data[0] });
    return { success: true, data: data[0] };
  }
  return { success: false, error };
};

export const updatePromotionalPopup = async (dispatch, popup) => {
  const { error } = await supabase
    .from('promotional_popups')
    .update({
      title: popup.title,
      description: popup.description,
      button_text: popup.button_text,
      button_link: popup.button_link,
      image_url: popup.image_url,
      trigger_type: popup.trigger_type,
      trigger_delay: popup.trigger_delay,
      start_date: popup.start_date,
      end_date: popup.end_date,
      is_active: popup.is_active
    })
    .eq('id', popup.id);

  if (!error) {
    dispatch({ type: 'UPDATE_PROMOTIONAL_POPUP', payload: popup });
    return { success: true };
  }
  return { success: false, error };
};

export const deletePromotionalPopup = async (dispatch, popupId) => {
  const { error } = await supabase
    .from('promotional_popups')
    .delete()
    .eq('id', popupId);

  if (!error) {
    dispatch({ type: 'DELETE_PROMOTIONAL_POPUP', payload: popupId });
    return { success: true };
  }
  return { success: false, error };
};

export const addUser = async (dispatch, userData) => {
  console.log('Adding user:', userData);
  const { data, error } = await supabase
    .from('users')
    .insert([{
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      mobile: userData.mobile,
      password: userData.password,
      role_id: userData.role_id,
      department_id: parseInt(userData.department_id),
      status: userData.status || 'active',
      photo_url: userData.photo_url
    }])
    .select();

  if (error) {
    console.error('Error adding user:', error);
    return { success: false, error };
  }

  if (data) {
    dispatch({ type: 'ADD_USER', payload: data[0] });
    return { success: true, data: data[0] };
  }
  return { success: false, error: 'No data returned' };
};

export const updateUser = async (dispatch, user) => {
  console.log('Updating user:', user);
  const updateData = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    mobile: user.mobile,
    role_id: user.role_id,
    department_id: parseInt(user.department_id),
    status: user.status,
    photo_url: user.photo_url
  };

  if (user.password) {
    updateData.password = user.password;
  }

  const { data, error } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', user.id)
    .select();

  if (error) {
    console.error('Error updating user:', error);
    return { success: false, error };
  }

  if (data && data.length > 0) {
    dispatch({ type: 'UPDATE_USER', payload: data[0] });
    return { success: true, data: data[0] };
  }
  return { success: false, error: 'No data returned' };
};

export const deleteUser = async (dispatch, userId) => {
  console.log('Deleting user:', userId);
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId);

  if (error) {
    console.error('Error deleting user:', error);
    return { success: false, error };
  }

  dispatch({ type: 'DELETE_USER', payload: userId });
  return { success: true };
};

// Helper functions (pure, outside reducer)
export const getOrderProgress = (order, stages) => {
  if (!order || !stages || stages.length === 0) return 0;
  const totalStages = stages.filter(s => s.id !== 'stage_010').length; // Exclude cancelled stage from progress
  const currentIndex = order.currentStageIndex;
  
  if (order.currentStageId === 'stage_010') return 100; // Cancelled is 100% or handled differently? Let's say 100% for bar fill or special color
  
  return Math.min(Math.round(((currentIndex + 1) / totalStages) * 100), 100);
};

export const getNextStage = (order, stages) => {
  if (!order || !stages) return null;
  const activeStages = stages.filter(s => s.id !== 'stage_010').sort((a, b) => a.order - b.order);
  const currentIndex = activeStages.findIndex(s => s.id === order.currentStageId);
  if (currentIndex === -1 || currentIndex === activeStages.length - 1) return null;
  return activeStages[currentIndex + 1];
};

export const getOrdersByPhone = (phone, orders) => {
  if (!phone || !orders) return [];
  return orders.filter(order => order.customerPhone.includes(phone));
};

export function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('admin_settings');
      if (savedSettings) {
        dispatch({ type: 'UPDATE_SETTINGS', payload: JSON.parse(savedSettings) });
      }
    }
    
    // Fetch data from Supabase
    fetchAllData().then(data => {
      dispatch({ type: 'SET_ALL_DATA', payload: data });
    });
  }, []);

  const showToast = (message, type = 'success') => {
    dispatch({ type: 'SHOW_TOAST', payload: { message, type } });
    setTimeout(() => {
      dispatch({ type: 'HIDE_TOAST' });
    }, 3000);
  };

  return (
    <AdminContext.Provider value={{ state, dispatch, showToast }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
