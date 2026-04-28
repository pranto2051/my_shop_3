module.exports = [
"[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/data/shopInfo.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function ProductModal({ isOpen, onClose, product, categories, storeInfo }) {
    const [activeImage, setActiveImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (product) {
            setActiveImage(product.image);
        }
    }, [
        product
    ]);
    if (!isOpen || !product) return null;
    const cat = categories.find((c)=>c.id === product.categoryId);
    const discount = product.originalPrice > product.price ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    const waText = encodeURIComponent(`আসসালামু আলাইকুম, আমি ${product.name} (ID: ${product.id}) অর্ডার করতে চাই। পরিমাণ: 1 টি।`);
    const images = product.images || [
        product.image
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modal-overlay active",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal-container active",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "modal-close",
                    onClick: onClose,
                    "aria-label": "বন্ধ করুন",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-content",
                    id: "modalContent",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "modal-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "modal-thumbnails",
                                    children: images.map((img, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "modal-right",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "modal-id",
                                    onClick: ()=>navigator.clipboard.writeText(product.id),
                                    title: "ক্লিক করে কপি করুন",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "modal-name",
                                    children: product.name
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this),
                                product.nameEn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "modal-rating-row",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "modal-rating-stars",
                                            children: [
                                                1,
                                                2,
                                                3,
                                                4,
                                                5
                                            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "modal-rating-count",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "modal-price-row",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        product.originalPrice > product.price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "modal-description",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "modal-specs",
                                    children: [
                                        product.material && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "spec-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "spec-label",
                                                    children: "উপাদান"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 89,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        product.dimensions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "spec-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "spec-label",
                                                    children: "মাপ"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 95,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        product.color && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "spec-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "spec-label",
                                                    children: "রঙ"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 101,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "spec-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "spec-label",
                                                    children: "ক্যাটাগরি"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 106,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "spec-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "spec-label",
                                                    children: "স্টক"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js",
                                                    lineNumber: 110,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "spec-value",
                                                    children: product.inStock ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "spec-in-stock",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
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
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "spec-out-stock",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "modal-actions",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: `https://wa.me/88${storeInfo.whatsapp.number.replace(/-/g, '')}?text=${waText}`,
                                            className: "modal-wa-btn",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "modal-call-btn",
                                            onClick: ()=>window.location.href = `tel:${storeInfo.callNumbers.numbers[0].replace(/-/g, '')}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
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
}),
"[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function ProductCard({ product, categories, storeInfo, openProductDetail, index }) {
    const cat = categories.find((c)=>c.id === product.categoryId);
    const discount = product.originalPrice > product.price ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "product-card",
        style: {
            animationDelay: `${index * 0.08}s`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-image-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: product.image,
                        alt: product.name,
                        loading: "lazy",
                        className: "card-img"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-badges",
                        children: [
                            discount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "badge badge-discount",
                                children: [
                                    "-",
                                    discount,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                                lineNumber: 13,
                                columnNumber: 28
                            }, this),
                            product.isTopSelling && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "badge badge-top",
                                children: "TOP"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                                lineNumber: 14,
                                columnNumber: 36
                            }, this),
                            !product.inStock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "badge badge-out",
                                children: "স্টক নেই"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                                lineNumber: 15,
                                columnNumber: 32
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-overlay-actions",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: `https://wa.me/88${storeInfo.whatsapp.number.replace(/-/g, '')}?text=আমি+${encodeURIComponent(product.name)}+(ID%3A+${product.id})+অর্ডার+করতে+চাই।`,
                            className: "card-wa-btn",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            "aria-label": "WhatsApp অর্ডার",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fab fa-whatsapp"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                                lineNumber: 18,
                                columnNumber: 265
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "product-id-badge",
                        onClick: ()=>navigator.clipboard.writeText(product.id),
                        "aria-label": "ID কপি করুন",
                        children: [
                            "#",
                            product.id
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-body",
                children: [
                    cat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "category-tag",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: `fas fa-${cat.icon}`
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                                lineNumber: 23,
                                columnNumber: 47
                            }, this),
                            " ",
                            cat.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                        lineNumber: 23,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "product-name",
                        children: product.name
                    }, void 0, false, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rating",
                        children: [
                            [
                                1,
                                2,
                                3,
                                4,
                                5
                            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: `fas fa-star${i <= Math.floor(product.rating) ? '' : i - product.rating < 1 && i - product.rating > 0 ? '-half-alt' : ''}`
                                }, i, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                                    lineNumber: 27,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "(",
                                    product.reviewCount,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "price-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "price",
                                children: [
                                    "৳",
                                    product.price.toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            product.originalPrice > product.price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "original-price",
                                children: [
                                    "৳",
                                    product.originalPrice.toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                                lineNumber: 33,
                                columnNumber: 53
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn-detail btn-card-detail",
                        onClick: ()=>openProductDetail(product),
                        children: "বিস্তারিত দেখুন"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$products$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/data/products.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$categories$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/data/categories.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$shopInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/data/shopInfo.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$ProductModal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$ProductCard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
function SearchResults() {
    const getArray = (val)=>{
        if (!val) return [];
        if (Array.isArray(val)) return val;
        if (val.default && Array.isArray(val.default)) return val.default;
        if (val.allProducts && Array.isArray(val.allProducts)) return val.allProducts;
        return [];
    };
    const productsData = getArray(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$products$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
    const categories = getArray(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$categories$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
    const storeInfo = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$shopInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].default || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$shopInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const query = searchParams.get('q') || '';
    const categoryId = searchParams.get('categoryId') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const sort = searchParams.get('sort') || '';
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedProduct, setSelectedProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let filtered = [
            ...productsData
        ];
        if (query) {
            const q = query.toLowerCase().trim();
            filtered = filtered.filter((p)=>{
                const idMatch = p.id.toLowerCase() === q;
                const nameMatch = p.name.toLowerCase().includes(q);
                const nameEnMatch = p.nameEn?.toLowerCase().includes(q);
                const tagMatch = p.tags && p.tags.some((t)=>t.toLowerCase().includes(q));
                return idMatch || nameMatch || nameEnMatch || tagMatch;
            });
        }
        if (categoryId && categoryId !== 'all') {
            filtered = filtered.filter((p)=>p.categoryId === categoryId);
        }
        if (minPrice) {
            filtered = filtered.filter((p)=>p.price >= parseInt(minPrice));
        }
        if (maxPrice) {
            filtered = filtered.filter((p)=>p.price <= parseInt(maxPrice));
        }
        switch(sort){
            case 'price_asc':
                filtered.sort((a, b)=>a.price - b.price);
                break;
            case 'price_desc':
                filtered.sort((a, b)=>b.price - a.price);
                break;
            case 'popular':
                filtered.sort((a, b)=>(b.reviewCount || 0) - (a.reviewCount || 0));
                break;
            default:
                filtered.sort((a, b)=>b.id.localeCompare(a.id));
        }
        setResults(filtered);
    }, [
        query,
        categoryId,
        minPrice,
        maxPrice,
        sort
    ]);
    const openProductDetail = (product)=>{
        setSelectedProduct(product);
        setIsModalOpen(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "search-page-header",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container",
                    children: query ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: [
                            '"',
                            query,
                            '" এর জন্য ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "result-number",
                                children: [
                                    results.length,
                                    "টি"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                lineNumber: 89,
                                columnNumber: 45
                            }, this),
                            " পণ্য পাওয়া গেছে"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                        lineNumber: 89,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: [
                            "সকল পণ্য — ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "result-number",
                                children: [
                                    results.length,
                                    "টি"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                lineNumber: 91,
                                columnNumber: 28
                            }, this),
                            " পণ্য"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                        lineNumber: 91,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                    lineNumber: 87,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "search-filter-bar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        action: "/search",
                        method: "GET",
                        className: "search-bar-form compact",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "search-fields",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "search-field",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fas fa-search field-icon"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                            lineNumber: 101,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "q",
                                            defaultValue: query,
                                            placeholder: "পণ্যের নাম বা ID...",
                                            className: "search-input"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                            lineNumber: 102,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                    lineNumber: 100,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "search-field",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fas fa-th-large field-icon"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                            lineNumber: 105,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "categoryId",
                                            defaultValue: categoryId,
                                            className: "search-select",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "সকল ক্যাটাগরি"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                                    lineNumber: 107,
                                                    columnNumber: 19
                                                }, this),
                                                categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: cat.id,
                                                        children: cat.name
                                                    }, cat.id, false, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                                        lineNumber: 109,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                            lineNumber: 106,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                    lineNumber: 104,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "search-field price-range-field",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            name: "minPrice",
                                            defaultValue: minPrice,
                                            placeholder: "সর্বনিম্ন ৳",
                                            className: "search-input price-input",
                                            min: "0"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                            lineNumber: 114,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "price-sep",
                                            children: "—"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                            lineNumber: 115,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            name: "maxPrice",
                                            defaultValue: maxPrice,
                                            placeholder: "সর্বোচ্চ ৳",
                                            className: "search-input price-input",
                                            min: "0"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                            lineNumber: 116,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                    lineNumber: 113,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "search-field",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        name: "sort",
                                        defaultValue: sort,
                                        className: "search-select",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "সর্বশেষ যোগ"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                                lineNumber: 120,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "price_asc",
                                                children: "মূল্য (কম–বেশি)"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                                lineNumber: 121,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "price_desc",
                                                children: "মূল্য (বেশি–কম)"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                                lineNumber: 122,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "popular",
                                                children: "জনপ্রিয়তা"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                                lineNumber: 123,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                    lineNumber: 118,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "search-btn",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fas fa-search"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                            lineNumber: 126,
                                            columnNumber: 60
                                        }, this),
                                        " খুঁজুন"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                            lineNumber: 99,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                    lineNumber: 97,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container",
                children: results.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "empty-state large-empty",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "empty-icon",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-search"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                lineNumber: 135,
                                columnNumber: 41
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "কোন পণ্য পাওয়া যায়নি"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                            lineNumber: 136,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন অথবা ক্যাটাগরি পরিবর্তন করুন।"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                            lineNumber: 137,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "empty-suggestions",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "পরামর্শ:"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                    lineNumber: 139,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    children: categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/search?categoryId=${cat.id}`,
                                                children: cat.name
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                                lineNumber: 142,
                                                columnNumber: 36
                                            }, this)
                                        }, cat.id, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                            lineNumber: 142,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                            lineNumber: 138,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "btn-go-home",
                            children: "হোমে ফিরুন"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                            lineNumber: 146,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                    lineNumber: 134,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "products-grid search-grid",
                    id: "searchResultGrid",
                    children: results.map((product, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$ProductCard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            product: product,
                            categories: categories,
                            storeInfo: storeInfo,
                            openProductDetail: openProductDetail,
                            index: index
                        }, product.id, false, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                            lineNumber: 151,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                    lineNumber: 149,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$ProductModal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isModalOpen,
                onClose: ()=>setIsModalOpen(false),
                product: selectedProduct,
                categories: categories,
                storeInfo: storeInfo
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                lineNumber: 164,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
function SearchPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "inner-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "breadcrumb-bar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "breadcrumb",
                        "aria-label": "ব্রেডক্রাম্ব",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                children: "হোম"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                lineNumber: 181,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-chevron-right"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                lineNumber: 182,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "খোঁজার ফলাফল"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                        lineNumber: 180,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                    lineNumber: 179,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container",
                    style: {
                        padding: '100px 20px',
                        textAlign: 'center'
                    },
                    children: "খুঁজছি..."
                }, void 0, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                    lineNumber: 187,
                    columnNumber: 27
                }, this),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchResults, {}, void 0, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                    lineNumber: 188,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
                lineNumber: 187,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/search/page.js",
        lineNumber: 177,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Desktop_My%20Shop_Backup%20Shop%203_Css%20Convart%20V2_my_shop_3_src_05x-.ri._.js.map