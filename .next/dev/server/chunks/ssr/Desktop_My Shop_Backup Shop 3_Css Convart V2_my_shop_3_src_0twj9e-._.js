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
"[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrderProcess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function OrderProcess({ storeInfo }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "order-process-section",
        id: "order-process",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "section-header center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "কিভাবে অর্ডার করবেন?"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                            lineNumber: 6,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "section-subtitle",
                            children: "মাত্র ৪টি সহজ ধাপে আপনার পছন্দের ফার্নিচার পান"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                            lineNumber: 7,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "section-divider center-div"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                            lineNumber: 8,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                    lineNumber: 5,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "steps-grid",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "step-item",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "step-number",
                                    children: "০১"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 12,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "step-icon-wrap",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-search"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                        lineNumber: 13,
                                        columnNumber: 45
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 13,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: "পণ্য বাছাই"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 14,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "আমাদের বিশাল কালেকশন থেকে আপনার পছন্দের ফার্নিচার বাছাই করুন।"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 15,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "step-connector",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-chevron-right"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                        lineNumber: 16,
                                        columnNumber: 45
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 16,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                            lineNumber: 11,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "step-item",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "step-number",
                                    children: "০২"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 19,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "step-icon-wrap",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fab fa-whatsapp"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                        lineNumber: 20,
                                        columnNumber: 45
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 20,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: "WhatsApp মেসেজ"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 21,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "পণ্যের নাম, ID ও পরিমাণ সহ আমাদের WhatsApp এ মেসেজ করুন।"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 22,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "step-connector",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-chevron-right"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                        lineNumber: 23,
                                        columnNumber: 45
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 23,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "step-item",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "step-number",
                                    children: "০৩"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 26,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "step-icon-wrap",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-check-circle"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                        lineNumber: 27,
                                        columnNumber: 45
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 27,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: "অর্ডার নিশ্চিত"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 28,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "আমাদের টিম আপনার সাথে যোগাযোগ করে অর্ডার নিশ্চিত করবে।"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "step-connector",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-chevron-right"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                        lineNumber: 30,
                                        columnNumber: 45
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 30,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "step-item",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "step-number",
                                    children: "০৪"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "step-icon-wrap",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-truck"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                        lineNumber: 34,
                                        columnNumber: 45
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 34,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: "ডেলিভারি পান"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "নির্ধারিত সময়ে আপনার দরজায় পৌঁছে দেওয়া হবে।"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                    lineNumber: 10,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "order-cta",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: `https://wa.me/88${storeInfo.whatsapp.number.replace(/-/g, '')}?text=আসসালামু+আলাইকুম%2C+আমি+এখনই+অর্ডার+করতে+চাই।`,
                        className: "btn-whatsapp-cta",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fab fa-whatsapp"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                                lineNumber: 41,
                                columnNumber: 13
                            }, this),
                            " এখনই অর্ডার করুন (WhatsApp)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
                    lineNumber: 39,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
            lineNumber: 4,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ContactSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
