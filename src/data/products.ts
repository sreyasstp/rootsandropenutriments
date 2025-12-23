export interface Product {
  id: number;
  name: string;
  packSizes: string[];
  category: string;
  unit: string;
}

export const products: Product[] = [
  { id: 1, name: 'Badam', packSizes: ['250', '500'], category: 'Dry Fruits & Nuts', unit: 'g' },
  { id: 2, name: 'Cashew', packSizes: ['250', '500'], category: 'Dry Fruits & Nuts', unit: 'g' },
  { id: 3, name: 'Almond Gum', packSizes: ['100', '250'], category: 'Dry Fruits & Nuts', unit: 'g' },
  { id: 4, name: 'Saffron', packSizes: ['1'], category: 'Dry Fruits & Nuts', unit: 'g' },
  { id: 5, name: 'Honey', packSizes: ['400', '700'], category: 'Natural Products', unit: 'g' },
  { id: 6, name: 'Coconut Oil', packSizes: ['500', '1000'], category: 'Natural Products', unit: 'ml' },
  { id: 7, name: 'Virgin Coconut Oil', packSizes: ['100', '200'], category: 'Natural Products', unit: 'ml' },
  { id: 8, name: 'Wheat', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g' },
  { id: 9, name: 'Rice', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g' },
  { id: 10, name: 'Ragi', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g' },
  { id: 11, name: 'Jaggery', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g' },
  { id: 12, name: 'Puttu', packSizes: ['500', '1000'], category: 'Grains & Cereals', unit: 'g' },
  { id: 13, name: 'Raw Banana Powder', packSizes: ['100', '250', '400'], category: 'Health Powders', unit: 'g' },
  { id: 14, name: 'Arrow Root Powder', packSizes: ['100', '250', '400'], category: 'Health Powders', unit: 'g' },
  { id: 15, name: 'Turmeric Powder', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
  { id: 16, name: 'Chilli Powder', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
  { id: 17, name: 'Kashmiri Chilli Powder', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
  { id: 18, name: 'Coriander Powder', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
  { id: 19, name: 'Garam Masala', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
  { id: 20, name: 'Chilli Flakes', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
  { id: 21, name: 'Sambar Powder', packSizes: ['100', '250', '400'], category: 'Spices & Masalas', unit: 'g' },
];

export const categories = [
  'All Products',
  'Dry Fruits & Nuts',
  'Natural Products',
  'Grains & Cereals',
  'Health Powders',
  'Spices & Masalas'
];
