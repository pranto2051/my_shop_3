import re
import json
import uuid
import random

# Mapping dictionary for translation
translations = {
    'Wooden Doors': 'কাঠের দরজা',
    'Beds & Bed Frames': 'খাট ও বিছানা',
    'Wardrobes & Almirahs': 'ওয়ার্ডরোব ও আলমারি',
    'Dressing Tables': 'ড্রেসিং টেবিল',
    'Dining Tables': 'ডাইনিং টেবিল',
    'Dining Chairs': 'ডাইনিং চেয়ার',
    'Sofas & Sofa Sets': 'সোফা ও সোফা সেট',
    'Coffee & Centre Tables': 'কফি ও সেন্টার টেবিল',
    'Office Desks & Tables': 'অফিস ডেস্ক ও টেবিল',
    'Office & Study Chairs': 'অফিস ও স্টাডি চেয়ার',
    'Bookshelves & Cabinets': 'বুকশেলফ ও ক্যাবিনেট',
    'TV Units & Cabinets': 'টিভি ইউনিট ও ক্যাবিনেট',
    'Shoe Racks': 'জুতার র‍্যাক',
    'Kitchen Cabinets': 'রান্নাঘরের ক্যাবিনেট',
    'Rocking & Easy Chairs': 'রকিং ও ইজি চেয়ার',
    'Kids Furniture': 'বাচ্চাদের আসবাবপত্র',
    'Outdoor & Garden Furniture': 'আউটডোর ও গার্ডেন আসবাবপত্র',
    'Benches & Stools': 'বেঞ্চ ও টুল',
    'Wooden Accessories': 'কাঠের আনুষাঙ্গিক',
    'Custom & Carved Pieces': 'কাস্টম ও খোদাই করা আসবাবপত্র'
}

icons = {
    'cat_001': 'door-open', 'cat_002': 'bed', 'cat_003': 'box', 'cat_004': 'table', 'cat_005': 'table',
    'cat_006': 'chair', 'cat_007': 'couch', 'cat_008': 'table', 'cat_009': 'table', 'cat_010': 'chair',
    'cat_011': 'book', 'cat_012': 'tv', 'cat_013': 'shoe-prints', 'cat_014': 'kitchen-set', 'cat_015': 'chair',
    'cat_016': 'child', 'cat_017': 'tree', 'cat_018': 'chair', 'cat_019': 'shapes', 'cat_020': 'hammer'
}

