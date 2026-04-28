'use client';

import { useState } from 'react';
import styles from './ProductsPanel.module.css';

export default function ProductsPanel({ products, setProducts, categoriesData }) {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = {
      id: formData.get('id') || `PRD-${String(products.length + 1).padStart(3, '0')}`,
      name: formData.get('name'),
      nameEn: formData.get('nameEn'),
      categoryId: formData.get('categoryId'),
      price: parseInt(formData.get('price')),
      originalPrice: parseInt(formData.get('originalPrice')),
      image: formData.get('image'),
      description: formData.get('description'),
      material: formData.get('material'),
      dimensions: formData.get('dimensions'),
      color: formData.get('color'),
      inStock: formData.get('inStock') === 'on',
      isFeatured: formData.get('isFeatured') === 'on',
      isTopSelling: formData.get('isTopSelling') === 'on',
      rating: editingProduct ? editingProduct.rating : 4.0,
      reviewCount: editingProduct ? editingProduct.reviewCount : 0,
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
    } else {
      setProducts([productData, ...products]);
    }
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (confirm('আপনি কি নিশ্চিত যে এই পণ্যটি মুছে ফেলতে চান?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.nameEn && p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || p.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of table
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className={styles.productsContainer}>
      <div className={styles.header}>
        <h2>পণ্য ব্যবস্থাপনা</h2>
        <button 
          className={styles.addButton}
          onClick={() => { setEditingProduct(null); setShowModal(true); }}
        >
          <i className="fas fa-plus"></i> নতুন পণ্য যোগ করুন
        </button>
      </div>

      <div className={styles.searchFilter}>
        <div className={styles.searchInput}>
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="নাম বা আইডি দিয়ে খুঁজুন..." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <select 
          className={styles.categorySelect}
          value={categoryFilter}
          onChange={handleCategoryChange}
        >
          <option value="all">সব ক্যাটাগরি</option>
          {categoriesData.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.tableCard}>
        <div className="table-responsive">
          <table className={styles.premiumTable}>
            <thead>
              <tr>
                <th>আইডি</th>
                <th>পণ্য</th>
                <th>ক্যাটাগরি</th>
                <th>মূল্য</th>
                <th>স্টক</th>
                <th>অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map(product => (
                <tr key={product.id}>
                  <td>#{product.id}</td>
                  <td>
                    <div className={styles.productCell}>
                      <img src={product.image} alt="" className={styles.productImg} />
                      <div className={styles.productNames}>
                        <span className={styles.nameBn}>{product.name}</span>
                        <span className={styles.nameEn}>{product.nameEn}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${styles.categoryBadge}`}>
                      {(categoriesData.find(c => c.id === product.categoryId) || {}).name}
                    </span>
                  </td>
                  <td>
                    <span className={styles.price}>
                      ৳{product.price.toLocaleString('bn-BD')}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${product.inStock ? styles.stockIn : styles.stockOut}`}>
                      {product.inStock ? 'স্টকে আছে' : 'স্টক শেষ'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button 
                        className={`${styles.actionBtn} ${styles.editBtn}`}
                        onClick={() => { setEditingProduct(product); setShowModal(true); }}
                        title="এডিট করুন"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        onClick={() => handleDeleteProduct(product.id)}
                        title="মুছে ফেলুন"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination UI */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            className={styles.pageBtn} 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className={styles.pageNumbers}>
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i + 1}
                className={`${styles.pageNumber} ${currentPage === i + 1 ? styles.activePage : ''}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {(i + 1).toLocaleString('bn-BD')}
              </button>
            ))}
          </div>

          <button 
            className={styles.pageBtn} 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>{editingProduct ? 'পণ্য এডিট করুন' : 'পণ্য যোগ করুন'}</h3>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSaveProduct}>
              <div className={styles.modalBody}>
                <input type="hidden" name="id" defaultValue={editingProduct?.id || ''} />
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>পণ্যের নাম (বাংলা)</label>
                    <input type="text" name="name" defaultValue={editingProduct?.name || ''} required placeholder="যেমন: আধুনিক সোফা" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Product Name (English)</label>
                    <input type="text" name="nameEn" defaultValue={editingProduct?.nameEn || ''} required placeholder="e.g. Modern Sofa" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>ক্যাটাগরি</label>
                    <select name="categoryId" defaultValue={editingProduct?.categoryId || categoriesData[0]?.id} required>
                      {categoriesData.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>ছবির লিঙ্ক (URL)</label>
                    <input type="text" name="image" defaultValue={editingProduct?.image || ''} placeholder="https://example.com/image.jpg" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>মূল্য (৳)</label>
                    <input type="number" name="price" defaultValue={editingProduct?.price || ''} required placeholder="0" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>আগের মূল্য (৳)</label>
                    <input type="number" name="originalPrice" defaultValue={editingProduct?.originalPrice || ''} placeholder="0" />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label>পণ্যের বর্ণনা</label>
                    <textarea name="description" rows="3" defaultValue={editingProduct?.description || ''} placeholder="পণ্য সম্পর্কে বিস্তারিত লিখুন..."></textarea>
                  </div>
                  <div className={styles.formGroup}>
                    <label>উপাদান (Material)</label>
                    <input type="text" name="material" defaultValue={editingProduct?.material || ''} placeholder="যেমন: সেগুন কাঠ" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>মাপ (Dimensions)</label>
                    <input type="text" name="dimensions" defaultValue={editingProduct?.dimensions || ''} placeholder="যেমন: ৫ ফিট / ২ ফিট" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>রঙ (Color)</label>
                    <input type="text" name="color" defaultValue={editingProduct?.color || ''} placeholder="যেমন: বাদামী" />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <div className={styles.checkboxGroup}>
                      <label className={styles.checkboxItem}>
                        <input type="checkbox" name="inStock" defaultChecked={editingProduct ? editingProduct.inStock : true} />
                        স্টকে আছে
                      </label>
                      <label className={styles.checkboxItem}>
                        <input type="checkbox" name="isFeatured" defaultChecked={editingProduct ? editingProduct.isFeatured : false} />
                        ফিচার্ড পণ্য
                      </label>
                      <label className={styles.checkboxItem}>
                        <input type="checkbox" name="isTopSelling" defaultChecked={editingProduct ? editingProduct.isTopSelling : false} />
                        টপ সেলিং
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowModal(false)}>বাতিল</button>
                <button type="submit" className={styles.saveBtn}>সংরক্ষণ করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
