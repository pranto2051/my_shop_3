import chairs from './Product/chair';
import tables from './Product/table';
import doors from './Product/door';
import windows from './Product/window';
import sofas from './Product/sofa';
import beds from './Product/bed';
import wardrobes from './Product/wardrobe';
import shelves from './Product/shelf';

const getItems = (mod) => {
  try {
    if (!mod) return [];
    if (Array.isArray(mod)) return mod;
    if (typeof mod === 'object' && mod !== null) {
      if (Array.isArray(mod.default)) return mod.default;
      if (Array.isArray(mod.allProducts)) return mod.allProducts;
      if (Array.isArray(mod.products)) return mod.products;
      
      // Try to find any array property
      const values = Object.values(mod);
      const firstArray = values.find(v => Array.isArray(v));
      if (firstArray) return firstArray;
    }
    return [];
  } catch (err) {
    console.error('Error in getItems:', err);
    return [];
  }
};

const allProducts = [
  ...(getItems(chairs) || []),
  ...(getItems(tables) || []),
  ...(getItems(doors) || []),
  ...(getItems(windows) || []),
  ...(getItems(sofas) || []),
  ...(getItems(beds) || []),
  ...(getItems(wardrobes) || []),
  ...(getItems(shelves) || [])
];

console.log('Chairs data:', chairs);
console.log('Chairs extracted:', getItems(chairs).length);
console.log('Total products loaded in data/products.js:', allProducts.length);

export { allProducts };
export default allProducts;