def translate_name(name):
    words = {
        'Teak': 'সেগুন', 'Wood': 'কাঠের', 'Single': 'সিঙ্গেল', 'Door': 'দরজা', '7ft': '৭ ফুট',
        'Shegun': 'সেগুন', 'Double': 'ডাবল', '8ft': '৮ ফুট', 'Engineered': 'ইঞ্জিনিয়ার্ড',
        'Panel': 'প্যানেল', 'Carved': 'খোদাই করা', 'Main': 'প্রধান', 'Sliding': 'স্লাইডিং',
        'Closet': 'ক্লোজেট', 'Flush': 'ফ্লাশ', 'with': 'সহ', 'Frame': 'ফ্রেম', '(Set)': '(সেট)',
        'Dutch': 'ডাচ', 'Stable': 'স্টেবল', 'King': 'কিং', 'Size': 'সাইজ', 'Bed': 'খাট',
        'Queen': 'কুইন', 'Storage': 'স্টোরেজ', 'Headboard': 'হেডবোর্ড', 'Side': 'সাইড',
        'Cabinet': 'ক্যাবিনেট', 'Bunk': 'বাঙ্ক', '(Wood,': '(কাঠ,', '2-Level)': '২-লেভেল)',
        'Platform': 'প্ল্যাটফর্ম', 'Low': 'লো', 'Profile': 'প্রোফাইল', 'Antique': 'অ্যান্টিক',
        'Poster': 'পোস্টার', '(4-Post)': '(৪-পোস্ট)', '3-Door': '৩-দরজা', 'Wardrobe': 'ওয়ার্ডরোব',
        '2-Door': '২-দরজা', 'Almirah': 'আলমারি', '6ft': '৬ ফুট', 'Corner': 'কর্নার', 'Unit': 'ইউনিট',
        'Style': 'স্টাইল', '4-Door': '৪-দরজা', 'Bedroom': 'বেডরুম', 'Kids': 'বাচ্চাদের',
        'Mini': 'মিনি', 'Classic': 'ক্লাসিক', 'Dressing': 'ড্রেসিং', 'Table': 'টেবিল',
        'Mirror': 'আয়না', 'Modern': 'আধুনিক', 'Trifold': 'ট্রাইফোল্ড', 'Shelf': 'শেলফ',
        'Stool': 'টুল', '(Cushioned)': '(কুশনযুক্ত)', 'Wall-Mounted': 'ওয়াল-মাউন্টেড',
        'Vanity': 'ভ্যানিটি', 'Heart': 'হার্ট', '6-Seater': '৬-সিটার', 'Dining': 'ডাইনিং',
        '4-Seater': '৪-সিটার', '8-Seater': '৮-সিটার', 'Large': 'বড়', 'Round': 'গোল',
        'Extendable': 'প্রসারণযোগ্য', '(4': '(৪', 'to': 'থেকে', '6)': '৬)', 'Glass-Top': 'গ্লাস-টপ',
        'Base': 'বেস', 'Rustic': 'রাস্টিক', 'Farmhouse': 'ফার্মহাউস', 'Chair': 'চেয়ার',
        'Cushion': 'কুশন', 'Armchair': 'আর্মচেয়ার', 'Folding': 'ফোল্ডিং', 'High-Back': 'হাই-ব্যাক',
        'Bar-Height': 'বার-উচ্চতা', '5-Seater': '৫-সিটার', 'Sofa': 'সোফা', 'Set': 'সেট',
        '3-Seater': '৩-সিটার', 'L-Shaped': 'এল-আকৃতির', 'Frame)': 'ফ্রেম)', '2-Seater': '২-সিটার',
        'Loveseat': 'লাভসিট', 'Diwan': 'দিওয়ান', '/': '/', 'Daybed': 'ডে-বেড', 'Mahogany': 'মেহগনি',
        '3+1+1': '৩+১+১', 'Bench': 'বেঞ্চ', '(Ottoman': '(অটোমান', 'Style)': 'স্টাইল)', 'Coffee': 'কফি',
        'Nesting': 'নেস্টিং', 'Tables': 'টেবিল', 'of': 'এর', '3)': '৩)', 'Legs)': 'পা)',
        'Log': 'লগ', 'Bedside': 'বেডসাইড', 'Nightstand': 'নাইটস্ট্যান্ড', 'Ottoman': 'অটোমান',
        'Executive': 'এক্সিকিউটিভ', 'Office': 'অফিস', 'Desk': 'ডেস্ক', '5ft': '৫ ফুট',
        'Student': 'ছাত্র', 'Study': 'স্টাডি', '4ft': '৪ ফুট', 'Computer': 'কম্পিউটার',
        'Keyboard': 'কিবোর্ড', 'Tray': 'ট্রে', 'Writing': 'লেখার', 'Minimalist': 'মিনিমালিস্ট',
        '3ft': '৩ ফুট', 'Standing': 'দাঁড়ানো', 'Adjustable': 'সামঞ্জস্যযোগ্য', 'Top)': 'টপ)',
        'Boss': 'বস', 'Return': 'রিটার্ন', 'Foldable': 'ফোল্ডেবল', 'Leather': 'চামড়া',
        'Armrest': 'আর্মরেস্ট', 'Rattan-Back': 'বেতের-ব্যাক', 'Wing': 'উইং', '(Wooden': '(কাঠের',
        'Ergonomic': 'আর্গোনোমিক', 'Saddle': 'স্যাডল', '5-Shelf': '৫-শেলফ', 'Bookcase': 'বুককেস',
        'Display': 'ডিসপ্লে', 'Glass': 'গ্লাস', 'Doors': 'দরজা', 'Book': 'বই', 'Ladder': 'মই',
        'Bookshelf': 'বুকশেলফ', '5-Tier': '৫-টায়ার', 'Filing': 'ফাইলিং', '&': 'ও', '3-Drawer': '৩-ড্রয়ার',
        'Crockery': 'ক্রোকারিজ', 'China': 'চায়না', 'Hutch': 'হাচ', 'Tower': 'টাওয়ার',
        'TV': 'টিভি', 'Stand': 'স্ট্যান্ড', 'Media': 'মিডিয়া', 'Console': 'কনসোল',
        'Floating': 'ভাসমান', '(4ft)': '(৪ ফুট)', 'Entertainment': 'এন্টারটেইনমেন্ট',
        'Full': 'ফুল', 'Wall': 'দেয়াল', 'Barn': 'বার্ন', 'Combo': 'কম্বো', 'Shoe': 'জুতা',
        'Rack': 'র‍্যাক', '4-Tier': '৪-টায়ার', '(3-Door)': '(৩-দরজা)', 'Entryway': 'এন্ট্রিওয়ে',
        'Rotating': 'ঘূর্ণনশীল', '(24': '(২৪', 'Pairs)': 'জোড়া)', 'Slim': 'স্লিম',
        '(2-Tier)': '(২-টায়ার)', 'Solid': 'সলিড', 'Box': 'বক্স', '(Stackable)': '(স্ট্যাকেবল)',
        'Upper': 'উপরের', 'Kitchen': 'রান্নাঘর', '(3': '(৩', 'Units)': 'ইউনিট)', 'Countertop': 'কাউন্টারটপ',
        'Lazy': 'লেজি', 'Susan': 'সুসান', 'Pantry': 'প্যান্ট্রি', 'Tall': 'লম্বা', '(7ft)': '(৭ ফুট)',
        'Modular': 'মডুলার', 'L-Shape': 'এল-আকৃতি', 'Under-Sink': 'আন্ডার-সিঙ্ক', 'Freestanding': 'ফ্রি-স্ট্যান্ডিং',
        'Island': 'আইল্যান্ড', '(Wood)': '(কাঠ)', 'Easy': 'ইজি', 'Wing': 'উইং', 'Back)': 'ব্যাক)',
        'Papasan': 'পাপাসান', 'Bowl': 'বাটি', 'Base)': 'বেস)', 'Recliner': 'রিক্লাইনার',
        'Accent': 'অ্যাকসেন্ট', 'Legs': 'পা', 'Slide': 'স্লাইড', 'Toy': 'খেলনা', 'Chest': 'চেস্ট',
        '(Low': '(নিচু', '3-Tier)': '৩-টায়ার)', 'Princess': 'রাজকুমারী', 'Canopy': 'ক্যানোপি',
        'High': 'উঁচু', '(Baby': '(বাচ্চাদের', 'Feeding)': 'খাওয়ানো)', 'Outdoor': 'আউটডোর',
        'Garden': 'বাগান', '(4-Seater)': '(৪-সিটার)', 'Swing': 'দোলনা', '(2-Seater)': '(২-সিটার)',
        'Adirondack': 'অ্যাডিরনড্যাক', '(Hardwood)': '(হার্ডউড)', 'Deck': 'ডেক', 'Lounger': 'লাউঞ্জার',
        'Planter': 'প্লান্টার', 'Upholstered': 'আপহোলস্টার্ড', '(Set': '(সেট', '2)': '২)',
        'Piano': 'পিয়ানো', 'Step': 'স্টেপ', '2-Step': '২-স্টেপ', 'Temple': 'মন্দির',
        '(Mandir)': '(মন্দির)', 'Photo': 'ছবি', 'Sizes)': 'সাইজ)', 'Clock': 'ঘড়ি',
        '(12-inch)': '(১২-ইঞ্চি)', 'Tray': 'ট্রে', '3-Piece)': '৩-পিস)', 'Tissue': 'টিস্যু',
        'Cover': 'কভার', 'Key': 'চাবি', 'Holder': 'হোল্ডার', 'Hook': 'হুক', 'Candle': 'মোমবাতি',
        '5-Piece)': '৫-পিস)', 'Decorative': 'সাজসজ্জা', 'Bowl': 'বাটি', '(Carved)': '(খোদাই করা)',
        'Spice': 'মশলা', '3-Tier': '৩-টায়ার', '(Wall)': '(দেয়াল)', 'Custom': 'কাস্টম',
        'Name': 'নাম', 'Sign': 'চিহ্ন', 'Hand-Carved': 'হাতে-খোদাই করা', 'Elephant': 'হাতি',
        'Sculpture': 'ভাস্কর্য', 'Room': 'রুম', 'Divider': 'ডিভাইডার', '(4-Panel)': '(৪-প্যানেল)',
        'Wedding': 'বিয়ে', 'Gift': 'উপহার', '(Oval)': '(ডিম্বাকৃতি)', 'Chess': 'দাবা',
        '(Handmade)': '(হাতে তৈরি)', 'Nameplate': 'নেমপ্লেট', '(Door)': '(দরজা)', 'Quran': 'কুরআন',
        'Holy': 'পবিত্র', '(Indoor': '(ইনডোর', 'Kids)': 'বাচ্চাদের)', 'Art': 'আর্ট',
        'Panel': 'প্যানেল', '(Geometric)': '(জ্যামিতিক)', 'Live': 'লাইভ', 'Edge': 'এজ',
        'Serving': 'সার্ভিং', 'Board': 'বোর্ড', 'Baby': 'বাচ্চা', 'Pooja': 'পূজা',
        '(Small)': '(ছোট)', 'Lamp': 'বাতি', 'Engraved': 'খোদাই করা', 'Cutting': 'কাটিং',
        '(Gift)': '(উপহার)', 'Bespoke': 'বিস্পোক', 'Order)': 'অর্ডার)', 'Letter': 'চিঠি',
        'Mail': 'মেইল', 'Traditional': 'ঐতিহ্যবাহী', 'Dhol': 'ঢোল', 'Drum': 'ড্রাম',
        'Signpost': 'সাইনপোস্ট', '(Custom)': '(কাস্টম)', 'Fruit': 'ফল', '(Footed)': '(পা যুক্ত)'
    }
    
    parts = name.split()
    translated_parts = [words.get(p, p) for p in parts]
    return " ".join(translated_parts)

categories_en = list(translations.keys())

