export const defaultOrderStages = [ 
  { 
    id: "stage_001", 
    name: "অর্ডার গ্রহণ", 
    nameEn: "Order Received", 
    icon: "FaClipboardCheck", 
    color: "#9E7455", 
    order: 1, 
    isDefault: true, 
    description: "অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে" 
  }, 
  { 
    id: "stage_002", 
    name: "অর্ডার অনুমোদন", 
    nameEn: "Order Approved", 
    icon: "FaCircleCheck", 
    color: "#4A7C59", 
    order: 2, 
    isDefault: true, 
    description: "অর্ডারটি অনুমোদন করা হয়েছে এবং কাজ শুরু হবে" 
  }, 
  { 
    id: "stage_003", 
    name: "কাঠ কাটা হচ্ছে", 
    nameEn: "Cutting Wood", 
    icon: "FaScissors", 
    color: "#C8780A", 
    order: 3, 
    isDefault: true, 
    description: "কাঠ কাটার কাজ চলছে" 
  }, 
  { 
    id: "stage_004", 
    name: "তৈরি হচ্ছে", 
    nameEn: "Assembling", 
    icon: "FaHammer", 
    color: "#7C4B2A", 
    order: 4, 
    isDefault: true, 
    description: "আসবাবপত্র তৈরির কাজ চলছে" 
  }, 
  { 
    id: "stage_005", 
    name: "বার্নিশ/ফিনিশিং", 
    nameEn: "Finishing", 
    icon: "FaBrush", 
    color: "#D4882A", 
    order: 5, 
    isDefault: true, 
    description: "পলিশ এবং ফিনিশিংয়ের কাজ চলছে" 
  }, 
  { 
    id: "stage_006", 
    name: "মান নিয়ন্ত্রণ", 
    nameEn: "Quality Check", 
    icon: "FaMagnifyingGlass", 
    color: "#B5541E", 
    order: 6, 
    isDefault: true, 
    description: "পণ্যের মান যাচাই করা হচ্ছে" 
  }, 
  { 
    id: "stage_007", 
    name: "ডেলিভারির জন্য প্রস্তুত", 
    nameEn: "Ready for Delivery", 
    icon: "FaBox", 
    color: "#2D8A4E", 
    order: 7, 
    isDefault: true, 
    description: "পণ্যটি ডেলিভারির জন্য সম্পূর্ণ প্রস্তুত" 
  }, 
  { 
    id: "stage_008", 
    name: "ডেলিভারি হচ্ছে", 
    nameEn: "Out for Delivery", 
    icon: "FaTruck", 
    color: "#4A7C59", 
    order: 8, 
    isDefault: true, 
    description: "পণ্যটি আপনার ঠিকানায় পাঠানো হয়েছে" 
  }, 
  { 
    id: "stage_009", 
    name: "ডেলিভারি সম্পন্ন", 
    nameEn: "Delivered", 
    icon: "FaCircleCheck", 
    color: "#1A6B3A", 
    order: 9, 
    isDefault: true, 
    description: "পণ্যটি সফলভাবে ডেলিভারি করা হয়েছে" 
  }, 
  { 
    id: "stage_010", 
    name: "বাতিল", 
    nameEn: "Cancelled", 
    icon: "FaBan", 
    color: "#B5541E", 
    order: 99, 
    isDefault: true, 
    description: "অর্ডারটি বাতিল করা হয়েছে" 
  } 
]; 
