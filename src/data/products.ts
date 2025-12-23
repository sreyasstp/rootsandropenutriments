export interface Product {
  id: number;
  name: string;
  image: string;
  packSizes: string[];
  category: string;
  unit: string;
}

export const products: Product[] = [
  { id: 1, name: 'Badam', image: '/Almond.jpg', packSizes: ['250', '500'], category: 'Dry Fruits & Nuts', unit: 'g' },
  { id: 2, name: 'Cashew', image: '/Cashews.jpg', packSizes: ['250', '500'], category: 'Dry Fruits & Nuts', unit: 'g' },
  { id: 3, name: 'Almond Gum', image: '/ALMOND GUM.jpg', packSizes: ['100', '250'], category: 'Dry Fruits & Nuts', unit: 'g' },
  { id: 4, name: 'Saffron', image: '/SAFFRON.jpg', packSizes: ['1'], category: 'Dry Fruits & Nuts', unit: 'g' },
  { id: 5, name: 'Honey', image: '/Honey.jpg', packSizes: ['400', '700'], category: 'Natural Products', unit: 'g' },
  { id: 6, name: 'Coconut Oil', image: '/Coconut Oil.jpg', packSizes: ['500', '1000'], category: 'Natural Products', unit: 'ml' },
  { id: 7, name: 'Virgin Coconut Oil', image: '/Virgin Coconut Oil.jpg', packSizes: ['100', '200'], category: 'Natural Products', unit: 'ml' },
  { id: 8, name: 'Wheat', image: '/Wheat.jpg', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g' },
  { id: 9, name: 'Rice', image: '/Rice.jpg', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g' },
  { id: 10, name: 'Ragi', image: '/Ragi.jpg', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g' },
  { id: 11, name: 'Jaggery', image: '/Jaggery.jpg', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g' },
  { id: 12, name: 'Puttu', image: '/Puttu.jpg', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g' },
  { id: 13, name: 'Raw Banana Powder', image: '/RAW BANANA POWDER.jpg', packSizes: ['100', '250', '400'], category: 'Health Powders', unit: 'g' },
  { id: 14, name: 'Arrow Root Powder', image: '/ARROWROOT POWDER.jpg', packSizes: ['100', '250', '400'], category: 'Health Powders', unit: 'g' },
  { id: 15, name: 'Turmeric Powder', image: '/Turmeric.jpg', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
  { id: 16, name: 'Chilli Powder', image: '/RED CHILLI POWDER.jpg', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
  { id: 17, name: 'Kashmiri Chilli Powder', image: '/Kasmiri Chilli powder.jpg', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
  { id: 18, name: 'Coriander Powder', image: '/CORIANDER POWDER.jpg', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
  { id: 19, name: 'Garam Masala', image: '/Garam Masala.jpg', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
  { id: 20, name: 'Chilli Flakes', image: '/Chilli Flakes.jpg', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
  { id: 21, name: 'Sambar Powder', image: '/Sambhar Powder.jpg', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
];

export const categories = [
  'All Products',
  'Dry Fruits & Nuts',
  'Natural Products',
  'Grains & Cereals',
  'Health Powders',
  'Spices & Masalas'
];