with open('insertdata_bangla.sql', 'w', encoding='utf-8') as f:
    f.write("-- ============================================================\n")
    f.write("--  DEMO DATA: Wooden Furniture Shop (Bangla)\n")
    f.write("--  20 Categories + 150 Products\n")
    f.write("-- ============================================================\n\n")

    f.write("-- Categories\n")
    f.write("INSERT INTO categories (id, name, name_en, icon, description, product_count) VALUES \n")
    
    cat_id_map = {}
    for i, cat_en in enumerate(categories_en):
        cat_id = f"cat_{i+1:03d}"
        cat_id_map[f"c{i+1:02d}"] = cat_id
        cat_bn = translations[cat_en]
        icon = icons.get(cat_id, 'box')
        desc = f"সকল প্রকার {cat_bn}"
        suffix = "," if i < len(categories_en)-1 else ";"
        f.write(f"('{cat_id}', '{cat_bn}', '{cat_en}', '{icon}', '{desc}', 0){suffix}\n")
    f.write("ON CONFLICT (id) DO NOTHING;\n\n")
    
    f.write("-- Products\n")
    f.write("INSERT INTO products (id, name, name_en, category_id, price, original_price, image, images, description, material, dimensions, color, weight, in_stock, is_featured, is_top_selling, rating, review_count, tags) VALUES \n")
    
    # Read the products from original SQL
    # This is a bit tricky but we'll parse the values
    original_sql = """
  (c01,'Teak Wood Single Door 7ft','teak-wood-single-door-7ft','Solid teak wood single door with polish finish, 7ft x 3ft',18000.00,15999.00,10,'AL-100001',ARRAY['door','teak','single'],true ,true,1),
  (c01,'Shegun Wood Double Door 8ft','shegun-wood-double-door-8ft','Premium shegun (teak) double door set with brass fittings, 8ft x 5ft',38000.00,NULL,5,'AL-100002',ARRAY['door','shegun','double'],true ,true,2),
  (c01,'Engineered Wood Panel Door','engineered-wood-panel-door','4-panel engineered wood door with smooth finish, 7ft x 3ft',8500.00,7499.00,20,'AL-100003',ARRAY['door','engineered','panel'],false,true,3),
  (c01,'Carved Wooden Main Door','carved-wooden-main-door','Hand-carved decorative main entrance door in mahogany, 8ft x 4ft',55000.00,NULL,3,'AL-100004',ARRAY['door','carved','mahogany'],true ,true,4),
  (c01,'Sliding Wooden Closet Door','sliding-wooden-closet-door','Space-saving sliding wooden door for wardrobes and room dividers',12000.00,9999.00,8,'AL-100005',ARRAY['door','sliding','closet'],false,true,5),
  (c01,'Flush Door with Frame (Set)','flush-door-with-frame-set','Interior flush door with fitted wooden frame, ready to install',7500.00,NULL,15,'AL-100006',ARRAY['door','flush','interior'],false,true,6),
  (c01,'Dutch Stable Wooden Door','dutch-stable-wooden-door','Top-bottom split Dutch door in solid wood, great for kitchens',22000.00,19500.00,4,'AL-100007',ARRAY['door','dutch','split'],false,true,7),

  (c02,'King Size Shegun Wood Bed','king-size-shegun-wood-bed','Solid shegun king size bed frame with headboard, 6ft x 6.5ft',45000.00,39999.00,6,'AL-100008',ARRAY['bed','king','shegun'],true ,true,1),
  (c02,'Queen Size Teak Bed with Storage','queen-size-teak-bed-storage','Queen size teak bed with 2 under-bed storage drawers',38000.00,NULL,8,'AL-100009',ARRAY['bed','queen','storage'],true ,true,2),
  (c02,'Double Bed Carved Headboard','double-bed-carved-headboard','Double bed with ornately carved headboard in mahogany finish',28000.00,24999.00,10,'AL-100010',ARRAY['bed','double','carved'],false,true,3),
  (c02,'Single Bed with Side Cabinet','single-bed-side-cabinet','Single wooden bed with attached side cabinet and shelf',15000.00,NULL,12,'AL-100011',ARRAY['bed','single','cabinet'],false,true,4),
  (c02,'Bunk Bed (Wood, 2-Level)','bunk-bed-wood-2level','Sturdy 2-level wooden bunk bed with safety rails and ladder',22000.00,19000.00,5,'AL-100012',ARRAY['bed','bunk','kids'],false,true,5),
  (c02,'Platform Bed Low Profile','platform-bed-low-profile','Modern low-profile platform bed in walnut finish, queen size',32000.00,NULL,7,'AL-100013',ARRAY['bed','platform','modern'],false,true,6),
  (c02,'Antique Poster Bed (4-Post)','antique-poster-bed-4post','Classic 4-poster canopy bed in solid teak, king size',65000.00,59000.00,3,'AL-100014',ARRAY['bed','poster','antique'],true ,true,7),

  (c03,'3-Door Shegun Wardrobe','3-door-shegun-wardrobe','Large 3-door wardrobe in solid shegun with mirror and shelves',42000.00,37999.00,5,'AL-100015',ARRAY['wardrobe','shegun','3-door'],true ,true,1),
  (c03,'2-Door Wooden Almirah','2-door-wooden-almirah','Classic 2-door almirah with hanging rod and folding shelves',22000.00,NULL,8,'AL-100016',ARRAY['almirah','2-door','storage'],false,true,2),
  (c03,'Sliding Door Wardrobe 6ft','sliding-door-wardrobe-6ft','Modern 6ft sliding door wardrobe with interior organiser',35000.00,31000.00,4,'AL-100017',ARRAY['wardrobe','sliding','modern'],false,true,3),
  (c03,'Corner Wardrobe Unit','corner-wardrobe-unit','Space-saving L-shaped corner wardrobe in engineered wood',28000.00,NULL,3,'AL-100018',ARRAY['wardrobe','corner','l-shaped'],false,true,4),
  (c03,'Carved Almirah Antique Style','carved-almirah-antique-style','Hand-carved antique-style almirah with brass handles',48000.00,43000.00,2,'AL-100019',ARRAY['almirah','carved','antique'],true ,true,5),
  (c03,'4-Door Bedroom Wardrobe','4-door-bedroom-wardrobe','Full 4-door wardrobe with drawers, shelves, and mirror panel',55000.00,NULL,3,'AL-100020',ARRAY['wardrobe','4-door','bedroom'],false,true,6),
  (c03,'Kids Mini Wardrobe 2-Door','kids-mini-wardrobe-2door','Compact 2-door kids wardrobe with colourful interior, 4ft',14000.00,12000.00,10,'AL-100021',ARRAY['wardrobe','kids','mini'],false,true,7),

  (c04,'Classic Dressing Table with Mirror','classic-dressing-table-mirror','Solid wood dressing table with large oval mirror and 3 drawers',18000.00,15999.00,8,'AL-100022',ARRAY['dressing-table','mirror','classic'],true ,true,1),
  (c04,'Modern Dressing Table Trifold Mirror','modern-dressing-table-trifold','Contemporary dressing table with trifold mirror and 4 drawers',22000.00,NULL,6,'AL-100023',ARRAY['dressing-table','trifold','modern'],false,true,2),
  (c04,'Carved Dressing Table Shegun','carved-dressing-table-shegun','Ornately carved shegun dressing table with stool and mirror',32000.00,28000.00,4,'AL-100024',ARRAY['dressing-table','carved','shegun'],true ,true,3),
  (c04,'Corner Dressing Table with Shelf','corner-dressing-table-shelf','Space-saving corner dressing table with side shelves',14500.00,NULL,7,'AL-100025',ARRAY['dressing-table','corner','shelf'],false,true,4),
  (c04,'Dressing Table Stool (Cushioned)','dressing-table-stool-cushioned','Matching wooden stool with cushioned seat for dressing tables',4500.00,3799.00,20,'AL-100026',ARRAY['stool','dressing','cushion'],false,true,5),
  (c04,'Wall-Mounted Vanity Table','wall-mounted-vanity-table','Floating wall-mounted vanity table with LED mirror frame',16000.00,14000.00,5,'AL-100027',ARRAY['vanity','wall-mounted','led'],false,true,6),
  (c04,'Kids Dressing Table with Heart Mirror','kids-dressing-table-heart-mirror','Cute kids dressing table with heart-shaped mirror and pink finish',11000.00,NULL,8,'AL-100028',ARRAY['dressing-table','kids','pink'],false,true,7),

  (c05,'6-Seater Teak Dining Table','6-seater-teak-dining-table','Solid teak 6-seater rectangular dining table, 5ft x 3ft',28000.00,24999.00,6,'AL-100029',ARRAY['dining-table','teak','6-seater'],true ,true,1),
  (c05,'4-Seater Wooden Dining Table','4-seater-wooden-dining-table','Compact 4-seater dining table in shegun, 4ft x 2.5ft',16000.00,NULL,10,'AL-100030',ARRAY['dining-table','4-seater','shegun'],false,true,2),
  (c05,'8-Seater Large Dining Table','8-seater-large-dining-table','Grand 8-seater dining table in solid mahogany, 6ft x 3.5ft',48000.00,42000.00,3,'AL-100031',ARRAY['dining-table','8-seater','mahogany'],true ,true,3),
  (c05,'Round Dining Table 4-Seater','round-dining-table-4seater','Round wooden dining table for 4, easy conversation design',18000.00,NULL,5,'AL-100032',ARRAY['dining-table','round','4-seater'],false,true,4),
  (c05,'Extendable Dining Table (4 to 6)','extendable-dining-table-4to6','Foldable extension dining table, seats 4 normally, 6 extended',22000.00,19500.00,4,'AL-100033',ARRAY['dining-table','extendable','foldable'],false,true,5),
  (c05,'Glass-Top Wooden Base Dining Table','glass-top-wooden-base-dining','6-seater dining table with tempered glass top on wooden legs',32000.00,NULL,4,'AL-100034',ARRAY['dining-table','glass-top','modern'],false,true,6),
  (c05,'Rustic Farmhouse Dining Table','rustic-farmhouse-dining-table','Chunky rustic-style farmhouse dining table, seats 6, natural finish',35000.00,31000.00,3,'AL-100035',ARRAY['dining-table','farmhouse','rustic'],false,true,7),

  (c06,'Wooden Dining Chair with Cushion','wooden-dining-chair-cushion','Solid wood dining chair with padded cushion seat, set of 1',4500.00,3899.00,30,'AL-100036',ARRAY['dining-chair','cushion','wood'],false,true,1),
  (c06,'Carved Teak Dining Chair','carved-teak-dining-chair','Elegantly carved teak dining chair with rattan back',6500.00,NULL,20,'AL-100037',ARRAY['dining-chair','carved','teak'],true ,true,2),
  (c06,'Armchair Dining Chair','armchair-dining-chair','Wide armchair-style dining chair in solid wood with fabric seat',5800.00,5000.00,15,'AL-100038',ARRAY['dining-chair','armchair','fabric'],false,true,3),
  (c06,'Folding Wooden Chair','folding-wooden-chair','Space-saving foldable wooden chair for dining and events',2800.00,NULL,40,'AL-100039',ARRAY['chair','folding','space-saving'],false,true,4),
  (c06,'High-Back Wooden Dining Chair','high-back-wooden-dining-chair','High-back solid wood chair for formal dining rooms',5200.00,4599.00,18,'AL-100040',ARRAY['dining-chair','high-back','formal'],false,true,5),
  (c06,'Kids Wooden Chair','kids-wooden-chair','Small solid wood chair for children aged 3–8 years',2500.00,NULL,25,'AL-100041',ARRAY['chair','kids','small'],false,true,6),
  (c06,'Bar-Height Wooden Stool Chair','bar-height-wooden-stool-chair','Counter-height bar stool in solid wood with footrest',3800.00,3199.00,12,'AL-100042',ARRAY['stool','bar','wood'],false,true,7),

  (c07,'5-Seater Wooden Sofa Set','5-seater-wooden-sofa-set','3+1+1 sofa set with solid teak frame and thick foam cushions',65000.00,58000.00,3,'AL-100043',ARRAY['sofa','set','teak'],true ,true,1),
  (c07,'3-Seater Wooden Sofa','3-seater-wooden-sofa','Classic 3-seater sofa with shegun frame and reversible cushions',28000.00,NULL,5,'AL-100044',ARRAY['sofa','3-seater','shegun'],false,true,2),
  (c07,'L-Shaped Corner Sofa (Wood Frame)','l-shaped-corner-sofa-wood','L-shaped sectional sofa with wooden frame and chaise end',48000.00,42999.00,3,'AL-100045',ARRAY['sofa','l-shaped','corner'],true ,true,3),
  (c07,'2-Seater Loveseat Sofa','2-seater-loveseat-sofa','Compact loveseat sofa in solid wood, ideal for small rooms',18000.00,NULL,6,'AL-100046',ARRAY['sofa','loveseat','2-seater'],false,true,4),
  (c07,'Diwan / Daybed Sofa','diwan-daybed-sofa','Traditional wooden diwan with bolster cushions, 6ft length',22000.00,19000.00,5,'AL-100047',ARRAY['diwan','daybed','traditional'],false,true,5),
  (c07,'Carved Mahogany Sofa Set 3+1+1','carved-mahogany-sofa-set','Ornately carved mahogany 5-piece sofa set with velvet cushions',85000.00,NULL,2,'AL-100048',ARRAY['sofa','carved','mahogany'],true ,true,6),
  (c07,'Wooden Bench Sofa (Ottoman Style)','wooden-bench-sofa-ottoman','Long wooden bench sofa with cushioned top, 5ft, dual purpose',14000.00,12000.00,8,'AL-100049',ARRAY['sofa','bench','ottoman'],false,true,7),

  (c08,'Teak Wood Coffee Table','teak-wood-coffee-table','Solid teak rectangular coffee table, 3.5ft x 2ft with lower shelf',12000.00,10499.00,10,'AL-100050',ARRAY['coffee-table','teak','shelf'],true ,true,1),
  (c08,'Round Coffee Table with Storage','round-coffee-table-storage','Round wooden coffee table with hidden storage drawer, 2.5ft dia',14000.00,NULL,7,'AL-100051',ARRAY['coffee-table','round','storage'],false,true,2),
  (c08,'Nesting Side Tables (Set of 3)','nesting-side-tables-set3','Set of 3 nesting wooden side tables in natural finish',9500.00,8299.00,8,'AL-100052',ARRAY['side-table','nesting','set'],false,true,3),
  (c08,'Glass-Top Centre Table (Wood Legs)','glass-top-centre-table-wood-legs','Centre table with tempered glass top on carved wooden legs',16000.00,NULL,5,'AL-100053',ARRAY['centre-table','glass','carved'],false,true,4),
  (c08,'Rustic Log Coffee Table','rustic-log-coffee-table','Natural tree-slice coffee table with live edge, unique piece',22000.00,19500.00,3,'AL-100054',ARRAY['coffee-table','rustic','live-edge'],true ,true,5),
  (c08,'Bedside Table / Nightstand','bedside-table-nightstand','Small wooden bedside table with drawer and lower shelf',5500.00,NULL,20,'AL-100055',ARRAY['nightstand','bedside','bedroom'],false,true,6),
  (c08,'Ottoman Coffee Table with Cushion','ottoman-coffee-table-cushion','Dual-use wooden ottoman with cushion top and storage inside',11000.00,9500.00,6,'AL-100056',ARRAY['ottoman','coffee-table','storage'],false,true,7),

  (c09,'Executive Office Desk 5ft','executive-office-desk-5ft','L-shaped executive desk in shegun with cable management, 5ft',32000.00,28000.00,5,'AL-100057',ARRAY['office-desk','executive','l-shaped'],true ,true,1),
  (c09,'Student Study Table 4ft','student-study-table-4ft','Simple study table with bookshelf top and drawer, 4ft wide',9500.00,NULL,15,'AL-100058',ARRAY['study-table','student','shelf'],false,true,2),
  (c09,'Computer Desk with Keyboard Tray','computer-desk-keyboard-tray','Dedicated computer desk with keyboard slide tray and monitor shelf',14000.00,12499.00,8,'AL-100059',ARRAY['computer-desk','keyboard','monitor'],false,true,3),
  (c09,'Writing Desk Minimalist 3ft','writing-desk-minimalist-3ft','Clean minimalist writing desk in natural oak finish, 3ft',8000.00,NULL,10,'AL-100060',ARRAY['writing-desk','minimalist','oak'],false,true,4),
  (c09,'Standing Desk Adjustable (Wood Top)','standing-desk-adjustable-wood','Height-adjustable standing desk with solid wood top, electric motor',45000.00,39999.00,3,'AL-100061',ARRAY['standing-desk','adjustable','electric'],true ,true,5),
  (c09,'Boss Desk with Side Return','boss-desk-side-return','Full executive boss desk with side return and pedestal drawers',52000.00,NULL,2,'AL-100062',ARRAY['boss-desk','executive','office'],false,true,6),
  (c09,'Foldable Wall-Mounted Study Table','foldable-wall-mounted-study-table','Space-saving wall-mounted fold-down study table, 3ft when open',7500.00,6500.00,12,'AL-100063',ARRAY['study-table','wall-mounted','foldable'],false,true,7),

  (c10,'High-Back Wooden Office Chair','high-back-wooden-office-chair','Solid wood high-back office chair with cushioned seat and back',12000.00,10499.00,10,'AL-100064',ARRAY['office-chair','high-back','wood'],true ,true,1),
  (c10,'Executive Leather Wooden Chair','executive-leather-wooden-chair','Executive wooden chair with genuine leather seat and armrests',18000.00,NULL,6,'AL-100065',ARRAY['office-chair','leather','executive'],false,true,2),
  (c10,'Study Chair with Armrest','study-chair-with-armrest','Simple wooden study chair with padded armrest, ideal for desks',5500.00,4799.00,15,'AL-100066',ARRAY['study-chair','armrest','student'],false,true,3),
  (c10,'Rattan-Back Office Chair','rattan-back-office-chair','Wooden office chair with traditional rattan woven back panel',7500.00,NULL,8,'AL-100067',ARRAY['office-chair','rattan','traditional'],false,true,4),
  (c10,'Wing Chair (Wooden Frame)','wing-chair-wooden-frame','Classic wing-back chair in solid wood with fabric upholstery',16000.00,13999.00,5,'AL-100068',ARRAY['wing-chair','classic','fabric'],true ,true,5),
  (c10,'Ergonomic Saddle Stool (Wood)','ergonomic-saddle-stool-wood','Posture-correcting saddle stool in solid wood, adjustable height',8500.00,NULL,7,'AL-100069',ARRAY['stool','ergonomic','saddle'],false,true,6),
  (c10,'Kids Study Chair Adjustable','kids-study-chair-adjustable','Height-adjustable wooden study chair for children 6–14 years',6500.00,5700.00,12,'AL-100070',ARRAY['study-chair','kids','adjustable'],false,true,7),

  (c11,'5-Shelf Wooden Bookcase','5-shelf-wooden-bookcase','Freestanding 5-tier bookcase in solid shegun, 6ft tall',16000.00,13999.00,8,'AL-100071',ARRAY['bookcase','5-shelf','shegun'],true ,true,1),
  (c11,'Display Cabinet with Glass Doors','display-cabinet-glass-doors','Wooden display cabinet with glass front doors and interior lighting',22000.00,NULL,5,'AL-100072',ARRAY['display-cabinet','glass','lighting'],false,true,2),
  (c11,'Wall-Mounted Book Shelf Set','wall-mounted-book-shelf-set','Set of 3 floating wall shelves in natural wood, easy install',5500.00,4799.00,20,'AL-100073',ARRAY['shelf','wall-mounted','floating'],false,true,3),
  (c11,'Ladder Bookshelf 5-Tier','ladder-bookshelf-5tier','Leaning ladder-style bookshelf in solid teak, modern design',12000.00,NULL,7,'AL-100074',ARRAY['bookshelf','ladder','modern'],false,true,4),
  (c11,'Filing & Storage Cabinet 3-Drawer','filing-storage-cabinet-3drawer','Wooden office filing cabinet with 3 lockable drawers',14000.00,12000.00,6,'AL-100075',ARRAY['cabinet','filing','drawers'],false,true,5),
  (c11,'Crockery Cabinet / China Hutch','crockery-cabinet-china-hutch','Dining crockery cabinet with glass top and wooden base, 6ft',28000.00,NULL,4,'AL-100076',ARRAY['crockery-cabinet','dining','glass'],true ,true,6),
  (c11,'Corner Bookshelf Tower','corner-bookshelf-tower','Space-saving corner bookshelf tower, 5-tier, 5.5ft tall',9500.00,8200.00,8,'AL-100077',ARRAY['bookshelf','corner','tower'],false,true,7),

  (c12,'TV Stand / Media Console 5ft','tv-stand-media-console-5ft','Wooden TV stand with cable holes, 2 doors, and open shelf, 5ft',14000.00,12000.00,8,'AL-100078',ARRAY['tv-stand','media','console'],true ,true,1),
  (c12,'Floating TV Unit Wall-Mounted','floating-tv-unit-wall-mounted','Wall-mounted floating TV unit with 2 drawers and open shelf, 6ft',18000.00,NULL,5,'AL-100079',ARRAY['tv-unit','floating','wall-mounted'],false,true,2),
  (c12,'TV Cabinet with Doors (4ft)','tv-cabinet-with-doors-4ft','Enclosed wooden TV cabinet with swing doors, hides clutter',10500.00,9199.00,10,'AL-100080',ARRAY['tv-cabinet','enclosed','doors'],false,true,3),
  (c12,'Entertainment Unit Full Wall','entertainment-unit-full-wall','Full wall entertainment unit with TV panel, shelves, and cabinets',55000.00,48000.00,2,'AL-100081',ARRAY['entertainment-unit','full-wall','modular'],true ,true,4),
  (c12,'Rustic TV Stand with Barn Doors','rustic-tv-stand-barn-doors','Farmhouse rustic TV stand with sliding barn-style doors, 5ft',22000.00,NULL,4,'AL-100082',ARRAY['tv-stand','rustic','barn-door'],false,true,5),
  (c12,'TV Unit with Study Desk Combo','tv-unit-study-desk-combo','Multi-purpose TV unit combined with a pull-out study desk',28000.00,24500.00,3,'AL-100083',ARRAY['tv-unit','combo','study-desk'],false,true,6),

  (c13,'4-Tier Wooden Shoe Rack','4-tier-wooden-shoe-rack','Open 4-tier wooden shoe rack, holds up to 16 pairs, natural finish',5500.00,4799.00,20,'AL-100084',ARRAY['shoe-rack','4-tier','open'],false,true,1),
  (c13,'Shoe Cabinet with Doors (3-Door)','shoe-cabinet-with-doors-3door','Enclosed 3-door shoe cabinet with flip-front shelves, 16 pairs',12000.00,NULL,10,'AL-100085',ARRAY['shoe-cabinet','enclosed','flip'],false,true,2),
  (c13,'Entryway Bench with Shoe Storage','entryway-bench-shoe-storage','Wooden entry bench with under-seat shoe storage for 8 pairs',9500.00,8199.00,8,'AL-100086',ARRAY['bench','shoe-storage','entryway'],true ,true,3),
  (c13,'Rotating Shoe Rack Tower (24 Pairs)','rotating-shoe-rack-tower-24pairs','360° rotating wooden shoe rack tower for 24 pairs of shoes',18000.00,NULL,5,'AL-100087',ARRAY['shoe-rack','rotating','tower'],false,true,4),
  (c13,'Slim Shoe Rack (2-Tier)','slim-shoe-rack-2tier','Ultra-slim 2-tier wooden shoe rack for narrow spaces',3200.00,2699.00,25,'AL-100088',ARRAY['shoe-rack','slim','2-tier'],false,true,5),
  (c13,'Solid Wood Shoe Storage Box (Stackable)','solid-wood-shoe-storage-box','Individual stackable wooden shoe storage box, pack of 1',1800.00,NULL,40,'AL-100089',ARRAY['shoe-box','stackable','storage'],false,true,6),

  (c14,'Upper Kitchen Cabinet Set (3 Units)','upper-kitchen-cabinet-set-3units','Set of 3 wall-mounted upper kitchen cabinets in shegun finish',28000.00,24999.00,3,'AL-100090',ARRAY['kitchen-cabinet','upper','set'],true ,true,1),
  (c14,'Base Kitchen Cabinet with Countertop','base-kitchen-cabinet-countertop','Floor-standing base cabinet with granite countertop, 4ft wide',32000.00,NULL,3,'AL-100091',ARRAY['kitchen-cabinet','base','countertop'],false,true,2),
  (c14,'Corner Kitchen Cabinet Lazy Susan','corner-kitchen-cabinet-lazy-susan','Corner base cabinet with rotating lazy susan shelves inside',22000.00,19500.00,2,'AL-100092',ARRAY['kitchen-cabinet','corner','lazy-susan'],false,true,3),
  (c14,'Pantry Cabinet Tall (7ft)','pantry-cabinet-tall-7ft','Tall 7ft pantry cabinet with adjustable shelves and pull-out drawers',38000.00,NULL,2,'AL-100093',ARRAY['pantry','tall-cabinet','kitchen'],false,true,4),
  (c14,'Modular Kitchen Cabinet L-Shape Set','modular-kitchen-cabinet-l-shape','Modular L-shaped kitchen cabinet package with 6 units',95000.00,85000.00,1,'AL-100094',ARRAY['kitchen','modular','l-shaped'],true ,true,5),
  (c14,'Under-Sink Wooden Cabinet','under-sink-wooden-cabinet','Moisture-resistant under-sink storage cabinet for bathrooms and kitchens',8500.00,7499.00,8,'AL-100095',ARRAY['under-sink','cabinet','kitchen'],false,true,6),
  (c14,'Freestanding Kitchen Island (Wood)','freestanding-kitchen-island-wood','Portable wooden kitchen island with butcher-block top and shelves',28000.00,NULL,3,'AL-100096',ARRAY['kitchen-island','freestanding','butcher-block'],false,true,7),

  (c15,'Classic Wooden Rocking Chair','classic-wooden-rocking-chair','Solid teak rocking chair with curved spindle back, natural polish',14000.00,12000.00,8,'AL-100097',ARRAY['rocking-chair','teak','classic'],true ,true,1),
  (c15,'Cushioned Easy Chair (Wing Back)','cushioned-easy-chair-wing-back','Wide wing-back easy chair with solid wood frame and thick cushion',18000.00,NULL,5,'AL-100098',ARRAY['easy-chair','wing-back','cushion'],false,true,2),
  (c15,'Shegun Rocking Chair with Armrest','shegun-rocking-chair-armrest','Premium shegun rocking chair with wide armrests and cane back',16000.00,14000.00,6,'AL-100099',ARRAY['rocking-chair','shegun','armrest'],false,true,3),
  (c15,'Papasan Bowl Chair (Wood Base)','papasan-bowl-chair-wood-base','Round papasan bowl chair with solid wooden base and cushion',12000.00,NULL,7,'AL-100100',ARRAY['papasan','bowl-chair','cushion'],false,true,4),
  (c15,'Recliner Chair (Wooden Frame)','recliner-chair-wooden-frame','Manual recliner chair with solid wooden frame and fabric upholstery',24000.00,21000.00,4,'AL-100101',ARRAY['recliner','wood','fabric'],true ,true,5),
  (c15,'Accent Chair with Carved Legs','accent-chair-carved-legs','Statement accent chair with ornately carved wooden legs and velvet seat',15000.00,NULL,5,'AL-100102',ARRAY['accent-chair','carved','velvet'],false,true,6),

  (c16,'Kids Wooden Bed with Slide','kids-wooden-bed-with-slide','Fun wooden loft bed with built-in slide, fits mattress 4ft x 6ft',35000.00,29999.00,3,'AL-100103',ARRAY['kids-bed','slide','loft'],true ,true,1),
  (c16,'Kids Study Table & Chair Set','kids-study-table-chair-set','Adjustable height study table + chair set for kids 6–14 years',9500.00,8200.00,12,'AL-100104',ARRAY['kids','study-table','adjustable'],false,true,2),
  (c16,'Wooden Toy Chest & Storage Box','wooden-toy-chest-storage-box','Hinged wooden toy chest with safety lid support, 3ft wide',8000.00,NULL,10,'AL-100105',ARRAY['toy-chest','kids','storage'],false,true,3),
  (c16,'Kids Bookshelf (Low 3-Tier)','kids-bookshelf-low-3tier','Child-height 3-tier bookshelf in bright painted finish, 3.5ft',6500.00,5700.00,12,'AL-100106',ARRAY['bookshelf','kids','low'],false,true,4),
  (c16,'Princess Bed with Canopy Frame','princess-bed-canopy-frame','Girls'' princess bed with canopy frame in white and pink, single size',28000.00,24999.00,4,'AL-100107',ARRAY['kids-bed','princess','canopy'],true ,true,5),
  (c16,'Wooden High Chair (Baby Feeding)','wooden-high-chair-baby-feeding','Solid wood baby high chair with adjustable footrest and safety tray',7500.00,NULL,8,'AL-100108',ARRAY['high-chair','baby','feeding'],false,true,6),
  (c16,'Kids Wardrobe 2-Door with Mirror','kids-wardrobe-2door-mirror','Colourful 2-door kids wardrobe with mirror and interior shelves',16000.00,14000.00,5,'AL-100109',ARRAY['wardrobe','kids','mirror'],false,true,7),

  (c17,'Teak Garden Bench 4ft','teak-garden-bench-4ft','All-weather solid teak garden bench, 4ft, no maintenance finish',18000.00,15999.00,6,'AL-100110',ARRAY['garden-bench','teak','outdoor'],true ,true,1),
  (c17,'Outdoor Dining Table & Chair Set (4-Seater)','outdoor-dining-set-4seater','Teak outdoor dining set with 4 chairs and umbrella hole table',55000.00,48000.00,2,'AL-100111',ARRAY['outdoor','dining-set','teak'],true ,true,2),
  (c17,'Wooden Swing Bench (2-Seater)','wooden-swing-bench-2seater','Hanging wooden swing bench with rope, ideal for garden or porch',22000.00,NULL,4,'AL-100112',ARRAY['swing','bench','outdoor'],false,true,3),
  (c17,'Adirondack Chair (Hardwood)','adirondack-chair-hardwood','Classic Adirondack chair in hardwood with wide armrests',12000.00,10500.00,7,'AL-100113',ARRAY['adirondack','outdoor-chair','hardwood'],false,true,4),
  (c17,'Wooden Deck Chair / Lounger','wooden-deck-chair-lounger','Adjustable reclining deck lounger in teak for garden or poolside',16000.00,NULL,5,'AL-100114',ARRAY['lounger','deck-chair','teak'],false,true,5),
  (c17,'Garden Planter Box (Wood)','garden-planter-box-wood','Raised wooden garden planter box, 4ft long, cedar wood',6500.00,5700.00,10,'AL-100115',ARRAY['planter','garden','cedar'],false,true,6),

  (c18,'Entryway Wooden Bench 4ft','entryway-wooden-bench-4ft','Solid wood hallway bench with slatted seat, 4ft length',8500.00,7499.00,10,'AL-100116',ARRAY['bench','entryway','hallway'],false,true,1),
  (c18,'Upholstered Storage Bench','upholstered-storage-bench','Wooden storage bench with padded fabric lid, 3.5ft',12000.00,NULL,7,'AL-100117',ARRAY['bench','storage','upholstered'],false,true,2),
  (c18,'Round Wooden Stool (Set of 2)','round-wooden-stool-set2','Set of 2 solid wood round stools in natural finish, stackable',5500.00,4799.00,15,'AL-100118',ARRAY['stool','round','set'],false,true,3),
  (c18,'Piano Bench with Storage','piano-bench-with-storage','Hinged-lid piano bench with music sheet storage inside',9000.00,7999.00,5,'AL-100119',ARRAY['piano-bench','storage','music'],true ,true,4),
  (c18,'Wooden Step Stool 2-Step','wooden-step-stool-2step','Solid wood 2-step stool for kitchen and bathroom use',3500.00,NULL,20,'AL-100120',ARRAY['step-stool','2-step','kitchen'],false,true,5),
  (c18,'Carved Temple Bench (Mandir)','carved-temple-bench-mandir','Traditional hand-carved wooden bench for pooja/mandir use',11000.00,9500.00,4,'AL-100121',ARRAY['bench','carved','mandir'],false,true,6),

  (c19,'Wooden Photo Frame Set (3 Sizes)','wooden-photo-frame-set-3sizes','Matching set of 3 solid wood photo frames in natural finish',2500.00,2099.00,30,'AL-100122',ARRAY['photo-frame','wood','set'],false,true,1),
  (c19,'Wooden Wall Clock (12-inch)','wooden-wall-clock-12inch','Handmade wooden wall clock with laser-cut numerals, 12-inch',3200.00,NULL,20,'AL-100123',ARRAY['wall-clock','wood','handmade'],false,true,2),
  (c19,'Wooden Tray Set (3-Piece)','wooden-tray-set-3piece','Nesting set of 3 wooden serving trays in different sizes',3800.00,3199.00,18,'AL-100124',ARRAY['tray','serving','wood'],false,true,3),
  (c19,'Wooden Tissue Box Cover','wooden-tissue-box-cover','Hand-carved decorative wooden tissue box holder for table top',1800.00,NULL,35,'AL-100125',ARRAY['tissue-box','wood','decor'],false,true,4),
  (c19,'Wooden Key Holder Wall Hook','wooden-key-holder-wall-hook','Wall-mounted wooden key holder with 5 hooks and label board',1500.00,1199.00,40,'AL-100126',ARRAY['key-holder','wall','hooks'],false,true,5),
  (c19,'Wooden Candle Holder Set (5-Piece)','wooden-candle-holder-set-5piece','Set of 5 graduated wooden candle holders for table centrepiece',2800.00,NULL,22,'AL-100127',ARRAY['candle-holder','wood','decor'],false,true,6),
  (c19,'Decorative Wooden Bowl (Carved)','decorative-wooden-bowl-carved','Hand-turned decorative carved wooden bowl, approx 12-inch diameter',4500.00,3899.00,12,'AL-100128',ARRAY['bowl','carved','decorative'],true ,true,7),
  (c19,'Wooden Spice Rack 3-Tier (Wall)','wooden-spice-rack-3tier-wall','Wall-mounted 3-tier wooden spice rack for kitchen, holds 24 jars',3500.00,NULL,18,'AL-100129',ARRAY['spice-rack','wall','kitchen'],false,true,8),

  (c20,'Custom Name Carved Wooden Sign','custom-name-carved-wooden-sign','Personalised hand-carved wooden name or family sign, made to order',3500.00,NULL,50,'AL-100130',ARRAY['custom','carved','name-sign'],false,true,1),
  (c20,'Hand-Carved Wooden Elephant Sculpture','carved-wooden-elephant-sculpture','Large hand-carved decorative elephant in dark mahogany, 18 inches',8500.00,7499.00,10,'AL-100131',ARRAY['sculpture','elephant','carved'],true ,true,2),
  (c20,'Carved Wooden Room Divider (4-Panel)','carved-wooden-room-divider-4panel','Ornately carved 4-panel wooden room divider / folding screen, 6ft',32000.00,NULL,3,'AL-100132',ARRAY['room-divider','carved','screen'],true ,true,3),
  (c20,'Custom Wedding Gift Wood Box','custom-wedding-gift-wood-box','Personalised engraved wooden box for wedding gifts and keepsakes',4500.00,3900.00,25,'AL-100133',ARRAY['gift-box','wedding','engraved'],false,true,4),
  (c20,'Carved Wooden Mirror Frame (Oval)','carved-wooden-mirror-frame-oval','Hand-carved ornate oval mirror frame in teak, 3ft x 2ft',14000.00,NULL,6,'AL-100134',ARRAY['mirror-frame','carved','oval'],false,true,5),
  (c20,'Wooden Chess Set (Handmade)','wooden-chess-set-handmade','Hand-carved wooden chess set with folding board, 16 inches',6500.00,5700.00,12,'AL-100135',ARRAY['chess','handmade','game'],false,true,6),
  (c20,'Custom Wooden Nameplate (Door)','custom-wooden-nameplate-door','Engraved wooden door nameplate with family name, made to order',2500.00,NULL,40,'AL-100136',ARRAY['nameplate','door','custom'],false,true,7),
  (c20,'Wooden Quran / Holy Book Stand','wooden-quran-book-stand','Folding wooden book stand for Quran and holy books, carved design',3200.00,2799.00,30,'AL-100137',ARRAY['quran-stand','book-stand','carved'],false,true,8),
  (c20,'Carved Wooden Swing (Indoor Kids)','carved-wooden-swing-indoor-kids','Hand-carved decorative indoor swing for kids, ceiling mounted, rope',12000.00,NULL,5,'AL-100138',ARRAY['swing','kids','indoor'],false,true,9),
  (c20,'Wooden Wall Art Panel (Geometric)','wooden-wall-art-panel-geometric','Laser-cut geometric wooden wall art panel, 2ft x 2ft, walnut finish',5500.00,4799.00,15,'AL-100139',ARRAY['wall-art','geometric','wood'],true ,true,10),
  (c20,'Live Edge Wooden Serving Board','live-edge-wooden-serving-board','Natural live-edge wooden charcuterie and serving board, unique grain',4800.00,NULL,12,'AL-100140',ARRAY['serving-board','live-edge','charcuterie'],false,true,11),
  (c20,'Custom Wooden Baby Name Frame','custom-wooden-baby-name-frame','Personalised laser-engraved baby name and birth date frame, 12 inches',3800.00,3199.00,20,'AL-100141',ARRAY['baby','name-frame','custom'],false,true,12),
  (c20,'Wooden Mandir / Pooja Unit (Small)','wooden-mandir-pooja-unit-small','Wall-mounted small wooden mandir with carved arch, 2.5ft',18000.00,NULL,5,'AL-100142',ARRAY['mandir','pooja','carved'],false,true,13),
  (c20,'Carved Wooden Table Lamp Base','carved-wooden-table-lamp-base','Artisan hand-carved wooden table lamp base, wiring ready, 18 inches',7500.00,6500.00,8,'AL-100143',ARRAY['lamp','carved','table'],false,true,14),
  (c20,'Custom Engraved Cutting Board (Gift)','custom-engraved-cutting-board-gift','Personalised engraved bamboo cutting board as a gift, 12x8 inches',2800.00,NULL,25,'AL-100144',ARRAY['cutting-board','gift','engraved'],false,true,15),
  (c20,'Bespoke Carved TV Unit (Custom Order)','bespoke-carved-tv-unit-custom','Fully custom-carved TV unit in customer-specified wood and design',95000.00,NULL,1,'AL-100145',ARRAY['tv-unit','custom','carved'],true ,true,16),
  (c20,'Hand-Carved Wooden Door Panel Art','hand-carved-wooden-door-panel-art','Decorative carved wooden wall panel in floral motif, 4ft x 2ft',22000.00,19500.00,4,'AL-100146',ARRAY['wall-panel','carved','floral'],false,true,17),
  (c20,'Wooden Letter / Mail Holder','wooden-letter-mail-holder','Desk-top wooden letter holder with 3 slots and pen cup',2200.00,NULL,28,'AL-100147',ARRAY['letter-holder','desk','wood'],false,true,18),
  (c20,'Traditional Wooden Dhol / Drum Stand','traditional-wooden-drum-stand','Hand-carved wooden stand for dhol or decorative drum display',5500.00,4800.00,6,'AL-100148',ARRAY['drum-stand','traditional','carved'],false,true,19),
  (c20,'Wooden Garden Signpost (Custom)','wooden-garden-signpost-custom','Weather-treated custom wooden garden sign on post, made to order',4200.00,NULL,15,'AL-100149',ARRAY['garden-sign','outdoor','custom'],false,true,20),
  (c20,'Carved Wooden Fruit Bowl (Footed)','carved-wooden-fruit-bowl-footed','Footed hand-carved decorative fruit bowl in mango wood, 14-inch',5200.00,4500.00,10,'AL-100150',ARRAY['fruit-bowl','carved','mango-wood'],false,true,21)
"""

    lines = original_sql.strip().split('\n')
    idx = 1
    for line in lines:
        line = line.strip()
        if not line.startswith('('):
            continue
        
        # Parse tuple using regex
        m = re.match(r'^\((c\d+),\s*\'(.*?)\',\s*\'(.*?)\',\s*\'(.*?)\',\s*([\d\.]+),\s*(NULL|[\d\.]+),\s*(\d+),\s*\'(.*?)\',\s*ARRAY\[(.*?)\]\s*,\s*(true|false)\s*,\s*(true|false)\s*,\s*(\d+)\),?$', line)
        if m:
            cat_var = m.group(1)
            name_en = m.group(2)
            slug = m.group(3)
            desc_en = m.group(4)
            price = m.group(5)
            sale_price = m.group(6)
            stock = m.group(7)
            sku = m.group(8)
            tags_str = m.group(9)
            is_featured = m.group(10)
            is_active = m.group(11)
            
            product_id = f"PRD-{idx:03d}"
            cat_id = cat_id_map.get(cat_var, 'cat_001')
            name_bn = translate_name(name_en)
            original_price = float(price) if sale_price == 'NULL' else float(price) # actually if sale price is NULL, then sale_price is price. Wait, 'price' in user's original is original price?
            
            # The schema: products (id, name, name_en, category_id, price, original_price, image, images, description, material, dimensions, color, weight, in_stock, is_featured, is_top_selling, rating, review_count, tags)
            if sale_price != 'NULL':
                current_price = float(sale_price)
                orig_price = float(price)
            else:
                current_price = float(price)
                orig_price = float(price) * 1.2 # Just make up original price
                
            image = f"https://placehold.co/600x500/8B4E38/FAF6F1?text={name_en.replace(' ', '+')}"
            images = f'["{image}","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]'
            
            desc_bn = translate_name(desc_en) + "।"
            
            tags_list = [t.strip().strip("'") for t in tags_str.split(',')]
            bn_tags = [translate_name(t) for t in tags_list]
            all_tags = tags_list + bn_tags
            tags_json = json.dumps(all_tags, ensure_ascii=False)
            
            suffix = "," if idx < 150 else ";"
            
            f.write(f"('{product_id}', '{name_bn}', '{name_en}', '{cat_id}', {current_price}, {orig_price}, '{image}', '{images}', '{desc_bn}', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', {is_active}, {is_featured}, false, 4.5, 10, '{tags_json}'){suffix}\n")
            idx += 1

print("SQL script generated successfully as insertdata_bangla.sql")
