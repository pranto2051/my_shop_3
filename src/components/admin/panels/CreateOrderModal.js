'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import styles from './CreateOrderModal.module.css';
import { 
  FaXmark, FaUser, FaPhone, FaMagnifyingGlass, 
  FaMinus, FaPlus, FaLocationDot, FaNoteSticky,
  FaCalendarDays, FaFloppyDisk, FaStar,
  FaCircleCheck, FaArrowRight
} from 'react-icons/fa6';
import productsRaw from '@/data/products';

export default function CreateOrderModal({ onClose }) {
  const { state, dispatch } = useAdmin();
  const { orderStages } = state;
  const [isSuccess, setIsSuccess] = useState(false);
  const [newOrderId, setNewOrderId] = useState('');
  
  const getArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (val.default && Array.isArray(val.default)) return val.default;
    if (val.allProducts && Array.isArray(val.allProducts)) return val.allProducts;
    return [];
  };

  const allProducts = getArray(productsRaw);

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    deliveryAddress: '',
    orderNote: '',
    quantity: 1,
    advancePaid: 0,
    estimatedDelivery: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const [productSearch, setProductSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [errors, setErrors] = useState({});

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProductDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle background scroll lock
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);

  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
    p.id.toLowerCase().includes(productSearch.toLowerCase())
  ).slice(0, 5);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setProductSearch('');
    setShowProductDropdown(false);
    setErrors({ ...errors, product: null });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName) newErrors.customerName = 'গ্রাহকের নাম দিন';
    if (!formData.customerPhone) {
      newErrors.customerPhone = 'মোবাইল নম্বর দিন';
    } else if (!/^01\d{9}$/.test(formData.customerPhone)) {
      newErrors.customerPhone = 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন';
    }
    if (!selectedProduct) newErrors.product = 'একটি পণ্য নির্বাচন করুন';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const totalPrice = selectedProduct.price * formData.quantity;
    const remainingAmount = totalPrice - formData.advancePaid;

    const createdOrderId = `ORD-${String(state.orders.length + 1).padStart(3, '0')}`;
    const newOrder = {
      id: createdOrderId,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      productImage: selectedProduct.image,
      quantity: formData.quantity,
      totalPrice: totalPrice,
      advancePaid: formData.advancePaid,
      remainingAmount: remainingAmount,
      deliveryAddress: formData.deliveryAddress,
      estimatedDelivery: formData.estimatedDelivery,
      orderNote: formData.orderNote,
      currentStageId: orderStages[0].id,
      currentStageIndex: 0,
      stageHistory: [
        {
          stageId: orderStages[0].id,
          stageName: orderStages[0].name,
          timestamp: new Date().toISOString(),
          adminNote: "অর্ডার সফলভাবে গ্রহণ করা হয়েছে। ধন্যবাদ!",
          completedBy: "Admin"
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "active"
    };

    dispatch({ type: 'CREATE_ORDER', payload: newOrder });
    setNewOrderId(createdOrderId);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className={styles.overlay}>
        <div className={styles.successModal}>
          <div className={styles.successIconWrapper}>
            <div className={styles.successCircle}>
              <FaCircleCheck className={styles.successCheck} />
            </div>
            <div className={styles.confetti}></div>
          </div>
          
          <div className={styles.successContent}>
            <h2 className={styles.successTitle}>অর্ডার সফল হয়েছে!</h2>
            <p className={styles.successText}>
              অভিনন্দন! আপনার নতুন অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
            </p>
            
            <div className={styles.orderSummaryCard}>
              <div className={styles.summaryRow}>
                <span>অর্ডার আইডি:</span>
                <span className={styles.summaryValue}>{newOrderId}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>গ্রাহক:</span>
                <span className={styles.summaryValue}>{formData.customerName}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>মোট মূল্য:</span>
                <span className={styles.summaryValue}>৳{(selectedProduct.price * formData.quantity).toLocaleString()}</span>
              </div>
            </div>

            <button className={styles.successCloseBtn} onClick={onClose}>
              ড্যাশবোর্ডে ফিরে যান <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.decorativeBand}>
          <div className={styles.newBadge}><FaStar /> নতুন</div>
          <h2 className={styles.modalTitle}>নতুন অর্ডার গ্রহণ</h2>
          <button className={styles.closeBtn} onClick={onClose}><FaXmark /></button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.scrollArea}>
            <div className={styles.formGrid}>
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>গ্রাহকের নাম *</label>
                  <div className={styles.inputWrapper}>
                    <FaUser className={styles.inputIcon} />
                    <input 
                      type="text" 
                      placeholder="গ্রাহকের নাম লিখুন..."
                      className={`${styles.input} ${errors.customerName ? styles.inputError : ''}`}
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    />
                  </div>
                  {errors.customerName && <span className={styles.errorText}>{errors.customerName}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>মোবাইল নম্বর *</label>
                  <div className={styles.inputWrapper}>
                    <FaPhone className={styles.inputIcon} />
                    <input 
                      type="text" 
                      placeholder="01XXXXXXXXX"
                      className={`${styles.input} ${styles.fira} ${errors.customerPhone ? styles.inputError : ''}`}
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      maxLength={11}
                    />
                  </div>
                  {errors.customerPhone && <span className={styles.errorText}>{errors.customerPhone}</span>}
                </div>
              </div>

              <div className={styles.formGroup}>
              <label className={styles.label}>পণ্য নির্বাচন *</label>
              <div className={styles.productSelector} ref={dropdownRef}>
                {!selectedProduct ? (
                  <div className={styles.searchWrapper}>
                    <FaMagnifyingGlass className={styles.inputIcon} />
                    <input 
                      type="text" 
                      placeholder="পণ্যের নাম বা ID দিয়ে খুঁজুন..."
                      className={`${styles.input} ${errors.product ? styles.inputError : ''}`}
                      value={productSearch}
                      onChange={(e) => {
                        setProductSearch(e.target.value);
                        setShowProductDropdown(true);
                      }}
                      onFocus={() => setShowProductDropdown(true)}
                    />
                  </div>
                ) : (
                  <div className={styles.selectedProductCard}>
                    <img src={selectedProduct.image} alt={selectedProduct.name} className={styles.pThumb} />
                    <div className={styles.pInfo}>
                      <div className={styles.pName}>{selectedProduct.name}</div>
                      <div className={styles.pDetails}>
                        <span className={styles.pId}>{selectedProduct.id}</span>
                        <span className={styles.pPrice}>৳{selectedProduct.price.toLocaleString('bn-BD')}</span>
                      </div>
                    </div>
                    <button className={styles.clearProduct} onClick={() => setSelectedProduct(null)}>
                      <FaXmark />
                    </button>
                  </div>
                )}

                {showProductDropdown && productSearch && (
                  <div className={styles.dropdown}>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map(product => (
                        <div 
                          key={product.id} 
                          className={styles.dropdownItem}
                          onClick={() => handleProductSelect(product)}
                        >
                          <img src={product.image} alt="" className={styles.miniThumb} />
                          <div className={styles.itemInfo}>
                            <div className={styles.itemName}>{product.name}</div>
                            <div className={styles.itemId}>{product.id} — ৳{product.price.toLocaleString('bn-BD')}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={styles.noResults}>কোন পণ্য পাওয়া যায়নি</div>
                    )}
                  </div>
                )}
              </div>
              {errors.product && <span className={styles.errorText}>{errors.product}</span>}
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label className={styles.label}>পরিমাণ *</label>
                <div className={styles.qtySelector}>
                  <button type="button" onClick={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}>
                    <FaMinus />
                  </button>
                  <span className={styles.fira}>{formData.quantity}</span>
                  <button type="button" onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}>
                    <FaPlus />
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>মোট মূল্য</label>
                <div className={styles.priceDisplay}>
                  ৳{((selectedProduct?.price || 0) * formData.quantity).toLocaleString('bn-BD')}
                </div>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label className={styles.label}>অগ্রিম প্রদান (৳)</label>
                <input 
                  type="number" 
                  className={styles.input}
                  value={formData.advancePaid}
                  onChange={(e) => setFormData({ ...formData, advancePaid: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>বাকি টাকা</label>
                <div className={`${styles.priceDisplay} ${styles.sienna}`}>
                  ৳{(((selectedProduct?.price || 0) * formData.quantity) - formData.advancePaid).toLocaleString('bn-BD')}
                </div>
              </div>
            </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>ডেলিভারি ঠিকানা</label>
                  <div className={styles.inputWrapper}>
                    <FaLocationDot className={styles.inputIcon} />
                    <input 
                      type="text" 
                      placeholder="পুরো ঠিকানা লিখুন..."
                      className={styles.input}
                      value={formData.deliveryAddress}
                      onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>সম্ভাব্য ডেলিভারি তারিখ</label>
                  <div className={styles.inputWrapper}>
                    <FaCalendarDays className={styles.inputIcon} />
                    <input 
                      type="date" 
                      className={`${styles.input} ${styles.fira}`}
                      value={formData.estimatedDelivery}
                      onChange={(e) => setFormData({ ...formData, estimatedDelivery: e.target.value })}
                    />
                  </div>
                </div>
              </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>অর্ডার নোট</label>
              <div className={styles.inputWrapper}>
                <FaNoteSticky className={styles.inputIcon} style={{ top: '15px', transform: 'none' }} />
                <textarea 
                  placeholder="বিশেষ কোন অনুরোধ থাকলে লিখুন..."
                  className={styles.textarea}
                  rows={2}
                  value={formData.orderNote}
                  onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
                />
              </div>
            </div>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            <FaFloppyDisk /> অর্ডার সংরক্ষণ করুন
          </button>
        </form>
      </div>
    </div>
  );
}
