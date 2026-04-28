(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/data/shopInfo.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const storeInfo = {
    name: "মা ফার্নিচার",
    contactLabel: "যোগাযোগ করুন",
    showroomAddress: {
        label: "শোরুমের ঠিকানা",
        address: "সাতারপাড়া বাজার, দৌলতপুর, কুষ্টিয়া"
    },
    callNumbers: {
        label: "সরাসরি কল করুন",
        numbers: [
            "+8801979728818",
            "+8801729728818"
        ]
    },
    whatsapp: {
        label: "WhatsApp মেসেজ",
        number: "+8801979728818"
    },
    email: {
        label: "ইমেইল",
        address: "info@my-shop.com"
    },
    directMessageLabel: "সরাসরি মেসেজ দিন",
    openingHours: {
        label: "খোলা থাকার সময়",
        schedule: [
            "প্রতিদিন: সকাল ৯:০০ - রাত ৯:০০",
            "শুক্রবার: সকাল ১০:০০ - রাত ৯:০০"
        ]
    }
};
const __TURBOPACK__default__export__ = storeInfo;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function ProductModal({ isOpen, onClose, product, categories, storeInfo }) {
    _s();
    const [activeImage, setActiveImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductModal.useEffect": ()=>{
            if (product) {
                setActiveImage(product.image);
            }
        }
    }["ProductModal.useEffect"], [
        product
    ]);
    if (!isOpen || !product) return null;
    const cat = categories.find((c)=>c.id === product.categoryId);
    const discount = product.originalPrice > product.price ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    const waText = encodeURIComponent(`আসসালামু আলাইকুম, আমি ${product.name} (ID: ${product.id}) অর্ডার করতে চাই। পরিমাণ: 1 টি।`);
    const images = product.images || [
        product.image
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modal-overlay active",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal-container active",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "modal-close",
                    onClick: onClose,
                    "aria-label": "বন্ধ করুন",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "fas fa-times"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-content",
                    id: "modalContent",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "modal-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: activeImage || product.image,
                                    alt: product.name,
                                    className: "modal-main-img",
                                    id: "modalMainImg",
                                    onError: (e)=>{
                                        e.target.src = 'https://placehold.co/600x500/8B4E38/FAF6F1?text=No+Image';
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "modal-thumbnails",
                                    children: images.map((img, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: img,
                                            alt: `${product.name} - ছবি ${i + 1}`,
                                            loading: "lazy",
                                            className: `modal-thumb ${activeImage === img ? 'active' : ''}`,
                                            onClick: ()=>setActiveImage(img),
                                            onError: (e)=>{
                                                e.target.src = 'https://placehold.co/600x500/8B4E38/FAF6F1?text=No+Image';
                                            }
                                        }, i, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                            lineNumber: 39,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                    lineNumber: 37,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "modal-right",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "modal-id",
                                    onClick: ()=>navigator.clipboard.writeText(product.id),
                                    title: "ক্লিক করে কপি করুন",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fas fa-copy"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                            lineNumber: 53,
                                            columnNumber: 15
                                        }, this),
                                        " #",
                                        product.id
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "modal-name",
                                    children: product.name
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this),
                                product.nameEn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: '0.85rem',
                                        color: 'var(--text-muted)',
                                        marginBottom: '0.75rem',
                                        fontWeight: 500
                                    },
                                    children: product.nameEn
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                    lineNumber: 57,
                                    columnNumber: 32
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "modal-rating-row",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "modal-rating-stars",
                                            children: [
                                                1,
                                                2,
                                                3,
                                                4,
                                                5
                                            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: `fas fa-star${i <= Math.floor(product.rating) ? '' : i - product.rating < 1 && i - product.rating > 0 ? '-half-alt' : '-o'}`,
                                                    style: {
                                                        color: 'var(--accent)'
                                                    }
                                                }, i, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 62,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                            lineNumber: 60,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "modal-rating-count",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: product.rating.toFixed(1)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 69,
                                                    columnNumber: 52
                                                }, this),
                                                " তারকা (",
                                                product.reviewCount,
                                                " রিভিউ)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                            lineNumber: 69,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "modal-price-row",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "modal-price",
                                            children: [
                                                "৳",
                                                product.price.toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                            lineNumber: 73,
                                            columnNumber: 15
                                        }, this),
                                        product.originalPrice > product.price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "modal-original-price",
                                                    children: [
                                                        "৳",
                                                        product.originalPrice.toLocaleString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 76,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "modal-discount-badge",
                                                    children: [
                                                        "-",
                                                        discount,
                                                        "% ছাড়"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 77,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "modal-description",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: product.description
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                    lineNumber: 82,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "modal-specs",
                                    children: [
                                        product.material && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "spec-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "spec-label",
                                                    children: "উপাদান"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 89,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "spec-value",
                                                    children: product.material
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 90,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                            lineNumber: 88,
                                            columnNumber: 17
                                        }, this),
                                        product.dimensions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "spec-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "spec-label",
                                                    children: "মাপ"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 95,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "spec-value",
                                                    children: product.dimensions
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 96,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                            lineNumber: 94,
                                            columnNumber: 17
                                        }, this),
                                        product.color && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "spec-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "spec-label",
                                                    children: "রঙ"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 101,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "spec-value",
                                                    children: product.color
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 102,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                            lineNumber: 100,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "spec-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "spec-label",
                                                    children: "ক্যাটাগরি"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 106,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "spec-value",
                                                    children: cat ? cat.name : '—'
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 107,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                            lineNumber: 105,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "spec-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "spec-label",
                                                    children: "স্টক"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 110,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "spec-value",
                                                    children: product.inStock ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "spec-in-stock",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "fas fa-check-circle"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                                lineNumber: 113,
                                                                columnNumber: 55
                                                            }, this),
                                                            " পাওয়া যাচ্ছে"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                        lineNumber: 113,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "spec-out-stock",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "fas fa-times-circle"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                                lineNumber: 114,
                                                                columnNumber: 56
                                                            }, this),
                                                            " স্টকে নেই"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                        lineNumber: 114,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 111,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "modal-actions",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: `https://wa.me/88${storeInfo.whatsapp.number.replace(/-/g, '')}?text=${waText}`,
                                            className: "modal-wa-btn",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "fab fa-whatsapp"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 123,
                                                    columnNumber: 17
                                                }, this),
                                                " WhatsApp এ অর্ডার করুন"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                            lineNumber: 121,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "modal-call-btn",
                                            onClick: ()=>window.location.href = `tel:${storeInfo.callNumbers.numbers[0].replace(/-/g, '')}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "fas fa-phone-alt"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 126,
                                                    columnNumber: 17
                                                }, this),
                                                " কল করুন"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                            lineNumber: 125,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(ProductModal, "JNY4J5z+1NUJ7oAGDQBrdGjB/Tc=");
_c = ProductModal;
var _c;
__turbopack_context__.k.register(_c, "ProductModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CategoryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$products$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/data/products.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$categories$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/data/categories.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$shopInfo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/data/shopInfo.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$ProductModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function CategoryPage({ params: paramsPromise }) {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(paramsPromise);
    const categoryId = params.id;
    const getArray = (val)=>{
        if (!val) return [];
        if (Array.isArray(val)) return val;
        if (val.default && Array.isArray(val.default)) return val.default;
        if (val.allProducts && Array.isArray(val.allProducts)) return val.allProducts;
        return [];
    };
    const productsData = getArray(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$products$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
    const categories = getArray(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$categories$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
    const category = categories.find((c)=>c.id === categoryId);
    console.log('CategoryPage - id:', categoryId);
    console.log('CategoryPage - category found:', category?.name);
    console.log('CategoryPage - total products:', productsData.length);
    const [filteredProducts, setFilteredProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [minPrice, setMinPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [maxPrice, setMaxPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('newest');
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedProduct, setSelectedProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CategoryPage.useEffect": ()=>{
            let result = productsData.filter({
                "CategoryPage.useEffect.result": (p)=>p.categoryId === categoryId
            }["CategoryPage.useEffect.result"]);
            if (minPrice) {
                result = result.filter({
                    "CategoryPage.useEffect": (p)=>p.price >= parseInt(minPrice)
                }["CategoryPage.useEffect"]);
            }
            if (maxPrice) {
                result = result.filter({
                    "CategoryPage.useEffect": (p)=>p.price <= parseInt(maxPrice)
                }["CategoryPage.useEffect"]);
            }
            switch(sortBy){
                case 'price_asc':
                    result.sort({
                        "CategoryPage.useEffect": (a, b)=>a.price - b.price
                    }["CategoryPage.useEffect"]);
                    break;
                case 'price_desc':
                    result.sort({
                        "CategoryPage.useEffect": (a, b)=>b.price - a.price
                    }["CategoryPage.useEffect"]);
                    break;
                case 'popular':
                    result.sort({
                        "CategoryPage.useEffect": (a, b)=>(b.reviewCount || 0) - (a.reviewCount || 0)
                    }["CategoryPage.useEffect"]);
                    break;
                default:
                    result.sort({
                        "CategoryPage.useEffect": (a, b)=>b.id.localeCompare(a.id)
                    }["CategoryPage.useEffect"]);
            }
            setFilteredProducts(result);
        }
    }["CategoryPage.useEffect"], [
        categoryId,
        minPrice,
        maxPrice,
        sortBy
    ]);
    if (!category) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container",
            style: {
                padding: '100px 20px',
                textAlign: 'center'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    children: "ক্যাটাগরি পাওয়া যায়নি"
                }, void 0, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                    lineNumber: 68,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "btn-go-home",
                    children: "হোমে ফিরুন"
                }, void 0, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
            lineNumber: 67,
            columnNumber: 7
        }, this);
    }
    const openProductDetail = (product)=>{
        setSelectedProduct(product);
        setIsModalOpen(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "inner-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "breadcrumb-bar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "breadcrumb",
                        "aria-label": "ব্রেডক্রাম্ব",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                children: "হোম"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-chevron-right"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: category.name
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "category-hero-banner",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "cat-hero-inner",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cat-hero-icon",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: `fas fa-${category.icon}`
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                    lineNumber: 94,
                                    columnNumber: 44
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cat-hero-text",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        children: category.name
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                        lineNumber: 96,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: category.description
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "cat-product-count",
                                        children: [
                                            filteredProducts.length,
                                            "টি পণ্য পাওয়া গেছে"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                        lineNumber: 93,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "category-layout",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                            className: `filter-sidebar ${isSidebarOpen ? 'active' : ''}`,
                            id: "filterSidebar",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sidebar-header",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "fas fa-sliders-h"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                    lineNumber: 108,
                                                    columnNumber: 19
                                                }, this),
                                                " ফিল্টার"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                            lineNumber: 108,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "sidebar-close-btn",
                                            onClick: ()=>setIsSidebarOpen(false),
                                            "aria-label": "ফিল্টার বন্ধ করুন",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fas fa-times"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                lineNumber: 109,
                                                columnNumber: 124
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "filter-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            children: "মূল্য পরিসীমা"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "price-range-inputs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    placeholder: "সর্বনিম্ন",
                                                    value: minPrice,
                                                    onChange: (e)=>setMinPrice(e.target.value),
                                                    className: "filter-input"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                    lineNumber: 115,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                    lineNumber: 122,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    placeholder: "সর্বোচ্চ",
                                                    value: maxPrice,
                                                    onChange: (e)=>setMaxPrice(e.target.value),
                                                    className: "filter-input"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                    lineNumber: 123,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                            lineNumber: 114,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "filter-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            children: "সাজানো"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                            lineNumber: 134,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "sort-radio-group",
                                            children: [
                                                'newest',
                                                'price_asc',
                                                'price_desc',
                                                'popular'
                                            ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "radio-label",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            name: "catSort",
                                                            value: opt,
                                                            checked: sortBy === opt,
                                                            onChange: ()=>setSortBy(opt)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                            lineNumber: 138,
                                                            columnNumber: 21
                                                        }, this),
                                                        opt === 'newest' ? 'সর্বশেষ যোগ' : opt === 'price_asc' ? 'মূল্য (কম–বেশি)' : opt === 'price_desc' ? 'মূল্য (বেশি–কম)' : 'জনপ্রিয়তা'
                                                    ]
                                                }, opt, true, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                    lineNumber: 137,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                            lineNumber: 135,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "filter-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            children: "অন্যান্য ক্যাটাগরি"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                            lineNumber: 152,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "sidebar-cat-list",
                                            children: categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/category/${cat.id}`,
                                                        className: cat.id === categoryId ? 'active' : '',
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: `fas fa-${cat.icon}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                                lineNumber: 157,
                                                                columnNumber: 23
                                                            }, this),
                                                            " ",
                                                            cat.name
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                        lineNumber: 156,
                                                        columnNumber: 21
                                                    }, this)
                                                }, cat.id, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                    lineNumber: 155,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                            lineNumber: 153,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                    lineNumber: 151,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "products-main",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "products-toolbar",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "toolbar-left",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "filter-toggle-btn",
                                                    onClick: ()=>setIsSidebarOpen(true),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "fas fa-sliders-h"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                            lineNumber: 169,
                                                            columnNumber: 19
                                                        }, this),
                                                        " ফিল্টার"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                    lineNumber: 168,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "result-count",
                                                    children: [
                                                        filteredProducts.length,
                                                        "টি পণ্য"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                    lineNumber: 171,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                            lineNumber: 167,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "toolbar-right",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "sort-select-toolbar",
                                                value: sortBy,
                                                onChange: (e)=>setSortBy(e.target.value),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "newest",
                                                        children: "সর্বশেষ যোগ"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                        lineNumber: 175,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "price_asc",
                                                        children: "মূল্য (কম–বেশি)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                        lineNumber: 176,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "price_desc",
                                                        children: "মূল্য (বেশি–কম)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                        lineNumber: 177,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "popular",
                                                        children: "জনপ্রিয়তা"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                        lineNumber: 178,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                lineNumber: 174,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                            lineNumber: 173,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                    lineNumber: 166,
                                    columnNumber: 13
                                }, this),
                                filteredProducts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "empty-state",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "empty-icon",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fas fa-box-open"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                lineNumber: 185,
                                                columnNumber: 45
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                            lineNumber: 185,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            children: "কোন পণ্য নেই"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                            lineNumber: 186,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "আপনার ফিল্টার অনুযায়ী কোন পণ্য খুঁজে পাওয়া যায়নি।"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                            lineNumber: 187,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "btn-go-home",
                                            onClick: ()=>{
                                                setMinPrice('');
                                                setMaxPrice('');
                                                setSortBy('newest');
                                            },
                                            children: "ফিল্টার মুছুন"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                            lineNumber: 188,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                    lineNumber: 184,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "products-grid",
                                    id: "categoryProductGrid",
                                    children: filteredProducts.map((product, index)=>{
                                        const discount = product.originalPrice > product.price ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "product-card fade-in-up",
                                            style: {
                                                animationDelay: `${index * 0.05}s`
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "card-image-wrap",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: product.image,
                                                            alt: product.name,
                                                            loading: "lazy",
                                                            className: "card-img"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                            lineNumber: 198,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "card-badges",
                                                            children: [
                                                                discount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "badge badge-discount",
                                                                    children: [
                                                                        "-",
                                                                        discount,
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                                    lineNumber: 200,
                                                                    columnNumber: 44
                                                                }, this),
                                                                product.isTopSelling && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "badge badge-top",
                                                                    children: "TOP"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                                    lineNumber: 201,
                                                                    columnNumber: 52
                                                                }, this),
                                                                !product.inStock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "badge badge-out",
                                                                    children: "স্টক নেই"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                                    lineNumber: 202,
                                                                    columnNumber: 48
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                            lineNumber: 199,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "card-overlay-actions",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: `https://wa.me/88${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$shopInfo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].whatsapp.number.replace(/-/g, '')}?text=আমি+${encodeURIComponent(product.name)}+(ID%3A+${product.id})+অর্ডার+করতে+চাই।`,
                                                                className: "card-wa-btn",
                                                                target: "_blank",
                                                                rel: "noopener noreferrer",
                                                                "aria-label": "WhatsApp অর্ডার",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "fab fa-whatsapp"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                                    lineNumber: 205,
                                                                    columnNumber: 281
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                                lineNumber: 205,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                            lineNumber: 204,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "product-id-badge",
                                                            onClick: ()=>navigator.clipboard.writeText(product.id),
                                                            "aria-label": "ID কপি করুন",
                                                            children: [
                                                                "#",
                                                                product.id
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                            lineNumber: 207,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                    lineNumber: 197,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "card-body",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "category-tag",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: `fas fa-${category.icon}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                                    lineNumber: 210,
                                                                    columnNumber: 55
                                                                }, this),
                                                                " ",
                                                                category.name
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                            lineNumber: 210,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "product-name",
                                                            children: product.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                            lineNumber: 211,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "rating",
                                                            children: [
                                                                [
                                                                    1,
                                                                    2,
                                                                    3,
                                                                    4,
                                                                    5
                                                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: `fas fa-star${i <= Math.floor(product.rating) ? '' : i - product.rating < 1 && i - product.rating > 0 ? '-half-alt' : '-o'}`
                                                                    }, i, false, {
                                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                                        lineNumber: 214,
                                                                        columnNumber: 29
                                                                    }, this)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "(",
                                                                        product.reviewCount,
                                                                        ")"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                                    lineNumber: 216,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                            lineNumber: 212,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "price-row",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "price",
                                                                    children: [
                                                                        "৳",
                                                                        product.price.toLocaleString()
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                                    lineNumber: 219,
                                                                    columnNumber: 27
                                                                }, this),
                                                                product.originalPrice > product.price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "original-price",
                                                                    children: [
                                                                        "৳",
                                                                        product.originalPrice.toLocaleString()
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                                    lineNumber: 220,
                                                                    columnNumber: 69
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                            lineNumber: 218,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "btn-detail btn-card-detail",
                                                            onClick: ()=>openProductDetail(product),
                                                            children: "বিস্তারিত দেখুন"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                            lineNumber: 222,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                                    lineNumber: 209,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, product.id, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                            lineNumber: 196,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                                    lineNumber: 191,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                            lineNumber: 165,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                    lineNumber: 105,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$ProductModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isModalOpen,
                onClose: ()=>setIsModalOpen(false),
                product: selectedProduct,
                categories: categories,
                storeInfo: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$shopInfo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
                lineNumber: 233,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/category/[id]/page.js",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_s(CategoryPage, "NF/YDDhMLrP9u6KmflBy7DWwPbU=");
_c = CategoryPage;
var _c;
__turbopack_context__.k.register(_c, "CategoryPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_My%20Shop_Backup%20Shop%203_Css%20Convart%20V2_my_shop_3_src_0yf50bh._.js.map