export interface Product {
  id: number;
  name: string;
  image: string;
  packSizes: string[];
  category: string;
  unit: string;
}

export const products: Product[] = [
  { id: 1, name: 'Badam', image: '/almond.jpg', packSizes: ['250', '500'], category: 'Dry Fruits & Nuts', unit: 'g' },
  { id: 2, name: 'Cashew', image: '/cashews.jpg', packSizes: ['250', '500'], category: 'Dry Fruits & Nuts', unit: 'g' },
  { id: 3, name: 'Almond Gum', image: '/almond_gum.jpg', packSizes: ['100', '250'], category: 'Dry Fruits & Nuts', unit: 'g' },
  { id: 4, name: 'Saffron', image: '/saffron.jpg', packSizes: ['1'], category: 'Dry Fruits & Nuts', unit: 'g' },
  { id: 5, name: 'Honey', image: '/honey.jpg', packSizes: ['400', '700'], category: 'Natural Products', unit: 'g' },
  { id: 6, name: 'Coconut Oil', image: '/coconut_oil.jpg', packSizes: ['500', '1000'], category: 'Natural Products', unit: 'ml' },
  { id: 7, name: 'Virgin Coconut Oil', image: '/virgin_coconut_oil.jpg', packSizes: ['100', '200'], category: 'Natural Products', unit: 'ml' },
  { id: 8, name: 'Wheat', image: '/wheat.jpg', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g' },
  { id: 9, name: 'Rice', image: '/rice.jpg', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g' },
  { id: 10, name: 'Ragi', image: '/ragi.jpg', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g' },
  { id: 11, name: 'Jaggery', image: '/jaggery.jpg', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g' },
  { id: 12, name: 'Puttu', image: '/puttu.jpg', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g' },
  { id: 13, name: 'Raw Banana Powder', image: '/raw_banana_powder.jpg', packSizes: ['100', '250', '400'], category: 'Health Powders', unit: 'g' },
  { id: 14, name: 'Arrow Root Powder', image: '/arrowroot_powder.jpg', packSizes: ['100', '250', '400'], category: 'Health Powders', unit: 'g' },
  { id: 15, name: 'Turmeric Powder', image: '/turmeric.jpg', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
  { id: 16, name: 'Chilli Powder', image: '/red_chilli_powder.jpg', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
  { id: 17, name: 'Kashmiri Chilli Powder', image: '/kasmiri_chilli_powder.jpg', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
  { id: 18, name: 'Coriander Powder', image: '/coriander_powder.jpg', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
  { id: 19, name: 'Garam Masala', image: '/garam_masala.jpg', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
  { id: 20, name: 'Chilli Flakes', image: '/chilli_flakes.jpg', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
  { id: 21, name: 'Sambar Powder', image: '/sambhar_powder.jpg', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
];

export const categories = [
  'All Products',
  'Dry Fruits & Nuts',
  'Natural Products',
  'Grains & Cereals',
  'Health Powders',
  'Spices & Masalas'
];
