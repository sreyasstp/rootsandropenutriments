export interface Product {
  id: number;
  name: string;
  packSizes: string[];
  category: string;
  unit: string;
  image: string;
}

export const products: Product[] = [
  { id: 1, name: 'Badam', packSizes: ['250', '500'], category: 'Dry Fruits & Nuts', unit: 'g', image: '/almond.jpg' },
  { id: 2, name: 'Cashew', packSizes: ['250', '500'], category: 'Dry Fruits & Nuts', unit: 'g', image: '/cashews.jpg' },
  { id: 3, name: 'Almond Gum', packSizes: ['100', '250'], category: 'Dry Fruits & Nuts', unit: 'g', image: '/almond_gum.jpg' },
  { id: 4, name: 'Saffron', packSizes: ['1'], category: 'Dry Fruits & Nuts', unit: 'g', image: '/saffron.jpg' },
  { id: 5, name: 'Honey', packSizes: ['400', '700'], category: 'Natural Products', unit: 'g', image: '/honey.jpg' },
  { id: 6, name: 'Coconut Oil', packSizes: ['500', '1000'], category: 'Natural Products', unit: 'ml', image: '/coconut_oil.jpg' },
  { id: 7, name: 'Virgin Coconut Oil', packSizes: ['100', '200'], category: 'Natural Products', unit: 'ml', image: '/virgin_coconut_oil.jpg' },
  { id: 8, name: 'Wheat', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g', image: '/wheat.jpg' },
  { id: 9, name: 'Rice', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g', image: '/rice.jpg' },
  { id: 10, name: 'Ragi', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g', image: '/ragi.jpg' },
  { id: 11, name: 'Jaggery', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g', image: '/jaggery.jpg' },
  { id: 12, name: 'Puttu', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g', image: '/puttu.jpg' },
  { id: 13, name: 'Raw Banana Powder', packSizes: ['100', '250', '400'], category: 'Health Powders', unit: 'g', image: '/raw_banana_powder.jpg' },
  { id: 14, name: 'Arrow Root Powder', packSizes: ['100', '250', '400'], category: 'Health Powders', unit: 'g', image: '/arrowroot_powder.jpg' },
  { id: 15, name: 'Turmeric Powder', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g', image: '/turmeric.jpg' },
  { id: 16, name: 'Chilli Powder', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g', image: '/red_chilli_powder.jpg' },
  { id: 17, name: 'Kashmiri Chilli Powder', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g', image: '/kasmiri_chilli_powder.jpg' },
  { id: 18, name: 'Coriander Powder', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g', image: '/coriander_powder.jpg' },
  { id: 19, name: 'Garam Masala', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g', image: '/garam_masala.jpg' },
  { id: 20, name: 'Chilli Flakes', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g', image: '/chilli_flakes.jpg' },
  { id: 21, name: 'Sambar Powder', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g', image: '/sambhar_powder.jpg' },
];

export const categories = [
  'All Products',
  'Dry Fruits & Nuts',
  'Natural Products',
  'Grains & Cereals',
  'Health Powders',
  'Spices & Masalas'
];
