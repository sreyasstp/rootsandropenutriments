import { Product } from '../types/Product';
import { supabase } from './supabaseClient';

const PRODUCT_SELECT = `
  *,
  product_variants (
    id,
    pack_size,
    price,
    stock,
    is_default
  )
`;

// ─── Public ───────────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {

  await supabase.auth.refreshSession(); // 🔥 ensure valid token

  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('is_active', true)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Product[];
}

/** Primary product lookup — by URL slug (e.g. "raw-banana-powder") */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  await supabase.auth.refreshSession(); // 🔥 ensure valid token

  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  if (error) return null;
  return data as Product;
}

/** UUID lookup — used by admin / internal links */
export async function getProductById(id: string): Promise<Product | null> {
  await supabase.auth.refreshSession(); // 🔥 ensure valid token

  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('id', id)
    .single();
  if (error) return null;
  return data as Product;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await supabase.auth.refreshSession(); // 🔥 ensure valid token

  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function getCategories(): Promise<string[]> {
  await supabase.auth.refreshSession(); // 🔥 ensure valid token

  const { data, error } = await supabase
    .from('product_categories')
    .select('category');
  if (error) throw error;
  return ['All Products', ...(data ?? []).map((r: any) => r.category)];
}

export async function searchProducts(query: string): Promise<Product[]> {
  await supabase.auth.refreshSession(); // 🔥 ensure valid token

  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('is_active', true)
    .or(`name.ilike.%${query}%,category.ilike.%${query}%`)
    .limit(5);
  if (error) throw error;
  return (data ?? []) as Product[];
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export async function getAllProductsAdmin(): Promise<Product[]> {
  await supabase.auth.refreshSession(); // 🔥 ensure valid token

  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Product[];
}

export interface ProductFormData {
  name: string; category: string; unit: string; image: string;
  description: string; benefits: string[]; usage: string; features: string[];
  is_featured: boolean; tagline: string; featured_description: string;
  is_active: boolean; slug: string;
  pack_sizes: string[]; prices: number[]; stocks: number[];
}

export const EMPTY_PRODUCT_FORM: ProductFormData = {
  name: '', category: '', unit: 'g', image: '', description: '',
  benefits: [], usage: '', features: [],
  is_featured: false, tagline: '', featured_description: '',
  is_active: true, slug: '',
  pack_sizes: [''], prices: [0], stocks: [0],
};

export function nameToSlug(name: string): string {
  return name.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function productToFormData(p: Product): ProductFormData {
  const sorted = [...p.product_variants].sort((a, b) => Number(a.pack_size) - Number(b.pack_size));
  return {
    name: p.name, category: p.category, unit: p.unit ?? 'g',
    image: p.image ?? '', description: p.description ?? '',
    benefits: p.benefits ?? [], usage: p.usage ?? '',
    features: p.features ?? [], is_featured: p.is_featured ?? false,
    tagline: p.tagline ?? '', featured_description: p.featured_description ?? '',
    is_active: p.is_active ?? true, slug: p.slug ?? '',
    pack_sizes: sorted.map((v) => v.pack_size),
    prices: sorted.map((v) => v.price),
    stocks: sorted.map((v) => v.stock),
  };
}

export async function createProduct(form: ProductFormData): Promise<void> {
  await supabase.auth.refreshSession(); // 🔥 ensure valid token

  const { data: product, error: pe } = await supabase
    .from('products')
    .insert({
      name: form.name, category: form.category, unit: form.unit, image: form.image,
      description: form.description, benefits: form.benefits, usage: form.usage,
      features: form.features, is_featured: form.is_featured,
      tagline: form.tagline || null, featured_description: form.featured_description || null,
      is_active: form.is_active, slug: form.slug || nameToSlug(form.name),
    })
    .select('id').single();
  if (pe) throw pe;

  const variants = form.pack_sizes
    .map((s, i) => ({ s: s.trim(), p: form.prices[i] ?? 0, st: form.stocks[i] ?? 0 }))
    .filter((v) => v.s)
    .map((v, i) => ({
      product_id: product.id, pack_size: v.s, price: v.p, stock: v.st, is_default: i === 0,
    }));

  if (variants.length > 0) {
    const { error: ve } = await supabase.from('product_variants').insert(variants);
    if (ve) throw ve;
  }
}

export async function updateProduct(id: string, form: ProductFormData): Promise<void> {
  await supabase.auth.refreshSession(); // 🔥 ensure valid token

  const { error: pe } = await supabase
    .from('products')
    .update({
      name: form.name, category: form.category, unit: form.unit, image: form.image,
      description: form.description, benefits: form.benefits, usage: form.usage,
      features: form.features, is_featured: form.is_featured,
      tagline: form.tagline || null, featured_description: form.featured_description || null,
      is_active: form.is_active, slug: form.slug || nameToSlug(form.name),
    })
    .eq('id', id);
  if (pe) throw pe;

  await supabase.from('product_variants').delete().eq('product_id', id);

  const variants = form.pack_sizes
    .map((s, i) => ({ s: s.trim(), p: form.prices[i] ?? 0, st: form.stocks[i] ?? 0 }))
    .filter((v) => v.s)
    .map((v, i) => ({
      product_id: id, pack_size: v.s, price: v.p, stock: v.st, is_default: i === 0,
    }));

  if (variants.length > 0) {
    const { error: ve } = await supabase.from('product_variants').insert(variants);
    if (ve) throw ve;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  await supabase.auth.refreshSession(); // 🔥 ensure valid token
  const { error } = await supabase
    .from('products').update({ is_active: false }).eq('id', id);
  if (error) throw error;
}