;
;
function ContactSection({ storeInfo }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "contact",
        className: "contact-section",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "section-header",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: storeInfo.contactLabel
                        }, void 0, false, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                            lineNumber: 8,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "section-divider"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                            lineNumber: 9,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                    lineNumber: 7,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "contact-grid",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "contact-info-card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "contact-logo-area",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "logo-icon",
                                            style: {
                                                color: 'var(--primary)'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "50",
                                                height: "50",
                                                viewBox: "0 0 40 40",
                                                fill: "none",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                        x: "5",
                                                        y: "28",
                                                        width: "30",
                                                        height: "5",
                                                        rx: "2",
                                                        fill: "currentColor"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                        lineNumber: 16,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                        x: "8",
                                                        y: "15",
                                                        width: "24",
                                                        height: "14",
                                                        rx: "2",
                                                        fill: "currentColor",
                                                        opacity: "0.8"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                        lineNumber: 17,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                        x: "10",
                                                        y: "10",
                                                        width: "8",
                                                        height: "8",
                                                        rx: "1",
                                                        fill: "currentColor",
                                                        opacity: "0.6"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                        lineNumber: 18,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                        x: "22",
                                                        y: "10",
                                                        width: "8",
                                                        height: "8",
                                                        rx: "1",
                                                        fill: "currentColor",
                                                        opacity: "0.6"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                        lineNumber: 19,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                        x: "8",
                                                        y: "33",
                                                        width: "4",
                                                        height: "6",
                                                        rx: "1",
                                                        fill: "currentColor"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                        lineNumber: 20,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                        x: "28",
                                                        y: "33",
                                                        width: "4",
                                                        height: "6",
                                                        rx: "1",
                                                        fill: "currentColor"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                        lineNumber: 21,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                lineNumber: 15,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                            lineNumber: 14,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            children: storeInfo.name
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                            lineNumber: 24,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                    lineNumber: 13,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "contact-details",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "fas fa-map-marker-alt"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                    lineNumber: 27,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                storeInfo.showroomAddress.address
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                            lineNumber: 27,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "fas fa-phone"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                    lineNumber: 28,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `tel:${storeInfo.callNumbers.numbers[0].replace(/-/g, '')}`,
                                                    children: storeInfo.callNumbers.numbers[0]
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                    lineNumber: 28,
                                                    columnNumber: 52
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                            lineNumber: 28,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "fab fa-whatsapp"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                    lineNumber: 29,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `https://wa.me/88${storeInfo.whatsapp.number.replace(/-/g, '')}`,
                                                    children: [
                                                        storeInfo.whatsapp.number,
                                                        " (WhatsApp)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                    lineNumber: 29,
                                                    columnNumber: 55
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                            lineNumber: 29,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "fas fa-envelope"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                    lineNumber: 30,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `mailto:${storeInfo.email.address}`,
                                                    children: storeInfo.email.address
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                    lineNumber: 30,
                                                    columnNumber: 55
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                            lineNumber: 30,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "fas fa-clock"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                    lineNumber: 31,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                storeInfo.openingHours.schedule[0]
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                            lineNumber: 31,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                    lineNumber: 26,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: `https://wa.me/88${storeInfo.whatsapp.number.replace(/-/g, '')}?text=আসসালামু+আলাইকুম%2C+আমি+ফার্নিচার+সম্পর্কে+জানতে+চাই।`,
                                    className: "whatsapp-big-btn",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fab fa-whatsapp"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                            lineNumber: 34,
                                            columnNumber: 15
                                        }, this),
                                        " WhatsApp এ অর্ডার করুন"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                            lineNumber: 12,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "contact-map-area",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "map-placeholder",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-map-marker-alt map-pin-icon"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                        lineNumber: 39,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: storeInfo.showroomAddress.address.split(',')[0]
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                        lineNumber: 40,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            storeInfo.name,
                                            " শোরুম"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                        lineNumber: 41,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "map-streets",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "street h"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                lineNumber: 43,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "street v"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                lineNumber: 44,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "street h2"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                lineNumber: 45,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "street v2"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                                lineNumber: 46,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                        lineNumber: 42,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                                lineNumber: 38,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
                    lineNumber: 11,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
            lineNumber: 6,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroSlider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function HeroSlider({ products, categories, storeInfo, openProductDetail }) {
    const [currentSlide, setCurrentSlide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const sliderInterval = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        startAutoplay();
        return ()=>stopAutoplay();
    }, [
        currentSlide,
        products.length
    ]);
    const startAutoplay = ()=>{
        if (products.length <= 1) return;
        stopAutoplay();
        sliderInterval.current = setInterval(()=>{
            setCurrentSlide((prev)=>(prev + 1) % products.length);
        }, 5000);
    };
    const stopAutoplay = ()=>{
        if (sliderInterval.current) clearInterval(sliderInterval.current);
    };
    console.log('HeroSlider - products:', products?.length);
    if (!products || products.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "hero-slider-section",
        id: "heroSlider",
        "aria-label": "হিরো স্লাইডার",
        onMouseEnter: stopAutoplay,
        onMouseLeave: startAutoplay,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "slider-track",
                style: {
                    transform: `translateX(-${currentSlide * 100}%)`
                },
                children: products.map((product, index)=>{
                    const cat = categories.find((c)=>c.id === product.categoryId);
                    const discount = product.originalPrice > product.price ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `slide ${index === currentSlide ? 'active' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "slide-bg"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                                lineNumber: 38,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "slide-inner container",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "slide-image-side",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "slide-img-wrap",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: product.image,
                                                alt: product.name,
                                                loading: index === 0 ? 'eager' : 'lazy',
                                                className: "slide-img"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                                                lineNumber: 42,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                                            lineNumber: 41,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                                        lineNumber: 40,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "slide-text-side",
                                        children: [
                                            cat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "slide-badge",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: `fas fa-${cat.icon}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                                                        lineNumber: 46,
                                                        columnNumber: 56
                                                    }, this),
                                                    " ",
                                                    cat.name
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                                                lineNumber: 46,
                                                columnNumber: 27
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "slide-title",
                                                children: product.name
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                                                lineNumber: 47,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "slide-desc",
                                                children: [
                                                    product.description.substring(0, 80),
                                                    "..."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                                                lineNumber: 48,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "slide-price-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "slide-price",
                                                        children: [
                                                            "৳",
                                                            product.price.toLocaleString('bn-BD')
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                                                        lineNumber: 50,
                                                        columnNumber: 21
                                                    }, this),
                                                    discount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "slide-discount",
                                                        children: [
                                                            "-",
                                                            discount,
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                                                        lineNumber: 51,
                                                        columnNumber: 38
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                                                lineNumber: 49,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "slide-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-outline-hero",
                                                        onClick: ()=>openProductDetail(product),
                                                        children: "বিস্তারিত দেখুন"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                                                        lineNumber: 54,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: `https://wa.me/88${storeInfo.whatsapp.number.replace(/-/g, '')}?text=আসসালামু+আলাইকুম%2C+আমি+${encodeURIComponent(product.name)}+(ID%3A+${product.id})+অর্ডার+করতে+চাই।`,
                                                        className: "btn-filled-hero",
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        children: [
                                                            "অর্ডার করুন ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "fas fa-arrow-right"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                                                                lineNumber: 55,
                                                                columnNumber: 282
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                                                        lineNumber: 55,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                                                lineNumber: 53,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                                        lineNumber: 45,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                                lineNumber: 39,
                                columnNumber: 15
                            }, this)
                        ]
                    }, product.id, true, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                        lineNumber: 37,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "slider-arrow slider-prev",
                onClick: ()=>setCurrentSlide((prev)=>(prev - 1 + products.length) % products.length),
                "aria-label": "পূর্ববর্তী",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    className: "fas fa-chevron-left"
                }, void 0, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "slider-arrow slider-next",
                onClick: ()=>setCurrentSlide((prev)=>(prev + 1) % products.length),
                "aria-label": "পরবর্তী",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    className: "fas fa-chevron-right"
                }, void 0, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "slider-dots",
                role: "tablist",
                children: products.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `dot ${i === currentSlide ? 'active' : ''}`,
                        onClick: ()=>setCurrentSlide(i),
                        role: "tab",
                        "aria-label": `স্লাইড ${i + 1}`
                    }, i, false, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
                lineNumber: 71,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function SearchSection({ categories }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "search-section",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "search-section-title",
                    children: "আপনার পছন্দের পণ্য খুঁজুন"
                }, void 0, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                    lineNumber: 5,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    action: "/search",
                    method: "GET",
                    className: "search-bar-form",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "search-fields",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "search-field",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-search field-icon"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                        lineNumber: 9,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "q",
                                        placeholder: "পণ্যের নাম বা ID লিখুন...",
                                        className: "search-input",
                                        autoComplete: "off"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                        lineNumber: 10,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                lineNumber: 8,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "search-field",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-th-large field-icon"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                        lineNumber: 13,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        name: "categoryId",
                                        className: "search-select",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "সকল ক্যাটাগরি"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                                lineNumber: 15,
                                                columnNumber: 17
                                            }, this),
                                            categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: cat.id,
                                                    children: cat.name
                                                }, cat.id, false, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                                    lineNumber: 17,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                        lineNumber: 14,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                lineNumber: 12,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "search-field price-range-field",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-taka-sign field-icon"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                        lineNumber: 22,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        name: "minPrice",
                                        placeholder: "সর্বনিম্ন ৳",
                                        className: "search-input price-input",
                                        min: "0"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                        lineNumber: 23,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "price-sep",
                                        children: "—"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                        lineNumber: 24,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        name: "maxPrice",
                                        placeholder: "সর্বোচ্চ ৳",
                                        className: "search-input price-input",
                                        min: "0"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                        lineNumber: 25,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                lineNumber: 21,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "search-field",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-sort field-icon"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                        lineNumber: 28,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        name: "sort",
                                        className: "search-select",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "সর্বশেষ যোগ"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                                lineNumber: 30,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "price_asc",
                                                children: "মূল্য (কম–বেশি)"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                                lineNumber: 31,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "price_desc",
                                                children: "মূল্য (বেশি–কম)"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                                lineNumber: 32,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "popular",
                                                children: "জনপ্রিয়তা"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                                lineNumber: 33,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                        lineNumber: 29,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                lineNumber: 27,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "search-btn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-search"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                        lineNumber: 37,
                                        columnNumber: 15
                                    }, this),
                                    " খুঁজুন"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                        lineNumber: 7,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
                    lineNumber: 6,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
            lineNumber: 4,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js",
        lineNumber: 3,
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
"[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$ProductCard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductCard.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function ProductRow({ title, products, categories, storeInfo, openProductDetail, id, icon, description, viewAllLink, countBadge }) {
    const handleScroll = (id, direction)=>{
        const el = document.getElementById(id);
        if (el) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            el.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    console.log(`ProductRow [${title}] - products:`, products?.length);
    if (!products || products.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: icon ? "category-section" : "top-selling-section",
        id: id,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "section-header",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "section-title-wrap",
                            children: [
                                icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "cat-section-icon",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: `fas fa-${icon}`
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                                        lineNumber: 23,
                                        columnNumber: 56
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                                    lineNumber: 23,
                                    columnNumber: 22
                                }, this),
                                !icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fas fa-fire fire-icon"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                                    lineNumber: 24,
                                    columnNumber: 23
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: icon ? "cat-section-title" : "",
                                            children: [
                                                title,
                                                " ",
                                                countBadge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "count-badge",
                                                    children: [
                                                        countBadge,
                                                        "টি পণ্য"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                                                    lineNumber: 27,
                                                    columnNumber: 40
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                                            lineNumber: 26,
                                            columnNumber: 15
                                        }, this),
                                        description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "cat-section-desc",
                                            children: description
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                                            lineNumber: 29,
                                            columnNumber: 31
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "section-divider"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                                            lineNumber: 30,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                                    lineNumber: 25,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this),
                        viewAllLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: viewAllLink,
                            className: "see-all-link",
                            children: [
                                "সকল দেখুন ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fas fa-arrow-right"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                                    lineNumber: 33,
                                    columnNumber: 87
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                            lineNumber: 33,
                            columnNumber: 27
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-scroll-wrap",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "h-scroll-btn prev-btn",
                            onClick: ()=>handleScroll(`row-${id}`, 'left'),
                            "aria-label": "পূর্ববর্তী",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-chevron-left"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                                lineNumber: 37,
                                columnNumber: 127
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "product-h-row",
                            id: `row-${id}`,
                            children: products.map((product, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$ProductCard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    product: product,
                                    categories: categories,
                                    storeInfo: storeInfo,
                                    openProductDetail: openProductDetail,
                                    index: index
                                }, product.id, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                                    lineNumber: 40,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "h-scroll-btn next-btn",
                            onClick: ()=>handleScroll(`row-${id}`, 'right'),
                            "aria-label": "পরবর্তী",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-chevron-right"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                                lineNumber: 50,
                                columnNumber: 125
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                icon && viewAllLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "cat-section-footer",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: viewAllLink,
                        className: "btn-see-more",
                        children: [
                            "আরও পণ্য দেখুন ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-arrow-right"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                                lineNumber: 55,
                                columnNumber: 78
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                        lineNumber: 55,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
                    lineNumber: 54,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionBox": "OrderTrackingSection-module__qArI2a__actionBox",
  "container": "OrderTrackingSection-module__qArI2a__container",
  "content": "OrderTrackingSection-module__qArI2a__content",
  "description": "OrderTrackingSection-module__qArI2a__description",
  "dot": "OrderTrackingSection-module__qArI2a__dot",
  "feature": "OrderTrackingSection-module__qArI2a__feature",
  "featureIcon": "OrderTrackingSection-module__qArI2a__featureIcon",
  "features": "OrderTrackingSection-module__qArI2a__features",
  "iconBox": "OrderTrackingSection-module__qArI2a__iconBox",
  "mainIcon": "OrderTrackingSection-module__qArI2a__mainIcon",
  "section": "OrderTrackingSection-module__qArI2a__section",
  "textBox": "OrderTrackingSection-module__qArI2a__textBox",
  "title": "OrderTrackingSection-module__qArI2a__title",
  "trackLink": "OrderTrackingSection-module__qArI2a__trackLink",
});
}),
"[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrderTrackingSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$home$2f$OrderTrackingSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/react-icons/fa6/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function OrderTrackingSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$home$2f$OrderTrackingSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].section,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$home$2f$OrderTrackingSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$home$2f$OrderTrackingSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].content,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$home$2f$OrderTrackingSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconBox,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaTruckFast"], {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$home$2f$OrderTrackingSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mainIcon
                        }, void 0, false, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js",
                            lineNumber: 14,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js",
                        lineNumber: 13,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$home$2f$OrderTrackingSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].textBox,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$home$2f$OrderTrackingSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                                children: "আপনার ফার্নিচার কোথায় আছে?"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js",
                                lineNumber: 17,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$home$2f$OrderTrackingSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].description,
                                children: "অর্ডার করার পর আপনার ফার্নিচার এখন কোন অবস্থায় আছে তা সহজেই ট্র্যাক করুন। সরাসরি আমাদের ওয়ার্কশপ থেকে আপনার বাড়ি পর্যন্ত আপডেট পান।"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js",
                                lineNumber: 18,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$home$2f$OrderTrackingSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].features,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$home$2f$OrderTrackingSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].feature,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaMagnifyingGlass"], {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$home$2f$OrderTrackingSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].featureIcon
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js",
                                                lineNumber: 24,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "মোবাইল নাম্বার দিয়ে ট্র্যাক করুন"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js",
                                                lineNumber: 25,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js",
                                        lineNumber: 23,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$home$2f$OrderTrackingSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].feature,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$home$2f$OrderTrackingSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dot
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js",
                                                lineNumber: 28,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "রিয়েল-টাইম স্ট্যাটাস আপডেট"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js",
                                                lineNumber: 29,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js",
                                        lineNumber: 27,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js",
                                lineNumber: 22,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js",
                        lineNumber: 16,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$home$2f$OrderTrackingSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actionBox,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/order-tracking",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$home$2f$OrderTrackingSection$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].trackLink,
                            children: [
                                "অর্ডার ট্র্যাক করুন ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaArrowRight"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js",
                                    lineNumber: 35,
                                    columnNumber: 35
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js",
                            lineNumber: 34,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js",
                lineNumber: 12,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$products$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/data/products.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$categories$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/data/categories.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$shopInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/data/shopInfo.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$ProductModal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductModal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$OrderProcess$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/OrderProcess.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$ContactSection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ContactSection.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$HeroSlider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/HeroSlider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$SearchSection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/SearchSection.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$ProductRow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/ProductRow.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$home$2f$OrderTrackingSection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/components/home/OrderTrackingSection.js [app-ssr] (ecmascript)");
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
;
;
;
;
function Home() {
    const getArray = (val)=>{
        if (!val) return [];
        if (Array.isArray(val)) return val;
        if (val.default && Array.isArray(val.default)) return val.default;
        if (val.allProducts && Array.isArray(val.allProducts)) return val.allProducts;
        return [];
    };
    const allProducts = getArray(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$products$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
    const allCategories = getArray(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$categories$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
    const storeInfo = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$shopInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].default || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$data$2f$shopInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
    console.log('Home Page - allProducts:', allProducts);
    console.log('Home Page - allProducts Length:', allProducts.length);
    console.log('Home Page - allCategories:', allCategories);
    const [selectedProduct, setSelectedProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showStickyNav, setShowStickyNav] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const featuredProducts = allProducts.filter((p)=>p.isFeatured).slice(0, 5);
    const topSelling = allProducts.filter((p)=>p.isTopSelling);
    const getCategoryProducts = ()=>{
        return allCategories.map((cat)=>({
                ...cat,
                products: allProducts.filter((p)=>p.categoryId === cat.id),
                productCount: allProducts.filter((p)=>p.categoryId === cat.id).length
            }));
    };
    const categoryWithProducts = getCategoryProducts();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleScrollEvent = ()=>{
            // Show sticky nav after hero section
            const heroHeight = document.getElementById('heroSlider')?.offsetHeight || 600;
            setShowStickyNav(window.scrollY > heroHeight);
            // Highlight active category based on scroll position
            const sections = categoryWithProducts.map((cat)=>document.getElementById(`section-${cat.id}`));
            const scrollPosition = window.scrollY + 150;
            for(let i = sections.length - 1; i >= 0; i--){
                const section = sections[i];
                if (section && scrollPosition >= section.offsetTop) {
                    setActiveCategory(categoryWithProducts[i].id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScrollEvent);
        return ()=>window.removeEventListener('scroll', handleScrollEvent);
    }, [
        categoryWithProducts
    ]);
    const openProductDetail = (product)=>{
        setSelectedProduct(product);
        setIsModalOpen(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `sticky-cat-nav ${showStickyNav ? 'visible' : ''}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "cat-nav-scroll",
                        children: categoryWithProducts.map((cat)=>cat.products && cat.products.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: `#section-${cat.id}`,
                                className: `cat-nav-pill ${activeCategory === cat.id ? 'active' : ''}`,
                                onClick: (e)=>{
                                    e.preventDefault();
                                    document.getElementById(`section-${cat.id}`)?.scrollIntoView({
                                        behavior: 'smooth'
                                    });
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: `fas fa-${cat.icon}`
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/page.js",
                                        lineNumber: 95,
                                        columnNumber: 19
                                    }, this),
                                    " ",
                                    cat.name
                                ]
                            }, cat.id, true, {
                                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/page.js",
                                lineNumber: 86,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/page.js",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/page.js",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/page.js",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$HeroSlider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                products: featuredProducts,
                categories: allCategories,
                storeInfo: storeInfo,
                openProductDetail: openProductDetail
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/page.js",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$SearchSection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                categories: allCategories
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/page.js",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$ProductRow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                title: "সর্বাধিক বিক্রিত পণ্য",
                products: topSelling,
                categories: allCategories,
                storeInfo: storeInfo,
                openProductDetail: openProductDetail,
                id: "topSelling",
                viewAllLink: "/search?sort=popular"
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/page.js",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            categoryWithProducts.map((cat)=>cat.products && cat.products.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$ProductRow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    id: `section-${cat.id}`,
                    title: cat.name,
                    icon: cat.icon,
                    description: cat.description,
                    products: cat.products.slice(0, 6),
                    categories: allCategories,
                    storeInfo: storeInfo,
                    openProductDetail: openProductDetail,
                    viewAllLink: `/category/${cat.id}`,
                    countBadge: cat.products.length
                }, cat.id, false, {
                    fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/page.js",
                    lineNumber: 124,
                    columnNumber: 11
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$OrderProcess$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                storeInfo: storeInfo
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/page.js",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$home$2f$OrderTrackingSection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/page.js",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$ContactSection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                storeInfo: storeInfo
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/page.js",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$My__Shop$2f$Backup__Shop__3$2f$Css__Convart__V2$2f$my_shop_3$2f$src$2f$components$2f$ProductModal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isModalOpen,
                onClose: ()=>setIsModalOpen(false),
                product: selectedProduct,
                categories: allCategories,
                storeInfo: storeInfo
            }, void 0, false, {
                fileName: "[project]/Desktop/My Shop/Backup Shop 3/Css Convart V2/my_shop_3/src/app/page.js",
                lineNumber: 144,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=Desktop_My%20Shop_Backup%20Shop%203_Css%20Convart%20V2_my_shop_3_src_0twj9e-._.js.map