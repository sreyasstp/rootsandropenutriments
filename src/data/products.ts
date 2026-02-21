export interface Product {
  id: number;
  name: string;
  packSizes: string[];
  prices: number[];
  category: string;
  unit: string;
  image: string;
  description?: string;
  benefits?: string[];
  usage?: string;
  features?: string[];
}

export const products: Product[] = [
 
  {
    id: 1,
    name: 'Almonds',
    packSizes: ['250', '500'],
    prices: [290, 550],
    category: 'Dry Fruits & Nuts',
    unit: 'g',
    image: '/almond.jpg',
    description: 'Premium quality almonds, rich in nutrients and naturally sweet.',
    benefits: ['Rich in Vitamin E', 'Good for heart health', 'Boosts brain function', 'High in protein and fiber'],
    usage: 'Soak overnight and consume in the morning, or add to smoothies, desserts, and traditional sweets.',
    features: ['100% Natural', 'No Preservatives', 'Carefully Selected']
  },
  {
    id: 2,
    name: 'Cashews',
    packSizes: ['250', '500'],
    prices: [380, 700],
    category: 'Dry Fruits & Nuts',
    unit: 'g',
    image: '/cashews.jpg',
    description: 'Premium cashew nuts, creamy and delicious.',
    benefits: ['Rich in healthy fats', 'Good source of minerals', 'Supports bone health', 'Boosts immunity'],
    usage: 'Enjoy as a snack, add to curries, sweets, or make cashew butter.',
    features: ['100% Natural', 'No Preservatives', 'Premium Grade']
  },
  {
    id: 3,
    name: 'Almond Gum',
    packSizes: ['100', '250'],
    prices: [90, 200],
    category: 'Dry Fruits & Nuts',
    unit: 'g',
    image: '/almond_gum.jpg',
    description: 'Traditional natural remedy known for strength and vitality.',
    benefits: [
      'Natural energy booster',
      'Glowing skin and stronger hair',
      'Strengthens bones and joints',
      'Improves immunity',
      'Rich in calcium',
      'Postpartum nutrition'
    ],
    usage:
      'Soak small pieces in water overnight until they swell and become soft and jelly-like. Consume with water, juice, or milk.',
    features: [
      '100% Natural',
      'No Preservatives',
      'Traditional Quality',
      'Carefully Processed'
    ]
  },
  {
    id: 4,
    name: 'Saffron',
    packSizes: ['1'],
    prices: [350],
    category: 'Dry Fruits & Nuts',
    unit: 'g',
    image: '/saffron.jpg',
    description: 'Premium quality Kashmiri saffron strands, the most precious spice.',
    benefits: ['Mood enhancer', 'Improves skin complexion', 'Antioxidant properties', 'Supports digestion'],
    usage: 'Soak a few strands in warm milk or water and add to desserts, biryanis, or beverages.',
    features: ['100% Pure', 'No Preservatives', 'Premium Quality', 'Kashmiri']
  },
  {
    id: 5,
    name: 'Honey',
    packSizes: ['400', '700'],
    prices: [280, 480],
    category: 'Natural Products',
    unit: 'g',
    image: '/honey.jpg',
    description: 'Pure, raw honey sourced from natural hives. Unprocessed and unfiltered.',
    benefits: ['Natural sweetener', 'Antibacterial properties', 'Soothes throat', 'Rich in antioxidants', 'Boosts immunity', 'Natural energy source'],
    usage: 'Add to warm water, tea, or milk. Use as a natural sweetener in smoothies and desserts. Can be applied topically for skin benefits.',
    features: ['100% Raw & Unprocessed', 'No Preservatives', 'No Added Sugar', 'Naturally Sourced']
  },
  {
    id: 6,
    name: 'Coconut Oil',
    packSizes: ['500', '1000'],
    prices: [400, 750],
    category: 'Natural Products',
    unit: 'ml',
    image: '/coconut_oil.jpg',
    description: 'Pure coconut oil extracted from fresh coconuts using cold pressed method. Versatile for cooking and wellness.',
    benefits: ['Supports heart health', 'Boosts metabolism', 'Moisturizes skin and hair', 'Antibacterial properties', 'Natural source of MCT'],
    usage: 'Use for cooking, frying, or as a hair and skin moisturizer. Can be consumed directly or added to beverages.',
    features: ['100% Pure', 'Cold Pressed', 'No Preservatives', 'Multi-Purpose', 'Naturally Extracted']
  },
  {
    id: 7,
    name: 'Virgin Coconut Oil',
    packSizes: ['100', '200'],
    prices: [180, 350],
    category: 'Natural Products',
    unit: 'ml',
    image: '/virgin_coconut_oil.jpg',
    description:
      'High-quality virgin coconut oil produced using controlled hot processing to ensure purity, stability, and rich coconut aroma.',
    benefits: [
      'Anti-aging properties',
      'Good source of healthy fats',
      'Supports energy levels',
      'Helps maintain skin and hair health',
      'Naturally antimicrobial',
      'Easily digestible'
    ],
    usage:
      'Acts as a nutritional booster. Ideal for regular cooking, sautéing, and frying. Can also be used for oil pulling, hair care, and skin massage.',
    features: [
      'Hot Processed',
      '100% Pure',
      'No Preservatives',
      'No Added Chemicals',
      'Stable for Cooking'
    ]
  }
  ,
  {
    id: 8,
    name: 'Wheat Flour',
    packSizes: ['500', '1000'],
    prices: [60, 110],
    category: 'Grains & Cereals',
    unit: 'g',
    image: '/wheat.jpg',
    description: 'Premium quality whole wheat flour, sourced from organic farms.',
    benefits: ['High in fiber', 'Good source of B vitamins', 'Supports digestion', 'Provides sustained energy'],
    usage: 'Perfect for making rotis, breads, and other traditional dishes.',
    features: ['100% Natural', 'No Preservatives', 'Organically Sourced']
  },
  {
    id: 9,
    name: 'Rice Flour',
    packSizes: ['500', '1000'],
    prices: [60, 110],
    category: 'Grains & Cereals',
    unit: 'g',
    image: '/rice.jpg',
    description: 'Premium quality rice flour, a staple for every household.',
    benefits: ['Good source of energy', 'Easy to digest', 'Gluten-free', 'Versatile cooking ingredient'],
    usage: 'Perfect for making dosas, idlis, and various traditional dishes.',
    features: ['100% Natural', 'No Preservatives', 'Premium Quality']
  },
  {
    id: 10,
    name: 'Ragi Flour',
    packSizes: ['500', '1000'],
    prices: [60, 110],
    category: 'Grains & Cereals',
    unit: 'g',
    image: '/ragi.jpg',
    description: 'Nutrient-rich finger millet flour, perfect for health-conscious individuals.',
    benefits: ['High in calcium', 'Rich in iron', 'Good for diabetes management', 'Promotes bone health'],
    usage: 'Make ragi porridge, dosa, roti, or add to smoothies.',
    features: ['100% Natural', 'No Preservatives', 'Nutrient Dense']
  },
  {
    id: 11,
    name: 'Sprouted Ragi Flour',
    packSizes: ['500', '1000'],
    prices: [130, 250],
    category: 'Grains & Cereals',
    unit: 'g',
    image: '/sprouted_raggi_flour.png',
    description:
      'Nutritious sprouted ragi flour made from carefully sprouted finger millet to enhance mineral absorption and digestibility.',
    benefits: [
      'High calcium content',
      'Improved mineral absorption due to sprouting',
      'Good for bone health',
      'Supports digestion',
      'Ideal for diabetics',
      'Rich in iron'
    ],
    usage:
      'Use to prepare ragi porridge, dosa, roti, malt, or healthy breakfast recipes.',
    features: [
      'Sprouted & Naturally Processed',
      '100% Natural',
      'No Preservatives',
      'Stone Ground',
      'Traditional Method'
    ]
  },
  
  {
    id: 12,
    name: 'Jaggery Powder',
    packSizes: ['500', '1000'],
    prices: [70, 130],
    category: 'Grains & Cereals',
    unit: 'g',
    image: '/jaggery.jpg',
    description: 'Traditional unrefined sweetener made from sugarcane.',
    benefits: ['Natural sweetener', 'Rich in minerals', 'Aids digestion', 'Purifies blood'],
    usage: 'Use as a healthier alternative to sugar in desserts, beverages, and traditional preparations.',
    features: ['100% Natural', 'No Preservatives', 'Unrefined']
  },
  {
    id: 13,
    name: 'Puttu Podi',
    packSizes: ['500', '1000'],
    prices: [80, 150],
    category: 'Grains & Cereals',
    unit: 'g',
    image: '/puttu.jpg',
    description:
      'Traditional rice flour made with 75% rice bran for preparing authentic Kerala puttu.',
    benefits: [
      'Easy to digest',
      'Low in fat',
      'Good source of carbohydrates',
      'Gluten-free'
    ],
    usage:
      'Steam with grated coconut to make traditional puttu. Serve with banana, kadala curry, or sugar.',
    features: [
      '100% Natural',
      'No Preservatives',
      'Authentic Recipe'
    ]
  }
  ,
  {
    id: 14,
    name: 'Raw Banana Powder',
    packSizes: ['100', '250', '500'],
    prices: [159, 390, 760],
    category: 'Health Powders',
    unit: 'g',
    image: '/raw_banana_powder.jpg',
    description: 'Gentle and nutritious raw banana powder, ideal for babies and growing children. Easy to digest and naturally wholesome.',
    benefits: ['Gentle on tiny tummies', 'Easy to digest', 'Rich in essential nutrients', 'Supports healthy growth', 'Natural energy source', 'Ideal for weaning babies'],
    usage: 'Mix with milk, water, or cereal for baby food. Perfect for porridge and traditional infant recipes.',
    features: ['100% Natural', 'No Preservatives', 'No Additives', 'Gluten-Free', 'Baby-Friendly']
  },
  {
    id: 15,
    name: 'Arrowroot Powder',
    packSizes: ['100', '250', '500'],
    prices: [159, 390, 760],
    category: 'Health Powders',
    unit: 'g',
    image: '/arrowroot_powder.jpg',
    description: 'Pure arrowroot powder that is gentle on the stomach, easily digestible, and traditionally used as a nourishing food for infants and adults. Naturally gluten-free.',
    benefits: [
      'Gluten-free',
      'Easy to digest',
      'Traditionally used for baby food',
      'Soothes digestive discomfort',
      'Helps during diarrhea',
      'Supports healthy weight gain'
    ],
    usage: 'Mix with water or milk to prepare porridge. Commonly used in infant foods, recovery diets, and as a natural thickening agent in soups and gravies.',
    features: [
      '100% Natural',
      'No Preservatives',
      'Gluten-Free',
      'Easily Digestible',
      'Suitable for All Age Groups'
    ]
  },
  {
    id: 16,
    name: 'Turmeric Powder',
    packSizes: ['100', '250', '500'],
    prices: [69, 170, 335],
    category: 'Spices & Masalas',
    unit: 'g',
    image: '/turmeric.jpg',
    description: 'Pure turmeric powder with natural curcumin content.',
    benefits: ['Anti-inflammatory', 'Boosts immunity', 'Natural antiseptic', 'Supports liver health'],
    usage: 'Add to curries, milk, smoothies, or use in traditional remedies.',
    features: ['100% Natural', 'No Preservatives', 'High Curcumin Content']
  },
  {
    id: 17,
    name: 'Chilli Powder',
    packSizes: ['100', '250', '500'],
    prices: [59, 145, 285],
    category: 'Spices & Masalas',
    unit: 'g',
    image: '/red_chilli_powder.jpg',
    description: 'Premium red chilli powder for authentic spicy flavor.',
    benefits: ['Boosts metabolism', 'Rich in Vitamin C', 'Pain relief properties', 'Improves digestion'],
    usage: 'Add to curries, marinades, and spice blends for heat and color.',
    features: ['100% Natural', 'No Preservatives', 'Vibrant Color']
  },
  {
    id: 18,
    name: 'Kashmiri Chilli Powder',
    packSizes: ['100', '250', '500'],
    prices: [89, 220, 430],
    category: 'Spices & Masalas',
    unit: 'g',
    image: '/kasmiri_chilli_powder.jpg',
    description: 'Mild Kashmiri chilli powder known for its vibrant red color.',
    benefits: ['Adds vibrant color', 'Mild heat', 'Rich in antioxidants', 'Eye-catching presentation'],
    usage: 'Use in tandoori dishes, curries, and marinades for color without excessive heat.',
    features: ['100% Natural', 'No Preservatives', 'Authentic Kashmiri']
  },
  {
    id: 19,
    name: 'Coriander Powder',
    packSizes: ['100', '250', '500'],
    prices: [49, 120, 240],
    category: 'Spices & Masalas',
    unit: 'g',
    image: '/coriander_powder.jpg',
    description: 'Freshly ground coriander powder with aromatic flavor.',
    benefits: ['Aids digestion', 'Anti-inflammatory', 'Lowers cholesterol', 'Rich in antioxidants'],
    usage: 'Essential spice for Indian curries, dals, and spice blends.',
    features: ['100% Natural', 'No Preservatives', 'Freshly Ground']
  },
  {
    id: 20,
    name: 'Garam Masala',
    packSizes: ['100', '250', '500'],
    prices: [109, 265, 525],
    category: 'Spices & Masalas',
    unit: 'g',
    image: '/garam_masala.jpg',
    description: 'Traditional blend of aromatic spices for authentic Indian flavor.',
    benefits: ['Aids digestion', 'Boosts metabolism', 'Rich in antioxidants', 'Enhances flavor'],
    usage: 'Add at the end of cooking to curries, dals, and biryanis for aromatic finish.',
    features: ['100% Natural', 'No Preservatives', 'Traditional Blend']
  },
  {
    id: 21,
    name: 'Chilli Flakes',
    packSizes: ['100', '250', '500'],
    prices: [59, 145, 285],
    category: 'Spices & Masalas',
    unit: 'g',
    image: '/chilli_flakes.jpg',
    description: 'Crushed red chilli flakes for quick heat and flavor.',
    benefits: ['Boosts metabolism', 'Adds quick heat', 'Rich in capsaicin', 'Versatile use'],
    usage: 'Sprinkle on pizzas, pasta, salads, or add to stir-fries and soups.',
    features: ['100% Natural', 'No Preservatives', 'Convenient']
  },
  {
    id: 22,
    name: 'Sambar Powder',
    packSizes: ['100', '250', '500'],
    prices: [89, 215, 430],
    category: 'Spices & Masalas',
    unit: 'g',
    image: '/sambhar_powder.jpg',
    description: 'Authentic South Indian sambar powder blend.',
    benefits: ['Traditional flavor', 'Aids digestion', 'Rich in spices', 'Complete spice blend'],
    usage: 'Add to sambar, rasam, or vegetables for authentic South Indian taste.',
    features: ['100% Natural', 'No Preservatives', 'Authentic Recipe']
  },
];

export const categories = [
  'All Products',
  'Dry Fruits & Nuts',
  'Natural Products',
  'Grains & Cereals',
  'Health Powders',
  'Spices & Masalas'
];