const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let categories = require('./data/categories');
let products = require('./data/products');
let storeInfo = require('./data/shopInfo');

function searchProducts(query, categoryId, minPrice, maxPrice, sort) {
  let results = [...products];

  if (query) {
    const q = query.toLowerCase().trim();
    results = results.filter(p => {
      const idMatch = p.id.toLowerCase() === q;
      const nameMatch = p.name.toLowerCase().includes(q);
      const nameEnMatch = p.nameEn.toLowerCase().includes(q);
      const tagMatch = p.tags && p.tags.some(t => t.toLowerCase().includes(q));
      return idMatch || nameMatch || nameEnMatch || tagMatch;
    });
  }

  if (categoryId && categoryId !== 'all') {
    results = results.filter(p => p.categoryId === categoryId);
  }

  if (minPrice) {
    results = results.filter(p => p.price >= parseInt(minPrice));
  }

  if (maxPrice) {
    results = results.filter(p => p.price <= parseInt(maxPrice));
  }

  switch (sort) {
    case 'price_asc':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'popular':
      results.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
      break;
    default:
      results.sort((a, b) => b.id.localeCompare(a.id));
  }

  return results;
}

function getCategoryProducts() {
  return categories.map(cat => ({
    ...cat,
    products: products.filter(p => p.categoryId === cat.id),
    productCount: products.filter(p => p.categoryId === cat.id).length
  }));
}

app.get('/', (req, res) => {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 5);
  const topSelling = products.filter(p => p.isTopSelling);
  const categoryWithProducts = getCategoryProducts();

  res.render('index', {
    categories,
    featuredProducts,
    topSelling,
    categoryWithProducts,
    allProducts: products,
    storeInfo,
    title: `${storeInfo.name} - মানসম্পন্ন আসবাবপত্র`
  });
});

app.get('/category/:id', (req, res) => {
  const category = categories.find(c => c.id === req.params.id);
  if (!category) return res.redirect('/');

  const categoryProducts = products.filter(p => p.categoryId === req.params.id);
  const categoryWithProducts = getCategoryProducts();

  res.render('category', {
    category,
    categoryProducts,
    categories,
    categoryWithProducts,
    allProducts: products,
    storeInfo,
    title: `${category.name} - ${storeInfo.name}`
  });
});

app.get('/search', (req, res) => {
  const { q, categoryId, minPrice, maxPrice, sort } = req.query;
  const results = searchProducts(q, categoryId, minPrice, maxPrice, sort);

  res.render('search', {
    results,
    categories,
    query: q || '',
    categoryId: categoryId || '',
    minPrice: minPrice || '',
    maxPrice: maxPrice || '',
    sort: sort || '',
    allProducts: products,
    storeInfo,
    title: `খোঁজার ফলাফল - ${storeInfo.name}`
  });
});

app.get('/admin', (req, res) => {
  res.render('admin', {
    categories,
    products,
    allProducts: products,
    storeInfo,
    title: `অ্যাডমিন প্যানেল - ${storeInfo.name}`
  });
});

app.post('/admin/product', (req, res) => {
  const {
    id, name, nameEn, categoryId, price, originalPrice,
    image, description, material, dimensions, color, weight,
    inStock, isFeatured, isTopSelling, tags
  } = req.body;

  const newProduct = {
    id: id || `PRD-${String(products.length + 1).padStart(3, '0')}`,
    name,
    nameEn,
    categoryId,
    price: parseInt(price),
    originalPrice: parseInt(originalPrice) || parseInt(price),
    image: image || `https://placehold.co/600x500/8B4E38/FAF6F1?text=${encodeURIComponent(nameEn || name)}`,
    images: [
      image || `https://placehold.co/600x500/8B4E38/FAF6F1?text=View+1`,
      `https://placehold.co/600x500/6B3A2A/FAF6F1?text=View+2`,
      `https://placehold.co/600x500/C8923A/FAF6F1?text=View+3`
    ],
    description,
    material: material || '',
    dimensions: dimensions || '',
    color: color || '',
    weight: weight || '',
    inStock: inStock === 'true' || inStock === 'on',
    isFeatured: isFeatured === 'true' || isFeatured === 'on',
    isTopSelling: isTopSelling === 'true' || isTopSelling === 'on',
    rating: 4.0,
    reviewCount: 0,
    tags: tags ? tags.split(',').map(t => t.trim()) : []
  };

  products.push(newProduct);
  res.redirect('/admin');
});

app.put('/admin/product/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  const updated = { ...products[index], ...req.body };
  updated.price = parseInt(updated.price);
  updated.originalPrice = parseInt(updated.originalPrice);
  updated.inStock = updated.inStock === 'true' || updated.inStock === true;
  updated.isFeatured = updated.isFeatured === 'true' || updated.isFeatured === true;
  updated.isTopSelling = updated.isTopSelling === 'true' || updated.isTopSelling === true;

  products[index] = updated;
  res.json({ success: true, product: updated });
});

app.delete('/admin/product/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  products.splice(index, 1);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`${storeInfo.name} server running at http://localhost:${PORT}`);
});
