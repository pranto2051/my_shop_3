import { supabase } from '../supabase';

export async function updatePageConfig(slug, configData) {
  const { data, error } = await supabase
    .from('page_configs')
    .update(configData)
    .eq('slug', slug);
  
  if (error) throw error;
  return data;
}

export async function updatePageSection(id, sectionData) {
  const { data, error } = await supabase
    .from('page_sections')
    .update(sectionData)
    .eq('id', id);
  
  if (error) throw error;
  return data;
}

export async function updatePageBlock(id, blockData) {
  const { data, error } = await supabase
    .from('page_blocks')
    .update(blockData)
    .eq('id', id);
  
  if (error) throw error;
  return data;
}

export async function updatePageHighlight(id, highlightData) {
  const { data, error } = await supabase
    .from('page_highlights')
    .update(highlightData)
    .eq('id', id);
  
  if (error) throw error;
  return data;
}

export async function reorderSections(orderedIds) {
  const updates = orderedIds.map((id, index) => 
    supabase.from('page_sections').update({ display_order: index }).eq('id', id)
  );
  
  const results = await Promise.all(updates);
  const error = results.find(r => r.error);
  if (error) throw error.error;
  return results;
}

export async function reorderBlocks(orderedIds) {
  const updates = orderedIds.map((id, index) => 
    supabase.from('page_blocks').update({ display_order: index }).eq('id', id)
  );
  
  const results = await Promise.all(updates);
  const error = results.find(r => r.error);
  if (error) throw error.error;
  return results;
}
