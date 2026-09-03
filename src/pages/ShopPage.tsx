import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS } from '../data/shopAndLivestockData';
import { Product, ProductCategory, TargetAnimalType } from '../types';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Check, 
  Star, 
  ShieldCheck, 
  Truck, 
  Phone, 
  ArrowRight,
  Info,
  ChevronRight,
  Sparkles,
  Egg
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAnimal, setSelectedAnimal] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories: string[] = ['All', 'Feeds', 'Animal Nutrition', 'Veterinary & Health', 'Farm Equipment', 'Biosecurity'];
  const animals: string[] = ['All', 'Poultry', 'Cattle & Dairy', 'Pigs', 'Goats & Sheep', 'All Livestock'];

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchAnimal = selectedAnimal === 'All' || product.targetAnimal === selectedAnimal || product.targetAnimal === 'All Livestock';
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.swahiliName && product.swahiliName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchAnimal && matchSearch;
    });
  }, [selectedCategory, selectedAnimal, searchQuery]);

  return (
    <div className="bg-[#FAF8F2] min-h-screen py-8 sm:py-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-10">
        <div className="bg-[#04361A] text-white rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-xl border border-[#04361A]">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#419C09]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-12 bottom-4 w-40 h-40 bg-[#FFB70F]/15 rounded-full blur-xl pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-[#419C09] text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4" /> Official Farm Inputs Store
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-3">
              Certified Feeds, Animal Nutrition & Veterinary Meds
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium mb-6">
              Every bag and bottle is tested for potency. Zero adulteration, direct farm-gate delivery across Kiambu, Nakuru, Eldoret, Kericho, and nationwide via reliable matatu & courier saccos.
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-bold text-white/90">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs">
                <Truck className="w-4 h-4 text-[#FFB70F]" />
                <span>Same-day delivery in Nairobi & Kiambu</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs">
                <ShieldCheck className="w-4 h-4 text-[#419C09]" />
                <span>100% KVB & KEBS Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Search and Filters Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#04361A]/10 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search feeds, layers mash, mastitis tubes, CMT kits, minerals..."
                className="w-full bg-[#FAF8F2] border border-[#04361A]/15 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-[#04361A] focus:outline-hidden focus:ring-2 focus:ring-[#419C09]"
              />
            </div>

            {/* Quick Animal Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-xs font-bold text-[#04361A] shrink-0 mr-1 hidden sm:inline">Animal:</span>
              {animals.map((animal) => (
                <button
                  key={animal}
                  onClick={() => setSelectedAnimal(animal)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedAnimal === animal
                      ? 'bg-[#04361A] text-white shadow-xs'
                      : 'bg-[#FAF8F2] text-neutral-700 hover:bg-[#04361A]/10'
                  }`}
                >
                  {animal === 'Poultry' && <span className="mr-1">🐔</span>}
                  {animal === 'Cattle & Dairy' && <span className="mr-1">🐄</span>}
                  {animal === 'Pigs' && <span className="mr-1">🐖</span>}
                  {animal === 'Goats & Sheep' && <span className="mr-1">🐐</span>}
                  {animal}
                </button>
              ))}
            </div>
          </div>

          {/* Categories Tab Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-[#04361A]/10 pt-3 scrollbar-none">
            <span className="text-xs font-bold text-[#04361A] shrink-0 mr-1">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#419C09] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-[#04361A] hover:bg-neutral-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-6 flex justify-between items-center text-xs text-neutral-600 font-medium">
          <span>Showing <strong>{filteredProducts.length}</strong> farm products</span>
          <span className="text-[#04361A] font-bold">Pay via M-Pesa on Delivery Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#04361A]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Product Image and Badges */}
              <div className="relative h-48 overflow-hidden bg-neutral-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-[#FFB70F] text-[#04361A] text-[10px] font-black px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider">
                    {product.badge}
                  </div>
                )}

                <div className="absolute top-3 right-3 bg-[#04361A]/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {product.targetAnimal}
                </div>

                <div className="absolute bottom-2 left-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md text-[11px] font-bold text-[#04361A] flex items-center gap-1 shadow-xs">
                  <Star className="w-3 h-3 text-[#FFB70F] fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-neutral-400">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#419C09] uppercase tracking-wider block mb-1">
                    {product.category}
                  </span>
                  
                  <h3 className="font-extrabold text-[#04361A] text-base leading-snug group-hover:text-[#419C09] transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  
                  {product.swahiliName && (
                    <p className="text-xs text-neutral-500 italic mt-0.5 mb-2">
                      {product.swahiliName}
                    </p>
                  )}

                  <p className="text-xs text-neutral-600 line-clamp-2 mb-3">
                    {product.description}
                  </p>

                  <div className="space-y-1 mb-4">
                    {product.benefits.slice(0, 2).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-neutral-700">
                        <Check className="w-3 h-3 text-[#419C09] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and Cart Button */}
                <div className="pt-3 border-t border-[#04361A]/10">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-[#04361A]">
                          KES {product.priceKes.toLocaleString()}
                        </span>
                        {product.originalPriceKes && (
                          <span className="text-xs text-neutral-400 line-through">
                            KES {product.originalPriceKes.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-neutral-500 font-medium">
                        per {product.unit}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-xs font-bold text-[#419C09] hover:text-[#04361A] transition-colors p-1"
                    >
                      Details →
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(product);
                      setIsCartOpen(true);
                    }}
                    className="w-full py-2.5 bg-[#419C09] hover:bg-[#04361A] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Basket</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF8F2] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#04361A]/15 overflow-hidden my-8">
            <div className="relative h-64 sm:h-72">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                ✕
              </button>
              {selectedProduct.badge && (
                <div className="absolute bottom-4 left-4 bg-[#FFB70F] text-[#04361A] text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider">
                  {selectedProduct.badge}
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <span className="text-xs font-bold text-[#419C09] uppercase tracking-wider">
                {selectedProduct.category} • {selectedProduct.targetAnimal}
              </span>
              <h2 className="text-2xl font-black text-[#04361A] mt-1 mb-1">
                {selectedProduct.name}
              </h2>
              {selectedProduct.swahiliName && (
                <p className="text-sm text-neutral-600 italic mb-4">
                  {selectedProduct.swahiliName}
                </p>
              )}

              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#04361A]/10">
                <div className="text-2xl font-black text-[#04361A]">
                  KES {selectedProduct.priceKes.toLocaleString()}
                </div>
                <div className="text-xs text-neutral-500 font-medium">
                  per {selectedProduct.unit}
                </div>
                <div className="ml-auto flex items-center gap-1 text-xs font-bold text-[#04361A] bg-white px-2.5 py-1 rounded-lg border border-[#04361A]/10">
                  <Star className="w-3.5 h-3.5 text-[#FFB70F] fill-current" />
                  <span>{selectedProduct.rating} ({selectedProduct.reviewsCount} reviews)</span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-700 mb-6">
                <p className="leading-relaxed font-medium">
                  {selectedProduct.description}
                </p>

                <div>
                  <h4 className="font-bold text-[#04361A] mb-2">Key Farm Benefits:</h4>
                  <ul className="space-y-1.5">
                    {selectedProduct.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#419C09] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedProduct.dosage && (
                  <div className="bg-white p-3.5 rounded-xl border border-[#04361A]/10">
                    <span className="font-bold text-[#04361A] block mb-1">Dosage & Administration:</span>
                    <p className="text-neutral-600">{selectedProduct.dosage}</p>
                  </div>
                )}

                {selectedProduct.composition && (
                  <div className="bg-white p-3.5 rounded-xl border border-[#04361A]/10">
                    <span className="font-bold text-[#04361A] block mb-1">Chemical / Nutritional Composition:</span>
                    <p className="text-neutral-600 font-mono text-xs">{selectedProduct.composition}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-1/3 py-3 rounded-xl border border-neutral-300 font-bold text-xs text-neutral-700 hover:bg-neutral-100"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                    setIsCartOpen(true);
                  }}
                  className="w-2/3 py-3 bg-[#419C09] hover:bg-[#04361A] text-white font-bold text-sm rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Basket (KES {selectedProduct.priceKes.toLocaleString()})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
