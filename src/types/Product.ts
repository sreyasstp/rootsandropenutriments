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
  
    createdAt?: string;
    updatedAt?: string;
  }
  