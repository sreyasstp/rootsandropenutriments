export interface Product {
  _id?: string;

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

  // ✅ ADD BELOW
  isFeatured?: boolean;
  tagline?: string;
  featuredDescription?: string;

  createdAt?: string;
  updatedAt?: string;
}