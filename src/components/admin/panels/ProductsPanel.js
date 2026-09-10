'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { FaPlus, FaSearch, FaEdit, FaTrashAlt, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ProductsPanel({ products = [], setProducts, categoriesData = [] }) {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [galleryUrls, setGalleryUrls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData(e.target);
    const productId = formData.get('id') || `PRD-${String(products.length + 1).padStart(3, '0')}-${Date.now().toString().slice(-4)}`;
    
    const productDataForDb = {
      id: productId,
      name: formData.get('name'),
      name_en: formData.get('nameEn'),
      category_id: formData.get('categoryId'),
      price: parseInt(formData.get('price')) || 0,
      original_price: parseInt(formData.get('originalPrice')) || 0,
      image: formData.get('image'),
      description: formData.get('description'),
      material: formData.get('material'),
      dimensions: formData.get('dimensions'),
      color: formData.get('color'),
      in_stock: Math.max(0, parseInt(formData.get('inStock'), 10) || 0),
      is_featured: formData.get('isFeatured') === 'on',
      is_top_selling: formData.get('isTopSelling') === 'on',
      rating: editingProduct ? editingProduct.rating : 4.0,
      review_count: editingProduct ? editingProduct.reviewCount : 0,
      images: galleryUrls.filter(url => url.trim() !== ''),
    };

    const productDataForState = {
      id: productDataForDb.id,
      name: productDataForDb.name,
      nameEn: productDataForDb.name_en,
      categoryId: productDataForDb.category_id,
      price: productDataForDb.price,
      originalPrice: productDataForDb.original_price,
      image: productDataForDb.image,
      description: productDataForDb.description,
      material: productDataForDb.material,
      dimensions: productDataForDb.dimensions,
      color: productDataForDb.color,
      inStock: productDataForDb.in_stock,
      isFeatured: productDataForDb.is_featured,
      isTopSelling: productDataForDb.is_top_selling,
      rating: productDataForDb.rating,
      reviewCount: productDataForDb.review_count,
      images: productDataForDb.images,
    };

    try {
      const { error } = await supabase
        .from('products')
        .upsert(productDataForDb);

      if (error) throw error;

      if (editingProduct) {
        setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productDataForState } : p));
      } else {
        setProducts([productDataForState, ...products]);
      }
      setShowModal(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('পণ্য সেভ করতে সমস্যা হয়েছে!');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (confirm('আপনি কি নিশ্চিত যে এই পণ্যটি মুছে ফেলতে চান?')) {
      try {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('পণ্য মুছে ফেলতে সমস্যা হয়েছে!');
      }
    }
  };

  const filteredProducts = (products || []).filter(p => {
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
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EDE0D6] shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#2D1505]">পণ্য ব্যবস্থাপনা</h2>
          <p className="text-xs sm:text-sm font-semibold text-[#A0826C] mt-0.5">শোরুমের সকল পণ্য ক্যাটালগ পরিচালনা ও স্টক ট্র্যাক করুন</p>
        </div>
        <button 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7C4B2A] to-[#5D321A] text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-black shadow-md shadow-[#7C4B2A]/20 hover:shadow-lg transition-all cursor-pointer active:scale-95 shrink-0"
          onClick={() => { 
            setEditingProduct(null); 
            setGalleryUrls([]);
            setShowModal(true); 
          }}
        >
          <FaPlus /> নতুন পণ্য যোগ করুন
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-3xl border border-[#EDE0D6] shadow-xs">
        <div className="relative flex-1 w-full">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0826C]" />
          <input 
            type="text" 
            placeholder="নাম বা আইডি দিয়ে খুঁজুন..." 
            className="w-full h-11 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl pl-11 pr-4 text-sm font-bold text-[#2D1505] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all placeholder:text-[#C4A898]"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <select 
          className="w-full sm:w-60 h-11 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl px-4 text-sm font-bold text-[#2D1505] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all cursor-pointer shrink-0"
          value={categoryFilter}
          onChange={handleCategoryChange}
        >
          <option value="all">সব ক্যাটাগরি</option>
          {categoriesData.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-[#EDE0D6] rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FDF8F5] border-b border-[#EDE0D6] text-[11px] font-black uppercase tracking-wider text-[#A0826C]">
                <th className="py-4 px-6">আইডি</th>
                <th className="py-4 px-6">পণ্য</th>
                <th className="py-4 px-6">ক্যাটাগরি</th>
                <th className="py-4 px-6">মূল্য</th>
                <th className="py-4 px-6">স্টক</th>
                <th className="py-4 px-6 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE0D6] text-sm">
              {currentProducts.map(product => (
                <tr key={product.id} className="hover:bg-[#FDF8F5]/50 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-xs text-[#7C4B2A]">#{product.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={product.image} alt="" className="w-12 h-12 rounded-xl object-cover border border-[#E8D5C4] shrink-0" />
                      <div className="min-w-0">
                        <p className="font-black text-[#2D1505] truncate">{product.name}</p>
                        <p className="text-xs font-semibold text-[#A0826C] truncate">{product.nameEn}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-[#7C4B2A]/10 text-[#7C4B2A] border border-[#7C4B2A]/20">
                      {(categoriesData.find(c => c.id === product.categoryId) || {}).name || 'সাধারণ'}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-black text-[#2D1505]">
                    ৳{product.price.toLocaleString('bn-BD')}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      product.inStock > 0 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${product.inStock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                      {product.inStock > 0 ? 'স্টকে আছে' : 'স্টক শেষ'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        className="w-8 h-8 rounded-xl bg-[#FDF8F5] border border-[#E8D5C4] flex items-center justify-center text-[#A0826C] hover:text-[#7C4B2A] hover:border-[#7C4B2A] hover:bg-[#7C4B2A]/10 transition-all cursor-pointer"
                        onClick={() => { 
                          setEditingProduct(product); 
                          setGalleryUrls(product.images || []);
                          setShowModal(true); 
                        }}
                        title="এডিট করুন"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="w-8 h-8 rounded-xl bg-[#FDF8F5] border border-[#E8D5C4] flex items-center justify-center text-[#A0826C] hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all cursor-pointer"
                        onClick={() => handleDeleteProduct(product.id)}
                        title="মুছে ফেলুন"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white border border-[#EDE0D6] rounded-3xl p-4">
          <button 
            className="w-9 h-9 rounded-xl bg-[#FDF8F5] border border-[#E8D5C4] flex items-center justify-center text-[#A0826C] hover:text-[#7C4B2A] disabled:opacity-40 transition-all cursor-pointer"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft size={12} />
          </button>
          
          <div className="flex items-center gap-1.5">
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i + 1}
                className={`w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  currentPage === i + 1 
                    ? 'bg-[#7C4B2A] text-white shadow-sm' 
                    : 'bg-[#FDF8F5] text-[#A0826C] border border-[#E8D5C4] hover:bg-white'
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {(i + 1).toLocaleString('bn-BD')}
              </button>
            ))}
          </div>

          <button 
            className="w-9 h-9 rounded-xl bg-[#FDF8F5] border border-[#E8D5C4] flex items-center justify-center text-[#A0826C] hover:text-[#7C4B2A] disabled:opacity-40 transition-all cursor-pointer"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A0A00]/60 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="relative w-full max-w-3xl bg-white rounded-3xl sm:rounded-[36px] shadow-2xl overflow-hidden border border-[#E8D5C4] max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="relative overflow-hidden bg-gradient-to-br from-[#2D1505] to-[#7C4B2A] px-6 sm:px-8 py-6 text-white flex items-center justify-between shrink-0">
              <h3 className="text-xl font-black">{editingProduct ? 'পণ্য এডিট করুন' : 'নতুন পণ্য যোগ করুন'}</h3>
              <button className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-pointer" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSaveProduct} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 sm:p-8 overflow-y-auto space-y-4 flex-1 custom-scrollbar">
                <input type="hidden" name="id" defaultValue={editingProduct?.id || ''} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-[#A0826C] uppercase tracking-wider">পণ্যের নাম (বাংলা)</label>
                    <input type="text" name="name" defaultValue={editingProduct?.name || ''} required placeholder="যেমন: আধুনিক সোফা" className="w-full h-11 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl px-4 text-sm font-bold text-[#2D1505] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-[#A0826C] uppercase tracking-wider">Product Name (English)</label>
                    <input type="text" name="nameEn" defaultValue={editingProduct?.nameEn || ''} required placeholder="e.g. Modern Sofa" className="w-full h-11 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl px-4 text-sm font-bold text-[#2D1505] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-[#A0826C] uppercase tracking-wider">ক্যাটাগরি</label>
                    <select name="categoryId" defaultValue={editingProduct?.categoryId || categoriesData[0]?.id} required className="w-full h-11 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl px-4 text-sm font-bold text-[#2D1505] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all cursor-pointer">
                      {categoriesData.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-[#A0826C] uppercase tracking-wider">প্রধান ছবির লিঙ্ক (Primary Image URL)</label>
                    <input type="text" name="image" defaultValue={editingProduct?.image || ''} placeholder="https://example.com/image.jpg" className="w-full h-11 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl px-4 text-sm font-bold text-[#2D1505] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all" />
                  </div>
                  
                  <div className="sm:col-span-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-extrabold text-[#A0826C] uppercase tracking-wider">গ্যালারি ছবি (সর্বোচ্চ ৪টি অতিরিক্ত ছবি)</label>
                      {galleryUrls.length < 4 && (
                        <button 
                          type="button" 
                          onClick={() => setGalleryUrls([...galleryUrls, ''])}
                          className="px-3 py-1 bg-[#7C4B2A] text-white rounded-lg text-xs font-bold hover:bg-[#5D321A] transition-colors cursor-pointer"
                        >
                          + ছবি যোগ করুন
                        </button>
                      )}
                    </div>
                    {galleryUrls.map((url, index) => (
                      <div key={index} className="flex gap-2">
                        <input 
                          type="text" 
                          value={url}
                          onChange={(e) => {
                            const newUrls = [...galleryUrls];
                            newUrls[index] = e.target.value;
                            setGalleryUrls(newUrls);
                          }}
                          placeholder="https://example.com/gallery-image.jpg" 
                          className="flex-1 h-10 bg-[#FDF8F5] border border-[#E8D5C4] rounded-xl px-3 text-xs font-bold text-[#2D1505] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20"
                        />
                        <button 
                          type="button" 
                          onClick={() => setGalleryUrls(galleryUrls.filter((_, i) => i !== index))}
                          className="px-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors cursor-pointer"
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-[#A0826C] uppercase tracking-wider">মূল্য (৳)</label>
                    <input type="number" name="price" defaultValue={editingProduct?.price || ''} required placeholder="0" className="w-full h-11 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl px-4 text-sm font-bold text-[#2D1505] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-[#A0826C] uppercase tracking-wider">আগের মূল্য (৳)</label>
                    <input type="number" name="originalPrice" defaultValue={editingProduct?.originalPrice || ''} placeholder="0" className="w-full h-11 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl px-4 text-sm font-bold text-[#2D1505] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all" />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-xs font-extrabold text-[#A0826C] uppercase tracking-wider">পণ্যের বর্ণনা</label>
                    <textarea name="description" rows="3" defaultValue={editingProduct?.description || ''} placeholder="পণ্য সম্পর্কে বিস্তারিত লিখুন..." className="w-full bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl p-4 text-sm font-bold text-[#2D1505] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all"></textarea>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-[#A0826C] uppercase tracking-wider">উপাদান (Material)</label>
                    <input type="text" name="material" defaultValue={editingProduct?.material || ''} placeholder="যেমন: সেগুন কাঠ" className="w-full h-11 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl px-4 text-sm font-bold text-[#2D1505] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-[#A0826C] uppercase tracking-wider">মাপ (Dimensions)</label>
                    <input type="text" name="dimensions" defaultValue={editingProduct?.dimensions || ''} placeholder="যেমন: ৫ ফিট / ২ ফিট" className="w-full h-11 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl px-4 text-sm font-bold text-[#2D1505] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-[#A0826C] uppercase tracking-wider">রঙ (Color)</label>
                    <input type="text" name="color" defaultValue={editingProduct?.color || ''} placeholder="যেমন: বাদামী" className="w-full h-11 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl px-4 text-sm font-bold text-[#2D1505] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all" />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <div className="flex flex-wrap gap-6 items-center bg-[#FDF8F5] p-4 rounded-2xl border border-[#E8D5C4]">
                      <label className="flex items-center gap-2 text-xs font-bold text-[#2D1505] cursor-pointer">
                        স্টক পরিমাণ:
                        <input type="number" name="inStock" min="0" step="1" defaultValue={editingProduct?.inStock ?? 0} required className="w-20 h-9 bg-white border border-[#E8D5C4] rounded-xl px-2 text-xs font-bold text-[#2D1505]" />
                      </label>
                      <label className="flex items-center gap-2 text-xs font-bold text-[#2D1505] cursor-pointer">
                        <input type="checkbox" name="isFeatured" defaultChecked={editingProduct ? editingProduct.isFeatured : false} className="w-4 h-4 rounded text-[#7C4B2A]" />
                        ফিচার্ড পণ্য
                      </label>
                      <label className="flex items-center gap-2 text-xs font-bold text-[#2D1505] cursor-pointer">
                        <input type="checkbox" name="isTopSelling" defaultChecked={editingProduct ? editingProduct.isTopSelling : false} className="w-4 h-4 rounded text-[#7C4B2A]" />
                        টপ সেলিং
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 px-6 sm:px-8 py-4 bg-[#FDF8F5] border-t border-[#E8D5C4] shrink-0">
                <button type="button" className="px-5 py-2.5 rounded-xl border border-[#E8D5C4] bg-white text-xs font-black text-[#A0826C] hover:text-[#7C4B2A] hover:bg-[#7C4B2A]/5 transition-all cursor-pointer" onClick={() => setShowModal(false)} disabled={isSaving}>বাতিল</button>
                <button type="submit" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7C4B2A] to-[#5D321A] text-white px-6 py-2.5 rounded-xl text-xs font-black shadow-md shadow-[#7C4B2A]/20 hover:shadow-lg transition-all cursor-pointer" disabled={isSaving}>
                  {isSaving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
