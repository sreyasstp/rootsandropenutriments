// ─── Supabase row types ───────────────────────────────────────────────────────

export interface ProductVariant {
  id: string;
  product_id: string;
  pack_size: string;   // e.g. "250", "500"
  price: number;
  stock: number;
  is_default: boolean;
}

export interface Product {
  slug: string;
  id: string;
  name: string;
  category: string;
  unit: string;
  image: string;
  description: string;
  benefits: string[];
  usage: string;
  features: string[];
  is_featured: boolean;
  tagline: string | null;
  featured_description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;

  // joined
  product_variants: ProductVariant[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns the variant that matches a given pack_size string */
export function getVariantBySize(product: Product, packSize: string): ProductVariant | undefined {
  return product.product_variants.find((v) => v.pack_size === packSize);
}

/** Returns the default (or first) variant */
export function getDefaultVariant(product: Product): ProductVariant | undefined {
  return (
    product.product_variants.find((v) => v.is_default) ??
    product.product_variants[0]
  );
}

/** Returns price for a given pack_size (falls back to default variant price) */
export function getPriceForSize(product: Product, packSize?: string): number {
  if (packSize) {
    const v = getVariantBySize(product, packSize);
    if (v) return v.price;
  }
  return getDefaultVariant(product)?.price ?? 0;
}