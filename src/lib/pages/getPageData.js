import { supabase } from '../supabase';

export async function getPageData(slug) {
  try {
    // 1. Fetch page config
    const { data: pageConfig, error: configError } = await supabase
      .from('page_configs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (configError) throw configError;

    // 2. Fetch page sections
    const { data: sections, error: sectionsError } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_slug', slug)
      .eq('is_visible', true)
      .order('display_order', { ascending: true });

    if (sectionsError) throw sectionsError;

    // 3. Fetch all blocks for these sections
    const sectionIds = sections.map(s => s.id);
    const { data: blocks, error: blocksError } = await supabase
      .from('page_blocks')
      .select('*')
      .in('section_id', sectionIds)
      .eq('is_visible', true)
      .order('display_order', { ascending: true });

    if (blocksError) throw blocksError;

    // 4. Fetch highlights if about-us
    let highlights = [];
    if (slug === 'about-us') {
      const { data: highlightsData, error: highlightsError } = await supabase
        .from('page_highlights')
        .select('*')
        .eq('page_slug', slug)
        .eq('is_visible', true)
        .order('display_order', { ascending: true });
      
      if (!highlightsError) highlights = highlightsData;
    }

    // Combine data
    const sectionsWithBlocks = sections.map(section => ({
      ...section,
      blocks: blocks.filter(block => block.section_id === section.id)
    }));

    return {
      config: pageConfig,
      sections: sectionsWithBlocks,
      highlights: highlights
    };
  } catch (error) {
    console.error(`Error fetching page data for ${slug}:`, error);
    return null;
  }
}

export async function getAdminPageData(slug) {
  try {
    // 1. Fetch page config
    const { data: pageConfig, error: configError } = await supabase
      .from('page_configs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (configError) throw configError;

    // 2. Fetch page sections (all)
    const { data: sections, error: sectionsError } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_slug', slug)
      .order('display_order', { ascending: true });

    if (sectionsError) throw sectionsError;

    // 3. Fetch all blocks for these sections
    const sectionIds = sections.map(s => s.id);
    const { data: blocks, error: blocksError } = await supabase
      .from('page_blocks')
      .select('*')
      .in('section_id', sectionIds)
      .order('display_order', { ascending: true });

    if (blocksError) throw blocksError;

    // 4. Fetch highlights if about-us (all)
    let highlights = [];
    if (slug === 'about-us') {
      const { data: highlightsData, error: highlightsError } = await supabase
        .from('page_highlights')
        .select('*')
        .eq('page_slug', slug)
        .order('display_order', { ascending: true });
      
      if (!highlightsError) highlights = highlightsData;
    }

    // Combine data
    const sectionsWithBlocks = sections.map(section => ({
      ...section,
      blocks: blocks.filter(block => block.section_id === section.id)
    }));

    return {
      config: pageConfig,
      sections: sectionsWithBlocks,
      highlights: highlights
    };
  } catch (error) {
    console.error(`Error fetching admin page data for ${slug}:`, error);
    return null;
  }
}
