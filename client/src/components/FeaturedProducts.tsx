import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { getFeaturedProducts } from '../services/productApi';
import { Product } from '../types/Product';

export function FeaturedProducts() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleSet, setVisibleSet] = useState<Set<string>>(new Set());
  const [selectedPack, setSelectedPack] = useState<Record<string, string>>({});
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    getFeaturedProducts()
      .then((prods) => {
        setProducts(prods);
        const defaults: Record<string, string> = {};
        for (const p of prods) {
          const def = p.product_variants.find((v) => v.is_default) ?? p.product_variants[0];
          if (def) defaults[p.id] = def.pack_size;
        }
        setSelectedPack(defaults);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setVisibleSet((prev) => new Set(prev).add(entry.target.getAttribute('data-id')!));
        });
      },
      { threshold: 0.12, rootMargin: '50px' }
    );
    productRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => productRefs.current.forEach((ref) => ref && observer.unobserve(ref));
  }, [products]);

  const getPriceForSelected = (p: Product) => {
    const pack = selectedPack[p.id];
    return (p.product_variants.find((v) => v.pack_size === pack) ?? p.product_variants[0])?.price ?? 0;
  };

  const handlePackSelect = (e: React.MouseEvent, productId: string, pack: string) => {
    e.stopPropagation();
    setSelectedPack((prev) => ({ ...prev, [productId]: pack }));
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const pack = selectedPack[product.id];
    if (!pack) { toast.error('Please select a pack size'); return; }
    addToCart(product, pack, 1);
    toast.success(`${product.name} (${pack}${product.unit}) added to cart`);
  };

  if (loading) return null;

  return (
    <section id="featured" className="py-20 bg-gradient-to-br from-[#f2ecdc] via-[#faf8f0] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#004606]/10 px-4 py-2 rounded-full mb-4">
            <span className="text-[#004606] text-sm font-semibold uppercase tracking-wide">Featured Collection</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#004606] mb-6">Our Premium Products</h2>
          <p className="text-gray-600">100% Natural • Preservative Free • Traditionally Sourced</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (productRefs.current[index] = el)}
              data-id={product.id}
              onClick={() => navigate(`/product/${product.slug}`)}
              className={`group bg-white rounded-3xl overflow-hidden cursor-pointer
                shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.18)]
                transition-all duration-700 ease-out hover:-translate-y-2
                ${visibleSet.has(product.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: visibleSet.has(product.id) ? `${index * 120}ms` : '0ms' }}
            >
              <div className="relative h-72 bg-[#f2ecdc] flex items-center justify-center">
                <img src={product.image ?? ''} alt={product.name} loading="lazy"
                  className="max-w-[90%] max-h-[90%] object-contain transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                {product.tagline && (
                  <span className="inline-block bg-[#004606]/5 text-[#004606] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {product.tagline}
                  </span>
                )}
                <h3 className="text-2xl font-extrabold tracking-tight text-[#004606] mb-1">{product.name}</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-extrabold text-[#004606]">₹{getPriceForSelected(product)}</span>
                </div>
                {product.featured_description && (
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{product.featured_description}</p>
                )}
                <div className="flex flex-wrap gap-2 mb-5" onClick={(e) => e.stopPropagation()}>
                  {product.product_variants.map((v) => {
                    const isSelected = selectedPack[product.id] === v.pack_size;
                    return (
                      <button key={v.id} onClick={(e) => handlePackSelect(e, product.id, v.pack_size)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${isSelected ? 'bg-[#004606] text-white shadow-md scale-105'
                            : 'bg-[#f7f3e8] text-[#004606] border border-[#004606]/10 hover:border-[#004606]/40'
                          }`}>
                        {v.pack_size}{product.unit}
                      </button>
                    );
                  })}
                </div>
                <button onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-gradient-to-r from-[#004606] to-[#006609] hover:from-[#006609] hover:to-[#008c0f]
                    text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300
                    flex items-center justify-center gap-2 active:scale-95">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#products" className="inline-flex items-center gap-2 bg-white text-[#004606] font-bold px-8 py-4 rounded-xl border-2 border-[#004606] hover:bg-[#f2ecdc] transition">
            View all Products <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}