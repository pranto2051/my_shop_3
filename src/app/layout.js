import './styles/style.css';
import './globals.css';
import './styles/animations.css';
import './styles/responsive.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminBodyClass from '@/components/AdminBodyClass';
import AnimationManager from '@/components/AnimationManager';
import { AdminProvider } from './context/AdminContext';
import { supabase } from '@/lib/supabase';

import PromotionalPopup from '@/components/PromotionalPopup';
import Toast from '@/components/Toast';

export async function generateMetadata() {
  const { data: shopInfoArray } = await supabase.from('shop_info').select('*').limit(1);
  const name = shopInfoArray && shopInfoArray.length > 0 ? shopInfoArray[0].name : "মা ফার্নিচার";
  
  return {
    title: {
      default: name,
      template: `%s | ${name}`,
    },
    description: `${name} - মানসম্পন্ন আসবাবপত্র। মিরপুর, ঢাকা।`,
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const { data: categoriesArray } = await supabase.from('categories').select('id, name, nameEn:name_en, icon, description, productCount:product_count');
  const { data: shopInfoArray } = await supabase.from('shop_info').select('*').limit(1);

  const categories = categoriesArray || [];
  console.log('Layout - Fetched Categories:', categories.length);
  
  let storeInfo = null;
  console.log('Layout - Fetched Shop Info:', !!shopInfoArray);
  if (shopInfoArray && shopInfoArray.length > 0) {
    const rawInfo = shopInfoArray[0];
    storeInfo = {
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
  } else {
    storeInfo = {
        name: "মা ফার্নিচার",
        contactLabel: "যোগাযোগ করুন",
        showroomAddress: { label: "শোরুমের ঠিকানা", address: "মিরপুর ১০, ঢাকা" },
        callNumbers: { label: "সরাসরি কল করুন", numbers: ["01711-000000"] },
        whatsapp: { label: "WhatsApp মেসেজ", number: "01711000000" },
        email: { label: "ইমেইল", address: "মিরপুর ১০, ঢাকা" },
        directMessageLabel: "সরাসরি মেসেজ দিন",
        openingHours: { label: "খোলা থাকার সময়", schedule: ["09:00 AM - 09:00 PM"] }
    };
  }

  return (
    <html lang="bn" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600;700&family=Rozha+One&family=Bebas+Neue&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.add('loading');
              window.addEventListener('load', function() {
                setTimeout(function() {
                  document.documentElement.classList.remove('loading');
                }, 1000);
              });
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <AdminProvider>
          <AdminBodyClass />
          <Header storeInfo={storeInfo} categories={categories} />
          <AnimationManager />
          <PromotionalPopup />
          <Toast />
          {children}
          <Footer storeInfo={storeInfo} categories={categories} />
        </AdminProvider>
      </body>
    </html>
  );
}
