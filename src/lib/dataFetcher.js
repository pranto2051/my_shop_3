import { supabase } from './supabase';

export async function fetchAllData() {
  try {
    const [
      { data: orders },
      { data: orderStages },
      { data: products },
      { data: categories },
      { data: designs },
      { data: gallery },
      { data: shopInfoArray },
      { data: history },
      { data: customers },
      { data: transactions },
      { data: notifications },
      { data: deliveryPersonnel },
      { data: reviews },
      { data: deliveryZones },
      { data: deliveryLocations },
      { data: tasks },
      { data: announcements }
    ] = await Promise.all([
      supabase.from('orders').select('id, customerPhone:customer_phone, customerName:customer_name, productId:product_id, productName:product_name, productImage:product_image, quantity, totalPrice:total_price, advancePaid:advance_paid, remainingAmount:remaining_amount, deliveryAddress:delivery_address, estimatedDelivery:estimated_delivery, orderNote:order_note, currentStageId:current_stage_id, currentStageIndex:current_stage_index, status, createdAt:created_at, updatedAt:updated_at').order('created_at', { ascending: false }),
      supabase.from('order_stages').select('id, name, nameEn:name_en, icon, color, order:stage_order, isDefault:is_default, description').order('stage_order'),
      supabase.from('products').select('id, name, nameEn:name_en, categoryId:category_id, price, originalPrice:original_price, image, images, description, material, dimensions, color, weight, inStock:in_stock, isFeatured:is_featured, isTopSelling:is_top_selling, rating, reviewCount:review_count, tags'),
      supabase.from('categories').select('id, name, nameEn:name_en, icon, description, productCount:product_count'),
      supabase.from('designs').select('id, name, image, category, woodType:wood_type, cost, duration'),
      supabase.from('gallery').select('id, title, image'),
      supabase.from('shop_info').select('*').limit(1),
      supabase.from('order_stage_history').select('orderId:order_id, stageId:stage_id, stageName:stage_name, timestamp, adminNote:admin_note, completedBy:completed_by'),
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('transactions').select('*').order('date', { ascending: false }),
      supabase.from('notifications').select('*').order('created_at', { ascending: false }),
      supabase.from('delivery_personnel').select('*'),
      supabase.from('customer_reviews').select('*').order('created_at', { ascending: false }),
      supabase.from('delivery_zones').select('*').order('created_at', { ascending: false }),
      supabase.from('delivery_locations').select('*'),
      supabase.from('tasks').select('id, title, date:task_date, time:task_time, type:task_type, completed:is_completed').order('task_date', { ascending: true }),
      supabase.from('announcements').select('*').order('created_at', { ascending: false })
    ]);

    let mappedOrders = orders || [];
    if (history) {
      mappedOrders = mappedOrders.map(order => ({
        ...order,
        stageHistory: history.filter(h => h.orderId === order.id)
      }));
    }

    let shopInfo = null;
    if (shopInfoArray && shopInfoArray.length > 0) {
      const rawInfo = shopInfoArray[0];
      shopInfo = {
        id: rawInfo.id,
        name: rawInfo.name,
        contactLabel: rawInfo.contact_label,
        showroomAddress: {
          label: rawInfo.showroom_address_label,
          address: rawInfo.showroom_address
        },
        callNumbers: {
          label: rawInfo.call_numbers_label,
          numbers: rawInfo.call_numbers || []
        },
        whatsapp: {
          label: rawInfo.whatsapp_label,
          number: rawInfo.whatsapp_number
        },
        email: {
          label: rawInfo.email_label,
          address: rawInfo.email_address
        },
        directMessageLabel: rawInfo.direct_message_label,
        openingHours: {
          label: rawInfo.opening_hours_label,
          schedule: rawInfo.opening_hours_schedule || []
        }
      };
    }

    return {
      orders: mappedOrders,
      orderStages: orderStages || [],
      products: products || [],
      categories: categories || [],
      designs: designs || [],
      gallery: gallery || [],
      shopInfo,
      customers: customers || [],
      transactions: transactions || [],
      notifications: notifications || [],
      deliveryPersonnel: deliveryPersonnel || [],
      reviews: reviews || [],
      deliveryZones: deliveryZones || [],
      deliveryLocations: deliveryLocations || [],
      tasks: tasks || [],
      announcements: announcements || []
    };
  } catch (error) {
    console.error('Error fetching data from Supabase:', error);
    return {
      orders: [], orderStages: [], products: [], categories: [], designs: [], gallery: [], shopInfo: null,
      customers: [], transactions: [], notifications: [], deliveryPersonnel: [],
      reviews: [], deliveryZones: [], deliveryLocations: [], tasks: [], announcements: []
    };
  }
}
