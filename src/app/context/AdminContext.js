'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { orders as initialOrders } from '@/data/orders';
import { defaultOrderStages } from '@/data/orderStages';

import productsRaw from '@/data/products';
import categoriesRaw from '@/data/categories';
import designsRaw from '@/data/designs';
import galleryRaw from '@/data/gallery';

const AdminContext = createContext();

const getArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (val.default && Array.isArray(val.default)) return val.default;
  if (val.allProducts && Array.isArray(val.allProducts)) return val.allProducts;
  return [];
};

const initialState = {
  orders: [...initialOrders],
  orderStages: [...defaultOrderStages],
  editingOrder: null,
  orderFilter: 'all',        // all | active | completed | cancelled 
  orderSearch: '',
  products: getArray(productsRaw),
  categories: getArray(categoriesRaw),
  designs: getArray(designsRaw),
  gallery: getArray(galleryRaw),
  settings: {
    showAdminHeader: false,
    showAdminFooter: false,
  },
};

function adminReducer(state, action) {
  switch (action.type) {
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

    default:
      return state;
  }
}

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
  }, []);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
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
