import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';

export default function Products() {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Sync local search input if search params change externally (e.g. from header search)
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  // Debounce the search input updates to the URL query parameters
  useEffect(() => {
    const handler = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      if (localSearchTerm.trim()) {
        newParams.set('search', localSearchTerm.trim());
      } else {
        newParams.delete('search');
      }
      setSearchParams(newParams);
    }, 250);

    return () => clearTimeout(handler);
  }, [localSearchTerm]);
  
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  // Memoize filtered product list to avoid unnecessary filter runs
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <Helmet>
        <title>Curated Cannabis Collection | Sativa Yard</title>
        <meta name="description" content="Explore Sativa Yard's premium collection of top-shelf indoor-grown flower, concentrates, vapes, artisan edibles, and lifestyle accessories in Johannesburg." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 tracking-tight mb-4">Curated Collection</h1>
          <p className="text-emerald-800/70 leading-relaxed font-medium">
            Explore our premium selection of indoor-grown flower, artisan edibles, pure concentrates, and high-end accessories.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-[32px] shadow-sm mb-12 gap-4 border border-emerald-50">
          <div className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 gap-2 hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-2xl text-sm font-bold transition-colors whitespace-nowrap ${
                  activeCategory === category 
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 cursor-default' 
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-transparent hover:border-emerald-200 cursor-pointer'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600/50" />
            <input 
              type="text"
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-emerald-100 bg-white hover:border-emerald-200 focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 outline-none text-sm transition-all"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={product.id} 
                className="bg-white rounded-[32px] border border-emerald-50 overflow-hidden hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 flex flex-col group p-4"
              >
                <div className="aspect-square bg-emerald-50/50 rounded-2xl relative overflow-hidden mb-4">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
                  {product.strainType !== 'N/A' && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-emerald-800 uppercase tracking-widest border border-emerald-100">
                      {product.strainType}
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-grow px-2">
                  <div className="text-[10px] font-black text-emerald-600 tracking-widest uppercase mb-2">{product.category}</div>
                  <h3 className="text-lg font-bold text-emerald-900 mb-2">{product.name}</h3>
                  <p className="text-emerald-800/70 text-sm line-clamp-2 mb-4 leading-relaxed">{product.description}</p>
                  
                  <div className="mt-auto pt-4 border-t border-emerald-50 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-emerald-900 block">
                        {Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(product.price)}
                      </span>
                      <span className="text-xs text-emerald-600 block font-medium">{product.weight}</span>
                    </div>
                    {product.availability === 'Out of Stock' ? (
                      <span className="text-[10px] font-black text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-xl uppercase tracking-widest">
                        Sold Out
                      </span>
                    ) : (
                      <button 
                        onClick={() => addToCart(product, 1)}
                        className="bg-emerald-50 hover:bg-emerald-700 text-emerald-700 hover:text-white p-3 rounded-xl transition-colors border border-emerald-100 hover:border-emerald-700 cursor-pointer"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingBag className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-emerald-900 mb-2">No products found</h3>
            <p className="text-emerald-800/70">Try adjusting your search or category filters.</p>
          </div>
        )}

      </div>
    </div>
  );
}
