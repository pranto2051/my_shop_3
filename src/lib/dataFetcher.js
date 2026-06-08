import { supabase } from './supabase';

async function fetchWithFallback(queryPromise, fallback = [], label = 'query') {
  const { data, error } = await queryPromise;

  if (!error) {
    return data ?? fallback;
  }

  const details = error.message || error.code || error.status || 'unknown error';
  console.warn(`Supabase ${label} returned an error; using fallback data instead.`, details);
  return fallback;
}

export async function fetchAllData() {
  try {
    const [
      orders,
      orderStages,
      products,
      categories,
      designs,
      gallery,
      shopInfoArray,
      history,
      customers,
      reviews,
      deliveryZones,
      tasks,
      announcements,
      promotionalPopups,
      pageConfigs,
      users,
      departments
    ] = await Promise.all([
      fetchWithFallback(
        supabase.from('orders').select('id, customerPhone:customer_phone, customerName:customer_name, productId:product_id, productName:product_name, productImage:product_image, quantity, totalPrice:total_price, advancePaid:advance_paid, remainingAmount:remaining_amount, deliveryAddress:delivery_address, estimatedDelivery:estimated_delivery, orderNote:order_note, currentStageId:current_stage_id, currentStageIndex:current_stage_index, status, createdAt:created_at, updatedAt:updated_at').order('created_at', { ascending: false }),
        [],
        'orders'
      ),
      fetchWithFallback(
        supabase.from('order_stages').select('id, name, nameEn:name_en, icon, color, order:stage_order, isDefault:is_default, description').order('stage_order'),
        [],
        'order_stages'
      ),
      fetchWithFallback(
        supabase.from('products').select('id, name, nameEn:name_en, categoryId:category_id, price, originalPrice:original_price, image, images, description, material, dimensions, color, weight, inStock:in_stock, isFeatured:is_featured, isTopSelling:is_top_selling, rating, reviewCount:review_count, tags'),
        [],
        'products'
      ),
      fetchWithFallback(
        supabase.from('categories').select('id, name, nameEn:name_en, icon, description, productCount:product_count'),
        [],
        'categories'
      ),
      fetchWithFallback(
        supabase.from('designs').select('id, name, image, category, woodType:wood_type, cost, duration'),
        [],
        'designs'
      ),
      fetchWithFallback(
        supabase.from('gallery').select('id, title, image'),
        [],
        'gallery'
      ),
      fetchWithFallback(
        supabase.from('shop_info').select('*').limit(1),
        [],
        'shop_info'
      ),
      fetchWithFallback(
        supabase.from('order_stage_history').select('orderId:order_id, stageId:stage_id, stageName:stage_name, timestamp, adminNote:admin_note, completedBy:completed_by'),
        [],
        'order_stage_history'
      ),
      fetchWithFallback(
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        [],
        'profiles'
      ),
      fetchWithFallback(
        supabase.from('customer_reviews').select('*').order('created_at', { ascending: false }),
        [],
        'customer_reviews'
      ),
      fetchWithFallback(
        supabase.from('delivery_zones').select('*').order('created_at', { ascending: false }),
        [],
        'delivery_zones'
      ),
      fetchWithFallback(
        supabase.from('tasks').select('id, title, date:task_date, time:task_time, type:task_type, completed:is_completed').order('task_date', { ascending: true }),
        [],
        'tasks'
      ),
      fetchWithFallback(
        supabase.from('announcements').select('*').order('created_at', { ascending: false }),
        [],
        'announcements'
      ),
      fetchWithFallback(
        supabase.from('promotional_popups').select('*').order('created_at', { ascending: false }),
        [],
        'promotional_popups'
      ),
      fetchWithFallback(
        supabase.from('page_configs').select('*').order('updated_at', { ascending: false }),
        [],
        'page_configs'
      ),
      fetchWithFallback(
        supabase.from('users').select('*').order('created_at', { ascending: false }),
        [],
        'users'
      ),
      fetchWithFallback(
        supabase.from('departments').select('*').order('name'),
        [],
        'departments'
      )
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
      reviews: reviews || [],
      deliveryZones: deliveryZones || [],
      tasks: tasks || [],
      announcements: announcements || [],
      promotionalPopups: promotionalPopups || [],
      pageConfigs: pageConfigs || [],
      users: users || [],
      departments: departments || []
    };
  } catch (error) {
    console.error('Error fetching data from Supabase:', error);
    return {
      orders: [], orderStages: [], products: [], categories: [], designs: [], gallery: [], shopInfo: null,
      customers: [], reviews: [], deliveryZones: [], tasks: [], announcements: [],
      promotionalPopups: [], pageConfigs: [], users: [], departments: []
    };
  }
}
