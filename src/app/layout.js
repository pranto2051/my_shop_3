import './styles/style.css';
import './globals.css';
import './styles/animations.css';
import './styles/responsive.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminBodyClass from '@/components/AdminBodyClass';
import AnimationManager from '@/components/AnimationManager';
import storeInfoRaw from '@/data/shopInfo';
import categoriesRaw from '@/data/categories';
import { AdminProvider } from './context/AdminContext';

export const metadata = {
  title: {
    default: (storeInfoRaw.default || storeInfoRaw).name,
    template: `%s | ${(storeInfoRaw.default || storeInfoRaw).name}`,
  },
  description: `${(storeInfoRaw.default || storeInfoRaw).name} - মানসম্পন্ন আসবাবপত্র। মিরপুর, ঢাকা।`,
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const storeInfo = storeInfoRaw.default || storeInfoRaw;
  const categories = Array.isArray(categoriesRaw) ? categoriesRaw : (categoriesRaw.default || []);

  return (
    <html lang="bn" suppressHydrationWarning className="loading">
      <head suppressHydrationWarning>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.add('loading');
              window.addEventListener('load', function() {
                // This is a fallback in case the React loader fails
                setTimeout(function() {
                  document.documentElement.classList.remove('loading');
                }, 3000);
              });
            `,
          }}
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600;700&family=Rozha+One&family=Bebas+Neue&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <AdminProvider>
          <AdminBodyClass />
          <Header storeInfo={storeInfo} categories={categories} />
          <AnimationManager />
          {children}
          <Footer storeInfo={storeInfo} categories={categories} />
        </AdminProvider>
      </body>
    </html>
  );
}
