import React from 'react';
import { getPageData } from '@/lib/pages/getPageData';
import PageHero from '@/components/pages/shared/PageHero';
import PageSection from '@/components/pages/shared/PageSection';
import StatsGrid from '@/components/pages/about/StatsGrid';

export const metadata = {
  title: 'আমাদের সম্পর্কে — মা ফার্নিচার',
  description: 'মা ফার্নিচার সম্পর্কে জানুন। কুষ্টিয়া দৌলতপুরের সেরা আসবাবপত্রের দোকান।',
};

export default async function AboutUsPage() {
  const data = await getPageData('about-us');

  if (!data) {
    return <div>Loading...</div>;
  }

  const { config, sections, highlights } = data;

  return (
    <main>
      <PageHero config={config} />
      
      {/* Special section for highlights in About Us */}
      {highlights && highlights.length > 0 && (
        <StatsGrid highlights={highlights} />
      )}

      {sections && sections.map((section) => (
        <PageSection key={section.id} section={section} />
      ))}
    </main>
  );
}
