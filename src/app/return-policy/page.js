import React from 'react';
import { getPageData } from '@/lib/pages/getPageData';
import PageHero from '@/components/pages/shared/PageHero';
import PageSection from '@/components/pages/shared/PageSection';
import TableOfContents from '@/components/pages/shared/TableOfContents';

export const metadata = {
  title: 'ফেরত ও বিনিময় নীতি — মা ফার্নিচার',
  description: 'মা ফার্নিচারের পণ্য ফেরত ও বিনিময় নীতি।',
};

export default async function ReturnPolicyPage() {
  const data = await getPageData('return-policy');

  if (!data) {
    return <div>Loading...</div>;
  }

  const { config, sections } = data;

  return (
    <main>
      <PageHero config={config} />
      
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '40px', maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <aside style={{ height: 'fit-content' }}>
          <TableOfContents sections={sections} />
        </aside>
        <div className="content">
          {sections && sections.map((section) => (
            <div key={section.id} style={{ marginBottom: '40px' }}>
              <PageSection section={section} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
